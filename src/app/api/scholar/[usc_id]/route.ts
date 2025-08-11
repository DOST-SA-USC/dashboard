import { headers } from 'next/headers';

import { getUserDataByUscID } from '@/lib/db/users';

export async function GET(
  request: Request,
  { params }: { params: { usc_id: string } }
) {
  const headersInstance = await headers();
  const authorization = headersInstance.get('authorization');

  if (!authorization?.startsWith('Bearer ')) {
    return new Response('Unauthorized', { status: 401 });
  }

  const providedApiKey = authorization.slice(7).trim();
  const expectedApiKey = process.env.DSU_API_KEY;

  if (providedApiKey !== expectedApiKey) {
    return new Response('Unauthorized', { status: 401 });
  }

  const userData = await getUserDataByUscID(params.usc_id);
  if (!userData) {
    return new Response('User not found', { status: 404 });
  }

  const res = {
    uscID: userData.uscID,
    firstName: userData.firstName,
    middleName: userData.middleName,
    lastName: userData.lastName,
    program: userData.program as string,
    yearLevel: userData.yearLevel as string,
    yearOfAward: userData.yearOfAward as string,
    scholarshipType: userData.scholarshipType as string,
  };

  return new Response(JSON.stringify(res), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
