const prisma = require('../../lib/prisma')

async function getTopRatedProducts(req, res) {
    try {
        const products = await prisma.products.findMany({
            where: {
                rate: {
                    gte: 4 // Adjust the rating threshold as needed
                }
            },
            orderBy: {
                rate: 'desc'
            },
            take: 10 // Adjust the number of top-rated products to return
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch top-rated products' });
    }
}

module.exports = getTopRatedProducts;
