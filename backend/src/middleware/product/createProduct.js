const prisma = require('../../lib/prisma')

async function createProduct(req, res) {
    const { title, description, price, rate, category_id } = req.body;
    try {
        const product = await prisma.products.create({
            data: {
                title,
                description,
                price,
                rate,
                category_id
            }
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create product' });
    }
}

module.exports = createProduct;