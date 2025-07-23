import HiveClient from './hiveClient';
import * as dhive from '@hiveio/dhive';


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
