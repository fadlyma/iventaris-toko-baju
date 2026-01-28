"use client";

import { useState } from "react";
import { Package, Menu, X } from "lucide-react";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-xl shadow-lg">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Dashboard Admin
              </h1>
              <p className="text-xs text-gray-600 hidden sm:block">
                Kelola inventaris dan penjualan Anda
              </p>
            </div>
          </div>

          {/* Desktop Logout Button - Hidden on Mobile */}
          <div className="hidden md:block">
            <LogoutButton />
          </div>

          {/* Mobile Burger Menu Button - Visible on Mobile Only */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-lg">
          <div className="px-4 py-3 space-y-3">
            <div className="flex flex-col gap-2">
              <p className="text-sm text-gray-600 mb-2">
                Kelola inventaris dan penjualan Anda
              </p>
              <LogoutButton />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
