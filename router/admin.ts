import express from 'express';
import { getAllUsers, deleteUser, updateUser } from './../controllers/auth/users.controller';
import { createProduct, fetchProducts, deleteProduct, updateProduct } from './../controllers/product/products.controller';
import { registerAdmin } from './../controllers/auth/authentication.controller';
import { upload } from './../controllers/upload-multer/upload'

export default (router: express.Router) => {
  //CREATE USER (ADMIN)
  router.post('/api/admin/create/users', registerAdmin);
  
  //EDIT USER (ADMIN)
  router.put('/api/admin/update/users/:_id', updateUser);

  //GET USERS (ADMIN)
  router.get('/api/admin/data/users', getAllUsers);
  
  //DELETE USER (ADMIN)
  router.delete('/api/admin/delete/users/:id', deleteUser);

  //GET PRODUCT DATA (ADMIN)
  router.get('/api/products', fetchProducts);
  
  //UPDATE PRODUCT (ADMIN)
  router.put('/api/admin/product/update/:_id', upload.single('productImageURL'), updateProduct);

  //ADD PRODUCTS (ADMIN)
  //CONSOLIDATING ROUTE AND HANDLING FOR IMAGE UPLOAD
  router.post('/api/products/newProduct', upload.single('productImageURL'), createProduct);

  //DELETE PRODUCT (ADMIN)
  router.delete('/api/admin/delete/product/:id', deleteProduct);

}