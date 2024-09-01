import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { ChartData, ChartOptions } from 'chart.js/auto';
import CTitle from '@components/title';
import { IChart } from '@components/icons';
import { useEffect, useState } from 'react';
import cache from '@utils/cache';

interface ApiDataResponse {
   id: number
   user_id: number
   paslon_id?: string
   created_at: string
   voted_caksis?: number
   voted_cawaksis?: number
}

export default function ChartVote() {
   const cache_dataVote = (cache.get('detailVote') as ApiDataResponse[] | undefined);
   const [dataVote, setDataVote] = useState<{caksis: number[], cawaksis: number[]} | undefined>(undefined);
   useEffect(() => {
      if (cache_dataVote) {
         console.log(cache_dataVote);
         const transformedData = {
            caksis: cache_dataVote.map((item) => item.voted_caksis || 0),
            cawaksis: cache_dataVote.map((item) => item.voted_cawaksis || 0),
         };
         console.log(transformedData);
         setDataVote(transformedData);
      }
   }, [cache_dataVote])

   const data: ChartData = {
		labels: ["January", "February", "March", "April", "May", "June", "July"],
		datasets: [
			{
				label: "Sales",
				data: [65, 59, 80, 81, 56, 55, 40],
				backgroundColor: "rgba(75,192,192,0.4)",
				borderColor: "rgba(75,192,192,1)",
				borderWidth: 1,
			},
			{
				label: "Sales",
				data: [65, 59, 80, 81, 56, 55, 40],
				backgroundColor: "rgba(75,192,192,0.4)",
				borderColor: "rgba(75,192,192,1)",
				borderWidth: 1,
			},
		],
	};

	const options: ChartOptions = {
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	};

	return (
      <div>
         <CTitle text='Jumlah Suara' logo={<IChart width='27' height='27' />} />
         <Bar data={(data as any)} options={(options as any)} />
      </div>
   )
}
