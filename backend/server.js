const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Routes
const productsRoute = require('./routes/products');
const salesRoute = require('./routes/sales');

app.use('/products', productsRoute);
app.use('/sales', salesRoute);

app.get('/', (req, res) => {
  res.send('API Ready');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
