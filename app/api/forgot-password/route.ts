import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";

// In a real application, you would store this in a database
// For demo purposes, we'll use an in-memory store
const resetTokens = new Map<string, { email: string; expires: number }>();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Generate a secure reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const expires = Date.now() + 3600000; // 1 hour from now

    // Store the token (in a real app, store this in your database)
    resetTokens.set(resetToken, { email, expires });

    // Create transporter (configure with your email service)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // your email
        pass: process.env.SMTP_PASS, // your email password or app password
      },
    });

    // Email content
    const resetUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/reset-password?token=${resetToken}`;
    
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: "Reset Your InternConnect Password",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🌟 InternConnect</h1>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #ddd;">
            <h2 style="color: #333; margin-top: 0;">Reset Your Password</h2>
            
            <p>Hello,</p>
            
            <p>We received a request to reset your password for your InternConnect account. If you didn't make this request, you can safely ignore this email.</p>
            
            <p>To reset your password, click the button below:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="background: #7c3aed; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Reset Password</a>
            </div>
            
            <p>Or copy and paste this link into your browser:</p>
            <p style="background: #f0f0f0; padding: 10px; border-radius: 5px; word-break: break-all; font-size: 14px;">${resetUrl}</p>
            
            <p><strong>This link will expire in 1 hour for security reasons.</strong></p>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            
            <p style="font-size: 14px; color: #666;">
              If you're having trouble clicking the button, copy and paste the URL above into your web browser.
            </p>
            
            <p style="font-size: 14px; color: #666;">
              Best regards,<br>
              The InternConnect Team
            </p>
          </div>
        </body>
        </html>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Password reset email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending password reset email:", error);
    return NextResponse.json(
      { error: "Failed to send password reset email" },
      { status: 500 }
    );
  }
}

// Export the reset tokens for use in reset password route
export { resetTokens };