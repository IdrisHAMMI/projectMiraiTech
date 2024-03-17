import express from 'express';
import { getAllUsers, deleteUser } from './../controllers/auth/users.controller';
import { createProduct, fetchProducts, deleteProduct } from './../controllers/product/products.controller';


export default (router: express.Router) => {
  //GET USERS (ADMIN)
  router.get('/api/admin/data/users', getAllUsers)
  
  //DELETE USER (ADMIN)
  router.delete('/api/admin/delete/users/:id', deleteUser)

  //GET PRODUCT DATA (ADMIN)
  router.get('/api/products', fetchProducts);
  
  //ADD PRODUCTS (ADMIN)
  router.post('/api/products/newProduct', createProduct)

  //DELETE PRODUCT (ADMIN)
  router.delete('/api/admin/delete/product/:id', deleteProduct)
};

