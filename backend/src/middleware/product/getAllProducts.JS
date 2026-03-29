const prisma = require('../../lib/prisma');

async function getAllProducts(req, res) {
	try {
		const products = await prisma.products.findMany();
		res.status(200).json(products);
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch products' });
	}
}

module.exports = getAllProducts;
