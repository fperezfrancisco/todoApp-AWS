import { NextResponse } from "next/server";

export async function GET() {
  const auth0Domain = process.env.AUTH0_ISSUER; // e.g. https://your-tenant.us.auth0.com
  const clientId = process.env.AUTH0_CLIENT_ID!;
  const returnTo =
    process.env.NEXT_PUBLIC_LOGOUT_RETURN_TO ?? "http://localhost:3000/";

  if (!auth0Domain || !clientId) {
    return new NextResponse("Auth0 env not configured", { status: 500 });
  }

  const url = new URL(`${auth0Domain}/v2/logout`);
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("returnTo", returnTo);
  // If you also want to clear upstream IdP (Google/Microsoft) sessions, uncomment:
  // url.searchParams.set("federated", "1");

  return NextResponse.redirect(url.toString());
}
