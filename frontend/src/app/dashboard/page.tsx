'use client';
import { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import BarChartLeads from '@/components/charts/leads';
import DateRangePicker from '@/components/ui/date-range-picker';
import Modal from '@/components/ui/modal';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { DateRange } from 'react-day-picker';
import { useChartLeads } from '@/hooks/charts/leads';

export default function DashboardLayout() {
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [social, setSocial] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [tempRange, setTempRange] = useState<DateRange | undefined>(undefined);

  const socials = [
    { value: 3, label: 'Facebook' },
    { value: 2, label: 'Instagram' },
    { value: 1, label: 'WhatsApp' },
    { value: 0, label: 'Todas las redes' },
  ];

  const { fetchLeadsData: fetchLeadsDataCPC, leadsData: leadsDataCPC } =
    useChartLeads(social, 1, range?.from, range?.to);
  const { fetchLeadsData: fetchLeadsDataTLCUSA, leadsData: leadsDataTLCUSA } =
    useChartLeads(social, 2, range?.from, range?.to);
  const { fetchLeadsData: fetchLeadsDataTLCCHN, leadsData: leadsDataTLCCHN } =
    useChartLeads(social, 3, range?.from, range?.to);

  useEffect(() => {
    fetchLeadsDataCPC();
    fetchLeadsDataTLCUSA();
    fetchLeadsDataTLCCHN();
  }, [social, range]);

  return (
    <>
      <div className="w-full mb-6">
        <div className="max-w-[1450px] mx-auto px-10">
          {/* Fila de filtros: Empresa, Sucursal (dependiente) y Etiquetas */}
          <div className="w-full lg:col-span-2">
            <div className="bg-white shadow-sm rounded-md p-4 flex flex-col lg:flex-row gap-4 items-center justify-center">
              <div className="flex flex-col">
                <label className="text-sm text-gray-800 mb-1">
                  Rango de fechas
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setTempRange(range);
                      setIsModalOpen(true);
                    }}
                    className="border-input flex w-56 items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm"
                  >
                    {range?.from ? (
                      <span>
                        {range.from.toLocaleDateString()}
                        {range.to ? ` - ${range.to.toLocaleDateString()}` : ''}
                      </span>
                    ) : (
                      <span>Seleccionar rango</span>
                    )}
                    <Calendar className="h-4 w-4 opacity-60" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-800 mb-1">Red social</label>
                <Select
                  value={String(social)}
                  onValueChange={(val) => setSocial(val)}
                >
                  <SelectTrigger
                    className="w-56 px-3 py-2 text-sm"
                    size="default"
                  >
                    <SelectValue placeholder="Seleccionar red" />
                  </SelectTrigger>
                  <SelectContent>
                    {socials.map((s) => (
                      <SelectItem key={s.value} value={String(s.value)}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        <div className="container grid justify-items-center lg:grid-cols-2 gap-x-5 gap-y-10 max-w-[1450px] mx-auto my-10 px-10">
          <div className="w-full">
            <BarChartLeads
              chartData={leadsDataCPC}
              colors={{ leads_publicidad: '#1f77b4', leads_dm: '#2ca02c' }}
            />
          </div>
          <div className="w-full">
            <BarChartLeads
              chartData={leadsDataTLCCHN}
              colors={{ leads_publicidad: '#1f77b4', leads_dm: '#FF0000' }}
            />
          </div>
          <div className="w-full">
            <BarChartLeads
              chartData={leadsDataTLCUSA}
              colors={{ leads_publicidad: '#FFD700', leads_dm: '#FF0000' }}
            />
          </div>
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Seleccionar rango"
      >
        <div className="space-y-4">
          <DateRangePicker value={tempRange} onChange={setTempRange} />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                setRange(tempRange);
                setIsModalOpen(false);
              }}
              className="px-4 py-2 bg-custom-blue-300 text-white rounded-md text-sm hover:opacity-95"
            >
              Aplicar rango
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
