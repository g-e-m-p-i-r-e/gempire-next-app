import React from "react";
import { toast } from "react-toastify";

import "../assets/scss/SingleComponents/CustomToast.scss";

const CustomToast = ({ data }) => {
	const { type, message } = data;
	return (
		<div className={`custom-toast-content${type === "error" ? " error" : ""}`}>
			<div className="content-wrapper">
				<div className="descr-con">
					<p className="descr" dangerouslySetInnerHTML={{ __html: message }} />
				</div>
			</div>
		</div>
	);
};

const customToast = ({ toastId, type, message }) => {
	toast(CustomToast, {
		autoClose: 3000,
		className: "custom-toast",
		closeButton: false,
		hideProgressBar: true,
		toastId: toastId ?? "custom-toast",
		data: { type, message },
	});
};

export default customToast;
