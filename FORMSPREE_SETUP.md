# Formspree Integration Setup Guide

## 🎯 Overview

Your contact and estimate forms are now configured to use Formspree, a free form backend service. Follow these steps to complete the setup.

---

## 📋 Step-by-Step Setup

### **Step 1: Create Formspree Account**

1. Go to **https://formspree.io**
2. Click **"Sign Up"** (top right)
3. Sign up with your business email: `theotorku1983@gmail.com` (or preferred email)
4. Verify your email address

---

### **Step 2: Create Your Forms**

#### **Form 1: Contact Form**

1. In your Formspree dashboard, click **"+ New Form"**
2. **Form Name:** `Contact Form - Tier 1 Home Services`
3. **Email:** Enter the email where you want to receive contact submissions
4. Click **"Create Form"**
5. **Copy the Form ID** (looks like `xyzabc123` or similar)
6. Save this ID - you'll need it in Step 3

#### **Form 2: Estimate Request Form**

1. Click **"+ New Form"** again
2. **Form Name:** `Estimate Request - Tier 1 Home Services`
3. **Email:** Enter the email where you want to receive estimate requests
4. Click **"Create Form"**
5. **Copy the Form ID**
6. Save this ID - you'll need it in Step 3

---

### **Step 3: Update Your Website Files**

You need to replace the placeholder Form IDs in your HTML files with your actual Formspree Form IDs.

#### **File 1: `pages/contact.html`**

Find this line (around line 315):
```html
<form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

Replace `YOUR_FORM_ID` with your **Contact Form ID** from Step 2:
```html
<form id="contactForm" action="https://formspree.io/f/xyzabc123" method="POST">
```

#### **File 2: `pages/estimate.html`**

Find this line (around line 44):
```html
<form id="estimateForm" action="https://formspree.io/f/YOUR_ESTIMATE_FORM_ID" method="POST">
```

Replace `YOUR_ESTIMATE_FORM_ID` with your **Estimate Form ID** from Step 2:
```html
<form id="estimateForm" action="https://formspree.io/f/abc123xyz" method="POST">
```

---

### **Step 4: Update Redirect URLs (Optional)**

Once you know your final Vercel deployment URL, update the redirect URLs in both forms.

#### **In `pages/contact.html`** (around line 317):
```html
<input type="hidden" name="_next" value="https://YOUR-VERCEL-URL.vercel.app/pages/contact.html?success=true" />
```

#### **In `pages/estimate.html`** (around line 46):
```html
<input type="hidden" name="_next" value="https://YOUR-VERCEL-URL.vercel.app/pages/estimate.html?success=true" />
```

Replace `YOUR-VERCEL-URL` with your actual Vercel deployment URL.

---

### **Step 5: Commit and Deploy**

After updating the Form IDs:

```bash
git add pages/contact.html pages/estimate.html js/formspree-handler.js
git commit -m "feat: Integrate Formspree for contact and estimate forms"
git push origin main
```

Vercel will automatically redeploy with the working forms!

---

## ✨ Features Included

### **What's Already Configured:**

✅ **Spam Protection** - Honeypot field (`_gotcha`) to catch bots  
✅ **Custom Email Subject** - Clear subject lines for each form  
✅ **Success Messages** - Beautiful success/error feedback  
✅ **Loading States** - Button shows spinner while submitting  
✅ **Form Reset** - Form clears after successful submission  
✅ **Error Handling** - Network errors handled gracefully  
✅ **Redirect After Submit** - Returns to form with success message  

---

## 🎨 How It Works

### **User Experience:**

1. User fills out the form
2. Clicks "Send Message" or "Submit Request"
3. Button changes to "Sending..." with spinner
4. Form submits to Formspree
5. Success message appears (green box)
6. Form clears automatically
7. You receive email notification

### **Email Notifications:**

You'll receive emails with:
- **Subject:** "New Contact Form Submission - Tier 1 Home Services"
- **From:** Formspree (on behalf of the user)
- **Reply-To:** User's email address (so you can reply directly)
- **Body:** All form fields (name, email, phone, service, message)

---

## 📊 Formspree Free Tier Limits

- ✅ **50 submissions per month** per form
- ✅ **Unlimited forms**
- ✅ **Email notifications**
- ✅ **Spam filtering**
- ✅ **File uploads** (if you add them later)

If you exceed 50 submissions/month, you can upgrade to a paid plan or use multiple forms.

---

## 🔧 Testing Your Forms

### **Before Going Live:**

1. Deploy to Vercel
2. Visit your contact page
3. Fill out the form with test data
4. Submit the form
5. Check for success message
6. Check your email for the submission

---

## 🆘 Troubleshooting

### **Form doesn't submit:**
- Check that you replaced `YOUR_FORM_ID` with actual Form ID
- Check browser console for errors (F12)
- Verify Formspree form is active in dashboard

### **No email received:**
- Check spam folder
- Verify email address in Formspree dashboard
- Check Formspree dashboard for submission logs

### **Success message doesn't show:**
- Check that `formspree-handler.js` is loaded
- Check browser console for JavaScript errors

---

## 📞 Need Help?

If you encounter any issues:
1. Check the Formspree dashboard for submission logs
2. Check browser console (F12) for errors
3. Let me know and I'll help troubleshoot!

---

**Once you have your Form IDs, share them with me and I'll update the files for you!** 🚀

