import HiveClient from './hiveClient';
import * as dhive from '@hiveio/dhive';

// Types for account creation
interface HiveAccount {
  username: string;
  password: string;
  keys: {
    owner: string;
    active: string;
    posting: string;
    memo: string;
    ownerPubkey: string;
    activePubkey: string;
    postingPubkey: string;
    memoPubkey: string;
  };
}

interface AccountCreationResult {
  success: boolean;
  account?: HiveAccount;
  transactionId?: string;
  error?: string;
  method?: 'claimed' | 'paid';
}


/**
 * Checks if a Hive account name is available.
 * @param {string} username - The username to check.
 * @returns {Promise<boolean>} - Returns true if the username is available, false otherwise.
 */

export async function checkAccountName(username: string): Promise<boolean> {
  try {
    const users = await HiveClient.call('condenser_api', 'lookup_accounts', [
      username, 1
    ]);
    console.log('Username check result:', users[0]);
    
    // If users[0] exists and matches exactly, the username is taken
    return users[0] === username;
  } catch (error) {
    console.error('Error checking username:', error);
    throw new Error('Failed to check username availability');
  }
}

export function validateUsername(username: string): { isValid: boolean; error?: string } {
  // Hive username validation rules
  if (!username) {
    return { isValid: false, error: 'Username is required' };
  }
  
  if (username.length < 3) {
    return { isValid: false, error: 'Username must be at least 3 characters' };
  }
  
  if (username.length > 16) {
    return { isValid: false, error: 'Username must be 16 characters or less' };
  }
  
  // Must start with a letter
  if (!/^[a-z]/.test(username)) {
    return { isValid: false, error: 'Username must start with a letter' };
  }
  
  // Can only contain lowercase letters, numbers, and hyphens
  if (!/^[a-z][a-z0-9-]*$/.test(username)) {
    return { isValid: false, error: 'Username can only contain lowercase letters, numbers, and hyphens' };
  }
  
  // Cannot end with a hyphen
  if (username.endsWith('-')) {
    return { isValid: false, error: 'Username cannot end with a hyphen' };
  }
  
  // Cannot have consecutive hyphens
  if (username.includes('--')) {
    return { isValid: false, error: 'Username cannot have consecutive hyphens' };
  }
  
  return { isValid: true };
}

/**
 * @returns A random password for the new account.
 * This password is generated using the crypto API for security.
 * It creates a random seed and generates a private key from it.
 * The password is prefixed with 'SKATE000' to ensure it meets the length requirement
 * for Hive accounts.
 */
export const generatePassword = () => {
    const array = new Uint32Array(10);
    if (typeof window !== 'undefined' && window.crypto) {
      window.crypto.getRandomValues(array);
    } else if (typeof crypto !== 'undefined') {
      crypto.getRandomValues(array);
    }
    const key = 'SKATE000' + dhive.PrivateKey.fromSeed(array.toString()).toString();
    return key.substring(0, 25);
}

/** * Generates private keys for a given username and password.
 * @param {string} username - The username for which to generate private keys.
 * @param {string} password - The password used to generate the private keys.
 * @param {string[]} roles - An array of roles for which to generate keys.
 * @returns {object} An object containing the private keys for the specified roles. 
 * Each key is stored with its role as the key name.
 * The keys are generated using the dhive library's PrivateKey.fromLogin method.
 */

export const getPrivateKeys = (username: string, password: string, roles = ['owner', 'active', 'posting', 'memo']) => {
    const privKeys = {} as any;
    roles.forEach((role) => {
        privKeys[role] = dhive.PrivateKey.fromLogin(username, password, role as dhive.KeyRole).toString();
        privKeys[`${role}Pubkey`] = dhive.PrivateKey.from(privKeys[role]).createPublic().toString();
    });
    return privKeys;
};

/**
 * Creates a new Hive account using account creation tokens or HIVE payment
 * @param {string} username - The desired username for the new account
 * @param {string} creatorUsername - The account creator username
 * @param {string} creatorActiveKey - The account creator's active key
 * @returns {Promise<AccountCreationResult>} Result of the account creation
 */
export async function createHiveAccount(
    username: string, 
    creatorUsername: string, 
    creatorActiveKey: string
): Promise<AccountCreationResult> {
    try {
        console.log('🔍 Creating account with credentials:', {
            username,
            creatorUsername: creatorUsername ? 'SET' : 'MISSING',
            creatorActiveKey: creatorActiveKey ? 'SET' : 'MISSING'
        });

        // Validate username first
        const validation = validateUsername(username);
        if (!validation.isValid) {
            return {
                success: false,
                error: validation.error
            };
        }

        // Check if username is available
        const isTaken = await checkAccountName(username);
        if (isTaken) {
            return {
                success: false,
                error: 'Username is already taken'
            };
        }

        // Generate password and keys
        const password = generatePassword();
        const keys = getPrivateKeys(username, password);

        if (!creatorUsername || !creatorActiveKey) {
            return {
                success: false,
                error: 'Account creator credentials not provided'
            };
        }

        // Create the private key object for signing
        const creatorKey = dhive.PrivateKey.fromString(creatorActiveKey);
        
        // Create authority objects for the new account
        const ownerAuth = {
            weight_threshold: 1,
            account_auths: [],
            key_auths: [[keys.ownerPubkey, 1]]
        };

        const activeAuth = {
            weight_threshold: 1,
            account_auths: [],
            key_auths: [[keys.activePubkey, 1]]
        };

        const postingAuth = {
            weight_threshold: 1,
            account_auths: [],
            key_auths: [[keys.postingPubkey, 1]]
        };

        // Try to create account with claimed tokens first
        try {
            const claimedAccountOp: dhive.Operation = [
                'create_claimed_account',
                {
                    creator: creatorUsername,
                    new_account_name: username,
                    owner: ownerAuth,
                    active: activeAuth,
                    posting: postingAuth,
                    memo_key: keys.memoPubkey,
                    json_metadata: JSON.stringify({
                        profile: {
                            name: username,
                            about: 'Created via SkateHive Account Shop',
                            created_by: 'skatehive-account-shop'
                        }
                    })
                }
            ];

            console.log('Attempting to create account with claimed tokens...');
            
            const claimedResult = await HiveClient.broadcast.sendOperations(
                [claimedAccountOp],
                creatorKey
            );

            console.log('✅ Account created successfully with claimed tokens:', claimedResult);

            return {
                success: true,
                account: {
                    username,
                    password,
                    keys
                },
                transactionId: claimedResult.id,
                method: 'claimed'
            };

        } catch (claimedError) {
            console.log('❌ Failed to create with claimed tokens, trying with HIVE payment...', claimedError);

            // Fallback to paid account creation (3 HIVE)
            try {
                const paidAccountOp: dhive.Operation = [
                    'account_create',
                    {
                        fee: '3.000 HIVE', // 3 HIVE as a string
                        creator: creatorUsername,
                        new_account_name: username,
                        owner: ownerAuth,
                        active: activeAuth,
                        posting: postingAuth,
                        memo_key: keys.memoPubkey,
                        json_metadata: JSON.stringify({
                            profile: {
                                name: username,
                                about: 'Created via SkateHive Account Shop',
                                created_by: 'skatehive-account-shop'
                            }
                        })
                    }
                ];

                console.log('Attempting to create account with HIVE payment...');

                const paidResult = await HiveClient.broadcast.sendOperations(
                    [paidAccountOp],
                    creatorKey
                );

                console.log('✅ Account created successfully with HIVE payment:', paidResult);

                return {
                    success: true,
                    account: {
                        username,
                        password,
                        keys
                    },
                    transactionId: paidResult.id,
                    method: 'paid'
                };

            } catch (paidError) {
                console.error('❌ Failed to create account with HIVE payment:', paidError);
                return {
                    success: false,
                    error: `Failed to create account: ${paidError instanceof Error ? paidError.message : 'Unknown error'}`
                };
            }
        }

    } catch (error) {
        console.error('❌ Error in createHiveAccount:', error);
        return {
            success: false,
            error: `Account creation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        };
    }
}

/**
 * Check account creation resources for the creator account
 * @param {string} creatorUsername - The creator account username
 * @returns {Promise<{claimed_accounts: number, balance: string}>} Available resources
 */
export async function checkCreatorResources(creatorUsername: string): Promise<{claimed_accounts: number, balance: string}> {
    try {
        const [account] = await HiveClient.database.getAccounts([creatorUsername]);
        
        if (!account) {
            throw new Error('Creator account not found');
        }

        const balance = typeof account.balance === 'string' ? account.balance : account.balance.toString();

        return {
            claimed_accounts: (account as any).pending_claimed_accounts || 0,
            balance: balance
        };
    } catch (error) {
        console.error('Error checking creator resources:', error);
        throw error;
    }
}
