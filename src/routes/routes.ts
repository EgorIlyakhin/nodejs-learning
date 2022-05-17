import { Router } from 'express';
import { Model } from '../models';
import { Cart } from '../models/cart';

const router = Router();

export const addRouteGet = router.get('/add-one', (req, res) => {
  res.render('add-one', {
    title: 'add one',
    'add-one': true,
  });
});

export const addRoutePost = router.post('/add-one', async (req, res) => {
  const { name, photo, sex, type, price } = req.body;
  const model = new Model(name, photo, sex, type, price);

  await model.save();

  res.redirect('/view-all');
});

export const homeRoute = router.get('/', (req, res) => {
  res.render('home', {
    title: 'home',
    home: true,
  });
});

export const allRoute = router.get('/view-all', async (req, res) => {
  const model = await Model.getAll();

  res.render('view-all', {
    title: 'view all',
    'view-all': true,
    model,
  });
});

export const detailedGet = router.get('/detailed/:id', async (req, res) => {
  const model = await Model.getById(req.params.id);

  res.render('detailed', {
    title: 'detailed',
    detailed: true,
    model,
  });
});

export const editGet = router.get('/detailed/:id/edit', async (req, res) => {
  if (!req.query.allow) {
    res.redirect('/');
    return;
  }

  const model = await Model.getById(req.params.id);

  res.render('edit', {
    title: `edit ${model?.name}`,
    model,
  });
});

export const editPost = router.post('/edit', async (req, res) => {
  await Model.update(req.body);
  res.redirect('/');
});

export const cartGet = router.get('/cart', async (req, res) => {
  const cart = await Cart.fetch();

  res.render('cart', {
    title: 'Cart',
    cart: true,
    list: cart.list,
    price: cart.price,
  });
});

export const cartPost = router.post('/cart/add', async (req, res) => {
  const model = await Model.getById(req.body.id);

  if (model) await Cart.add(model);

  res.redirect('/cart');
});

export const cartDelete = router.delete('/cart/remove/:id', async (req, res) => {
  const cart = await Cart.remove(req.params.id);
  res.status(200).json(cart);
});
