import getAllProducts from "../middleware/product/getAllProducts.JS";
import searchProducts from "../middleware/product/searchProducts";
import getTopRatedProducts from "../middleware/product/getTopRatedProducts";
import getProductById from "../middleware/product/getProductById";
import createProduct from "../middleware/product/createProduct";
import updateProductPut from "../middleware/product/updateProductPut"
import updateProductPatch from "../middleware/product/updateProductPatch"
import deleteProduct from '../middleware/product/deleteProduct'

function notImplemented(name) {
	return (req, res) => {
		res.status(501).json({
			ok: false,
			endpoint: name,
			message: "Handler mapped. Implement business logic in authContorllers.js.",
		});
	};
}

const getAllProducts = getAllProducts;
const searchProducts = searchProducts;
const getTopRatedProducts = getTopRatedProducts;
const getProductById = getProductById;
const createProduct = createProduct;
const updateProductPut = updateProductPut;
const updateProductPatch = updateProductPatch;
const deleteProduct = deleteProduct;
const filterProduct = notImplemented("filterProduct") 


module.exports = {
	getAllProducts,
	searchProducts,
	getTopRatedProducts,
	getProductById,
	createProduct,
	updateProductPut,
	updateProductPatch,
	deleteProduct,
	filterProduct
};
