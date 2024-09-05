// app.js
import express from 'express';
import cors from 'cors';

import connectDB from './src/db/index.js';
import homeRouter from './src/api/homeAPI.js';

const app = express();
app.use(cors());

app.use(cors({ origin: '*' }));

// Connect the Database
connectDB()

// routers for home page 
app.use('/',homeRouter)


// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
