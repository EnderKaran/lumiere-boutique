import { prisma } from "@/lib/prisma";
import { Plus, Edit, Trash2 } from "lucide-react";
import { deleteProduct } from "@/lib/admin-actions";
import Link from "next/link";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({ include: { category: true } });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif text-lumiere-dark">Product Catalog</h1>
        <button className="bg-lumiere-dark text-white px-6 py-3 text-xs tracking-widest uppercase flex items-center gap-2 hover:bg-lumiere-accent transition">
          <Plus size={16} /> New Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-sm group">
            <div className="aspect-square relative overflow-hidden bg-zinc-100">
              <img src={product.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-4">
                <button className="bg-white p-2 rounded-full text-zinc-600 hover:text-lumiere-dark">
                  <Edit size={18} />
                </button>
                <form action={async () => { "use server"; await deleteProduct(product.id); }}>
                  <button className="bg-white p-2 rounded-full text-red-600 hover:bg-red-50">
                    <Trash2 size={18} />
                  </button>
                </form>
              </div>
            </div>
            <div className="p-4 flex justify-between items-start">
              <div>
                <h3 className="font-serif text-lumiere-dark">{product.name}</h3>
                <p className="text-xs text-zinc-400 uppercase tracking-widest mt-1">{product.category?.name}</p>
              </div>
              <p className="font-medium text-lumiere-dark">${product.price.toFixed(2)}</p>
            </div>
            <div className="px-4 pb-4 flex justify-between text-xs text-zinc-400">
              <span>Stock: {product.stock} units</span>
              <span className={product.stock < 10 ? "text-red-500 font-semibold" : ""}>
                {product.stock < 10 ? "Low Stock" : "In Stock"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}