"use client";

import Link from "next/link";
import { Package, MessageSquare, Sparkles, Menu, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LogoutButton from "@/components/LogoutButton";
import { useState } from "react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-1.5 rounded-lg shadow-md">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                ClothingHub
              </span>
            </div>

            {/* Desktop - Logout only */}
            <div className="hidden sm:block">
              <LogoutButton />
            </div>

            {/* Mobile - Burger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-700" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="sm:hidden border-t border-gray-200 py-3 animate-in slide-in-from-top-2 duration-200">
              <LogoutButton />
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)] p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl w-full">
          {/* Hero Section */}
          <div className="text-center mb-12 sm:mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Manajemen Inventaris Modern</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 px-4">
              Inventaris Pakaian
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Kelola inventaris pakaian Anda dengan mudah, cetak label harga,
              dan cek stok dengan cepat
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* Admin Card */}
            <Link href="/admin" className="group">
              <Card className="relative overflow-hidden border-2 hover:border-indigo-500 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/20 h-full bg-white/80 backdrop-blur">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-bl-full" />
                <CardContent className="p-8 relative">
                  <div className="flex flex-col space-y-6">
                    <div className="flex items-start justify-between">
                      <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Package className="w-8 h-8 text-white" />
                      </div>
                      <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                        UNTUK ADMIN
                      </span>
                    </div>

                    <div className="space-y-3">
                      <h2 className="text-3xl font-bold text-gray-900">
                        Dashboard Admin
                      </h2>
                      <p className="text-gray-600 leading-relaxed">
                        Kelola inventaris, lihat laporan penjualan, dan generate
                        label harga untuk thermal printer
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                        📊 Laporan
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                        🏷️ Label
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                        📦 Inventaris
                      </span>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-lg group-hover:shadow-xl transition-all">
                      Buka Dashboard
                      <span className="ml-2 group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Chat Card */}
            <Link href="/chat" className="group">
              <Card className="relative overflow-hidden border-2 hover:border-emerald-500 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20 h-full bg-white/80 backdrop-blur">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-bl-full" />
                <CardContent className="p-8 relative">
                  <div className="flex flex-col space-y-6">
                    <div className="flex items-start justify-between">
                      <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <MessageSquare className="w-8 h-8 text-white" />
                      </div>
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                        SIAP MOBILE
                      </span>
                    </div>

                    <div className="space-y-3">
                      <h2 className="text-3xl font-bold text-gray-900">
                        Asisten Chat
                      </h2>
                      <p className="text-gray-600 leading-relaxed">
                        Cek harga produk dengan cepat melalui interface chat
                        yang intuitif dan mudah digunakan
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                        💬 Pencarian Cepat
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                        💰 Cek Harga
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                        � Info Stok
                      </span>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg group-hover:shadow-xl transition-all">
                      Buka Chat
                      <span className="ml-2 group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Footer Info */}
          <div className="text-center"></div>
        </div>
      </div>
    </div>
  );
}
