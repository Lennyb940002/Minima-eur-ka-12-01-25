import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Period, Sale } from './types';
import { SalesOverviewCard } from './SalesOverviewCard';
import { SalesChart } from './SalesChart';
import { StatsCard } from './StatsCard';
import { ProductModal } from './ProductModal';
import { SalesTable } from './SalesTable';
import { salesApi } from '../../services/api';
import { formatCurrency } from '../../utils/formatters';

export function SalesView() {
  const [period, setPeriod] = useState<Period>('day');
  const [sales, setSales] = useState<Sale[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchSalesData = async () => {
    try {
      const salesData = await salesApi.getAllSales();
      setSales(salesData);
    } catch (error) {
      console.error('Error fetching sales:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const analyticsData = await salesApi.getSalesAnalytics();
      setAnalytics(analyticsData);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  useEffect(() => {
    fetchSalesData();
    fetchAnalytics();
  }, []);

  const handleAddSale = async (newSale: Omit<Sale, '_id'>) => {
    try {
      await salesApi.createSale(newSale);
      await fetchSalesData();
      await fetchAnalytics();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding sale:', error);
    }
  };

  const handleDeleteSale = async (id: string) => {
    try {
      await salesApi.deleteSale(id);
      await fetchSalesData();
      await fetchAnalytics();
    } catch (error) {
      console.error('Error deleting sale:', error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-center">Gestion de Vente</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-center">
        <SalesOverviewCard
          title="Vue d'ensemble du CA"
          value={analytics?.totalSales?.totalRevenue ?
            formatCurrency(analytics.totalSales.totalRevenue) : '0 €'}
          period={period}
          onPeriodChange={setPeriod}
        />
        <SalesOverviewCard
          title="Ventes Totales"
          value={analytics?.totalSales?.totalSales?.toString() || '0'}
          period={period}
          onPeriodChange={setPeriod}
        />
        <SalesOverviewCard
          title="Quantité Totale"
          value={analytics?.totalSales?.totalQuantity?.toString() || '0'}
          period={period}
          onPeriodChange={setPeriod}
        />
        <SalesOverviewCard
          title="Marge Totale"
          value={analytics?.totalSales?.totalMargin ?
            formatCurrency(analytics.totalSales.totalMargin) : '0 €'}
          period={period}
          onPeriodChange={setPeriod}
        />
        <SalesOverviewCard
          title="Marge Totale"
          value={analytics?.totalSales?.totalMargin ?
            formatCurrency(analytics.totalSales.totalMargin) : '0 €'}
          period={period}
          onPeriodChange={setPeriod}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[310px]">
        <div className="text-center ">
          <SalesOverviewCard
            title="Bénéfice"
            value={analytics?.totalSales?.totalMargin ?
              formatCurrency(analytics.totalSales.totalMargin) : '0 €'}
            period={period}
            onPeriodChange={setPeriod}
          />
        </div>
        <div className="md:col-span-2">
          <SalesChart
            data={analytics?.monthlySales?.map((month: any) => ({
              date: month._id,
              sales: month.monthlyRevenue
            })) || []}
          />
        </div>
        <div className="space-y-4">
          <div className="bg-black border border-white/10 rounded-xl p-4 h-[310px]">
            <h3 className="text-sm mb-4 text-center">Statistiques</h3>
            <div className="space-y-3">
              <StatsCard
                label="Panier Moyen"
                value={analytics?.totalSales?.totalRevenue && analytics?.totalSales?.totalSales ?
                  formatCurrency(analytics.totalSales.totalRevenue / analytics.totalSales.totalSales) :
                  '0 €'}
              />
              <StatsCard
                label="Marge Moyenne"
                value={analytics?.totalSales?.totalMargin && analytics?.totalSales?.totalSales ?
                  formatCurrency(analytics.totalSales.totalMargin / analytics.totalSales.totalSales) :
                  '0 €'}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black border border-white/10 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Tableau des ventes</h2>
          <button
            className="bg-yellow-500 text-black px-4 py-2 rounded-lg flex items-center gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-4 h-4" />
            Ajouter Vente
          </button>
        </div>
        <SalesTable sales={sales} onDelete={handleDeleteSale} />
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddSale}
      />
    </div>
  );
}