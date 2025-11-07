# Google Gemini AI Setup for Resume Analyzer

## Why Gemini?
- **100% FREE** - No credit card required
- **Powerful AI** - Advanced language understanding
- **Easy to use** - Simple API integration
- **Generous limits** - 60 requests per minute (free tier)

## Setup Instructions

### Step 1: Get Your Free API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Get API Key"** or **"Create API Key"**
4. Click **"Create API key in new project"**
5. Copy your API key

### Step 2: Add API Key to Your Project

1. Open `.env.local` file in your project root
2. Replace `your-gemini-api-key-here` with your actual API key:
   ```
   GEMINI_API_KEY=AIzaSyC...your-actual-key-here
   ```
3. Save the file
4. Restart your development server

### Step 3: Test the Resume Analyzer

1. Go to http://localhost:3000
2. Click on the **"Resume Analyzer"** feature card
3. Upload a PDF resume
4. Click **"Analyze Resume"**
5. Get instant AI-powered feedback!

## Features

The Resume Analyzer provides:
- ✅ **Overall Score** (0-100)
- ✅ **Strengths** - What's working well
- ✅ **Weaknesses** - Areas to improve
- ✅ **Actionable Suggestions** - Specific improvements
- ✅ **Keywords** - Skills detected in your resume

## API Limits (Free Tier)

- **60 requests per minute**
- **1,500 requests per day**
- **1 million tokens per month**

This is more than enough for personal use and testing!

## Troubleshooting

### "AI service not configured" error
- Make sure you added the API key to `.env.local`
- Restart your development server after adding the key

### "Failed to parse PDF" error
- Ensure your resume is a valid PDF file
- Try converting your resume to PDF again
- Some encrypted PDFs may not work

### Rate limit errors
- Wait a minute and try again
- Free tier has generous limits but can be exceeded with heavy use

## Alternative Free AI APIs

If you prefer other options:

1. **OpenAI GPT-3.5** - Free tier available
2. **Anthropic Claude** - Free tier available
3. **Cohere** - Free tier available

But Gemini is recommended for its ease of use and generous free tier!

## Security Note

- Never commit your API key to Git
- Keep `.env.local` in your `.gitignore`
- Don't share your API key publicly