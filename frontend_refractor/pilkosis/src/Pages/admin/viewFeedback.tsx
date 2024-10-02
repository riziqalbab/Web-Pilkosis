import FallbackErrorContent from "@components/contentErrorFallback";
import FallbackLoadContent from "@components/contentLoadFallback";
import { IChat } from "@components/icons";
import CTitle from "@components/title";
import cache from "@utils/cache";
import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";

interface FeedbackData {
	id: string;
	kritik: string;
	nama: string;
	saran: string;
}

const colorVariants = [
	"bg-cyan-50 text-cyan-800",
	"bg-green-50 text-green-800",
	"bg-indigo-50 text-indigo-800",
	"bg-purple-50 text-purple-800",
	"bg-pink-50 text-pink-800",
	"bg-red-50 text-red-800",
	"bg-fuchsia-50 text-fuchsia-800",
	"bg-teal-50 text-teal-800"
]

export default function ViewFeedback() {
	const { dataFeedback } = (useLoaderData() as { dataFeedback: Promise<FeedbackData[]> }) || {dataFeedback: cache.get('dataFeedback')};
	return (
		<div>
			<CTitle
				text="Umpan Balik Pengguna"
				logo={<IChat width="30" height="30" />}
			/>

			<Suspense fallback={<FallbackLoadContent />}>
				<Await
					resolve={dataFeedback}
					errorElement={
						<FallbackErrorContent message="Gagal Memuat Data Feedback :(" />
					}
					children={(data) => {
						if (Array.isArray(data)) {
							if (data.length !== 0)
								return data.map((feedback: FeedbackData, index: number) => (
                           <div key={index} className={`${colorVariants[Math.round(Math.random() * (colorVariants.length - 1))]} pb-4 mt-5 p-6 shadow-sm rounded-xl`}>
                              <h3 className="text-xl font-bold mb-3">
                                 Dari: {feedback.nama}
                              </h3>
                              <div className="mt-3">
                                 <span className="font-semibold">Kritik</span>
                                 <code className="block mt-1">
                                    "{feedback.kritik}"
                                 </code>
                              </div>
                              <div className="mt-3">
                                 <span className="font-semibold">Saran</span>
                                 <code className="block mt-1">
                                    "{feedback.saran}"
                                 </code>
                              </div>
                           </div>
                        ));
							else
								return (
									<h1 className="text-center text-xl">
										Tidak Ada Feedback
									</h1>
								);
						}
					}}
				/>
			</Suspense>
		</div>
	);
}
