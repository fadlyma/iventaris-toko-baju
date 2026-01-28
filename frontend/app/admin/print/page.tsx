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
} from "lucide-react";

export default function PrintPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

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
    <div className="min-h-screen bg-[#fcfdfe] text-slate-900 font-sans selection:bg-indigo-100 relative overflow-x-hidden">
      {/* Premium Ambient Background */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-5%] right-[-5%] w-[40%] h-[40%] bg-indigo-50/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[35%] h-[35%] bg-violet-50/40 rounded-full blur-[100px]" />
      </div>

      <div className="print-hide">
        <Navbar />

        <main className="max-w-7xl mx-auto px-6 py-10 animate-in fade-in duration-700">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
            <div className="space-y-4">
              <h1 className="text-6xl font-black tracking-tighter text-slate-900 leading-none">
                Label{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 uppercase">
                  Sticker
                </span>
              </h1>
              <p className="text-slate-400 font-bold text-lg max-w-sm leading-tight">
                Desain bersih dan presisi tinggi untuk stiker baju Anda.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-2xl p-6 rounded-[2rem] border border-white shadow-2xl flex items-center gap-8 translate-y-2">
              <div className="text-center px-4 border-r border-slate-100">
                <span className="text-[10px] font-black text-slate-300 block tracking-widest uppercase mb-1">
                  Queue
                </span>
                <span className="text-4xl font-black text-slate-900 leading-none">
                  {selected.size}
                </span>
              </div>
              <Button
                onClick={handlePrint}
                disabled={selected.size === 0}
                className="bg-indigo-600 hover:bg-violet-600 h-16 px-12 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-indigo-100 transition-all active:scale-95"
              >
                PRINT STICKER (A4)
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Table */}
            <div className="lg:col-span-8">
              <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col h-full ring-1 ring-slate-50">
                <div className="p-8 flex items-center gap-6 bg-slate-50/50 border-b border-slate-50">
                  <div className="relative flex-1 group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                    <Input
                      placeholder="Cari SKU atau nama produk..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-14 h-14 bg-white border-slate-100 rounded-2xl text-sm font-bold shadow-none focus-visible:ring-indigo-500 transition-all"
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={selectAll}
                    className="h-14 px-8 rounded-2xl border-slate-200 font-black text-[10px] uppercase tracking-widest hover:bg-indigo-50 transition-all"
                  >
                    {selected.size === filteredProducts.length
                      ? "UNSELECT ALL"
                      : "SELECT ALL"}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSearchQuery("");
                      setSelected(new Set());
                    }}
                    className="h-14 w-14 rounded-2xl text-slate-200 hover:text-indigo-500 transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>

                <div className="overflow-x-auto min-h-[480px]">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-50">
                        <TableHead className="w-20 text-center"></TableHead>
                        <TableHead className="text-[10px] font-black uppercase tracking-[0.3em] py-8">
                          Identity
                        </TableHead>
                        <TableHead className="text-[10px] font-black uppercase tracking-[0.3em]">
                          Item Name
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
                          className={`group cursor-pointer border-slate-50 transition-colors ${selected.has(p.id) ? "bg-indigo-50/30" : "hover:bg-slate-50/50"}`}
                          onClick={() => toggleSelect(p.id)}
                        >
                          <TableCell
                            className="text-center"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Checkbox
                              checked={selected.has(p.id)}
                              onCheckedChange={() => toggleSelect(p.id)}
                              className="rounded-md border-slate-200 data-[state=checked]:bg-indigo-600 shadow-none border-2"
                            />
                          </TableCell>
                          <TableCell className="font-mono font-black text-indigo-400 text-xs tracking-tighter italic">
                            {p.code}
                          </TableCell>
                          <TableCell className="font-black text-slate-800 text-[11px] uppercase tracking-tight">
                            {p.name}
                          </TableCell>
                          <TableCell className="text-right pr-12 font-black text-slate-900 text-sm">
                            Rp {p.price.toLocaleString("id-ID")}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>

            {/* Right Column: Preview */}
            <div className="lg:col-span-4">
              <div className="sticky top-[100px] bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-2xl overflow-hidden group min-h-[500px] flex flex-col justify-center">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 group-hover:bg-violet-50 transition-colors" />

                <h2 className="text-[11px] font-black uppercase tracking-[0.3em] mb-12 flex items-center gap-3 text-slate-400 relative">
                  <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600">
                    <Eye className="w-4 h-4" />
                  </div>
                  Live Preview
                </h2>

                <div className="flex flex-col items-center justify-center flex-1">
                  {selectedProducts.length > 0 ? (
                    <div className="w-full space-y-12 animate-in fade-in zoom-in-95 duration-500">
                      {/* Mockup of 68x42mm sticker */}
                      <div
                        className="bg-white border-[1px] border-slate-100 rounded-lg p-8 flex flex-col items-center justify-center text-center shadow-inner mx-auto relative overflow-hidden"
                        style={{ width: "260px", height: "140px" }}
                      >
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-indigo-500 to-violet-500" />
                        <p className="text-[9px] font-mono font-black text-slate-300 mb-3 tracking-[0.4em] uppercase">
                          {selectedProducts[0].code}
                        </p>
                        <p className="text-[14px] font-black uppercase mb-5 leading-tight text-slate-900 line-clamp-2 px-2 tracking-tight">
                          {selectedProducts[0].name}
                        </p>
                        <div className="flex items-center justify-center gap-1.5 font-black text-[22px] text-indigo-600 tracking-tighter italic">
                          <span className="text-[9px] non-italic font-bold opacity-30 mt-1 uppercase tracking-widest leading-none">
                            RP
                          </span>
                          <span>
                            {selectedProducts[0].price.toLocaleString("id-ID")}
                          </span>
                        </div>
                      </div>
                      <Button
                        onClick={handlePrint}
                        className="w-full h-16 bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-xl active:scale-95 transition-all"
                      >
                        GENERATE PRINT
                      </Button>
                    </div>
                  ) : (
                    <div className="h-40 w-full border border-dashed border-slate-100 rounded-[2rem] flex flex-col items-center justify-center gap-5 text-slate-200 font-black text-[10px] uppercase tracking-[0.4em]">
                      <LayoutGrid className="w-10 h-10 opacity-20" />
                      Pilih Item Untuk Preview
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* DEFINITIVE STICKER PRINT AREA - CALIBRATED FOR 3-COLUMN A4 SHEET */}
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
              {/* Safe Content Zone - Centered for easy peeling */}
              <div className="w-[62mm] h-[34mm] flex flex-col items-center justify-center p-2 box-border">
                <p className="text-[10px] font-mono font-black text-slate-300 tracking-[0.4em] mb-4 uppercase leading-none">
                  {p.code}
                </p>
                <div className="w-8 h-[0.5px] bg-slate-50 mx-auto mb-4" />
                <p className="text-[14px] font-black text-black uppercase leading-[1.15] line-clamp-2 px-2 text-center mb-5 h-[2.5em] flex items-center justify-center tracking-tight">
                  {p.name}
                </p>
                <div className="flex items-center justify-center gap-1.5 font-black text-[24px] text-black tracking-tighter italic">
                  <span className="text-[10px] non-italic font-bold opacity-30 mt-1.5 uppercase tracking-widest">
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
            color-adjust: exact !important;
          }
          #print-area,
          #print-area * {
            visibility: visible !important;
          }
          #print-area {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 210mm !important; /* A4 Width */
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
