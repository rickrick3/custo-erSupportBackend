const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import CORS

require('./config/db');
require('dotenv').config();



const ticketRoutes = require('./routes/ticketRoutes')
const adminRegisterRoutes = require('./routes/adminRegisterRoutes')
const adminLoginRoutes = require('./routes/adminLoginRoutes')
const agentRoutes = require('./routes/agentRoutes')
const chatbotRoutes =require('./routes/chabotRoutes')
const faqRoutes = require('./routes/FAQroutes')
//const logoutRoutes = require('./routes/logoutRoutes')
const teamRoutes = require('./routes/teamRoutes')
const userLoginRoutes = require('./routes/userLoginRoutes')
const userRegisterRoutes = require('./routes/userRegisterRoutes')

const app = express();

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)

app.use(bodyParser.json());


app.use('/api/ticket', ticketRoutes)
app.use('/api/admin-register', adminRegisterRoutes)
app.use('/api/admin-login', adminLoginRoutes)
app.use('/api/agent', agentRoutes)
app.use('/api/chatbot/', chatbotRoutes)
 app.use ('/api/faq', faqRoutes)
//app.use('/api/logout', logoutRoutes)
app.use('/api/team', teamRoutes)
app.use('/api/user-login', userLoginRoutes)
app.use('/api/user-register', userRegisterRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(' http://localhost:3000/ ');
});
