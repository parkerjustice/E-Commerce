const router = require('express').Router();
const { Category, Product } = require('./modules');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ["price", "product_name", "id", "stock", "category_id"]
      }
    ]
  })
    .then(CategoryDataDB => res.json(CategoryDataDB))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
//this is every category



router.get('/:id', (req, res) => {
  Category.findOne({
    where:{
      id: req.params.id
    },
    //showing where
    include: [
      {
        model: Product,
        attributes: ["price", "product_name", "id", "stock", "category_id"]
      }
    ]
  })
  .then(CategoryDataDB => {
    if (!categoryData) {
      res.status(404).json({ message: 'This ID shows nothing' });
      return;
  }
    res.json(CategoryDataDB)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
    .then(CategoryDataDB => res.json(CategoryDataDB))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
        id: req.params.id
    }
  })
    .then(CategoryDataDB => {
        if (!CategoryDataDB[0]) {
            res.status(404).json({ message: 'This ID shows nothing'});
            return;
        }
        res.json(CategoryDataDB);
  })
    .catch(err => {
        console.log(err); 
        res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
        id: req.params.id
    }
  })
    .then(CategoryDataDB => {
        if (!CategoryDataDB) {
            res.status(404).json({ message: 'This ID shows Nothing'});
            return;
        }
        res.json(CategoryDataDB);
  })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
  });
});

module.exports = router;
