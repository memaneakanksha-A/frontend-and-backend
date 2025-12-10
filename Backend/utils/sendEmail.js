const Brevo = require('@getbrevo/brevo');

module.exports = async function sendEmail(to, subject, html) {
  try {
    const apiInstance = new Brevo.TransactionalEmailsApi();
    apiInstance.authentications['apiKey'].apiKey = process.env.BREVO_API_KEY;

    const email = {
      sender: { email: "akankshamememane61@gmail.com", name: "Auth System" },
      to: [{ email: to }],
      subject,
      htmlContent: html, // <-- must be htmlContent
    };

    await apiInstance.sendTransacEmail(email);
    console.log("Reset email sent to:", to);
    return true;

  } catch (error) {
    console.error("Email error:", error);
    return false;
  }
};
