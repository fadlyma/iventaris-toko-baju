"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "@/lib/api";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Printer, CheckSquare, Square, Sparkles } from "lucide-react";

import { QRCodeSVG } from "qrcode.react";

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
      setSelected(new Set(products.map((p) => p.id)));
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const selectedProducts = products.filter((p) => selected.has(p.id));

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Cetak Label
            </h1>
            <p className="text-gray-500 mt-1">
              Pilih produk yang akan dicetak QR Code-nya
            </p>
          </div>

          {/* Action Card - Visible on Desktop */}
          <div className="hidden md:flex items-center gap-3 bg-white p-2 pr-4 rounded-xl shadow-sm border border-gray-200">
            <div className="px-4 py-2 bg-indigo-50 rounded-lg text-indigo-700 font-medium text-sm">
              {selected.size} Dipilih
            </div>
            <div className="h-8 w-px bg-gray-200 mx-2" />
            {/* Print Button */}
            <Button
              onClick={handlePrint}
              disabled={selected.size === 0}
              className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg transition-all"
            >
              <Printer className="w-4 h-4 mr-2" />
              Cetak Sekarang
            </Button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product List Panel */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-indigo-500" />
                  Daftar Produk
                </h2>
                {/* Select All - Visible on all screens */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={selectAll}
                  className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                >
                  {selected.size === products.length
                    ? "Batalkan Semua"
                    : "Pilih Semua"}
                </Button>
              </div>

              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[600px] overflow-y-auto custom-scrollbar">
                {products.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => toggleSelect(product.id)}
                    className={`
                        relative group cursor-pointer p-3 rounded-xl border transition-all duration-200
                        ${
                          selected.has(product.id)
                            ? "bg-indigo-50 border-indigo-200 ring-1 ring-indigo-200"
                            : "bg-white border-gray-100 hover:border-indigo-100 hover:bg-gray-50"
                        }
                      `}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`
                          mt-1 rounded-lg p-1.5 transition-colors
                          ${selected.has(product.id) ? "bg-indigo-200 text-indigo-700" : "bg-gray-100 text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-400"}
                        `}
                      >
                        {selected.has(product.id) ? (
                          <CheckSquare className="w-4 h-4" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <p
                          className={`font-semibold text-sm ${selected.has(product.id) ? "text-indigo-900" : "text-gray-900"}`}
                        >
                          {product.code}
                        </p>
                        <p className="text-xs text-gray-500 line-clamp-1">
                          {product.name}
                        </p>
                        <p className="text-xs font-medium text-gray-900 mt-1">
                          Rp {product.price.toLocaleString("id-ID")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Preview Panel - Sticky on Desktop */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sticky top-8">
              <h2 className="font-semibold text-gray-900 flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                Live Preview
              </h2>

              {selectedProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-gray-100 rounded-xl">
                  <div className="bg-gray-50 p-4 rounded-full mb-3">
                    <Printer className="w-6 h-6 text-gray-300" />
                  </div>
                  <p className="text-sm text-gray-500">
                    Pilih produk di samping
                    <br />
                    untuk melihat preview
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm flex flex-col items-center text-center">
                    <div className="bg-white p-2">
                      <QRCodeSVG
                        value={selectedProducts[0].code}
                        size={100}
                        level="M"
                      />
                    </div>
                    <div className="mt-3 space-y-1 w-full">
                      <p className="font-mono font-bold text-gray-900">
                        {selectedProducts[0].code}
                      </p>
                      <p className="text-xs text-gray-500 truncate px-4">
                        {selectedProducts[0].name}
                      </p>
                      <p className="font-bold text-indigo-600">
                        Rp {selectedProducts[0].price.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>

                  {selectedProducts.length > 1 && (
                    <p className="text-center text-xs text-gray-400">
                      + {selectedProducts.length - 1} label lainnya
                    </p>
                  )}

                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex justify-between text-sm mb-4">
                      <span className="text-gray-500">Total Label</span>
                      <span className="font-semibold text-gray-900">
                        {selected.size} pcs
                      </span>
                    </div>
                    <Button
                      onClick={handlePrint}
                      className="w-full bg-gray-900 hover:bg-black text-white h-12 rounded-xl shadow-xl hover:shadow-2xl transition-all"
                    >
                      <Printer className="w-4 h-4 mr-2" />
                      Cetak Sekarang
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Floating Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-xs text-gray-500">Total Dipilih</p>
            <p className="font-bold text-gray-900 text-lg">
              {selected.size} Produk
            </p>
          </div>
          <Button
            onClick={handlePrint}
            disabled={selected.size === 0}
            className="bg-indigo-600 text-white rounded-xl px-8"
          >
            Cetak
          </Button>
        </div>
      </div>

      {/* Print Area - Only Visible on Print */}
      <div className="hidden print:block fixed inset-0 bg-white z-[9999]">
        <div className="grid grid-cols-3 gap-2 p-2">
          {selectedProducts.map((product) => (
            <div
              key={product.id}
              className="border border-gray-300 p-3 bg-white flex flex-col items-center justify-center break-inside-avoid"
              style={{
                width: "70mm",
                height: "40mm",
              }}
            >
              <div className="mb-2">
                <QRCodeSVG
                  value={product.code}
                  size={60}
                  level="M"
                  includeMargin={false}
                />
              </div>
              <div className="text-center w-full">
                <div className="font-bold text-xs font-mono">
                  {product.code}
                </div>
                <div className="text-[10px] truncate w-full px-1 mt-0.5">
                  {product.name}
                </div>
                <div className="font-bold text-sm mt-1">
                  Rp {product.price.toLocaleString("id-ID")}
                </div>
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
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:block {
            display: block !important;
          }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #e2e8f0;
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
}
