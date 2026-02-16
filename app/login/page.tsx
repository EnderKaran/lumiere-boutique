"use client";

import { useState } from "react";
import { loginAction, registerAction } from "@/lib/auth-actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true); // Giriş mi Kayıt mı?
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    if (isLogin) {
      // GİRİŞ YAP
      const res = await loginAction(formData);
      if (res?.error) setError(res.error);
    } else {
      // KAYIT OL
      const res = await registerAction(formData);
      if (res?.error) {
        setError(res.error);
      } else {
        // Kayıt başarılıysa otomatik giriş yap
        await loginAction(formData);
      }
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex bg-lumiere-beige">
      {/* SOL TARAF - GÖRSEL (Sadece masaüstünde görünür) */}
      <div className="hidden md:block w-1/2 relative bg-zinc-200">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop"
          alt="Luxury Fashion"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10"></div>
        <Link href="/" className="absolute top-8 left-8 text-white flex items-center gap-2 text-sm uppercase tracking-widest hover:opacity-70 transition">
          <ArrowLeft size={16} /> Back to Store
        </Link>
      </div>

      {/* SAĞ TARAF - FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12">
        <div className="w-full max-w-md">
          {/* Mobil için geri dön butonu */}
          <Link href="/" className="md:hidden flex items-center gap-2 text-lumiere-gray mb-8 text-xs uppercase tracking-widest">
            <ArrowLeft size={16} /> Back to Store
          </Link>

          <h1 className="font-serif text-4xl text-lumiere-dark mb-2">
            {isLogin ? "Welcome Back" : "Create an Account"}
          </h1>
          <p className="text-lumiere-gray mb-8">
            {isLogin 
              ? "Enter your details to access your account." 
              : "Experience organic luxury. Join our inner circle."}
          </p>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 mb-6 text-sm border border-red-100 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-xs uppercase tracking-widest text-lumiere-dark mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full border border-zinc-300 bg-transparent px-4 py-3 focus:outline-none focus:border-lumiere-dark transition"
                />
              </div>
            )}

            <div>
              <label className="block text-xs uppercase tracking-widest text-lumiere-dark mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                required
                className="w-full border border-zinc-300 bg-transparent px-4 py-3 focus:outline-none focus:border-lumiere-dark transition"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-lumiere-dark mb-2">Password</label>
              <input
                type="password"
                name="password"
                required
                className="w-full border border-zinc-300 bg-transparent px-4 py-3 focus:outline-none focus:border-lumiere-dark transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-lumiere-dark text-white py-4 text-xs tracking-widest uppercase hover:bg-lumiere-accent transition disabled:opacity-50 mt-4"
            >
              {loading ? "Please wait..." : (isLogin ? "Sign In" : "Create Account")}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-lumiere-gray">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError(""); // Sayfa değişirken hataları temizle
              }}
              className="text-lumiere-dark underline underline-offset-4 font-medium"
            >
              {isLogin ? "Create one" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}