import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Önce eski verileri temizle (Sıralama önemli: Önce bağımlı tablolar)
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany() // Eğer sipariş varsa onları da siler
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  console.log('🧹 Eski veriler temizlendi...')

  // 1. KATEGORİLER (Çalışan görsel linkleriyle)
  const dresses = await prisma.category.create({
    data: { 
      name: 'Dresses', 
      slug: 'dresses', 
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1000' 
    }
  })
  const accessories = await prisma.category.create({
    data: { 
      name: 'Accessories', 
      slug: 'accessories', 
      image: 'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&q=80&w=1000' 
    }
  })
  const knitwear = await prisma.category.create({
    data: { 
      name: 'Knitwear', 
      slug: 'knitwear', 
      image: 'https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?auto=format&fit=crop&q=80&w=1000' 
    }
  })

  // 2. ÜRÜNLER (KESİN ÇALIŞAN TEST EDİLMİŞ LİNKLER)
  await prisma.product.createMany({
    data: [
      {
        name: 'The Velvet Meridian Gown',
        description: 'Expertly crafted from Italian silk velvet.',
        price: 450.00,
        stock: 12,
        // Burgundy/Kırmızı tonlarında elbise
        images: ['https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=1200'],
        colors: ['Deep Burgundy', 'Black'],
        sizes: ['S', 'M', 'L'],
        categoryId: dresses.id,
      },
      {
        name: 'The Silk Slip Dress',
        description: '100% mulberry silk for a fluid silhouette.',
        price: 245.00,
        stock: 8,
        // Akışkan ipek kumaş görseli
        images: ['https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?auto=format&fit=crop&q=80&w=1200'],
        colors: ['Champagne', 'Midnight'],
        sizes: ['XS', 'S', 'M'],
        categoryId: dresses.id,
      },
      {
        name: 'Cashmere Fisherman Knit',
        description: 'Heavyweight organic cashmere in a classic rib stitch.',
        price: 320.00,
        stock: 15,
        // Bej triko kazak
        images: ['https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?auto=format&fit=crop&q=80&w=1200'],
        colors: ['Oatmeal', 'Grey'],
        sizes: ['S', 'M', 'L', 'XL'],
        categoryId: knitwear.id,
      },
      {
        name: 'The Modern Trench',
        description: 'Water-resistant Italian cotton gabardine.',
        price: 450.00,
        stock: 5,
        // Klasik bej trençkot
        images: ['https://plus.unsplash.com/premium_photo-1763136100470-1f368110dda6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        colors: ['Beige'],
        sizes: ['S', 'M', 'L'],
        categoryId: knitwear.id,
      },
      {
        name: 'Artisan Leather Tote',
        description: 'Vegetable-tanned leather with gold-tone hardware.',
        price: 195.00,
        stock: 10,
        // Minimalist deri çanta
        images: ['https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1200'],
        colors: ['Tan', 'Black'],
        sizes: ['One Size'],
        categoryId: accessories.id,
      },
      {
        name: 'Sculpted Gold Hoops',
        description: '18k gold vermeil with a high-polish finish.',
        price: 85.00,
        stock: 20,
        // Altın küpe detayı
        images: ['https://plus.unsplash.com/premium_photo-1754759086518-d0c840951ce6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        colors: ['Gold'],
        sizes: ['One Size'],
        categoryId: accessories.id,
      },
      {
        name: 'Pleated Linen Trousers',
        description: 'High-waisted silhouette in European flax linen.',
        price: 175.00,
        stock: 10,
        // Keten pantolon dokusu
        images: ['https://images.unsplash.com/photo-1584271854089-9bb3e5168e32?auto=format&fit=crop&q=80&w=1200'],
        colors: ['White', 'Beige'],
        sizes: ['XS', 'S', 'M', 'L'],
        categoryId: dresses.id, // Kategori mantığına uyması için dresses'a aldım veya yeni kategori açılabilir.
      }
    ],
  })

  console.log('✅ Veritabanı KESİN ÇALIŞAN görsellerle güncellendi!')
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); })