const frisby = require('frisby');

const { Joi } = frisby;

it('should return a status of 404 when the product does not exist', () => {
  return frisby
  .get('http://localhost:4000/api/products/-1')
  .expect('status', 404);
});

it('should return a status of 200 when products exist', () => {
  return frisby
  .get('http://localhost:4000/api/products/')
  .expect('status', 200);
});

it('should return a status of 200 when the product exists', () => {
return frisby
  .get('http://localhost:4000/api/products/10')
  .expect('status', 200)
  .expect('jsonTypes', {
    id: Joi.number().required(),
    name: Joi.string().required(),
    brand: Joi.string().required(),
    category: Joi.string().required(),
    imageLink: Joi.string().required()
});
});

it('should create product', () => {
  return frisby
    .post('http://localhost:4000/api/products', {
     name: "Kale-lalu-yAHA",
     brand: "Krave Beauty",
     category: "Acid",
     imageLink: "https://cdn.shopify.com/s/files/1/2090/8057/products/KRAVE_1-2_1_1024x1024.jpg?v=1550835534"
    })
    .expect('status', 200)
    .expect('json', 'name', 'Kale-lalu-yAHA')
    .expect('json', 'brand', 'Krave Beauty')
    .expect('json', 'category', 'Acid')
    .expect('json', 'imageLink', 'https://cdn.shopify.com/s/files/1/2090/8057/products/KRAVE_1-2_1_1024x1024.jpg?v=1550835534')
    .expect('jsonTypes', 'id', Joi.number().required())
});

it('should return 422 if validation fails', () => {
  return frisby
    .post('http://localhost:4000/api/products', {
      id: 356,
      name: "",
      brand: "",
      category: "",
      imageLink: ""
     })
     .expect('status', 422)
});


it('should return 200 when updating product successfully', () => {
  return frisby
    .patch('http://localhost:4000/api/products/10', {
     name: 'Kale-lalu-yAHA',
     brand: 'Krave Beauty',
     category: 'Acid',
     imageLink: 'https://cdn.shopify.com/s/files/1/2090/8057/products/KRAVE_1-2_1_1024x1024.jpg?v=1550835534'
    })
    .expect('status', 200)
    .expect('json', 'name', 'Kale-lalu-yAHA')
    .expect('json', 'brand', 'Krave Beauty')
    .expect('json', 'category', 'Acid')
    .expect('json', 'imageLink', 'https://cdn.shopify.com/s/files/1/2090/8057/products/KRAVE_1-2_1_1024x1024.jpg?v=1550835534')
});

it('should return a status of 404 when the product to be updated does not exist', () => {
  return frisby
    .patch('http://localhost:4000/api/products/-1', {
    id: 356,
     name: "Kale-lalu-yAHA",
     brand: "Krave Beauty",
     category: "Acid",
     imageLink: "https://cdn.shopify.com/s/files/1/2090/8057/products/KRAVE_1-2_1_1024x1024.jpg?v=1550835534"
    })
    .expect('status', 404)
});

it('should return a status of 422 when the product to be updated has a validation error', () => {
  return frisby
    .patch('http://localhost:4000/api/products/100', {
     id: 356,
     name: "",
     brand: "",
     category: "",
     imageLink: ""
    })
    .expect('status', 422)
});



it('should return 204 when deleting a product that exists', () => {
  return frisby
    .del('http://localhost:4000/api/products/100')
    .expect('status', 204)
});

it('should return 404 when deleting a product that exists', () => {
  return frisby
    .del('http://localhost:4000/api/products/-1')
    .expect('status', 404)
});
