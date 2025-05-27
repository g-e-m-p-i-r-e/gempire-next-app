import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../redux";

const UserWallet = (props) => {
	const userWallet = useAppSelector((state) => state.main.user.wallet);

	const [isCopied, setIsCopied] = useState(false);

	const copyLink = () => {
		try {
			navigator.clipboard.writeText(userWallet);
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
		<div className="wallet-con">
			<div className="main-wallet-info-con">
				<div className="descr">Digital wallet ID</div>
				<div className="wallet">{userWallet}</div>
			</div>
			<div className={`btn-copy ${isCopied ? "copied" : ""}`} onClick={() => !isCopied && copyLink()}>
				{isCopied ? "Copied" : "Copy"}
			</div>
		</div>
	);
};

export default UserWallet;
