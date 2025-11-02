# Email Setup for Forgot Password Feature

## Gmail Setup (Recommended for Development)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Copy the 16-character password

3. **Update .env.local** with your credentials:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-16-character-app-password
   SMTP_FROM=your-email@gmail.com
   NEXTAUTH_URL=http://localhost:3000
   ```

## Other Email Providers

### Outlook/Hotmail
```
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
```

### Yahoo
```
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
```

### Custom SMTP
Replace the values with your email provider's SMTP settings.

## Testing

1. Start the development server: `npm run dev`
2. Go to http://localhost:3000/login
3. Click "Forgot password?"
4. Enter an email address
5. Check your email for the reset link

## Security Notes

- Reset tokens expire after 1 hour
- Tokens are single-use only
- In production, store tokens in a secure database
- Use environment variables for all sensitive data
- Consider rate limiting for password reset requests

## Production Deployment

For production, consider using:
- **SendGrid** - Reliable email delivery service
- **AWS SES** - Amazon's email service
- **Mailgun** - Developer-friendly email API
- **Postmark** - Transactional email service

Update the SMTP configuration accordingly for your chosen service.