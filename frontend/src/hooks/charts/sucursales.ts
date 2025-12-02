import { useState } from 'react';
import createAxiosInstance from '@/utils/axios';
import sucursalesData from '@/types/sucursalesData';

export function useChartSucursales(
  red_social: string,
  first_day?: Date,
  last_day?: Date
): {
  fetchSucursalesData: () => Promise<void>;
  sucursalesData: sucursalesData[];
} {
  const [sucursalesData, setSucursalesData] = useState<sucursalesData[]>([]);

  const fetchSucursalesData = async () => {
    const axiosInstance = createAxiosInstance();

    const [first_day_str, last_day_str] = [first_day, last_day].map((date) =>
      date ? date.toISOString().split('T')[0] : undefined
    );

    try {
      const response = await axiosInstance.get('/dashboard/sucursales', {
        params: {
          red_social,
          first_day: first_day_str,
          last_day: last_day_str,
        },
      });
      // Process the response data as needed
      setSucursalesData(response.data);
    } catch (error) {
      console.error('Error fetching sucursales chart data:', error);
    }
  };

  return { fetchSucursalesData, sucursalesData };
}
