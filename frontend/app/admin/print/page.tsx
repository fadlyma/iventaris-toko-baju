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
import { QRCodeSVG } from "qrcode.react";
import Navbar from "@/components/Navbar";
import {
  Printer,
  Search,
  RotateCcw,
  LayoutGrid,
  Eye,
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
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="print-hide">
        <Navbar />

        <main className="max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Label Studio</h1>
              <p className="text-sm text-slate-500 mt-1">
                Pilih produk dan cetak label dengan tampilan rapi.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl p-4">
              <span className="text-sm text-slate-500">
                Dipilih:{" "}
                <strong className="text-slate-900">{selected.size}</strong>
              </span>
              <Button
                onClick={handlePrint}
                disabled={selected.size === 0}
                className="bg-slate-900 hover:bg-slate-800 text-white rounded-lg px-6"
              >
                <Printer className="w-4 h-4 mr-2" />
                Cetak
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* TABLE */}
            <div className="lg:col-span-8">
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="p-4 flex gap-3 border-b border-slate-200">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      placeholder="Cari kode atau nama produk"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 h-11 border-slate-200 rounded-lg text-sm"
                    />
                  </div>
                  <Button variant="outline" onClick={selectAll}>
                    {selected.size === filteredProducts.length
                      ? "Batal Semua"
                      : "Pilih Semua"}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSearchQuery("");
                      setSelected(new Set());
                    }}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12"></TableHead>
                      <TableHead className="text-xs text-slate-400">
                        Kode
                      </TableHead>
                      <TableHead className="text-xs text-slate-400">
                        Produk
                      </TableHead>
                      <TableHead className="text-xs text-slate-400 text-right">
                        Harga
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="py-20 text-center">
                          <LayoutGrid className="mx-auto mb-2 text-slate-300" />
                          <p className="text-xs text-slate-400">
                            Data tidak ditemukan
                          </p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredProducts.map((p) => (
                        <TableRow
                          key={p.id}
                          className={`cursor-pointer ${
                            selected.has(p.id)
                              ? "bg-slate-100"
                              : "hover:bg-slate-50"
                          }`}
                          onClick={() => toggleSelect(p.id)}
                        >
                          <TableCell
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Checkbox
                              checked={selected.has(p.id)}
                              onCheckedChange={() => toggleSelect(p.id)}
                            />
                          </TableCell>
                          <TableCell className="font-mono text-sm">
                            {p.code}
                          </TableCell>
                          <TableCell className="font-medium text-sm">
                            {p.name}
                          </TableCell>
                          <TableCell className="text-right font-semibold text-sm">
                            Rp {p.price.toLocaleString("id-ID")}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* PREVIEW */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 bg-white border border-slate-200 rounded-xl">
                <div className="p-4 border-b border-slate-200 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-slate-500" />
                  <h2 className="text-sm font-semibold">Pratinjau Label</h2>
                </div>

                <div className="p-6">
                  {selectedProducts.length === 0 ? (
                    <div className="border border-dashed border-slate-300 rounded-lg p-10 text-center text-slate-400 text-sm">
                      Pilih produk untuk melihat label
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="border border-slate-200 rounded-lg p-6 text-center">
                        <QRCodeSVG
                          value={selectedProducts[0].code}
                          size={140}
                        />
                        <p className="mt-4 text-xs font-mono text-slate-500">
                          {selectedProducts[0].code}
                        </p>
                        <p className="font-semibold uppercase">
                          {selectedProducts[0].name}
                        </p>
                        <p className="text-lg font-bold mt-2">
                          Rp{" "}
                          {selectedProducts[0].price.toLocaleString("id-ID")}
                        </p>
                      </div>

                      <Button
                        onClick={handlePrint}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white"
                      >
                        Konfirmasi & Cetak
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* PRINT AREA */}
      <div
        id="print-area"
        className="hidden print:block fixed inset-0 bg-white p-8"
      >
        <div className="grid grid-cols-3 gap-6">
          {selectedProducts.map((p) => (
            <div
              key={p.id}
              className="border p-4 text-center break-inside-avoid"
              style={{ width: "68mm", height: "42mm" }}
            >
              <QRCodeSVG value={p.code} size={90} />
              <p className="text-xs font-mono mt-2">{p.code}</p>
              <p className="text-sm font-semibold uppercase truncate">
                {p.name}
              </p>
              <p className="text-lg font-bold">
                Rp {p.price.toLocaleString("id-ID")}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body {
            visibility: hidden;
          }
          #print-area,
          #print-area * {
            visibility: visible;
          }
          #print-area {
            position: absolute;
            inset: 0;
          }
          .print-hide {
            display: none;
          }
          @page {
            size: A4;
            margin: 8mm;
          }
        }
      `}</style>
    </div>
  );
}
