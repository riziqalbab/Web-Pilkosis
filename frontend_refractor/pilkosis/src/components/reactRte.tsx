import { Component, CSSProperties } from "react";
import RichTextEditor from "react-rte";

export default class ReactRte extends Component<{onChange: (val: string) => void, editorStyle: CSSProperties}, {}> {
	constructor(params: any) {
		super(params);
		this.state = {
			value: RichTextEditor.createEmptyValue(),
		};
	}

	onChange = (value: any) => {
		this.setState({ value });
		if (this.props.onChange) {
			// Send the changes up to the parent component as an HTML string.
			// This is here to demonstrate using `.toString()` but in a real app it
			// would be better to avoid generating a string on each change.
			this.props.onChange(value.toString('html'));
		}
	};

	render() {
		return (
			<RichTextEditor {...this.props} value={(this.state as any).value} onChange={this.onChange} />
		)
	}
}
