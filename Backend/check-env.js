require('dotenv').config();
console.log('BREVO_API_KEY:', process.env.BREVO_API_KEY ? 'Set' : 'Not Set');
console.log('FRONTEND_URL:', process.env.FRONTEND_URL ? 'Set' : 'Not Set');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'Not Set');
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Set' : 'Not Set');
