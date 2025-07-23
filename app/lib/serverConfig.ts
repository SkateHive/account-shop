// Configuration module for server-side environment variables
export interface ServerConfig {
  accountCreator: string;
  accountCreatorActiveKey: string;
  smtpHost: string;
  smtpPort: number;
  smtpSecure: boolean;
  emailUser: string;
  emailPass: string;
  emailCommunity: string;
  emailRecovery: string;
}

/**
 * Get server configuration from environment variables
 * This function should only be called in API routes or server components
 */
export function getServerConfig(): ServerConfig {
  const config = {
    accountCreator: process.env.ACCOUNT_CREATOR,
    accountCreatorActiveKey: process.env.ACCOUNT_CREATOR_ACTIVE_KEY,
    smtpHost: process.env.SMTP_HOST,
    smtpPort: Number(process.env.SMTP_PORT),
    smtpSecure: process.env.SMTP_SECURE === 'true',
    emailUser: process.env.EMAIL_USER,
    emailPass: process.env.EMAIL_PASS,
    emailCommunity: process.env.EMAIL_COMMUNITY,
    emailRecovery: process.env.EMAIL_RECOVERYACC,
  };

  // Validate required fields
  const missing = [];
  if (!config.accountCreator) missing.push('ACCOUNT_CREATOR');
  if (!config.accountCreatorActiveKey) missing.push('ACCOUNT_CREATOR_ACTIVE_KEY');
  if (!config.smtpHost) missing.push('SMTP_HOST');
  if (!config.emailUser) missing.push('EMAIL_USER');
  if (!config.emailPass) missing.push('EMAIL_PASS');

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  return config as ServerConfig;
}

/**
 * Validate that all required environment variables are present
 */
export function validateServerConfig(): { valid: boolean; missing: string[] } {
  try {
    getServerConfig();
    return { valid: true, missing: [] };
  } catch (error) {
    const missing = error instanceof Error 
      ? error.message.replace('Missing required environment variables: ', '').split(', ')
      : ['Unknown error'];
    return { valid: false, missing };
  }
}
