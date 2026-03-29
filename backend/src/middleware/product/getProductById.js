const prisma = required('../../lib/prisma')


async function getProductById(req, res) {
    const { id } = req.params;
    try {
        const product = await prisma.products.findUnique({
            where: { id },
            include: {
                category: true,
                images: true,
            },
        });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
}

module.exports = getProductById;