'use client';

import { useEffect, useState } from 'react';
import { fetchProducts } from '@/lib/api';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Printer, CheckSquare, Square, Sparkles } from 'lucide-react';
import LogoutButton from '@/components/LogoutButton';
import { QRCodeSVG } from 'qrcode.react';

export default function PrintPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const toggleSelect = (id: number) => {
    const newSelected = new Set(selected);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelected(newSelected);
  };

  const selectAll = () => {
    if (selected.size === products.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(products.map(p => p.id)));
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const selectedProducts = products.filter(p => selected.has(p.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      {/* Header - Hidden on Print */}
      <div className="print:hidden bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 sm:p-3 rounded-xl shadow-lg">
                <Printer className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Label Generator
                </h1>
                <p className="text-xs sm:text-sm text-gray-600">Pilih produk untuk cetak label dengan QR Code</p>
              </div>
            </div>
            <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
              <LogoutButton />
              <Button 
                onClick={handlePrint} 
                disabled={selected.size === 0}
                className="flex-1 sm:flex-initial bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
              >
                <Printer className="mr-2 h-4 w-4" />
                Cetak {selected.size} Label
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Selection Panel - Hidden on Print */}
      <div className="print:hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Pilih Produk
            </h2>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={selectAll}
              className="bg-white/20 hover:bg-white/30 text-white border-0"
            >
              {selected.size === products.length ? 'Batalkan Semua' : 'Pilih Semua'}
            </Button>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-[400px] overflow-y-auto">
              {products.map(product => (
                <div 
                  key={product.id} 
                  onClick={() => toggleSelect(product.id)}
                  className={`
                    flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all
                    ${selected.has(product.id) 
                      ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-500 shadow-md' 
                      : 'bg-white border-gray-200 hover:border-purple-300 hover:shadow-sm'
                    }
                  `}
                >
                  <div className="flex-shrink-0">
                    {selected.has(product.id) ? (
                      <CheckSquare className="w-5 h-5 text-purple-600" />
                    ) : (
                      <Square className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {product.code}
                    </p>
                    <p className="text-xs text-gray-600 truncate">{product.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="mt-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            Preview Label ({selectedProducts.length} dipilih)
          </h3>
          {selectedProducts.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p>Pilih produk untuk melihat preview label dengan QR Code</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {selectedProducts.map(product => (
                <div 
                  key={product.id} 
                  className="border-2 border-purple-300 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col items-center gap-2">
                    {/* QR Code */}
                    <div className="bg-white p-2 rounded">
                      <QRCodeSVG 
                        value={product.code} 
                        size={80}
                        level="M"
                        includeMargin={false}
                      />
                    </div>
                    
                    {/* Product Info */}
                    <div className="text-center w-full">
                      <div className="font-bold text-sm text-gray-900 font-mono">{product.code}</div>
                      <div className="text-xs text-gray-600 truncate w-full px-1 mt-1">{product.name}</div>
                      <div className="font-bold text-base text-purple-600 mt-2">
                        Rp {product.price.toLocaleString('id-ID')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Print Area - Only Visible on Print */}
      <div className="hidden print:block">
        <div className="grid grid-cols-3 gap-2 p-2">
          {selectedProducts.map(product => (
            <div 
              key={product.id} 
              className="border border-gray-300 p-3 bg-white flex flex-col items-center justify-center"
              style={{ 
                pageBreakInside: 'avoid',
                width: '70mm',
                height: '40mm'
              }}
            >
              {/* QR Code */}
              <div className="mb-2">
                <QRCodeSVG 
                  value={product.code} 
                  size={60}
                  level="M"
                  includeMargin={false}
                />
              </div>
              
              {/* Product Info */}
              <div className="text-center">
                <div className="font-bold text-xs font-mono">{product.code}</div>
                <div className="text-[10px] truncate w-full px-1 mt-0.5">{product.name}</div>
                <div className="font-bold text-sm mt-1">Rp {product.price.toLocaleString('id-ID')}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 10mm;
          }
          
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .print\\:hidden {
            display: none !important;
          }
          
          .print\\:block {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
