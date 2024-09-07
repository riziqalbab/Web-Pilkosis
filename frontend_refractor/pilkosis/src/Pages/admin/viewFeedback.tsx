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

export default function ViewFeedback() {
	const { dataFeedback } = (useLoaderData() as { dataFeedback: Promise<FeedbackData[]> }) || {dataFeedback: cache.get('dataFeedback')};
	return (
		<div>
			<CTitle
				text="Lihat Umpan Balik"
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
                           <div key={index} className="pb-4 border-b border-gray-400 mt-5">
                              <h3 className="text-xl">
                                 Dari: {feedback.nama}
                              </h3>
                              <div className="mt-2">
                                 <strong>Kritik</strong>
                                 <p>
                                    {feedback.kritik}
                                 </p>
                              </div>
                              <div className="mt-2">
                                 <strong>Saran</strong>
                                 <p>
                                    {feedback.saran}
                                 </p>
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
