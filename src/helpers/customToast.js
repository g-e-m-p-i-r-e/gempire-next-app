import React from "react";
import { toast } from "react-toastify";
import Image from "next/image";

import attentionIcon from "../assets/img/common/attention.svg";
import successMarkIcon from "../assets/img/common/successMark.svg";

import "../assets/scss/SingleComponents/CustomToast.scss";

const CustomToast = ({ data }) => {
	const { type, message } = data;
	return (
		<div className={`custom-toast-content${type === "error" ? " error" : ""}`}>
			<div className="content-wrapper">
				{type === "error" && (
					<div className="img-con">
						<Image src={attentionIcon} alt={""} width={16} height={16} />
					</div>
				)}
				{type === "success" && (
					<div className="img-con">
						<Image src={successMarkIcon} alt={""} width={16} height={16} />
					</div>
				)}
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
