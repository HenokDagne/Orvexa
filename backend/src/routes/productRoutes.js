const { Router } = require("express");
const {
  getAllProducts,
  getProductById,
  searchProducts,
  createProduct,
  updateProductPut,
  updateProductPatch,
  getTopRatedProducts,
  deleteProduct,
  filterProduct,
} = require("../controllers/productControllers");

const router = Router();

router.get("/", getAllProducts);// for role user
router.get("/search", searchProducts);// for role user
router.get("/top-rated", getTopRatedProducts);  
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProductPut);
router.patch("/:id", updateProductPatch);
router.delete("/:id", deleteProduct);
router.get("/filter", filterProduct);

module.exports = router;
