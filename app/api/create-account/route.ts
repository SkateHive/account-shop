import { NextRequest, NextResponse } from 'next/server';
import { createHiveAccount } from '../../lib/hiveUtils';
import { getServerConfig } from '../../lib/serverConfig';
import serverMailer from '../../lib/invite/emailService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, email, txHash } = body;

    if (!username || !email || !txHash) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: username, email, txHash' },
        { status: 400 }
      );
    }

    console.log(`🚀 Starting Hive account creation for ${username}`);

    // Get server configuration
    let config;
    try {
      config = getServerConfig();
      console.log('✅ Server configuration loaded successfully');
    } catch (configError) {
      console.error('❌ Failed to load server configuration:', configError);
      return NextResponse.json(
        { success: false, error: `Configuration error: ${configError instanceof Error ? configError.message : 'Unknown error'}` },
        { status: 500 }
      );
    }

    // Create the Hive account
    const accountResult = await createHiveAccount(username, config.accountCreator, config.accountCreatorActiveKey);
    
    if (!accountResult.success) {
      console.error('❌ Failed to create Hive account:', accountResult.error);
      return NextResponse.json(
        { success: false, error: accountResult.error },
        { status: 500 }
      );
    }

    console.log(`✅ Hive account created successfully for ${username}`, {
      method: accountResult.method,
      transactionId: accountResult.transactionId
    });

    // Send email with actual credentials
    const emailSuccess = await serverMailer(
      email,
      `Your SkateHive Account is Ready! - ${username}`,
      'SkateHive Account Shop',
      username,
      accountResult.account!.password,
      {
        ...accountResult.account!.keys,
        transactionHash: txHash,
        hiveTransactionId: accountResult.transactionId,
        creationMethod: accountResult.method
      },
      'en'
    );

    if (!emailSuccess) {
      console.error('❌ Failed to send credentials email');
      // Account was created but email failed - still return success but warn
      return NextResponse.json({
        success: true,
        warning: 'Account created but failed to send email with credentials',
        account: {
          username: accountResult.account!.username,
          hiveTransactionId: accountResult.transactionId,
          method: accountResult.method
        }
      });
    }

    console.log(`✅ Credentials email sent successfully to ${email}`);

    return NextResponse.json({
      success: true,
      message: 'Hive account created and credentials sent via email',
      account: {
        username: accountResult.account!.username,
        hiveTransactionId: accountResult.transactionId,
        method: accountResult.method
      }
    });

  } catch (error) {
    console.error('❌ Error in create-account API:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: `Server error: ${error instanceof Error ? error.message : 'Unknown error'}` 
      },
      { status: 500 }
    );
  }
}
