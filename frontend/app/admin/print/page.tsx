"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "@/lib/api";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import { Printer, Check, Trash2, Sparkles, CheckSquare } from "lucide-react";
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
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const filteredProducts = products.filter(
    (p) =>
      p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const toggleSelect = (id: number) => {
    const newSelected = new Set(selected);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelected(newSelected);
  };

  const selectAll = () => {
    if (selected.size === filteredProducts.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filteredProducts.map((p) => p.id)));
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const selectedProducts = products.filter((p) => selected.has(p.id));

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />

      <div className="max-w-4xl mx-auto p-4 sm:p-8">
        <div className="mb-6 flex flex-col gap-4 border-b pb-6">
          <h1 className="text-xl font-bold uppercase">Filter & Cetak Label</h1>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <input
              type="text"
              placeholder="Cari Kode atau Nama Produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={selectAll}
                className="h-10 text-xs"
              >
                {selected.size === filteredProducts.length
                  ? "Batal Semua"
                  : "Pilih Semua"}
              </Button>
              <Button
                onClick={handlePrint}
                disabled={selected.size === 0}
                className="h-10 px-6 bg-black hover:bg-gray-800 text-white font-bold text-xs"
              >
                CETAK ({selected.size})
              </Button>
            </div>
          </div>
        </div>

        <div className="border border-gray-200">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-10"></TableHead>
                <TableHead className="text-xs font-bold text-gray-500">
                  KODE
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-500">
                  NAMA
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-500 text-right">
                  HARGA
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="h-32 text-center text-gray-400 text-sm"
                  >
                    Produk tidak ditemukan.
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow
                    key={product.id}
                    className={`hover:bg-gray-50 cursor-pointer ${selected.has(product.id) ? "bg-gray-50" : ""}`}
                    onClick={() => toggleSelect(product.id)}
                  >
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selected.has(product.id)}
                        onCheckedChange={() => toggleSelect(product.id)}
                      />
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {product.code}
                    </TableCell>
                    <TableCell className="text-sm">{product.name}</TableCell>
                    <TableCell className="text-right text-sm font-medium">
                      Rp{product.price.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="hidden print:block p-4">
        <div className="flex flex-wrap gap-4">
          {selectedProducts.map((p) => (
            <div
              key={p.id}
              className="border border-black p-4 w-[60mm] h-[35mm] flex flex-col items-center justify-center text-center"
            >
              <QRCodeSVG value={p.code} size={60} />
              <div className="mt-2">
                <p className="text-[8px] font-mono">{p.code}</p>
                <p className="text-[10px] font-bold truncate w-full">
                  {p.name}
                </p>
                <p className="text-[12px] font-bold">
                  Rp{p.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media print {
          @page {
            size: auto;
            margin: 0;
          }
          body {
            background: white;
          }
          .min-h-screen {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
