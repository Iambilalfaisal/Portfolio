# EmailJS Setup Instructions

To enable the contact form to send emails to your Gmail account (bilalfaisal400@gmail.com), follow these steps:

## Step 1: Sign Up for EmailJS

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service (Gmail)

1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Select **Gmail** as your email service
4. Click **Connect Account** and authorize EmailJS to access your Gmail
5. Give your service a name (e.g., "Portfolio Contact Form")
6. **Copy the Service ID** - you'll need this later

## Step 3: Create Email Template

1. Go to **Email Templates** in the EmailJS dashboard
2. Click **Create New Template**
3. Use the following template settings:

   **Template Name:** Portfolio Contact Form
   
   **Subject:** New Contact Form Message from {{from_name}}
   
   **Content:**
   ```
   You have received a new message from your portfolio contact form.
   
   From: {{from_name}}
   Email: {{from_email}}
   
   Message:
   {{message}}
   
   ---
   This email was sent from your portfolio website.
   ```

4. **To Email:** bilalfaisal400@gmail.com
5. **From Name:** Portfolio Contact Form
6. **Reply To:** {{from_email}}
7. Click **Save**
8. **Copy the Template ID** - you'll need this later

## Step 4: Get Your Public Key

1. Go to **Account** → **General** in the EmailJS dashboard
2. Find **API Keys** section
3. **Copy your Public Key** - you'll need this later

## Step 5: Configure Environment Variables

1. Create a `.env` file in the root of your project (if it doesn't exist)
2. Add the following variables with your actual values:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

**Example:**
```env
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=abcdefghijklmnop
```

## Step 6: Restart Development Server

After adding the `.env` file:

1. Stop your development server (Ctrl+C)
2. Start it again:
   ```bash
   npm run dev
   ```

## Step 7: Test the Form

1. Navigate to the Contact section on your portfolio
2. Fill out the form with test data
3. Click "Send Message"
4. Check your Gmail inbox (bilalfaisal400@gmail.com) for the message

## Troubleshooting

### Form shows error message
- Verify all three environment variables are set correctly
- Check that the Service ID, Template ID, and Public Key are correct
- Make sure you've restarted the development server after adding `.env`

### Email not received
- Check your Gmail spam folder
- Verify the "To Email" in your EmailJS template is set to bilalfaisal400@gmail.com
- Check EmailJS dashboard for any error logs

### Free Tier Limits
- EmailJS free tier allows 200 emails per month
- For production use, consider upgrading if you expect more traffic

## Security Note

- Never commit your `.env` file to Git (it's already in `.gitignore`)
- The Public Key is safe to expose in frontend code (it's designed for client-side use)
- Service ID and Template ID are also safe for frontend use

## Production Deployment

When deploying to Vercel, Netlify, or other platforms:

1. Add the same environment variables in your hosting platform's dashboard
2. For Vercel: Project Settings → Environment Variables
3. For Netlify: Site Settings → Build & Deploy → Environment Variables
4. Redeploy your site after adding the variables

---

**Need Help?** Visit [EmailJS Documentation](https://www.emailjs.com/docs/) for more details.

