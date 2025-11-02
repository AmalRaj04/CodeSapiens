import { NextRequest, NextResponse } from "next/server";
import { resetTokens } from "../forgot-password/route";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    const tokenData = resetTokens.get(token);

    if (!tokenData) {
      return NextResponse.json(
        { error: "Invalid reset token" },
        { status: 400 }
      );
    }

    if (Date.now() > tokenData.expires) {
      // Clean up expired token
      resetTokens.delete(token);
      return NextResponse.json(
        { error: "Reset token has expired" },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 12);

    // In a real application, you would update the user's password in your database
    // For demo purposes, we'll just log it
    console.log(`Password reset for ${tokenData.email}: ${hashedPassword}`);

    // Clean up the used token
    resetTokens.delete(token);

    return NextResponse.json(
      { message: "Password reset successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error resetting password:", error);
    return NextResponse.json(
      { error: "Failed to reset password" },
      { status: 500 }
    );
  }
}