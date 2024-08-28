import { IFeedback } from "@components/icons";
import CTitle from "@components/title";

export default function FeedbackVote() {
	return (
		<div>
			<CTitle text="Umpan Balik" logo={<IFeedback  width="27" height="27" />} />
		</div>
	);
}
