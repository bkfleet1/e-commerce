const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Category, Product } = require('../../models');


// GET all categories.
router.get('/', (req, res) => {
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


// GET a single category by id.
router.get('/:id', (req, res) => {
  Category.findOne(
    {
      model: Category,
      attributes: ['id', 'category_name'],
      where: {
        id: req.params.id
      },
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock']
      }
    })

    .then((data) => {
      if (!data) {
        res.status(404).json({ message: `No category found with id ${req.params.id}` });
        return;
      }
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// POST a new category.
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name,
  })
    .then((data) => res.json(data))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// PUT (update) a category.
router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then(data => {
      if (!data) {
        res.status(404).json({ message: `No category found with id ${req.params.id}` });
        return;
      }
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
})


// DELETE a category by id.
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(data => {
      if (!data) {
        res.status(404).json({ message: `No category found with id ${req.params.id}` });
        return;
      }
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
