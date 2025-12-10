const Brevo = require('@getbrevo/brevo');

module.exports = async function sendEmail(to, subject, text) {
    try {
        const apiInstance = new Brevo.TransactionalEmailsApi();

        // Your Brevo API key
        apiInstance.authentications['apiKey'].apiKey = process.env.BREVO_API_KEY;

        // Your verified sender email from Brevo
        const email = {
            sender: { 
                email: "akankshamemane61@gmail.com",  // <-- YOU PUT YOUR EMAIL HERE
                name: "Auth System"
            },
            to: [{ email: to }],  // <-- USER'S EMAIL WHO WILL RECEIVE RESET LINK
            subject: subject,
            textContent: text,
        };

        await apiInstance.sendTransacEmail(email);
        console.log("Reset email sent to:", to);
        return true;

    } catch (error) {
        console.error("Email error:", error);
        return false;
    }
};
