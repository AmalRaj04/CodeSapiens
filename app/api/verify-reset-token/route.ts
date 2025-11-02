import { NextRequest, NextResponse } from "next/server";
import { resetTokens } from "../forgot-password/route";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { valid: false, error: "No token provided" },
        { status: 400 }
      );
    }

    const tokenData = resetTokens.get(token);

    if (!tokenData) {
      return NextResponse.json(
        { valid: false, error: "Invalid reset token" },
        { status: 400 }
      );
    }

    if (Date.now() > tokenData.expires) {
      // Clean up expired token
      resetTokens.delete(token);
      return NextResponse.json(
        { valid: false, error: "Reset token has expired" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { valid: true, email: tokenData.email },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying reset token:", error);
    return NextResponse.json(
      { valid: false, error: "Failed to verify token" },
      { status: 500 }
    );
  }
}