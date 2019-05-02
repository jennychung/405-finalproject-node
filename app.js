const express = require('express');
const bodyParser = require('body-parser');
const Product = require('./models/product');
const Sequelize = require('sequelize');
// let knex = require('knex');

const {
  Op
} = Sequelize;

// const app = express();
let app = express();
app.use(bodyParser.json());
app.listen(4000);

app.get('/api/products', function(request, response) {
  let filter = {};
  let {
    q
  } = request.query;

  if (q) {
    filter = {
      where: {

        name: {
          [Op.like]: `${q}%`
        }
      }
    };
  }

  Product.findAll(filter).then((products) => {
    response.json(products);
  });
});

app.get('/api/products/:id', function(request, response) {
let {
  id
} = request.params;

Product.
findByPk(id)
  .then((product) => {
    if (product) {
      response.json(product);
    } else {
      response.status(404).send();
    }
  });
});


app.delete('/api/products/:id', function(request, response) {
  let {
    id
  } = request.params;
  Product
    .findByPk(id)
    .then((product) => {
      if (product) {
        //need to delete playlist table before deleting playlist track
        return product.destroy();
      } else {
        return Promise.reject();
      }
    })
    .then(() => {
      response.status(204).send();
    }, () => {
      response.status(404).send();
    });
});

app.post('/api/products', function(request, response) {
  Product.create({
    name: request.body.name,
    brand: request.body.brand,
    category: request.body.category,
    imageLink: request.body.imageLink
  }).then((product) => {
    response.json(product);
  }, (validation) => {
    response.status(422).json({
      errors: validation.errors.map((error) => {
        return {
          attribute: error.path,
          message: error.message
        }
      })
    });
  });
});


app.patch('/api/products/:id', function(request, response) {
  let {
    id
  } = request.params;
  Product
    .findByPk(id)
    .then((product) => {
      if (!product) {
        response.status(404).send();
      }
      Product.update({
        name: request.body.name,
        brand: request.body.brand,
        category: request.body.category,
        imageLink: request.body.imageLink
      }, {
        where: {
          id: id,
        }
      }).then(() => {
        response.send(request.body);
        response.status(200).send();
      }, (validation) => {
        response.status(422).json({
          errors: validation.errors.map((error) => {
            return {
              attribute: error.path,
              message: error.message
            }
          })
        });
      // }
    });
  });
});
