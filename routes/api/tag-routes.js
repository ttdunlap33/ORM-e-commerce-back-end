const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    include:[{
      model: Product,
      attributes:[ "id", "product_name", "stock", "price", "category_id" ],
      through: ProductTag,
      as: "products"
    }]
  }).then(TagData => {
    if (!TagData) {
      res.status(404).json({message:"No tags have been found."})
    }res.json(TagData)}).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    include:[{
      model: Product,
        attributes: ["id", "product_name", "stock", "price", "category_id"],
        through: ProductTag,
        as: 'products'     
        }],
    where: {
      id: req.params.id}}).then(TagData => {
        if (!TagData) {
          res.status(404).json({message:"Could not find a tag with that id."})
        }
        res.json(TagData)}).catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  }).then(TagData => 
    res.json(TagData)).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  // create a new tag
});

router.put('/:id', (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id}}).then(TagData => {
    if (!TagData) {
      res.status(404).json({ message:"Could not find a tag with that id."});
      return;
    }
    res.json(TagData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id}}).then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({ message: 'No Tag found with this id'});
      return;
    }
    res.json(dbTagData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  // delete on tag by its `id` value
});

module.exports = router;
