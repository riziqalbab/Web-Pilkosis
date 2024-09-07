import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { ChartData, ChartOptions } from 'chart.js/auto';
import CTitle from '@components/title';
import { IChart } from '@components/icons';
import { MutableRefObject, useEffect, useState } from 'react';
import axios from 'axios';
import FallbackLoadContent from '@components/contentLoadFallback';
import { useOutletContext } from 'react-router-dom';

const origin = import.meta.env.VITE_HOST_BACKEND

interface ApiDataResponse {
   id: number
   user_id: number
   paslon_id?: string
   created_at: string
   voted_caksis?: number
   voted_cawaksis?: number
}

interface DataVise {
   id: string;
   nomor_urut: string;
   nama: string;
   calon_jabatan:string;
   visi: string;
   misi: string;
   program_kerja: string;
   img: string;
   ttl: string;
   motto: string;
   alamat: string;
   kelas: string;
	total: number;
}

export default function ChartVote() {
	const outletContext = useOutletContext() as { intervalRef: MutableRefObject<any> }
	const [dataCaksis, setDataCaksis] = useState<DataVise[] | Error | null>(null)
	const [dataCawaksis, setDataCawaksis] = useState<DataVise[] | Error | null>(null)

	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const updateDataVoting = () => {
			axios.get(`${origin}/api/caksis`, { validateStatus: (status) => status >= 200 && status < 400, withCredentials: true })
			.then(res => {
				setDataCaksis(res.data.data)
			})
			.catch(() => {
				setDataCaksis(new Error())
			})
			axios.get(`${origin}/api/cawaksis`, { validateStatus: (status) => status >= 200 && status < 400, withCredentials: true })
			.then(res => {
				setDataCawaksis(res.data.data)
			})
			.catch(() => {
				setDataCawaksis(new Error())
			})
		}

		updateDataVoting()
		setTimeout(() => {
			outletContext.intervalRef.current = setInterval(updateDataVoting, 10000);
		}, 1000);
	}, [])

	useEffect(() => {
		setIsLoading(
			dataCaksis != null && 
			dataCawaksis != null
		)
	}, [dataCaksis, dataCawaksis])


   const dataSetCaksis: ChartData = {
		labels: (Array.isArray(dataCaksis)) ? dataCaksis.map(item => item.nama) : [],
		datasets: [
			{
				label: "Caksis",
				data: (Array.isArray(dataCaksis)) ? dataCaksis.map(item => item.total || 0) : [],
				backgroundColor: "#FFC78840",
				borderColor: "#FFB765",
				borderWidth: 1,
			},
		],
	};
   const dataSetCawaksis: ChartData = {
		labels: (Array.isArray(dataCawaksis)) ? dataCawaksis.map(item => item.nama) : [],
		datasets: [
			{
				label: "Caksis",
				data: (Array.isArray(dataCawaksis)) ? dataCawaksis.map(item => item.total || 0) : [],
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
			{isLoading ? 
				(
					<>
						<div>
							<Bar data={(dataSetCaksis as any)} options={(options as any)} />
						</div>
						<div className='mt-20'>
							<Bar data={(dataSetCawaksis as any)} options={(options as any)} />
						</div>
					</>
				) 
				:
				<FallbackLoadContent />
			}
      </div>
   )
}
