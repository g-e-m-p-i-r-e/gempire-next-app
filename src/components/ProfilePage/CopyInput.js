import React, { useEffect, useState } from "react";

import "../../assets/scss/ProfilePage/CopyInput.scss";

const CopyInput = ({ title, value }) => {
	const [isCopied, setIsCopied] = useState(false);

	const copyLink = () => {
		try {
			navigator.clipboard.writeText(value);
			setIsCopied(true);
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		let timer = null;

		if (isCopied) {
			timer = setTimeout(() => {
				setIsCopied(false);
			}, 3000);
		}

		return () => {
			clearTimeout(timer);
		};
	}, [isCopied]);

	return (
		<div className="copy-input-con">
			<div className="main-copy-info-con">
				<div className="descr">{title}</div>
				<div className="copy-value">{value}</div>
			</div>
			<div className={`btn-copy ${isCopied ? "copied" : ""}`} onClick={() => !isCopied && copyLink()}>
				{isCopied ? "Copied" : "Copy"}
			</div>
		</div>
	);
};

export default CopyInput;
