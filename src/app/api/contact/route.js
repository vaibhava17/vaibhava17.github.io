// src/app/api/contact/route.js
import nodemailer from "nodemailer";
import { rateLimit } from "../lib/rateLimiter";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Get client IP for rate limiting
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(/, /)[0] : request.ip || "unknown";

    // Apply rate limiting
    const rateLimitResult = rateLimit(ip, 3, 60000); // 3 requests per minute

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: rateLimitResult.error,
          resetTime: rateLimitResult.resetTime,
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Content validation (basic spam protection)
    const spamKeywords = [
      "viagra",
      "casino",
      "lottery",
      "winner",
      "congratulations",
    ];
    const content = `${subject} ${message}`.toLowerCase();
    if (spamKeywords.some((keyword) => content.includes(keyword))) {
      return NextResponse.json(
        { success: false, message: "Message blocked by spam filter" },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Notification email to you
    const notificationEmail = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL,
      subject: `🌟 Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2px; border-radius: 12px;">
          <div style="background: white; border-radius: 10px; overflow: hidden;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">New Portfolio Contact</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">You've received a new message!</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 30px;">
              <!-- Contact Info -->
              <div style="background: #f8f9ff; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #667eea;">
                <h2 style="color: #333; margin: 0 0 15px 0; font-size: 20px;">Contact Information</h2>
                <div style="margin-bottom: 12px;">
                  <strong style="color: #667eea; display: inline-block; width: 60px;">Name:</strong>
                  <span style="color: #333; font-size: 16px;">${name}</span>
                </div>
                <div style="margin-bottom: 12px;">
                  <strong style="color: #667eea; display: inline-block; width: 60px;">Email:</strong>
                  <a href="mailto:${email}" style="color: #667eea; text-decoration: none; font-size: 16px;">${email}</a>
                </div>
                <div>
                  <strong style="color: #667eea; display: inline-block; width: 60px;">IP:</strong>
                  <span style="color: #666; font-size: 14px;">${ip}</span>
                </div>
              </div>
              
              <!-- Subject -->
              <div style="margin-bottom: 25px;">
                <h3 style="color: #333; margin: 0 0 8px 0; font-size: 18px;">Subject</h3>
                <p style="background: #f8f9ff; padding: 15px; border-radius: 6px; margin: 0; font-size: 16px; color: #333;">${subject}</p>
              </div>
              
              <!-- Message -->
              <div style="margin-bottom: 30px;">
                <h3 style="color: #333; margin: 0 0 8px 0; font-size: 18px;">Message</h3>
                <div style="background: #f8f9ff; padding: 20px; border-radius: 6px; border-left: 4px solid #667eea;">
                  <p style="margin: 0; line-height: 1.6; color: #333; white-space: pre-wrap; font-size: 16px;">${message}</p>
                </div>
              </div>
              
              <!-- Action Button -->
              <div style="text-align: center; margin-top: 30px;">
                <a href="mailto:${email}?subject=Re: ${subject}" 
                   style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                          color: white; 
                          padding: 14px 30px; 
                          text-decoration: none; 
                          border-radius: 6px; 
                          display: inline-block;
                          font-weight: 600;
                          font-size: 16px;
                          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);">
                  Reply to ${name} ✉️
                </a>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background: #f8f9ff; padding: 20px; text-align: center; border-top: 1px solid #eee;">
              <p style="margin: 0; color: #666; font-size: 14px;">
                📅 Received: ${new Date().toLocaleString()} | 
                🌐 Portfolio Contact Form | 
                📧 Rate Limited: ${rateLimitResult.remaining} requests remaining
              </p>
            </div>
          </div>
        </div>
      `,
    };

    // Auto-reply to sender
    const autoReplyEmail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `✨ Thank you for reaching out, ${name}!`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2px; border-radius: 12px;">
          <div style="background: white; border-radius: 10px; overflow: hidden;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">Thanks for reaching out!</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">I'll get back to you soon</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 30px;">
              <h2 style="color: #333; margin: 0 0 20px 0; font-size: 22px;">Hi ${name}! 👋</h2>
              
              <p style="line-height: 1.6; color: #555; font-size: 16px; margin-bottom: 20px;">
                Thank you for contacting me through my portfolio! I've received your message and really appreciate you taking the time to reach out.
              </p>
              
              <!-- Message Summary -->
              <div style="background: #f8f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
                <h3 style="color: #667eea; margin: 0 0 15px 0; font-size: 18px;">Your Message Summary</h3>
                <div style="margin-bottom: 10px;">
                  <strong style="color: #333;">Subject:</strong> <span style="color: #555;">${subject}</span>
                </div>
                <div>
                  <strong style="color: #333;">Message:</strong>
                  <p style="margin: 8px 0 0 0; font-style: italic; color: #666; font-size: 15px;">
                    "${
                      message.length > 100
                        ? message.substring(0, 100) + "..."
                        : message
                    }"
                  </p>
                </div>
              </div>
              
              <p style="line-height: 1.6; color: #555; font-size: 16px; margin-bottom: 25px;">
                ⏰ <strong>Response Time:</strong> I typically respond within 24-48 hours during business days.
              </p>
              
              <p style="line-height: 1.6; color: #555; font-size: 16px; margin-bottom: 30px;">
                While you wait, feel free to check out my other work and connect with me on social media!
              </p>
              
              <!-- Social Links -->
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://github.com/vaibhava17" style="display: inline-block; margin: 0 10px; padding: 10px 20px; background: #333; color: white; text-decoration: none; border-radius: 6px; font-size: 14px;">
                  🐙 GitHub
                </a>
                <a href="https://linkedin.com/in/vaibhava17" style="display: inline-block; margin: 0 10px; padding: 10px 20px; background: #0077b5; color: white; text-decoration: none; border-radius: 6px; font-size: 14px;">
                  💼 LinkedIn
                </a>
                <a href="https://twitter.com/heyvybav" style="display: inline-block; margin: 0 10px; padding: 10px 20px; background: #1da1f2; color: white; text-decoration: none; border-radius: 6px; font-size: 14px;">
                  🐦 Twitter
                </a>
              </div>
              
              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #667eea; font-weight: 600; margin: 0; font-size: 16px;">Best regards,</p>
                <p style="color: #333; font-size: 20px; margin: 5px 0; font-weight: 700;">Vaibhav Agarwal</p>
                <p style="color: #666; margin: 0; font-size: 14px;">Software Development Engineer</p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background: #f8f9ff; padding: 20px; text-align: center; border-top: 1px solid #eee;">
              <p style="margin: 0; color: #666; font-size: 12px;">
                This is an automated response. Please do not reply to this email.<br>
                📧 Contact me directly at iamvaibhav.agarwal@gmail.com for urgent matters.
              </p>
            </div>
          </div>
        </div>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(notificationEmail),
      transporter.sendMail(autoReplyEmail),
    ]);

    return NextResponse.json({
      success: true,
      message:
        "Message sent successfully! You should receive a confirmation email shortly.",
      remaining: rateLimitResult.remaining,
    });
  } catch (error) {
    console.error("Contact API Error:", error);

    // Log detailed error for debugging
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to send message. Please try again later or contact me directly at iamvaibhav.agarwal@gmail.com",
      },
      { status: 500 }
    );
  }
}

// GET method for testing the API
export async function GET() {
  return NextResponse.json({
    message: "Contact API is working!",
    timestamp: new Date().toISOString(),
    status: "operational",
  });
}

// OPTIONS method for CORS preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
