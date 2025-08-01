import { getLocalizedStrings } from "./localization";

export default function getMailTemplate_Invite(
  createdby: string,
  desiredUsername: string,
  masterPassword: string,
  keys: any,
  language: string
) {
  const localizedStrings = getLocalizedStrings(language);

  // Check if this is a transaction confirmation email
  const isTransactionConfirmation = keys?.transactionHash && masterPassword === "PENDING_ACCOUNT_CREATION";
  
  // Replace placeholder in localized string
  const onboardedMessage = isTransactionConfirmation 
    ? `Transaction Confirmation for ${desiredUsername}`
    : localizedStrings.onboardedMessage.replace('{createdby}', createdby);
  
  const enterDetailsStep = localizedStrings.enterDetailsStep.replace('{desiredUsername}', desiredUsername);

  // ETH Transaction info (show if we have a transaction hash and it's not a confirmation email)
  const ethTransactionContent = keys?.transactionHash && !isTransactionConfirmation ? `
    <!-- ETH Payment Confirmation -->
    <div style="background-color: #e3f2fd; border: 2px solid #2196f3; border-radius: 8px; padding: 20px; margin: 20px 0;">
      <h3 style="color: #1976d2; margin-top: 0;">💰 ETH Payment Confirmed</h3>
      <p style="margin: 10px 0;"><strong>ETH Transaction Hash:</strong></p>
      <p style="font-family: monospace; background: #f5f5f5; padding: 10px; border-radius: 4px; word-break: break-all; font-size: 12px; color: #333;">${keys.transactionHash}</p>
      ${keys.hiveTransactionId ? `
        <p style="margin: 10px 0;"><strong>Hive Account Creation Transaction:</strong></p>
        <p style="font-family: monospace; background: #f5f5f5; padding: 10px; border-radius: 4px; word-break: break-all; font-size: 12px; color: #333;">${keys.hiveTransactionId}</p>
      ` : ''}
      ${keys.creationMethod ? `
        <p style="margin: 10px 0;"><strong>Creation Method:</strong> ${keys.creationMethod === 'claimed' ? 'Account Creation Tokens (Free)' : 'HIVE Payment (3 HIVE)'}</p>
      ` : ''}
    </div>
  ` : ``;

  // Transaction confirmation content
  const transactionContent = isTransactionConfirmation ? `
    <!-- Transaction Confirmation -->
    <div style="background-color: #e8f5e8; border: 2px solid #4caf50; border-radius: 8px; padding: 20px; margin: 20px 0;">
      <h3 style="color: #2e7d32; margin-top: 0;">✅ Payment Confirmed!</h3>
      <p style="margin: 10px 0;"><strong>Transaction Hash:</strong></p>
      <p style="font-family: monospace; background: #f5f5f5; padding: 10px; border-radius: 4px; word-break: break-all; font-size: 12px; color: #333;">${keys.transactionHash}</p>
    </div>
  ` : ``;

  // Account credentials content (only for actual account creation emails)
  const credentialsContent = !isTransactionConfirmation ? `
    <!-- Essentials -->
    <div style="background-color: ${localizedStrings.colors.keyBackground}; border: 2px solid ${localizedStrings.colors.foreground1}; border-radius: 8px; padding: 15px; margin: 20px 0;">
      <p style="margin: 0; font-weight: bold; color: ${localizedStrings.colors.foreground1};">${localizedStrings.usernameLabel}</p>
      <p style="margin: 5px 0 15px; font-size: 14px;">${desiredUsername}</p>
      <p style="margin: 0; font-weight: bold; color: ${localizedStrings.colors.foreground1};">${localizedStrings.masterPasswordLabel}</p>
      <p style="margin: 5px 0; font-size: 14px;">${masterPassword}</p>
    </div>
    <!-- Step-by-step instructions -->
    <div style="background-color: ${localizedStrings.colors.keyBackground}; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
      <h3 style="color: ${localizedStrings.colors.foreground1}; margin-top: 0;">${localizedStrings.howToLoginTitle}</h3>
      <ol style="padding-left: 20px; line-height: 1.6;">
        <li>${localizedStrings.installKeychainStep}</li>
        <li>${localizedStrings.openKeychainStep}</li>
        <li>${enterDetailsStep}</li>
        <li>${localizedStrings.readyStep}</li>
      </ol>
    </div>
  ` : ``;

  const INVITE_MAIL_TEMPLATE = `
<div style="font-family: 'Segoe UI', sans-serif; background-color: ${localizedStrings.colors.background1}; color: ${localizedStrings.colors.foreground2}; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 30px auto; border-radius: 12px; overflow: hidden; box-shadow: 0 0 30px rgba(0, 0, 0, 0.7);">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, ${localizedStrings.colors.foreground1}, ${localizedStrings.colors.highlightBackground}); padding: 30px; text-align: center;">
      <img src="https://docs.skatehive.app/img/skatehive.png" alt="Skate Hive" style="max-width: 80px;">
      <h1 style="margin: 10px 0 0; font-size: 26px;">${localizedStrings.welcomeMessage}</h1>
    </div>
    <!-- Body -->
    <div style="padding: 25px 30px;">
      <h2 style="color: ${localizedStrings.colors.foreground1};">${onboardedMessage}</h2>
      <p>${isTransactionConfirmation ? 'Thank you for your purchase! Your transaction has been confirmed on the blockchain.' : localizedStrings.introParagraph}</p>
      
      ${ethTransactionContent}
      ${transactionContent}
      ${credentialsContent}
      <!-- Image Button (CTA) -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="${localizedStrings.ctaLink}" target="_blank">
          <img src="https://ipfs.skatehive.app/ipfs/QmUkU1BL1yHfk9h33V1BXjBF1FpQKEhAcJxpzV2PixCfLi" alt="${localizedStrings.ctaAltText}" style="max-width: 100%; border-radius: 10px; box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);">
        </a>
        <p style="font-size: 14px; color: ${localizedStrings.colors.helpText}; margin-top: 10px;">${localizedStrings.ctaHelpText}</p>
      </div>
    </div>
    <!-- Warning -->
    <div style="background-color: ${localizedStrings.colors.alertBackground}; padding: 10px; border-radius: 8px; text-align: center; font-weight: bold; color: #fff;">
      ${localizedStrings.warningMessage}
    </div>
    <!-- Key Explanation -->
    <div style="background-color: ${localizedStrings.colors.highlightBackground}; padding: 15px; border-radius: 8px; color: ${localizedStrings.colors.foreground2}; margin-top: 20px;">
      <h3 style="margin-top: 0; color: #fff;">${localizedStrings.keysExplanationTitle}</h3>
      <p>${localizedStrings.postingKeyDescription}</p>
      <p>${localizedStrings.activeKeyDescription}</p>
      <p>${localizedStrings.memoKeyDescription}</p>
      <p>${localizedStrings.ownerKeyDescription}</p>
    </div>
    <!-- Footer -->
    <div style="background-color: ${localizedStrings.colors.background2}; color: ${localizedStrings.colors.helpText}; text-align: center; padding: 20px; font-size: 14px;">
      <p style="margin: 20px 0 0;"><a href="https://skatehive.app/" style="color: ${localizedStrings.colors.link};">${localizedStrings.footerLinkText}</a></p>
    </div>
  </div>
</div>
`;
  return INVITE_MAIL_TEMPLATE;
} 