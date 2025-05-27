import React from "react";
import SimpleBar from "simplebar-react";

import "../../assets/scss/SingleComponents/CustomScrollbar.scss";
import "simplebar-react/dist/simplebar.min.css";

const CustomScrollbar = ({ maxHeight, options, children }) => {
	const props = { ...options };
	if (maxHeight) {
		props.style = { maxHeight };
	}
	return (
		<SimpleBar className="simplebar" {...props}>
			{children}
		</SimpleBar>
	);
};

export default CustomScrollbar;
