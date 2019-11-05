const express = require('express');
const router = express.Router();
const db = require('../db')
const { User, Product, Order, LineItem } = db.models;



router.use(express.json())

//GET Route
router.get('/api/users', (req, res, next)=>{
  User.findAll({
    include: [{model: Order, include: [LineItem]}]})
    .then(user => res.send(user))
    .catch(next)
})
router.get('/api/products', (req, res, next)=> {
  Product.findAll()
    .then(product => res.send(product))
    .catch(next)
})

// Create a User
router.post('/api/users', (req, res, next)=>{
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })
    .then(user => res.send(user))
    .catch(next)
})
// Update a User
router.put('/api/users/:id', async(req, res, next)=> {
  const user = await User.findByPk(req.session.user.id);

  user.update({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
    .then( updatedUser => res.status(200).send(updatedUser))
    .catch(next);
})
// Delete a User
router.delete('/api/users/:id', (req, res, next)=> {
  User.findByPk(req.params.id)
    .then( user => user.destroy())
    .then( ()=> res.sendStatus(204))
    .catch(next);
})

// Login
router.post('/api/login', (req, res ,next) => {
  User.findOne({ where: {
    email: req.body.email,
    password: req.body.password
  }})
  .then( user => {
    if(!user) {
      throw({ status: 401 })
    }
    req.session.user = user;
    return res.send(user);
  })
  .catch(err => next(err));
})

router.get('/api/session', (req, res, next) => {
  const user = req.session.user
  if(user) {
    return res.send(user)
  }
  next({ status: 401 })
})

router.delete('/api/logout', (req, res, next) => {
  req.session.destroy()
  res.sendStatus(204);
})

module.exports = router;
