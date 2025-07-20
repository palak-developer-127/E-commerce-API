const express = require('express');
const Product = require('../models/Product');
const { auth, admin } = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const { search = '', page = 1, limit = 5 } = req.query;

    const query = {
      name: { $regex: search, $options: 'i' } 
    };

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    res.json({
      products,
      total,
      page: parseInt(page),
      limit: parseInt(limit)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


router.post('/', auth, admin, async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});


router.put('/:id', auth, admin, async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(product);
});


router.delete('/:id', auth, admin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

module.exports = router;
