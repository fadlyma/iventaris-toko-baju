'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Package, AlertTriangle } from 'lucide-react';

interface Props {
  totalRevenue: number;
  totalSold: number;
  outOfStock: number;
}

export default function DashboardCards({ totalRevenue, totalSold, outOfStock }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <Card className="border-0 shadow-lg hover:shadow-xl transition-all bg-gradient-to-br from-emerald-500 to-emerald-600 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-sm font-medium text-emerald-50">Total Pendapatan</CardTitle>
          <div className="bg-white/20 p-2 rounded-lg">
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-2xl sm:text-3xl font-bold">Rp {totalRevenue.toLocaleString('id-ID')}</div>
          <p className="text-xs text-emerald-100 mt-1">Pendapatan seumur hidup</p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg hover:shadow-xl transition-all bg-gradient-to-br from-blue-500 to-blue-600 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-sm font-medium text-blue-50">Barang Terjual</CardTitle>
          <div className="bg-white/20 p-2 rounded-lg">
            <Package className="h-4 w-4 text-white" />
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-2xl sm:text-3xl font-bold">{totalSold}</div>
          <p className="text-xs text-blue-100 mt-1">Total transaksi</p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg hover:shadow-xl transition-all bg-gradient-to-br from-red-500 to-red-600 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-sm font-medium text-red-50">Stok Habis</CardTitle>
          <div className="bg-white/20 p-2 rounded-lg">
            <AlertTriangle className="h-4 w-4 text-white" />
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-2xl sm:text-3xl font-bold">{outOfStock}</div>
          <p className="text-xs text-red-100 mt-1">Perlu diisi ulang</p>
        </CardContent>
      </Card>
    </div>
  );
}
