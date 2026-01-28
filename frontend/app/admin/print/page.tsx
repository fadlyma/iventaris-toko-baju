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
  ShieldAlert,
} from "lucide-react";

export default function PrintPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  // NUCLEAR VERSION: 16:53 WIB
  const VERSION_MARK = "V6.1 - FINAL ALIGNMENT FIX";

  useEffect(() => {
    setMounted(true);
    fetchProducts().then(setProducts);

    if (typeof window !== "undefined") {
      const lastVer = localStorage.getItem("sticker_ver");
      if (lastVer !== VERSION_MARK) {
        localStorage.setItem("sticker_ver", VERSION_MARK);
        // NUCLEAR REFRESH
        location.reload();
      }
    }
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
    <div className="min-h-screen bg-[#fff] text-slate-900 font-sans selection:bg-indigo-100 relative overflow-x-hidden">
      <div className="print-hide">
        <Navbar />

        {/* NUCLEAR SYNC WARNING - RED ALERT */}
        <div className="bg-red-600 text-white py-4 px-8 flex items-center justify-between font-black text-sm uppercase tracking-[0.4em] sticky top-0 z-[100] shadow-2xl">
          <div className="flex items-center gap-4">
            <ShieldAlert className="w-6 h-6 animate-ping" />
            <span>SISTEM TERUPDATE: {VERSION_MARK}</span>
          </div>
          <div className="flex gap-6 items-center">
            <span className="bg-white text-red-600 px-3 py-1 rounded font-black">
              NO QR CODE
            </span>
            <span className="opacity-70">RECALIBRATED 16:53</span>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-6 py-10 animate-in fade-in duration-1000">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
            <div className="space-y-4">
              <h1 className="text-6xl font-black tracking-tighter text-slate-900 leading-none">
                Sticker <span className="text-red-600 italic">Precision</span>
              </h1>
              <p className="text-slate-400 font-bold text-lg max-w-sm leading-tight text-red-500/80">
                Jika Anda tidak melihat bar merah ini, Anda masih di versi lama!
              </p>
            </div>

            <div className="bg-white p-6 rounded-[2rem] border-4 border-red-600/10 shadow-2xl flex items-center gap-8 translate-y-2">
              <div className="text-center px-4 border-r-2 border-slate-50">
                <span className="text-[10px] font-black text-slate-300 block tracking-widest uppercase mb-1">
                  Items
                </span>
                <span className="text-4xl font-black text-slate-900 leading-none">
                  {selected.size}
                </span>
              </div>
              <Button
                onClick={handlePrint}
                disabled={selected.size === 0}
                className="bg-red-600 hover:bg-black h-16 px-12 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl transition-all active:scale-95"
              >
                PRINT STICKER (FIX)
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8">
              <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col h-full overflow-y-auto max-h-[600px]">
                <div className="p-8 flex items-center gap-4 bg-slate-50/50 sticky top-0 z-10 backdrop-blur-md">
                  <div className="relative flex-1 group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-red-500 transition-colors" />
                    <Input
                      placeholder="Cari SKU atau Nama..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-14 h-14 bg-white border-slate-200 rounded-2xl text-sm font-bold shadow-none focus-visible:ring-red-500"
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={selectAll}
                    className="h-14 px-8 rounded-2xl border-slate-200 font-black text-[10px] tracking-widest"
                  >
                    {selected.size === filteredProducts.length
                      ? "BATAL SEMUA"
                      : "PILIH SEMUA"}
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-50">
                        <TableHead className="w-20 text-center"></TableHead>
                        <TableHead className="text-[10px] font-black uppercase tracking-[0.3em] py-8">
                          SKU
                        </TableHead>
                        <TableHead className="text-[10px] font-black uppercase tracking-[0.3em]">
                          Item
                        </TableHead>
                        <TableHead className="text-[10px] font-black uppercase tracking-[0.3em] text-right pr-12">
                          Price
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map((p) => (
                        <TableRow
                          key={p.id}
                          className={`group cursor-pointer border-slate-50 transition-colors ${selected.has(p.id) ? "bg-red-50/30" : ""}`}
                          onClick={() => toggleSelect(p.id)}
                        >
                          <TableCell
                            className="text-center"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Checkbox
                              checked={selected.has(p.id)}
                              onCheckedChange={() => toggleSelect(p.id)}
                              className="rounded-md border-slate-200 data-[state=checked]:bg-red-600"
                            />
                          </TableCell>
                          <TableCell className="font-mono font-black text-slate-400 text-xs">
                            {p.code}
                          </TableCell>
                          <TableCell className="font-black text-slate-800 text-xs uppercase">
                            {p.name}
                          </TableCell>
                          <TableCell className="text-right pr-12 font-black text-slate-900">
                            Rp {p.price.toLocaleString("id-ID")}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 relative">
              <div className="sticky top-40 bg-white border-2 border-slate-100 rounded-[2.5rem] p-10 shadow-2xl">
                <h2 className="text-[11px] font-black uppercase tracking-[0.3em] mb-12 flex items-center gap-3 text-red-600">
                  <Eye className="w-5 h-5" />
                  Preview v6.1
                </h2>
                {selectedProducts.length > 0 ? (
                  <div className="space-y-12">
                    <div
                      className="bg-white border-2 border-slate-900 rounded-lg p-6 flex flex-col items-center justify-center text-center shadow-2xl mx-auto"
                      style={{ width: "260px", height: "140px" }}
                    >
                      <p className="text-[10px] font-mono font-black text-slate-300 mb-2 tracking-[0.4em]">
                        {selectedProducts[0].code}
                      </p>
                      <p className="text-[15px] font-black uppercase mb-4 leading-tight text-slate-900">
                        {selectedProducts[0].name}
                      </p>
                      <p className="text-[24px] font-black text-black">
                        Rp {selectedProducts[0].price.toLocaleString("id-ID")}
                      </p>
                    </div>
                    <Button
                      onClick={handlePrint}
                      className="w-full h-16 bg-red-600 hover:bg-black text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-xl"
                    >
                      PRINT TEST
                    </Button>
                  </div>
                ) : (
                  <div className="h-40 border-4 border-dashed border-slate-50 rounded-[2rem] flex flex-col items-center justify-center gap-4 text-slate-200 font-black text-[10px] uppercase tracking-[0.2em]">
                    Pilih Produk
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* DEFINITIVE STICKER PRINT AREA - NO BORDERS VERSION */}
      <div
        id="print-area"
        className="hidden print:block fixed inset-0 z-[100000] bg-white p-0 m-0"
      >
        <div
          className="flex flex-wrap"
          style={{ paddingLeft: "5.5mm", paddingTop: "5mm" }}
        >
          {selectedProducts.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-center break-inside-avoid bg-white"
              style={{
                width: "68mm",
                height: "42mm",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Box Inti (Safe Zone) 62x34mm */}
              <div className="w-[62mm] h-[34mm] flex flex-col items-center justify-center p-2 box-border border-0">
                <p className="text-[11px] font-mono font-black text-slate-300 tracking-[0.4em] mb-3 uppercase leading-none">
                  {p.code}
                </p>
                <p className="text-[15px] font-black text-black uppercase leading-[1.1] line-clamp-2 px-2 text-center mb-5 h-[2.5em] flex items-center justify-center tracking-tight">
                  {p.name}
                </p>
                <p className="text-[26px] font-black text-black leading-none tracking-tighter italic">
                  <span className="text-[10px] non-italic font-bold opacity-30 mr-1.5 align-middle tracking-widest">
                    RP
                  </span>
                  {p.price.toLocaleString("id-ID")}
                </p>
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
