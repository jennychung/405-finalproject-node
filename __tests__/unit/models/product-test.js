const {
  expect
} = require('chai');
const Product = require('./../../../models/product');

describe('product', () => {
  describe('name', () => {
    it('shouldnt pass validation if there is no name', async () => {
      try {
        let product = new Product({
          name: '',
          brand: 'Krave Beauty',
          category: 'Acid',
          imageLink: 'https://cdn.shopify.com/s/files/1/2090/8057/products/KRAVE_1-2_1_1024x1024.jpg?v=1550835534'
        });
        await product.validate();
      } catch (error) {
        expect(error.errors[0].message).to.equal('Name is required');
      }
    });
  });

  describe('brand', () => {
    it('shouldnt pass validation if there is no brand', async () => {
      try {
        let product = new Product({
          name: 'Kale-lalu-yAHA',
          brand: '',
          category: 'Acid',
          imageLink: 'https://cdn.shopify.com/s/files/1/2090/8057/products/KRAVE_1-2_1_1024x1024.jpg?v=1550835534'

        });
        await product.validate();
      } catch (error) {
        expect(error.errors[0].message).to.equal('Brand is required');
      }
    });
  });

  describe('category', () => {
    it('shouldnt pass validation if there is no category', async () => {
      try {
        let product = new Product({
          name: 'Kale-lalu-yAHA',
          brand: 'Krave Beauty',
          category: '',
          imageLink: 'https://cdn.shopify.com/s/files/1/2090/8057/products/KRAVE_1-2_1_1024x1024.jpg?v=1550835534'

        });
        await product.validate();
      } catch (error) {
        expect(error.errors[0].message).to.equal('Category is required');
      }
    });
  });

  describe('imageLink', () => {
    it('shouldnt pass validation if there is no image link', async () => {
      try {
        let product = new Product({
          name: 'Kale-lalu-yAHA',
          brand: 'Krave Beauty',
          category: 'Acid',
          imageLink: ''

        });
        await product.validate();
      } catch (error) {
        expect(error.errors[0].message).to.equal('Image is required');
      }
    });
  });
});
