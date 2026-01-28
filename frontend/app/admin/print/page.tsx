"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "@/lib/api";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/Navbar";
import {
  Printer,
  Search,
  RotateCcw,
  LayoutGrid,
  Eye,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export default function PrintPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const updateTimestamp = "16:47 - Jan 28";

  useEffect(() => {
    setMounted(true);
    fetchProducts().then(setProducts);
  }, []);

  const filteredProducts = products.filter(
    (p) =>
      p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const toggleSelect = (id: number) => {
    const newSelected = new Set(selected);
    newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id);
    setSelected(newSelected);
  };

  const selectAll = () => {
    if (
      selected.size === filteredProducts.length &&
      filteredProducts.length > 0
    ) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filteredProducts.map((p) => p.id)));
    }
  };

  const handlePrint = () => window.print();

  const selectedProducts = products.filter((p) => selected.has(p.id));

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#fff] text-slate-900 font-sans selection:bg-red-100 relative overflow-x-hidden">
      <div className="print-hide">
        <Navbar />

        {/* Cache Warning Header */}
        <div className="bg-red-600 text-white py-2 px-6 flex items-center justify-between font-bold text-xs uppercase tracking-[0.2em] shadow-lg">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-4 h-4 animate-pulse" />
            <span>Sticker Mode v4.0 - No QR Code</span>
          </div>
          <span>Last Updated: {updateTimestamp}</span>
        </div>

        <main className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12 px-2">
            <div className="space-y-3">
              <h1 className="text-4xl font-black tracking-tight text-slate-900 uppercase">
                Fix Sticker <span className="text-red-600">Alignment</span>
              </h1>
              <p className="text-slate-500 font-medium text-lg">
                Jika Anda masih melihat QR Code, tekan **Ctrl + F5** sekarang.
              </p>
            </div>

            <div className="flex items-center gap-6 bg-white p-5 rounded-2xl border-2 border-slate-100 shadow-xl">
              <div className="px-6 border-r border-slate-100 text-center">
                <span className="text-[10px] font-bold text-slate-400 block tracking-widest uppercase mb-1">
                  Queue
                </span>
                <span className="text-3xl font-black text-slate-900 leading-none">
                  {selected.size}
                </span>
              </div>
              <Button
                onClick={handlePrint}
                disabled={selected.size === 0}
                className="bg-red-600 hover:bg-red-700 h-14 px-10 rounded-xl font-bold transition-all active:scale-95"
              >
                Cetak Sticker
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <div className="bg-white border-2 border-slate-100 rounded-3xl overflow-hidden shadow-sm">
                <div className="p-6 flex flex-col md:flex-row gap-4 bg-slate-50/50 border-b-2 border-slate-100">
                  <div className="relative flex-1 group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      placeholder="Cari produk..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 h-12 bg-white border-slate-200 rounded-xl"
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={selectAll}
                    className="h-12 px-6 rounded-xl font-bold"
                  >
                    {selected.size === filteredProducts.length
                      ? "Batal Semua"
                      : "Pilih Semua"}
                  </Button>
                </div>

                <div className="overflow-x-auto min-h-[400px]">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="w-16"></TableHead>
                        <TableHead className="font-bold text-[10px] uppercase py-6">
                          ID
                        </TableHead>
                        <TableHead className="font-bold text-[10px] uppercase">
                          Nama Produk
                        </TableHead>
                        <TableHead className="font-bold text-[10px] uppercase text-right pr-10">
                          Harga
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map((p) => (
                        <TableRow
                          key={p.id}
                          className={`group cursor-pointer ${selected.has(p.id) ? "bg-red-50/30" : ""}`}
                          onClick={() => toggleSelect(p.id)}
                        >
                          <TableCell
                            className="text-center"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Checkbox
                              checked={selected.has(p.id)}
                              onCheckedChange={() => toggleSelect(p.id)}
                            />
                          </TableCell>
                          <TableCell className="font-mono font-bold text-slate-400">
                            {p.code}
                          </TableCell>
                          <TableCell className="font-bold uppercase text-xs">
                            {p.name}
                          </TableCell>
                          <TableCell className="text-right pr-10 font-bold">
                            Rp {p.price.toLocaleString("id-ID")}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 h-full relative">
              <div className="sticky top-24 bg-white border-2 border-slate-100 rounded-3xl p-8 shadow-2xl">
                <h2 className="text-sm font-black uppercase tracking-widest mb-8 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-red-600" />
                  Pratinjau Stiker
                </h2>

                {selectedProducts.length > 0 ? (
                  <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
                    <div
                      className="bg-white border-2 border-slate-900 rounded-lg p-6 flex flex-col items-center justify-center text-center shadow-lg mx-auto"
                      style={{ width: "260px", height: "140px" }}
                    >
                      <p className="text-[10px] font-mono font-bold text-slate-400 mb-2">
                        {selectedProducts[0].code}
                      </p>
                      <p className="text-[14px] font-black uppercase mb-4 leading-tight">
                        {selectedProducts[0].name}
                      </p>
                      <p className="text-[20px] font-black">
                        Rp {selectedProducts[0].price.toLocaleString("id-ID")}
                      </p>
                    </div>
                    <Button
                      onClick={handlePrint}
                      className="w-full h-14 bg-slate-900 hover:bg-black text-white rounded-xl font-bold"
                    >
                      Cetak Cetak!
                    </Button>
                  </div>
                ) : (
                  <div className="h-40 border-2 border-dashed border-slate-100 rounded-2xl flex items-center justify-center text-slate-300 font-bold text-xs uppercase tracking-widest">
                    Pilih Produk
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* DEFINITIVE STICKER PRINT AREA - NO BORDERS TO PREVENT OUT-OF-BOX ISSUES */}
      <div
        id="print-area"
        className="hidden print:block fixed inset-0 z-[99999] bg-white p-0 m-0"
      >
        <div
          className="flex flex-wrap gap-0"
          style={{ paddingLeft: "5mm", paddingTop: "5mm" }}
        >
          {selectedProducts.map((p) => (
            <div
              key={p.id}
              className="flex flex-col items-center justify-center break-inside-avoid bg-white"
              style={{
                width: "68mm",
                height: "42mm",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Visible border for testing alignment */}
              <div className="border border-slate-200 w-[64mm] h-[34mm] flex flex-col items-center justify-center p-2 box-border">
                <p className="text-[10px] font-mono font-bold text-slate-400 tracking-[0.2em] mb-1">
                  {p.code}
                </p>
                <p className="text-[14px] font-black text-black uppercase leading-tight line-clamp-2 px-1 text-center mb-3 h-[2.5em] flex items-center">
                  {p.name}
                </p>
                <div className="flex items-center justify-center gap-1 font-black text-[22px] text-black">
                  <span className="text-[10px] font-bold opacity-30 mt-1">
                    RP
                  </span>
                  <span>{p.price.toLocaleString("id-ID")}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media print {
          html,
          body {
            visibility: hidden !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            -webkit-print-color-adjust: exact !important;
          }
          #print-area,
          #print-area * {
            visibility: visible !important;
          }
          #print-area {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 210mm !important;
            display: block !important;
          }
          .print-hide {
            display: none !important;
          }
          @page {
            size: A4;
            margin: 0mm;
          }
        }
      `}</style>
    </div>
  );
}
