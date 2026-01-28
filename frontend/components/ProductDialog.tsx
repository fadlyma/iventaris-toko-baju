'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { createProduct, updateProduct } from '@/lib/api';
import { Product } from '@/types';
import { Save, Package } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  productToEdit?: Product | null;
  onSuccess: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Helper function to format number to Rupiah
const formatRupiah = (value: string | number): string => {
  const numValue = typeof value === 'string' ? parseFloat(value.replace(/\D/g, '')) : value;
  if (isNaN(numValue)) return '';
  return numValue.toLocaleString('id-ID');
};

// Helper function to parse Rupiah string to number
const parseRupiah = (value: string): number => {
  const cleaned = value.replace(/\D/g, '');
  return cleaned ? parseInt(cleaned) : 0;
};

export default function ProductDialog({ productToEdit, onSuccess, open, onOpenChange }: Props) {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    price: '',
    displayPrice: '', // For formatted display
    stock_quantity: '',
    category: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load data when editing
  useEffect(() => {
    if (productToEdit && open) {
      setFormData({
        code: productToEdit.code,
        name: productToEdit.name,
        price: productToEdit.price.toString(),
        displayPrice: formatRupiah(productToEdit.price),
        stock_quantity: productToEdit.stock_quantity.toString(),
        category: productToEdit.category
      });
    } else if (!open) {
      // Reset form when dialog closes
      setFormData({ code: '', name: '', price: '', displayPrice: '', stock_quantity: '', category: '' });
    }
  }, [productToEdit, open]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = parseRupiah(value);
    setFormData({
      ...formData,
      price: numericValue.toString(),
      displayPrice: formatRupiah(numericValue)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      code: formData.code,
      name: formData.name,
      price: parseRupiah(formData.displayPrice),
      stock_quantity: parseInt(formData.stock_quantity),
      category: formData.category,
    };

    try {
      if (productToEdit) {
        await updateProduct(productToEdit.id, payload);
        toast.success('Berhasil!', {
          description: 'Produk berhasil diperbarui.',
          duration: 3000,
        });
      } else {
        await createProduct(payload);
        toast.success('Berhasil!', {
          description: 'Produk baru berhasil ditambahkan.',
          duration: 3000,
        });
      }
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      toast.error('Gagal!', {
        description: 'Terjadi kesalahan saat menyimpan produk.',
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] bg-white/95 backdrop-blur-xl">
        <DialogHeader className="space-y-3 pb-4 border-b">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2.5 rounded-lg shadow-lg">
              <Package className="w-5 h-5 text-white" />
            </div>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {productToEdit ? 'Ubah Produk' : 'Tambah Produk Baru'}
            </DialogTitle>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 py-4">
          {/* Code & Category */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="code" className="text-gray-700 font-medium">
                Kode Produk
              </Label>
              <Input 
                id="code" 
                value={formData.code} 
                onChange={e => setFormData({...formData, code: e.target.value})} 
                placeholder="Contoh: KF-01"
                className="border-2 border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg h-11 bg-white text-gray-900 placeholder:text-gray-400 transition-all"
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category" className="text-gray-700 font-medium">
                Kategori
              </Label>
              <Input 
                id="category" 
                value={formData.category} 
                onChange={e => setFormData({...formData, category: e.target.value})} 
                placeholder="Contoh: Kemeja"
                className="border-2 border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg h-11 bg-white text-gray-900 placeholder:text-gray-400 transition-all"
                required 
              />
            </div>
          </div>

          {/* Product Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-700 font-medium">
              Nama Produk
            </Label>
            <Input 
              id="name" 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})} 
              placeholder="Nama lengkap produk"
              className="border-2 border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg h-11 bg-white text-gray-900 placeholder:text-gray-400 transition-all"
              required 
            />
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-gray-700 font-medium">
                Harga (Rp)
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                  Rp
                </span>
                <Input 
                  id="price" 
                  type="text"
                  value={formData.displayPrice} 
                  onChange={handlePriceChange} 
                  placeholder="0"
                  className="border-2 border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg h-11 bg-white text-gray-900 placeholder:text-gray-400 transition-all pl-10"
                  required 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock" className="text-gray-700 font-medium">
                Stok
              </Label>
              <Input 
                id="stock" 
                type="number"
                value={formData.stock_quantity} 
                onChange={e => setFormData({...formData, stock_quantity: e.target.value})} 
                placeholder="0"
                min="0"
                className="border-2 border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg h-11 bg-white text-gray-900 placeholder:text-gray-400 transition-all"
                required 
              />
            </div>
          </div>

          <DialogFooter className="pt-4 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 text-gray-700 hover:text-gray-900 hover:border-gray-300 shadow-sm hover:shadow transition-all cursor-pointer font-semibold"
            >
              Batal
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Menyimpan...' : (productToEdit ? 'Simpan Perubahan' : 'Tambah Produk')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
