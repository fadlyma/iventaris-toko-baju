'use client';

import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Edit, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export default function InventoryTable({ products, onEdit, onDelete }: Props) {
  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden shadow-lg">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-slate-50 to-gray-50 hover:from-slate-100 hover:to-gray-100 border-b-2 border-gray-200">
              <TableHead className="font-bold text-gray-700">No</TableHead>
              <TableHead className="font-bold text-gray-700">Kode</TableHead>
              <TableHead className="font-bold text-gray-700">Nama</TableHead>
              <TableHead className="font-bold text-gray-700">Kategori</TableHead>
              <TableHead className="font-bold text-gray-700">Harga</TableHead>
              <TableHead className="font-bold text-gray-700">Stok</TableHead>
              <TableHead className="font-bold text-gray-700">Status</TableHead>
              <TableHead className="font-bold text-gray-700 text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, index) => (
              <TableRow 
                key={product.id} 
                className={`
                  ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                  hover:bg-indigo-50/50 transition-colors border-b border-gray-100
                `}
              >
                <TableCell className="font-semibold text-gray-700">
                  {product.id}
                </TableCell>
                <TableCell className="font-mono font-semibold text-indigo-600 whitespace-nowrap">
                  {product.code}
                </TableCell>
                <TableCell className="font-medium text-gray-900 min-w-[150px]">{product.name}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 whitespace-nowrap">
                    {product.category}
                  </span>
                </TableCell>
                <TableCell className="font-semibold text-gray-900 whitespace-nowrap">
                  Rp{product.price.toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {product.stock_quantity > 5 && <TrendingUp className="w-4 h-4 text-green-500" />}
                    {product.stock_quantity > 0 && product.stock_quantity <= 5 && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                    {product.stock_quantity === 0 && <TrendingDown className="w-4 h-4 text-red-500" />}
                    <span className={`font-semibold ${
                      product.stock_quantity === 0 ? 'text-red-600' :
                      product.stock_quantity <= 5 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {product.stock_quantity}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold inline-block shadow-sm whitespace-nowrap ${
                    product.status === 'available' ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' :
                    product.status === 'low' ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white' : 
                    'bg-gradient-to-r from-red-500 to-rose-600 text-white'
                  }`}>
                    {product.status.toUpperCase()}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Button 
                      size="sm" 
                      onClick={() => onEdit(product)}
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-sm hover:shadow-md transition-all"
                    >
                      <Edit className="w-4 h-4 sm:mr-1" />
                      <span className="hidden sm:inline">Ubah</span>
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => onDelete(product.id)} 
                      className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white shadow-sm hover:shadow-md transition-all"
                    >
                      <Trash2 className="w-4 h-4 sm:mr-1" />
                      <span className="hidden sm:inline">Hapus</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {products.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="h-32 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <p className="text-lg font-medium">Tidak ada produk.</p>
                    <p className="text-sm">Tambahkan produk pertama Anda untuk memulai!</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
