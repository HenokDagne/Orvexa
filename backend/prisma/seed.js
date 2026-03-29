// backend/prisma/seed.js
// Load .env so DATABASE_URL is available when seeding
require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // 1) Categories (upsert so you can re-run seed safely)
  const categoriesData = [
    { name: "Electronics", slug: "electronics" },
    { name: "Clothing", slug: "clothing" },
    { name: "Home & Kitchen", slug: "home-kitchen" },
    { name: "Books", slug: "books" },
  ];

  const categories = [];
  for (const c of categoriesData) {
    const category = await prisma.categories.upsert({
      where: { slug: c.slug },
      update: { name: c.name },
      create: c,
    });
    categories.push(category);
  }
  console.log(`Ready ${categories.length} categories.`);

  // 2) Products (20 items) — NOTE: schema requires price:Int and rate:Int
  const productNames = [
    "Wireless Headphones",
    "Smart Watch",
    "Gaming Mouse",
    "Mechanical Keyboard",
    "LED Monitor",
    "Bluetooth Speaker",
    "Smartphone Case",
    "Laptop Backpack",
    "USB‑C Hub",
    "Wireless Charger",
    "Coffee Mug",
    "Desk Lamp",
    "Yoga Mat",
    "Running Shoes",
    "Hoodie",
    "T‑Shirt",
    "Jeans",
    "Cycling Shorts",
    "Novel Book",
    "Programming Guide",
  ];

  const descriptions = [
    "High‑quality wireless headphones with noise cancellation.",
    "Smart watch with fitness tracking and heart rate monitoring.",
    "Ergonomic gaming mouse with RGB lighting.",
    "Mechanical keyboard for gaming and typing.",
    "Ultra‑thin LED monitor for home and office use.",
    "Portable Bluetooth speaker with deep bass.",
    "Durable smartphone case with shock absorption.",
    "Lightweight laptop backpack with multiple compartments.",
    "USB‑C hub with HDMI, USB, and card reader.",
    "Fast wireless charging pad for smartphones.",
    "Ceramic coffee mug with a comfortable handle.",
    "Adjustable LED desk lamp with multiple brightness levels.",
    "Non‑slip yoga mat for home workouts.",
    "Breathable running shoes for outdoor jogging.",
    "Stylish cotton hoodie suitable for casual wear.",
    "Basic cotton T‑shirt in multiple colors.",
    "Slim fit denim jeans with a modern cut.",
    "Comfortable cycling shorts for long rides.",
    "Best‑selling novel full of suspense and drama.",
    "Step‑by‑step programming guide for beginners.",
  ];

  const imagesPerProduct = 3;
  const products = [];
  const imagePromises = [];

  for (let i = 0; i < 20; i++) {
    const catIndex = i % categories.length;
    const category = categories[catIndex];

    const product = await prisma.products.create({
      data: {
        category_id: category.id,
        title: productNames[i],
        description: descriptions[i],
        status: "active",
        // REQUIRED by schema.prisma (Int fields):INSERT INTO products (
            id,
            category_id,
            title,
            description,
            status,
            created_at,
            updated_at,
            price,
            rate
          )
        VALUES (
            'id:uuidINSERT INTO reviews (
                id,
                product_id,
                user_id,
                rating,
                comment,
                created_at
              )
            VALUES (
                'id:uuid',
                'product_id:uuid',
                'user_id:uuid',
                rating:integer,
                'comment:text',
                'created_at:timestamp without time zone'
              );',
            'category_id:uuid',
            'title:text',
            'description:text',
            'status:USER-DEFINED',
            'created_at:timestamp without time zone',
            'updated_at:timestamp without time zone',
            price:integer,
            rate:integer
          );
        price: 999 + i * 137,
        rate: 3 + (i % 3),
      },
    });

    products.push(product);

    for (let imgIdx = 1; imgIdx <= imagesPerProduct; imgIdx++) {
      let url = `https://picsum.photos/seed/${product.id}-${imgIdx}/400/400`;
      if (imgIdx === 3) {
        url = "/placeholder.jpg";
      }

      imagePromises.push(
        prisma.product_images.create({
          data: {
            product_id: product.id,
            url,
            alt: `Image ${imgIdx} of ${product.title}`,
            sort_order: imgIdx,
          },
        })
      );
    }
  }

  console.log(`Created ${products.length} products.`);
  const createdImages = await Promise.all(imagePromises);
  console.log(`Created ${createdImages.length} product images.`);
  console.log("Seed data inserted successfully.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });