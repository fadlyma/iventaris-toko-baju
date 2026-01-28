const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all sales
router.get('/', async (req, res) => {
  try {
    const sales = await prisma.sale.findMany({
      include: { product: true },
      orderBy: { created_at: 'desc' }
    });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create sale
router.post('/', async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    
    // Check stock first
    const product = await prisma.product.findUnique({ where: { id: product_id } });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    if (product.stock_quantity < quantity) return res.status(400).json({ error: 'Insufficient stock' });

    const total_price = product.price * quantity;

    // Transaction to update stock and create sale
    const [updatedProduct, newSale] = await prisma.$transaction([
      prisma.product.update({
        where: { id: product_id },
        data: { 
          stock_quantity: { decrement: quantity },
          status: (product.stock_quantity - quantity) === 0 ? 'out' : (product.stock_quantity - quantity) < 5 ? 'low' : 'available'
        }
      }),
      prisma.sale.create({
        data: {
          product_id: product_id,
          quantity,
          total_price
        }
      })
    ]);

    res.json({ sale: newSale, remaining_stock: updatedProduct.stock_quantity });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
