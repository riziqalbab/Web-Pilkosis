import { CTitle } from "@components/component";
import { IFeedback } from "@components/icons";

export default function FeedbackVote() {
	return (
		<div>
			<CTitle text="Umpan Balik" logo={<IFeedback  width="27" height="27" />} />
		</div>
	);
}
