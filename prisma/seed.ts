import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  // 1. Kategorileri Oluştur
  const dresses = await prisma.category.create({
    data: {
      name: 'Dresses',
      slug: 'dresses',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000',
    },
  })

  const accessories = await prisma.category.create({
    data: {
      name: 'Accessories',
      slug: 'accessories',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000',
    },
  })

  // 2. Ürünleri Oluşturma
  await prisma.product.createMany({
    data: [
      {
        name: 'The Velvet Meridian Gown',
        description: 'Expertly crafted from Italian silk velvet, featuring a draped cowl neckline.',
        price: 450.00,
        stock: 10,
        images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=1000'],
        colors: ['Deep Burgundy', 'Black', 'Emerald'],
        sizes: ['XS', 'S', 'M', 'L'],
        categoryId: dresses.id,
      },
      {
        name: 'Artisan Leather Tote',
        description: 'Hand-stitched premium leather bag with gold-tone hardware.',
        price: 195.00,
        stock: 5,
        images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000'],
        colors: ['Tan', 'Black'],
        sizes: ['One Size'],
        categoryId: accessories.id,
      },
      {
        name: 'Silk Slip Dress',
        description: 'Minimalist 100% mulberry silk dress for effortless elegance.',
        price: 245.00,
        stock: 15,
        images: ['https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=1000'],
        colors: ['Champagne', 'Midnight'],
        sizes: ['S', 'M', 'L'],
        categoryId: dresses.id,
      },
    ],
  })

  console.log('✅ Seed verileri başarıyla yüklendi!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })