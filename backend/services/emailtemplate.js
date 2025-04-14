export const VERIFICATION_EMAIL_TEMPLATE = `
@@ -0,0 +1,135 @@
 <!DOCTYPE html>
 <html lang="en">
 <head>
   <meta charset="UTF-8" />
   <title></title>
   <style>
     body {
       margin: 0;
       padding: 0;
       font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
       color: #333;
       background-color: #fff;
     }
 
     .container {
       margin: 0 auto;
       width: 100%;
       max-width: 600px;
       padding: 0 0px;
       padding-bottom: 10px;
       border-radius: 5px;
       line-height: 1.8;
     }
 
     .header {
       border-bottom: 1px solid #eee;
     }
 
     .header a {
       font-size: 1.4em;
       color: #000;
       text-decoration: none;
       font-weight: 600;
     }
 
     .content {
       min-width: 700px;
       overflow: auto;
       line-height: 2;
     }
 
     .otp {
       background: linear-gradient(to right, #00bc69 0, #00bc88 50%, #00bca8 100%);
       margin: 0 auto;
       width: max-content;
       padding: 0 10px;
       color: #fff;
       border-radius: 4px;
     }
 
     .footer {
       color: #aaa;
       font-size: 0.8em;
       line-height: 1;
       font-weight: 300;
     }
 
     .email-info {
       color: #666666;
       font-weight: 400;
       font-size: 13px;
       line-height: 18px;
       padding-bottom: 6px;
     }
 
     .email-info a {
       text-decoration: none;
       color: #00bc69;
     }
   </style>
 </head>
 
 <body>
   <!--Subject: Login Verification Required for Your [App Name] Account-->
   <div class="container">
     <div class="header">
       <a>Prove Your [App Name] Identity</a>
     </div>
     <br />
     <strong>Dear [Recipient Name],</strong>
     <p>
       We have received a login request for your [App Name] account. For
       security purposes, please verify your identity by providing the
       following One-Time Password (OTP).
       <br />
       <b>Your One-Time Password (OTP) verification code is:</b>
     </p>
     <h2 class="otp">{verificationcode}</h2>
     <p style="font-size: 0.9em">
       <strong>One-Time Password (OTP) is valid for 3 minutes.</strong>
       <br />
       <br />
       If you did not initiate this login request, please disregard this
       message. Please ensure the confidentiality of your OTP and do not share
       it with anyone.<br />
       <strong>Do not forward or give this code to anyone.</strong>
       <br />
       <br />
       <strong>Thank you for using [App Name].</strong>
       <br />
       <br />
       Best regards,
       <br />
       <strong>[Company Name]</strong>
     </p>
 
     <hr style="border: none; border-top: 0.5px solid #131111" />
     <div class="footer">
       <p>This email can't receive replies.</p>
       <p>
         For more information about [App Name] and your account, visit
         <strong>[Name]</strong>
       </p>
     </div>
   </div>
   <div style="text-align: center">
     <div class="email-info">
       <span>
         This email was sent to
         <a href="mailto:{Email Adress}">{Email Adress}</a>
       </span>
     </div>
     <div class="email-info">
       <a href="/">[Company Name]</a> | [Address]
       | [Address] - [Zip Code/Pin Code], [Country Name]
     </div>
     <div class="email-info">
       &copy; 2023 [Company Name]. All rights
       reserved.
     </div>
   </div>
 </body>
 <!--    This template is made Redwan one from Ocoxe. -->
 <!-- https://www.ocoxe.com -->
 </html>`

 export const WELCOME_EMAIL_TEMPLATE = `
 <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Our Platform!</title>
</head>
<body style="font-family: 'Arial', sans-serif; line-height: 1.6; margin: 0; padding: 0; color: #333; background-color: #f7f7f7;">
    <!-- Email Container -->
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background: white; margin: 20px auto; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <!-- Header -->
        <tr>
            <td align="center" style="padding: 30px 0; background: #4a6ee0; color: white;">
                <h1 style="margin: 0; font-size: 28px;">Welcome to <span style="color: #ffd700;">OurApp</span>!</h1>
            </td>
        </tr>
        
        <!-- Content -->
        <tr>
            <td style="padding: 30px;">
                <p>Hello <strong>{{name}}</strong>,</p>
                <p>We're thrilled to have you join our community. Your account is now active!</p>
                
                <!-- Call-to-Action Button -->
                <table align="center" style="margin: 25px 0;">
                    <tr>
                        <td align="center" bgcolor="#4a6ee0" style="border-radius: 4px;">
                            <a href="{{dashboardLink}}" target="_blank" style="padding: 12px 24px; color: white; text-decoration: none; display: inline-block; font-weight: bold;">Go to Dashboard</a>
                        </td>
                    </tr>
                </table>
                
                <p>Here's what you can do next:</p>
                <ul style="padding-left: 20px;">
                    <li>Complete your profile</li>
                    <li>Explore our features</li>
                    <li>Invite friends (Get 10% bonus!)</li>
                </ul>
            </td>
        </tr>
        
        <!-- Footer -->
        <tr>
            <td style="padding: 20px; text-align: center; background: #f4f4f4; font-size: 12px;">
                <p style="margin: 0;">© 2023 OurApp. All rights reserved.</p>
                <p style="margin: 10px 0 0;">
                    <a href="{{privacyLink}}" style="color: #4a6ee0; text-decoration: none;">Privacy Policy</a> | 
                    <a href="{{contactLink}}" style="color: #4a6ee0; text-decoration: none;">Contact Us</a>
                </p>
            </td>
        </tr>
    </table>
</body>
</html>`

export const SIGNOUT_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Signed Out Successfully</title>
    <style>
        /* Base styles */
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f5f7fa;
            margin: 0;
            padding: 0;
            color: #333;
            line-height: 1.6;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            padding: 30px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .icon {
            font-size: 60px;
            color: #4a6ee0;
            margin-bottom: 20px;
        }
        h1 {
            color: #2c3e50;
            margin: 0 0 15px;
        }
        p {
            margin: 0 0 25px;
            font-size: 16px;
        }
        .btn {
            display: inline-block;
            padding: 12px 24px;
            background: #4a6ee0;
            color: white !important;
            text-decoration: none;
            border-radius: 4px;
            font-weight: 600;
            transition: background 0.3s;
        }
        .btn:hover {
            background: #3a5bc7;
        }
        .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #7f8c8d;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Sign-out icon (using Unicode for simplicity) -->
        <div class="icon">👋</div>
        
        <h1>You've Signed Out</h1>
        <p>Your session has been securely terminated. To continue, please sign back in.</p>
        
        <!-- Call-to-Action Button -->
        <a href="/login" class="btn">Return to Login</a>
        
        <!-- Additional Help -->
        <div class="footer">
            <p>Didn't sign out yourself? <a href="/security" style="color: #4a6ee0;">Secure your account</a>.</p>
            <p>© 2023 YourApp. All rights reserved.</p>
        </div>
    </div>
</body>
</html>

`

export const RESET_PASSWORD_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            border-bottom: 1px solid #eeeeee;
            padding-bottom: 15px;
            margin-bottom: 20px;
        }
        .content {
            padding: 15px 0;
        }
        .button {
            display: inline-block;
            background-color: #1a73e8;
            color: white !important;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 4px;
            font-weight: bold;
            margin: 15px 0;
        }
        .footer {
            margin-top: 30px;
            padding-top: 15px;
            border-top: 1px solid #eeeeee;
            font-size: 12px;
            color: #777777;
        }
        .error {
            color: #d32f2f;
            font-weight: bold;
        }
        .note {
            font-size: 14px;
            color: #555555;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h2>Password Reset</h2>
    </div>
    
    <div class="content">
        <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
        <p>To reset your password, click the button below:</p>
        
        <a href="{{reset_link}}" class="button">Reset Password</a>
        
        <p class="note">This link will expire in 1 hour for security reasons.</p>
        
        <div class="error">
            <p>▲ Please note: There is no advanced message, please do writing it then read.</p>
        </div>
    </div>
    
    <div class="footer">
        <p>Your App Team</p>
        <p>Need help? Contact our support team</p>
    </div>
</body>
</html>`

export const PASSWORD_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Successful</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f7f7f7;
        }
        .email-container {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        .header {
            border-bottom: 1px solid #eeeeee;
            padding-bottom: 15px;
            margin-bottom: 20px;
        }
        .header h2 {
            color: #4a6ee0;
            margin: 0;
        }
        .content {
            padding: 15px 0;
        }
        .success-icon {
            color: #4CAF50;
            font-size: 24px;
            margin-right: 10px;
            vertical-align: middle;
        }
        .footer {
            margin-top: 30px;
            padding-top: 15px;
            border-top: 1px solid #eeeeee;
            font-size: 12px;
            color: #777777;
        }
        .button {
            display: inline-block;
            background-color: #4a6ee0;
            color: white !important;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 4px;
            font-weight: bold;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h2>Password Reset Successful</h2>
        </div>
        
        <div class="content">
            <p>Hello <strong>{{name}}</strong>,</p>
            
            <p><span class="success-icon">✓</span> Your password has been successfully updated.</p>
            
            <p>If you didn't make this change, please secure your account immediately by:</p>
            <ol>
                <li>Resetting your password again</li>
                <li>Enabling two-factor authentication</li>
                <li>Checking your account activity</li>
            </ol>
            
            <a href="{{login_link}}" class="button">Login to Your Account</a>
        </div>
        
        <div class="footer">
            <p>Your security is important to us. This email was sent to {{email}}.</p>
            <p>© 2023 YourApp Team. All rights reserved.</p>
            <p><a href="{{contact_link}}">Contact Support</a> | <a href="{{security_link}}">Security Tips</a></p>
        </div>
    </div>
</body>
</html>`