const { prisma } = require("../src/lib/prisma");

async function connectDB() {
  await prisma.$connect();
  console.log("[backend] connected to prisma (postgresql)");
}

async function disconnectDB() {
  await prisma.$disconnect();
}

module.exports = {
  connectDB,
  disconnectDB,
};
