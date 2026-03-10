import { NextResponse } from 'next/server';
import { 
  getCurrentProvider, 
  getCurrentModel, 
  getProviderStatus, 
  getAvailableModels,
  AIProvider 
} from '@/lib/ai-config';
import { requireAdminUser } from '@/lib/dashboard-auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Verify admin access
    await requireAdminUser();

    const provider = getCurrentProvider();
    const model = getCurrentModel();
    const allStatuses = getProviderStatus();
    const availableModels = getAvailableModels();

    // Check if current provider is configured (without exposing the key)
    const currentStatus = allStatuses.find(s => s.provider === provider);
    const configured = currentStatus?.configured ?? false;

    return NextResponse.json({
      provider,
      model,
      configured,
      allStatuses,
      availableModels,
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (error instanceof Error && error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    console.error('AI Status API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
