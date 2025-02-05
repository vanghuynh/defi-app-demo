const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const {
  approvePendingVerification,
  getPendingVerificationCount,
} = require('./services/handleMeta.js');
const { checkAPIHealth } = require('./services/checkAPIHealth.js');
const { verify, check } = require('./services/KYCverify.js');

const bodyParser = require('body-parser');
const { connectDatabase } = require('./database/database');
const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('./services/products.js');

dotenv.config();
const app = express();

// connect to database
connectDatabase()
  .then(() => {
    console.log('connected');
  })
  .catch((error) => {
    console.error('Error connecting to database', error);
  });

// Middleware
app.use(bodyParser.json());

app.use(
  cors({
    credentials: true,
    sameSite: 'none',
    origin: process.env.FRONTEND_URL.split(',') ?? 'http://localhost:3000',
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get('/health', checkAPIHealth);
app.post('/kyc-verify', verify);
app.post('/kyc-check', check);

app.get('/api/products', getAllProducts);
app.post('/api/products', createProduct);
app.get('/api/products/:id', getProduct);
app.put('/api/products/:id', updateProduct);
app.delete('/api/products/:id', deleteProduct);

app.listen(process.env.PORT, () =>
  console.log(`Server is listening on port ${process.env.PORT}!`)
);
