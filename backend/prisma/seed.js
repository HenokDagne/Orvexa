// prisma/seed.js — load .env before Prisma Client (seed runs in a separate Node process
// from the Prisma CLI, so DATABASE_URL is not guaranteed unless we load it here).

require("dotenv").config();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const categories = [
    { name: "Electronics", slug: "electronics" },
    { name: "Clothing", slug: "clothing" },
    { name: "Home & Kitchen", slug: "home-kitchen" },
    { name: "Books", slug: "books" },
  ];

  const createdCategories = await prisma.categories.createManyAndReturn({
    data: categories,
  });
  console.log(`Created ${createdCategories.length} categories.`);

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
  const createdProducts = [];
  const imagePromises = [];

  for (let i = 0; i < 20; i++) {
    const catIndex = i % 4;
    const category = createdCategories[catIndex];

    const product = await prisma.products.create({
      data: {
        category_id: category.id,
        title: productNames[i],
        description: descriptions[i],
        status: "active",
      },
    });
    createdProducts.push(product);

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
  console.log(`Created ${createdProducts.length} products.`);

  const createdImages = await Promise.all(imagePromises);
  console.log(`Created ${createdImages.length} product images.`);

  console.log("Fake data inserted successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
