import { NextRequest, NextResponse } from 'next/server';
import { getSignUpInfo } from '@/apis/memberApi';

// eslint-disable-next-line import/prefer-default-export
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const { data } = await getSignUpInfo(searchParams.get('key')!);
  return NextResponse.json(data);
}
