import { useEffect, useState } from 'react';
import createAxiosInstance from '@/utils/axios';
import leadsData from '@/types/leadsData';

export function useChartLeads(
  red_social: string,
  empresa_id: number,
  first_day?: Date,
  last_day?: Date
): { fetchLeadsData: () => Promise<void>; leadsData: leadsData[] } {
  const [leadsData, setLeadsData] = useState<leadsData[]>([]);

  const fetchLeadsData = async () => {
    const axiosInstance = createAxiosInstance();

    const [first_day_str, last_day_str] = [first_day, last_day].map((date) =>
      date ? date.toISOString().split('T')[0] : undefined
    );

    try {
      const response = await axiosInstance.get('/dashboard/leads', {
        params: {
          empresa_id,
          red_social,
          first_day: first_day_str,
          last_day: last_day_str,
        },
      });
      setLeadsData(response.data);
      console.log('Leads chart data fetched:', response.data);
    } catch (error) {
      console.error('Error fetching leads chart data:', error);
    }
  };

  return { fetchLeadsData, leadsData };
}
