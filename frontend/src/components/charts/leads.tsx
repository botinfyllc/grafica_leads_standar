'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import leadsData from '@/types/leadsData';

export default function BarChartLeads({
  chartData,
  colors,
}: {
  chartData: leadsData[];
  colors?: { leads_publicidad?: string; leads_dm?: string };
}) {
  const chartConfig = {
    leads_publicidad: {
      label: 'Publicidad',
      color: colors?.leads_publicidad ?? 'var(--chart-1)',
    },
    leads_dm: {
      label: 'Mensajes Directos',
      color: colors?.leads_dm ?? 'var(--chart-2)',
    },
  } satisfies ChartConfig;
  return (
    <Card className="border-0">
      <CardHeader>
        <CardTitle>Llegada de Leads</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="empresa"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              // Empieza en 0 y se extiende hasta el máximo de los datos
              domain={[0, 'dataMax']}
              // Si prefieres no mostrar decimales, descomenta la línea siguiente
              // allowDecimals={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey="leads_publicidad"
              label="Publicidad"
              fill={chartConfig.leads_publicidad.color}
              radius={4}
            />
            <Bar
              dataKey="leads_dm"
              label="Mensajes Directos"
              fill={chartConfig.leads_dm.color}
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
