"use client";

import { useEffect, useState } from "react";
import { fetchProducts, fetchSales, deleteProduct } from "@/lib/api";
import { Product } from "@/types";
import InventoryTable from "@/components/InventoryTable";
import DashboardCards from "@/components/DashboardCards";
import ProductDialog from "@/components/ProductDialog";
import LogoutButton from "@/components/LogoutButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Printer, Package, Sparkles } from "lucide-react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState({ revenue: 0, sold: 0, out: 0 });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const loadData = async () => {
    try {
      const prods = await fetchProducts();
      const sales = await fetchSales();
      setProducts(prods);

      const revenue = sales.reduce((acc, sale) => acc + sale.total_price, 0);
      const sold = sales.reduce((acc, sale) => acc + sale.quantity, 0);
      const out = prods.filter((p) => p.status === "out").length;
      setStats({ revenue, sold, out });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter products based on search query
  const filteredProducts = products.filter(
    (product) =>
      product.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
  };

  const handleDeleteConfirm = async () => {
    if (deleteId) {
      try {
        await deleteProduct(deleteId);
        toast.success("Berhasil!", {
          description: "Produk berhasil dihapus.",
          duration: 3000,
        });
        loadData();
      } catch (error) {
        toast.error("Gagal!", {
          description: "Terjadi kesalahan saat menghapus produk.",
          duration: 3000,
        });
      } finally {
        setDeleteId(null);
      }
    }
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 sm:p-3 rounded-xl shadow-lg">
                <Package className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Dashboard Admin
                </h1>
                <p className="text-xs sm:text-sm text-gray-600">
                  Kelola inventaris dan penjualan Anda
                </p>
              </div>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Stats Cards */}
        <DashboardCards
          totalRevenue={stats.revenue}
          totalSold={stats.sold}
          outOfStock={stats.out}
        />

        {/* Inventory Table */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <h2 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Manajemen Inventaris
            </h2>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <Link href="/admin/print" className="flex-1 sm:flex-initial">
                <Button
                  variant="outline"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white border-blue-500 hover:border-blue-600 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <Printer className="mr-2 h-4 w-4" />
                  Cetak Label
                </Button>
              </Link>
              <Button
                onClick={handleOpenAdd}
                className="flex-1 sm:flex-initial bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-500 hover:border-emerald-600 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Plus className="mr-2 h-4 w-4" />
                Tambah Produk
              </Button>
            </div>
          </div>
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200 bg-gray-50/50">
            <div className="relative">
              <Input
                type="text"
                placeholder="Cari berdasarkan kode atau nama produk..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchQuery(e.target.value)
                }
                className="pl-10 pr-4 py-2 w-full border-2 border-gray-200 focus:border-indigo-500 rounded-lg"
              />
              <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="p-6">
            <InventoryTable
              products={filteredProducts}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
            />
          </div>
        </div>
      </main>

      <ProductDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        productToEdit={editingProduct}
        onSuccess={loadData}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deleteId !== null}
        onOpenChange={() => setDeleteId(null)}
      >
        <AlertDialogContent className="bg-white/95 backdrop-blur-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl text-gray-700 font-bold">
              Konfirmasi Hapus
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak
              dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 text-gray-700 hover:text-gray-900 hover:border-gray-300 shadow-sm hover:shadow transition-all cursor-pointer font-semibold">
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 cursor-pointer hover:to-red-800"
            >
              Ya, Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
