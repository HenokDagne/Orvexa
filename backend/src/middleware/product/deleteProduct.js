const prisma = require('../../lib/prisma')

async function deleteProduct(req, res) {
    const { id } = req.params;

    try {
        await prisma.products.delete({
            where: { id }
        });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
}