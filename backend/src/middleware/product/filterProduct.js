const prisma = require('../../lib/prisma');

// Utility: Build Prisma filter object for products
function buildProductFilter({ minRate, maxRate, minPrice, maxPrice, category, name }) {
	const filter = {};
	if (minRate || maxRate) {
		filter.rate = {};
		if (minRate) filter.rate.gte = Number(minRate);
		if (maxRate) filter.rate.lte = Number(maxRate);
	}
	if (minPrice || maxPrice) {
		filter.price = {};
		if (minPrice) filter.price.gte = Number(minPrice);
		if (maxPrice) filter.price.lte = Number(maxPrice);
	}
	if (category) {
		filter.category = { name: { contains: category, mode: 'insensitive' } };
	}
	if (name) {
		filter.title = { contains: name, mode: 'insensitive' };
	}
	return filter;
}

// Utility: Parse and sanitize query params
function parseQueryParams(query) {
	return {
		minRate: query.minRate,
		maxRate: query.maxRate,
		minPrice: query.minPrice,
		maxPrice: query.maxPrice,
		category: query.category,
		name: query.name,
		sortBy: query.sortBy || 'created_at',
		order: query.order === 'asc' ? 'asc' : 'desc',
		limit: Math.min(Number(query.limit) || 20, 100), // max 100
		offset: Math.max(Number(query.offset) || 0, 0),
	};
}

// Main middleware: Filter products
async function filterProduct(req, res) {
	try {
		const params = parseQueryParams(req.query);
		const where = buildProductFilter(params);

		const [products, total] = await Promise.all([
			prisma.products.findMany({
				where,
				orderBy: { [params.sortBy]: params.order },
				take: params.limit,
				skip: params.offset,
				include: {
					category: true,
					images: true,
					reviews: true,
				},
			}),
			prisma.products.count({ where }),
		]);

		res.status(200).json({
			data: products,
			total,
			limit: params.limit,
			offset: params.offset,
		});
	} catch (error) {
		console.error('Product filter error:', error);
		res.status(500).json({ error: 'Failed to filter products' });
	}
}

module.exports = {
	filterProduct,
	buildProductFilter,
	parseQueryParams,
};
