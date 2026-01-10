//creating server
 const express = require('express');

 const cookieParser = require('cookie-parser');

 const cors = require('cors')

 const app = express();

 app.use(cors({
    origin: 'https://ai-campus-speak.vercel.app',
    credentials: true
   }))

 app.use(cookieParser());
   
 app.use(express.json());

 app.use(express.urlencoded({ extended: true }));

 const authRoute = require('./routes/auth.routes')

 const complaintRoute = require('./routes/complaints.routes')

 const aiRoute = require('./routes/ai.routes')

 app.use('/api/auth', authRoute);

 app.use('/api/stats',complaintRoute);

 app.use('/api/users',complaintRoute);

 app.use('/api/add',complaintRoute);

 app.use('/api/ai',aiRoute);

 app.get("/",(req,res)=>{
    res.send("hello world");
   })

module.exports = app;
