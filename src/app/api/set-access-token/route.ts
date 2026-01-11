
import { NextResponse, type NextRequest } from 'next/server';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

const configuration = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV || 'sandbox'],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(configuration);

export async function POST(request: NextRequest) {
  const { public_token } = await request.json();

  if (!public_token) {
    return NextResponse.json({ error: 'Public token is missing.' }, { status: 400 });
  }

  try {
    const exchangeResponse = await plaidClient.itemPublicTokenExchange({
      public_token: public_token,
    });

    const { access_token, item_id } = exchangeResponse.data;

    // --- IMPORTANT ---
    // In a real application, you would securely store the `access_token` and `item_id`
    // in your database, associated with your authenticated user.
    // DO NOT send the access_token back to the client-side.
    // This is a placeholder to show the exchange was successful.
    console.log('--- Plaid Access Token Exchange Successful ---');
    console.log(`Item ID: ${item_id}`);
    console.log(`Access Token (DO NOT LOG IN PRODUCTION): ${access_token}`);
    console.log('--- You should now store this securely in your backend. ---');
    
    // For the client, just confirm success.
    return NextResponse.json({ message: 'Bank account linked successfully.' });

  } catch (error: any) {
    console.error('Plaid token exchange error:', error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Failed to exchange public token.' },
      { status: 500 }
    );
  }
}
