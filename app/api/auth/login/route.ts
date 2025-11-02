import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { users } from "../signup/route";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = Array.from(users.values()).find(user => user.email === email);
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Return user without password
    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return NextResponse.json(
      { user: userResponse, message: "Login successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error logging in user:", error);
    return NextResponse.json(
      { error: "Failed to login" },
      { status: 500 }
    );
  }
}