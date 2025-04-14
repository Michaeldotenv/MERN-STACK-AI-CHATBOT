import { VERIFICATION_EMAIL_TEMPLATE , WELCOME_EMAIL_TEMPLATE, RESET_PASSWORD_TEMPLATE, PASSWORD_SUCCESS_TEMPLATE} from "../services/emailtemplate.js";
import { transporter } from "../services/mailtrap.js";


//Function to verify email
export const sendVerificatoinEmail = async (toEmail, verificationToken) => {
  try {
    const mailOptions = {
      from: '"Micheal" <mailtrap@demomailtrap.co>', // Sender address
      to: toEmail, // Recipient
      subject: `Confirm Your mail`, // Subject line
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationcode}", verificationToken),// HTML body
      category : "email verification"
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Verification email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
};
//welcome email
export const sendWelcomeEmail = async (toEmail, name)=>{
    try {
        const mailOptions = {
          from: '"Micheal" <mailtrap@demomailtrap.co>', // Sender address
          to: toEmail, // Recipient
          subject: `Welcome`, // Subject line
          html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name),// HTML body
          category : "Welcome"
        };
    
        const info = await transporter.sendMail(mailOptions);
        console.log('Welcome email sent:', info.messageId);
        return info;
      } catch (error) {
        console.error('Error sending welcome email:', error);
        throw error;
      }
}

export const sendSignOutEmail = async (toEmail, name)=>{
    try {
        const mailOptions = {
          from: '"Micheal" <mailtrap@demomailtrap.co>', // Sender address
          to: toEmail, // Recipient
          subject: `You signed Out`, // Subject line
          html: SIGNOUT_EMAIL_TEMPLATE.replace("{name}", name),// HTML body
          category : "Sign Out"
        };
    
        const info = await transporter.sendMail(mailOptions);
        console.log('Signout email sent:', info.messageId);
        return info;
      } catch (error) {
        console.error('Error sending sign out email:', error);
        throw error;
      }
}

export const sendPasswordResetEmail = async (toEmail, Reseturl)=>{
    try {
        const mailOptions = {
          from: '"Micheal" <mailtrap@demomailtrap.co>', // Sender address
          to: toEmail, // Recipient
          subject: `Reset your password`, // Subject line
          html: RESET_PASSWORD_TEMPLATE.replace("{{reset_link}}", Reseturl),// HTML body
          category : "Reset Paswword"
        };
    
        const info = await transporter.sendMail(mailOptions);
        console.log('passwordreset email sent:', info.messageId);
        return info;
      } catch (error) {
        console.error('Error sending passwordreset email:', error);
        throw error;
      }
}

export const sendResetPasswordSuccess = async (toEmail, name)=>{
    try {
        const mailOptions = {
          from: '"Micheal" <mailtrap@demomailtrap.co>', // Sender address
          to: toEmail, // Recipient
          subject: `password reset successful!`, // Subject line
          html: PASSWORD_SUCCESS_TEMPLATE.replace("{{name}}", name),// HTML body
          category : "Paswword reset success"
        };
    
        const info = await transporter.sendMail(mailOptions);
        console.log('password reset success email sent:', info.messageId);
        return info;
      } catch (error) {
        console.error('Error sending passwordreset email:', error);
        throw error;
      }
}