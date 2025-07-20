const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.post('/add', auth, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({
      userId,
      items: [{ productId, quantity }]
    });
  } else {
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
  }

  await cart.save();
  res.json({ msg: ' Product added to cart' });
});


router.get('/', auth, async (req, res) => {
  const userId = req.user.id;
  const cart = await Cart.findOne({ userId }).populate('items.productId', 'name price');
  if (!cart) return res.json({ items: [] });
  res.json(cart);
});

router.post('/update', auth, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  const cart = await Cart.findOne({ userId });
  if (!cart) return res.status(404).json({ msg: 'Cart not found' });

  const item = cart.items.find(item => item.productId.toString() === productId);
  if (!item) return res.status(404).json({ msg: 'Item not found in cart' });

  item.quantity = quantity;
  await cart.save();

  res.json({ msg: 'Quantity updated' });
});


router.post('/remove', auth, async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  const cart = await Cart.findOne({ userId });
  if (!cart) return res.status(404).json({ msg: 'Cart not found' });

  cart.items = cart.items.filter(item => item.productId.toString() !== productId);
  await cart.save();

  res.json({ msg: ' Item removed from cart' });
});


router.post('/order', auth, async (req, res) => {
  const userId = req.user.id;
  const { address, phone } = req.body;

  const cart = await Cart.findOne({ userId }).populate('items.productId');
  if (!cart || cart.items.length === 0) return res.status(400).json({ msg: 'Cart is empty' });

  const orderItems = cart.items.map(item => ({
    product: item.productId._id,
    name: item.productId.name,
    price: item.productId.price,
    quantity: item.quantity
  }));

  const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const order = new Order({
    userId,
    items: orderItems,
    address,
    phone,
    total
  });

  await order.save();
  await Cart.deleteOne({ userId }); 

  res.json({ msg: ' Order placed successfully', orderId: order._id });
});

module.exports = router;
