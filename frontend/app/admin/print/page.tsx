"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "@/lib/api";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Printer, CheckSquare, Square, Sparkles } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

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
    <div className="min-h-screen bg-[#0f172a] text-slate-200 selection:bg-indigo-500/30">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-600/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-[1600px] mx-auto min-h-screen flex flex-col px-4 sm:px-8 py-8">
        {/* Premium Header */}
        <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12 animate-in fade-in slide-in-from-top duration-700">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-3 h-3" />
              Inventory Suite
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-none">
              Label{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-400">
                Designer
              </span>
            </h1>
            <p className="text-slate-400 max-w-md text-lg leading-relaxed">
              Buat label profesional dengan QR Code instan untuk inventaris
              Anda.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-900/50 backdrop-blur-md p-2 rounded-2xl border border-white/5 shadow-2xl">
            <div className="px-6 py-2">
              <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                Status Terpilih
              </span>
              <span className="text-2xl font-black text-white">
                {selected.size}{" "}
                <span className="text-indigo-400 text-sm font-medium">
                  Item
                </span>
              </span>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="flex gap-2 p-1">
              <Button
                variant="ghost"
                onClick={selectAll}
                className="hover:bg-white/5 text-slate-300 hover:text-white transition-all px-4 rounded-xl"
              >
                {selected.size === products.length ? "Clear All" : "Select All"}
              </Button>
              <Button
                onClick={handlePrint}
                disabled={selected.size === 0}
                className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] px-8 py-6 rounded-xl transition-all duration-300 group disabled:opacity-30 disabled:shadow-none"
              >
                <Printer className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-lg">Cetak Label</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 flex-1">
          {/* Main List Section */}
          <section className="xl:col-span-8 flex flex-col min-h-0 animate-in fade-in slide-in-from-left duration-1000">
            <div className="bg-slate-900/40 backdrop-blur-2xl rounded-3xl border border-white/5 flex-1 flex flex-col overflow-hidden shadow-2xl">
              <div className="p-8 border-b border-white/5 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                    <CheckSquare className="w-5 h-5" />
                  </div>
                  Inventory Catalog
                </h3>
                <div className="text-slate-500 text-sm font-medium">
                  Menampilkan {products.length} produk
                </div>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                <div className="space-y-3">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => toggleSelect(product.id)}
                      className={`
                          group relative p-4 rounded-2xl transition-all duration-300 border cursor-pointer
                          ${
                            selected.has(product.id)
                              ? "bg-indigo-500/10 border-indigo-500/50 shadow-[0_0_15px_rgba(79,70,229,0.1)]"
                              : "bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10"
                          }
                        `}
                    >
                      <div className="flex items-center gap-6">
                        <div
                          className={`
                              flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300
                              ${selected.has(product.id) ? "bg-indigo-600 text-white shadow-lg" : "bg-slate-800 text-slate-400 group-hover:bg-slate-700"}
                            `}
                        >
                          {selected.has(product.id) ? (
                            <CheckSquare className="w-6 h-6" />
                          ) : (
                            <div className="w-5 h-5 rounded border-2 border-slate-600 group-hover:border-slate-400" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="font-mono text-xs font-bold text-indigo-400/80 bg-indigo-400/10 px-2 py-0.5 rounded leading-none">
                              {product.code}
                            </span>
                            <span className="text-slate-500 text-xs font-semibold">
                              •
                            </span>
                            <span className="text-slate-400 text-xs font-semibold uppercase tracking-widest">
                              {product.category}
                            </span>
                          </div>
                          <h1 className="text-white text-lg font-bold group-hover:text-indigo-300 transition-colors truncate">
                            {product.name}
                          </h1>
                        </div>

                        <div className="text-right">
                          <div className="text-2xl font-black text-white tracking-tight">
                            Rp {product.price.toLocaleString("id-ID")}
                          </div>
                          <div className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mt-1">
                            IDR Currency
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Designer Preview Section */}
          <aside className="xl:col-span-4 animate-in fade-in slide-in-from-right duration-1000">
            <div className="sticky top-8 space-y-8">
              {/* Label Mockup Card */}
              <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900/40 backdrop-blur-2xl rounded-3xl border border-white/5 p-8 shadow-2xl overflow-hidden relative group">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-fuchsia-500/20 blur-[60px] rounded-full group-hover:bg-fuchsia-500/30 transition-all duration-700" />

                <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-fuchsia-500/20 text-fuchsia-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  Label Preview
                </h3>

                {selectedProducts.length === 0 ? (
                  <div className="py-20 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                      <Printer className="w-8 h-8 text-slate-600" />
                    </div>
                    <p className="text-slate-400 font-medium">
                      Pilih produk di katalog untuk
                      <br />
                      membuat desain label.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {/* The "Physical" Card */}
                    <div className="relative group/label aspect-[7/4] bg-white rounded-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] p-6 overflow-hidden transform group-hover:scale-[1.02] transition-all duration-500">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-indigo-500 to-transparent opacity-10" />

                      <div className="h-full flex flex-col items-center justify-between">
                        <div className="bg-slate-100 p-3 rounded-lg ring-1 ring-slate-200">
                          <QRCodeSVG
                            value={selectedProducts[0].code}
                            size={100}
                            level="Q"
                            className="text-slate-900"
                          />
                        </div>

                        <div className="text-center w-full space-y-0.5 mt-4">
                          <div className="text-[10px] font-black text-slate-400 tracking-[0.3em] uppercase">
                            {selectedProducts[0].code}
                          </div>
                          <div className="text-sm font-bold text-slate-900 truncate max-w-[220px] mx-auto">
                            {selectedProducts[0].name}
                          </div>
                          <div className="text-2xl font-black text-indigo-600 pt-1">
                            Rp{" "}
                            {selectedProducts[0].price.toLocaleString("id-ID")}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm px-2">
                      <div className="flex flex-col">
                        <span className="text-slate-500 font-bold uppercase text-[9px] tracking-widest">
                          Total Batch
                        </span>
                        <span className="text-white font-black text-xl">
                          {selected.size}{" "}
                          <span className="text-indigo-400">Items</span>
                        </span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-slate-500 font-bold uppercase text-[9px] tracking-widest">
                          Format
                        </span>
                        <span className="text-white font-black text-xl">
                          A4 <span className="text-fuchsia-400">Sheet</span>
                        </span>
                      </div>
                    </div>

                    <Button
                      onClick={handlePrint}
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl h-16 font-black text-lg shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/40 transition-all active:scale-95 flex items-center justify-center gap-3"
                    >
                      SIAP CETAK
                      <Printer className="w-6 h-6" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Quick Tips */}
              <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/5 p-6 animate-pulse-slow">
                <div className="text-indigo-400 font-bold text-xs uppercase tracking-widest mb-3">
                  Professional Suggestion
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Gunakan <strong>Kertas Label Stiker A4</strong> untuk hasil
                  terbaik. QR Code dicetak dengan level koreksi kesalahan tinggi
                  untuk pemindaian instan di gudang.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Modern Print Styles (Internal Print Layout) */}
      <div className="hidden print:block fixed inset-0 bg-white z-[99999]">
        <div className="grid grid-cols-3 gap-1 p-2">
          {selectedProducts.map((product) => (
            <div
              key={product.id}
              className="border border-slate-200 p-4 bg-white flex flex-col items-center justify-center break-inside-avoid"
              style={{ width: "70mm", height: "40mm" }}
            >
              <div className="bg-white">
                <QRCodeSVG value={product.code} size={80} level="Q" />
              </div>
              <div className="text-center w-full mt-2">
                <div className="text-[8px] font-black tracking-widest text-slate-400 uppercase leading-none mb-1">
                  {product.code}
                </div>
                <div className="text-[10px] font-bold text-slate-900 truncate px-2 leading-tight">
                  {product.name}
                </div>
                <div className="text-lg font-black text-indigo-700 leading-none mt-1">
                  Rp {product.price.toLocaleString("id-ID")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap");

        @media print {
          @page {
            size: A4;
            margin: 5mm;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.4);
        }

        .animate-pulse-slow {
          animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
}
