const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


// GET all tags.
router.get('/', (req, res) => {
  Tag.findAll(
    {
      model: Tag,
      attributes: ['id', 'tag_name'],
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock'],
      }
    }
  )
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: 'No tags found' });
        return;
      }
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
})


// GET a single tag by id.
router.get('/:id', (req, res) => {
  Tag.findOne(
    {
      model: Tag,
      attributes: ['id', 'tag_name'],
      where: {
        id: req.params.id
      },
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock'],
      }
    })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: `No tag found with id: ${req.params.id}` });
        return;
      }
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// POST a new tag.
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((data) => res.json(data))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// PUT (update) a single tag by id.
router.put('/:id', (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then(data => {
      if (!data) {
        res.status(404).json({ message: `No tag found with id ${req.params.id}` });
        return;
      }
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});


// DELETE a single tag.
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(data => {
      if (!data) {
        res.status(404).json({ message: `No tag found with id ${req.params.id}` });
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
