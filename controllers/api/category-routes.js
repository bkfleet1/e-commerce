const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Category, Product } = require('../../models');
const { rawAttributes } = require('../../models/Product');
// const { findAll } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll(
    {
      model: Category,
      attributes: ['id', 'category_name'],
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock']
      }
    })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: 'No categories found' });
        return;
      }
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
})

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne(
    { id: req.params.id }
  )
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: 'No categories found' });
        return;
      }
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
