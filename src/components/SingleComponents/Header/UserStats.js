import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAppKitAccount, useAppKitBalance } from "@reown/appkit/react";

import { Tooltip } from "reactstrap";
import numberWithSeparator from "../../../helpers/numberWithSeparator";
import { useAppSelector } from "../../../redux";
import decimalAdjust from "../../../helpers/decimalAdjust";

import logoSmallImg from "../../../assets/img/logoSmall.png";
import monadImg from "../../../assets/img/common/monad.png";

const UserStats = () => {
	const experience = useAppSelector((state) => state.main.user.xp);
	const balance = useAppSelector((state) => state.main.user.gemp);

	const toNextLvl = 100000;

	const { fetchBalance } = useAppKitBalance();
	const { isConnected } = useAppKitAccount();

	const [nativeBalance, setNativeBalance] = useState(0);
	const [tooltipOpen, setTooltipOpen] = useState(false);

	useEffect(() => {
		if (isConnected) {
			fetchBalance().then((e) => {
				setNativeBalance(e.data.balance);
			});
		}
	}, [isConnected, fetchBalance]);

	const level = 0;

	const userLvlStats = [
		{ id: "level", title: "Lvl", value: level },
		{ id: "xp", title: "XP", value: experience },
	];

	const userBalanceStats = [
		{ id: "gemp", img: logoSmallImg, value: balance },
		{ id: "monad", img: monadImg, value: decimalAdjust(nativeBalance, 4) },
	];

	return (
		<div className="side-block justify-content-lg-end">
			<div className="users-balances-con">
				<div className="stat-items-wrap" id={"user-stat-lvl"}>
					{userLvlStats.map(({ id, title, value }) => (
						<div key={`users-balances-item${id}`} className="users-balances-item">
							<div className="descr-wrap">
								<div className="descr">{title}</div>
							</div>
							<div className="value">{numberWithSeparator(value, ",")}</div>
						</div>
					))}
				</div>
				<Tooltip isOpen={tooltipOpen} target="user-stat-lvl" placement={"bottom"} className="lvl-info-tooltip" toggle={() => setTooltipOpen(!tooltipOpen)}>
					{numberWithSeparator(toNextLvl, ",")} XP until next level
				</Tooltip>
				<div className="stat-items-wrap">
					{userBalanceStats.map(({ id, img, value }) => (
						<div key={`users-balances-item${id}`} className="users-balances-item">
							<div className="img-con">
								<Image src={img} alt={""} width={24} height={24} />
							</div>
							<div className="value">{numberWithSeparator(value, ",")}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default UserStats;
