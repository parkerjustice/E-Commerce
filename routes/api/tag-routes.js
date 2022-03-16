const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../..');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ["price", "product_name", "id", "stock", "category_id"],
      }
    ]
  })
//impportant that you are able to get all the tags
.then(TagData => res.json(TagData))
.catch(err => {
  console.log(err);
  res.status(500).json(err);
});

});

router.get('/:id', (req, res) => {
Tag.findOne({
  where:{
    id: req.params.id
  },
  include: [
    { model: Product, attributes: ["price", "product_name", "id", "stock", "category_id" ],
    }
  ]
})
.then(dbTagData => {
  if (!dbTagData) {
    res.status(404).json({ message: 'This ID has shown nothing'});
    return;
  }
  res.json(dbTagData);
})
.catch(err => {
  console.log(err);
  res.status(500).json(err);
});
});


router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  Tag.update( { tag_name: req.body.tag_name },
    {where: {
     id: req.params.i }
    }
  )
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
