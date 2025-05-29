import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import numberWithSeparator from "../../../helpers/numberWithSeparator";

import infoImg from "../../../assets/img/common/info.svg";
import logoSmallImg from "../../../assets/img/logoSmall.png";
import monadImg from "../../../assets/img/common/monad.png";
import { useAppSelector } from "../../../redux";

const UserStats = () => {
	const { push } = useRouter();

	const experience = useAppSelector((state) => state.main.user.xp);
	const balance = useAppSelector((state) => state.main.user.balance);

	const level = 0;
	const points = 0;

	const userLvlStats = [
		{ id: "level", title: "Lvl", value: level },
		{ id: "xp", title: "XP", value: experience },
	];

	const userBalanceStats = [
		{ id: "balance", img: logoSmallImg, value: balance },
		{ id: "points", img: monadImg, value: points },
	];

	return (
		<div className="side-block justify-content-end">
			<div className="users-balances-con">
				<div className="stat-items-wrap">
					{userLvlStats.map(({ id, title, value }) => (
						<div key={`users-balances-item${id}`} className="users-balances-item">
							<div className="value">{numberWithSeparator(value, ",")}</div>
							<div className="descr-wrap">
								<div className="descr">{title}</div>
							</div>
						</div>
					))}
				</div>
				<div className="stat-items-wrap">
					{userBalanceStats.map(({ id, img, value }) => (
						<div key={`users-balances-item${id}`} className="users-balances-item">
							<div className="value">{numberWithSeparator(value, ",")}</div>
							<div className="img-con">
								<Image src={img} alt={""} width={24} height={24} />
							</div>
						</div>
					))}
				</div>
			</div>
			<div
				className="info-btn"
				onClick={() => {
					push("/faq", undefined, { shallow: true });
				}}
			>
				<Image src={infoImg} alt={""} width={24} height={24} />
			</div>
		</div>
	);
};

export default UserStats;
