const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include:[
      {
        model: Product,
        attributes:["id", "product_name", "stock", "price", "category_id"]
      }
    ]
  }).then(categoriesData => {
    if (!categoriesData) {
      res.status(404).json({message: "No categories have been found."});
      return;
    }
    res.json(categoriesData);
  }).catch(err => {
    console.log(err)
    res.status(500).json(err);
  });
// find all categories
// be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  Category.findOne({
    include:[
      {
        model: Product,
        attributes:["id", "product_name", "stock", "price", "category_id"]
      }
    ],
    where: {
      id: req.params.id
    } 
  }).then(categoriesData => {
    if (!categoriesData) {
      res.status(404).json({message:"Could not find a category with that id."});
      return;
    }
    res.json(categoriesData);
  }).catch(err => {
    console.log(err)
    res.status(500).json(err);
  });
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  }).then(categoriesData => res.json(categoriesData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  // create a new category
});

router.put('/:id', (req, res) => {
  Category.update({
    category_name:req.body.category_name
  },
  {
    where: {
      id: req.params.id
    }
  }).then(categoriesData => {
    if (!categoriesData) {
      res.status(404).json({message:"Could not find a category with that id."});
      return;
    }
    res.json(categoriesData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(categoriesData => {
    if (!categoriesData) {
      res.status(404).json({message:"Could not find a category with that id."})
      return;
    }
    res.json(categoriesData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  // delete a category by its `id` value
});

module.exports = router;
