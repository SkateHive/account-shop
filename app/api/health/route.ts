import { NextRequest, NextResponse } from 'next/server';
import { validateServerConfig } from '../../lib/serverConfig';

export async function GET(req: NextRequest) {
  try {
    const validation = validateServerConfig();
    
    if (validation.valid) {
      return NextResponse.json({
        success: true,
        message: 'All required environment variables are configured',
        status: 'ready'
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Missing required environment variables',
        missing: validation.missing,
        status: 'configuration_error'
      }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: `Configuration validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      status: 'error'
    }, { status: 500 });
  }
}
