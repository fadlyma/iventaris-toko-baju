const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create product
router.post('/', async (req, res) => {
  try {
    const { code, name, price, stock_quantity, category } = req.body;
    let status = 'available';
    if (stock_quantity === 0) status = 'out';
    else if (stock_quantity < 5) status = 'low';

    const product = await prisma.product.create({
      data: { code, name, price, stock_quantity, category, status }
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get product by code
router.get('/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const product = await prisma.product.findUnique({
      where: { code }
    });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update product
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, stock_quantity, category, code } = req.body;
    
    let status = 'available';
    if (stock_quantity === 0) status = 'out';
    else if (stock_quantity < 5) status = 'low';

    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { name, price, stock_quantity, category, code, status }
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
