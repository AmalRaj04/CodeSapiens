import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

// In-memory user storage (in production, use a database)
const users = new Map<string, { id: string; name: string; email: string; password: string }>();

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = Array.from(users.values()).find(user => user.email === email);
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const userId = uuidv4();
    const newUser = {
      id: userId,
      name,
      email,
      password: hashedPassword,
    };

    users.set(userId, newUser);

    // Return user without password
    const userResponse = {
      id: userId,
      name,
      email,
    };

    return NextResponse.json(
      { user: userResponse, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}

// Export users for use in login route
export { users };