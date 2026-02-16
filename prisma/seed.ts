import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.orderItem.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  // Kategoriler
  const dresses = await prisma.category.create({
    data: { name: 'Dresses', slug: 'dresses', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8' }
  })
  const accessories = await prisma.category.create({
    data: { name: 'Accessories', slug: 'accessories', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3' }
  })
  const knitwear = await prisma.category.create({
    data: { name: 'Knitwear', slug: 'knitwear', image: 'https://images.unsplash.com/photo-1574180563860-5475bb57b401' }
  })

  // Ürünler (Tasarımlarındaki ürünleri ekliyoruz)
  await prisma.product.createMany({
    data: [
      {
        name: 'The Velvet Meridian Gown',
        description: 'Expertly crafted from Italian silk velvet.',
        price: 450.00,
        stock: 12,
        images: ['https://images.unsplash.com/photo-1539008835279-43468093523c'],
        colors: ['Deep Burgundy', 'Black', 'Emerald'],
        sizes: ['XS', 'S', 'M', 'L'],
        categoryId: dresses.id,
      },
      {
        name: 'The Silk Midi Dress',
        description: '100% mulberry silk for a fluid silhouette.',
        price: 245.00,
        stock: 8,
        images: ['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446'],
        colors: ['Champagne', 'Midnight'],
        sizes: ['S', 'M', 'L'],
        categoryId: dresses.id,
      },
      {
        name: 'Cashmere Fisherman Knit',
        description: 'Heavyweight organic cashmere in a classic rib stitch.',
        price: 320.00,
        stock: 15,
        images: ['https://images.unsplash.com/photo-1574180563860-5475bb57b401'],
        colors: ['Oatmeal', 'Grey'],
        sizes: ['S', 'M', 'L', 'XL'],
        categoryId: knitwear.id,
      },
      {
        name: 'The Modern Trench',
        description: 'Water-resistant Italian cotton gabardine.',
        price: 450.00,
        stock: 5,
        images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea'],
        colors: ['Beige', 'Black'],
        sizes: ['S', 'M', 'L'],
        categoryId: knitwear.id,
      },
      {
        name: 'Artisan Leather Tote',
        description: 'Vegetable-tanned leather with gold-tone hardware.',
        price: 195.00,
        stock: 10,
        images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa'],
        colors: ['Tan', 'Black'],
        sizes: ['One Size'],
        categoryId: accessories.id,
      },
      {
        name: 'Sculpted Gold Hoops',
        description: '18k gold vermeil with a high-polish finish.',
        price: 85.00,
        stock: 20,
        images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908'],
        colors: ['Gold'],
        sizes: ['One Size'],
        categoryId: accessories.id,
      },
      {
        name: 'Pleated Linen Trousers',
        description: 'High-waisted silhouette in European flax linen.',
        price: 175.00,
        stock: 10,
        images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1'],
        colors: ['White', 'Black'],
        sizes: ['XS', 'S', 'M', 'L'],
        categoryId: dresses.id,
      }
    ],
  })

  console.log('✅ Veritabanı başarıyla zenginleştirildi!')
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); })