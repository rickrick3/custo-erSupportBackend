const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // SMTP server host (e.g., smtp.gmail.com)
    port: process.env.SMTP_PORT || 587, // Use 465 for SSL, 587 for TLS
    secure: process.env.SMTP_PORT == 465, // true for 465, false for 587
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false, // Optional for local testing
    },
});

/**
 * Send a notification email.
 *
 * @param {string} to - Recipient email address.
 * @param {string} username - The name of the user to greet.
 * @param {string} info - Additional information to include in the message.
 */
const sendNotification = async (to, username, info) => {
    // Create a personalized HTML message
    const html = `
        <p>Hey, <strong>${to}</strong>!</p>
        <p>This email was sent from customersupport@gmail.com.</p>
        <p>${info}</p>
        <p>Thanks,<br/>Customer Support System</p>
    `;

    // You can also customize the subject as needed
    const subject = `Notification for ${username}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html,
    };

    try {
        console.log('Sending email with the following details:', { username, info });
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

module.exports = { sendNotification };
