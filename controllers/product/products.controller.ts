import express from 'express' 
import ProductCategory from '../../models/category.model';
import { BrandModel } from '../../models/brand.model';
import { ProductModel, deleteProductById } from '../../models/product.model';

//CREATES PRODUCT DATA
export const createProduct = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {

        const productBrand = await BrandModel.findOne({});
        const productCategory = await ProductCategory.findOne({});

        const brand = productBrand;
        const category = productCategory; 

        const { productName, productDescription, productStock, productPrice } = req.body;

        let productImageURL: string | undefined;
        if (req.file) {
            productImageURL = req.file.filename;
        }

        const newProduct = new ProductModel({
            productName,
            productDescription,
            productStock,
            productBrand: brand,
            productCategory: category,
            productPrice,
            productImageURL
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'An error occurred while creating the product' });
    }
};


// UPDATE PRODUCT DATA
export const updateProduct = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
      
      const { productName, productDescription, productStock, productPrice } = req.body;

      const productBrand = await BrandModel.findOne({});
      const productCategory = await ProductCategory.findOne({});

      const brand = productBrand;
      const category = productCategory; 

      let productImageURL: string | undefined;
        if (req.file) {
            productImageURL = req.file.filename;
        }
        
      const updatedProduct = await ProductModel.findByIdAndUpdate(req.params._id, {
          productName,
          productDescription,
          productStock,
          productPrice,
          productBrand: brand,
          productCategory: category,
          productImageURL
      }, { new: true });

      if (!updatedProduct) {
          return res.status(404).json({ error: 'Product not found' });
      }

      return res.status(201).json(updatedProduct);
  } catch(error) {
      console.error('Error updating product:', error);
      return res.status(500).json({ error: 'An error occurred while updating the product' });
  }
}


//FECTHES PRODUCT DATA
export const fetchProducts = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const product = await ProductModel.find().populate({
            path: 'productCategory'
        })
        .populate({
            path: 'productBrand'
        });
        res.json(product); 
    } catch (error) {
        console.error('CANT FETCH PRODUCTS', error);
        res.status(500).json({error: 'Internal Error'});
    }
}

export const fetchProductsById = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const product = await ProductModel.findById(req.params.id).populate('productCategory', 'categoryName').populate('productBrand', 'brandName');
        res.json(product); 
    } catch (error) {
        console.error('CANT FETCH PRODUCTS', error);
        res.status(500).json({error: 'Internal Error'});
    }
}

//FECTHES PRODUCT DATA
export const fetchBrands = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const brand = await BrandModel.find();
        res.json(brand); // Sending back the fetched products
    } catch (error) {
        console.error('CANT FETCH PRODUCTS', error);
        res.status(500).json({error: 'Internal Error'});
    }
}

//FECTHES PRODUCT DATA
export const fetchCategory = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const products = await ProductCategory.find();
        res.json(products); // Sending back the fetched products
    } catch (error) {
        console.error('CANT FETCH PRODUCTS', error);
        res.status(500).json({error: 'Internal Error'});
    }
}

//DELETES PRODUCT FROM DB (USED FOR THE ADMIN PANEL)
export const deleteProduct = async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
   
      if (!id) {
        console.log('Missing user ID');
        return res.status(400).json({ error: 'Missing user ID' }).end();
      }
   
      const deletedProduct = await deleteProductById(id);
   
      if (!deletedProduct) {
        console.log('User not found');
        return res.status(404).json({ error: 'User not found' }).end();
      }
   
      return res.json(deletedProduct);
    } catch (error) {
      console.log('Error deleting user:', error);
      return res.status(500).json({ error: 'An internal server error occurred' }).end();
    }
   }


//ADD PRODUCT BRAND
export const createBrand = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        if (req.body.brandName && req.body.brandName!== '') {
            const newBrand = new BrandModel(req.body);
            await newBrand.save();
            return res.status(201).json({ message: "Brand Created" });
        } else {
            return res.status(400).json({ error: "Brand Name is required" });
        }
    } catch (error) {
        console.error('Error creating brand:', error);
        return res.status(500).json({ error: 'An error occurred while creating the Brand' });
    }
};

//ADD PRODUCT TYPE
export const createCategory = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        if(req.body.categoryName && req.body.categoryName !== ''){
            const newType = new ProductCategory(req.body);
            await newType.save();
            return res.status(201).json({ message: "Product Type Created" });
        } else {
            return res.status(400).json({ error: "Category Name is required" });
        }
    } catch (error) {
        console.error('Error creating category:', error);
        return res.status(500).json({ error: 'An error occurred while creating the Product Type' });
    }
};

