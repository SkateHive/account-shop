import HiveClient from './hiveClient';

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
