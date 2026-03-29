const prisma = require('../../lib/prisma');

async function searchProducts(req, res) {
    const { q } = req.query;
    if (!q) {
        return res.status(400).json({ error: 'Missing search query' });
    }
    try {
        const products = await prisma.products.findMany({
            where: {
                OR: [
                    { title: { contains: q, mode: 'insensitive' } },
                    { category: { name: { contains: q, mode: 'insensitive' } } },
                ],
            },
            include: {
                category: true,
            },
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search products' });
    }
}

module.exports = searchProducts;
