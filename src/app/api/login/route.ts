import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);

    if (url.pathname.includes("/auth/google/callback")) {
      return await handleGoogleCallback(request);
    }

    return await handleSSORequest(request);
  } catch (error) {
    console.error("SSO failed:", error);
    return NextResponse.json({ message: "SSO failed" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const method = url.searchParams.get("method");

    if (method === "sso") {
      return await handleSSORequest(request);
    }

    return await handleRegularLogin(request);
  } catch (error) {
    console.error("Login failed:", error);
    return NextResponse.json({ message: "Login failed" }, { status: 500 });
  }
}

async function handleRegularLogin(request: NextRequest) {
  const body = await request.json();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  const data = await response.json();

  if (data.detail) {
    return NextResponse.json(data, { status: response.status });
  }
  return NextResponse.json(data);
}

async function handleSSORequest(request: NextRequest) {
  const url = new URL(request.url);
  const provider = url.searchParams.get("provider");

  if (!provider) {
    return NextResponse.json(
      { message: "Provider is required" },
      { status: 400 },
    );
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/sso?provider=${provider}`,
    {
      method: "GET",
    },
  );

  const data = await response.json();

  if (data.detail) {
    return NextResponse.json(data, { status: response.status });
  }
  return NextResponse.json(data);
}

async function handleGoogleCallback(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { message: "Authorization code is required" },
      { status: 400 },
    );
  }

  console.log("Received callback with code:", code);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/auth/google-callback?code=${encodeURIComponent(code)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const data = await response.json();
  console.log("Backend response:", data);

  if (data.detail) {
    return NextResponse.json(data, { status: response.status });
  }

  return NextResponse.json(data);
}
