import React from "react";
import Image from "next/image";

import { useAppSelector } from "../../redux";
import numberWithSeparator from "../../helpers/numberWithSeparator";

import ImageFallback from "../SingleComponents/ImageFallback";

import defaultAvatar from "../../assets/img/LoginPage/avatars/avatar1.png";
import referralsIcon from "../../assets/img/ProfilePage/referrals.svg";

import "../../assets/scss/ProfilePage/MainInfo.scss";

const MainInfo = ({ openReferralsTab }) => {
	const isMobile = useAppSelector((state) => state.main.isMobile);

	const username = useAppSelector((state) => state.main.user.username);
	const xp = useAppSelector((state) => state.main.user.xp);
	const balance = useAppSelector((state) => state.main.user.gemp);
	const referralsCount = useAppSelector((state) => state.main.user.referralsCount);

	const userLvlStats = [
		{ id: "xp", title: "XP", value: xp },
		{ id: "gemp", title: "GEMP", value: balance },
	];

	return (
		<div className="main-info-con">
			{isMobile && (
				<div className="referrals-btn" onClick={openReferralsTab}>
					<Image src={referralsIcon} alt={""} width={20} height={20} />
					<div className="refs-count">
						<div className="descr">{referralsCount}</div>
					</div>
				</div>
			)}
			<div className="avatar-con">
				<ImageFallback src={defaultAvatar} width={84} height={84} />
			</div>
			<div className="username">{username ? `@${username}` : "Anonym"}</div>
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
		</div>
	);
};

export default MainInfo;
