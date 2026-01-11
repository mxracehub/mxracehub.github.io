
import { NextResponse, type NextRequest } from 'next/server';
import {
  Configuration,
  PlaidApi,
  PlaidEnvironments,
  Products,
  CountryCode,
} from 'plaid';
import { cookies } from 'next/headers';

// Initialize the Plaid client
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
  // IMPORTANT: In a real app, you would want to authenticate the user
  // before creating a link token. For this example, we'll simulate it
  // by using a static user ID. You would replace this with your app's
  // user management logic.
  const userId = 'user-id-placeholder'; // Replace with actual, authenticated user ID

  if (!process.env.PLAID_CLIENT_ID || !process.env.PLAID_SECRET) {
    return NextResponse.json(
      { error: 'Plaid client ID or secret not configured.' },
      { status: 500 }
    );
  }

  const plaidRequest = {
    user: {
      client_user_id: userId,
    },
    client_name: 'MxHub Exchange Duo',
    products: [Products.Auth],
    country_codes: [CountryCode.Us],
    language: 'en',
  };

  try {
    const createTokenResponse = await plaidClient.linkTokenCreate(plaidRequest);
    return NextResponse.json(createTokenResponse.data);
  } catch (error: any) {
    console.error('Plaid API error:', error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Failed to create Plaid link token.' },
      { status: 500 }
    );
  }
}
