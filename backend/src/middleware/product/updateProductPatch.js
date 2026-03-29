const prisma = require('../../lib/prisma')

async function updateProductPatch(req, res) {
    const { id } = req.params;
    const { title, description, price, rate, category_id } = req.body;

    try{
        const product = await prisma.products.update({
            where: { id },
            data: {
                title,
                description,
                price,
                rate,
                category_id
            }
        });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product' });
    }
}