import React from "react";
import Link from "next/link";

const LinkElement = ({ children, ...props }) => (
	<Link {...props} scroll={true} prefetch={false}>
		{children}
	</Link>
);

export default LinkElement;
