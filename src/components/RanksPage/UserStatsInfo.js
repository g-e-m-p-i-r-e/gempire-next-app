import React from "react";
import Image from "next/image";

import sliceAddress from "../../helpers/sliceAddress";
import numberWithSeparator from "../../helpers/numberWithSeparator";
import { useAppSelector } from "../../redux";

import ImageFallback from "../SingleComponents/ImageFallback";

import growGreenIcon from "../../assets/img/common/growGreen.svg";
import growRedIcon from "../../assets/img/common/growRed.svg";
import avatar1Icon from "../../assets/img/LoginPage/avatars/avatar1.png";

import "../../assets/scss/RanksPage/UserStatsInfo.scss";

const UserStatsInfo = ({ activeFilter, xpUserData, balanceUserData }) => {
	const isMobile = useAppSelector((state) => state.main.isMobile);
	const username = useAppSelector((state) => state.main.user.username);
	const wallet = useAppSelector((state) => state.main.user.wallet);
	const xp = useAppSelector((state) => state.main.user.xp);
	const balance = useAppSelector((state) => state.main.user.gemp);

	const userRankXp = xpUserData.position;
	const userRankBalance = balanceUserData.position;
	const isUserXpRankGrow = true;
	const isUserBalanceRankGrow = true;
	const userAvatarSrc = "";

	return (
		<div className="users-info-con">
			<div className="side-con">
				<div className="avatar-con">
					<ImageFallback src={userAvatarSrc} fallbackSrc={avatar1Icon} width={38} height={38} />
				</div>
				<div className="main-info-con">
					<div className="address">{username || sliceAddress(wallet)}</div>
					<div className="balances-con">
						{(activeFilter === "xp" || !isMobile) && <div className="descr">{numberWithSeparator(xp)} XP</div>}
						{!isMobile && (
							<div className="dot-con f-center">
								<svg xmlns="http://www.w3.org/2000/svg" width="3" height="3" viewBox="0 0 3 3" fill="none">
									<circle cx="1.5" cy="1.5" r="1" fill="#5D507D" />
								</svg>
							</div>
						)}
						{(activeFilter === "gemp" || !isMobile) && <div className="descr">{numberWithSeparator(balance)} GEMP</div>}
					</div>
				</div>
			</div>
			<div className="side-con">
				{(activeFilter === "xp" || !isMobile) && (
					<div className="rank-item">
						<div className="count">#{numberWithSeparator(userRankXp)}</div>
						<div className={`grow-sign f-center ${isUserXpRankGrow ? "is-grow" : ""}`}>
							<Image src={isUserXpRankGrow ? growGreenIcon : growRedIcon} alt={""} width={18} height={18} />
						</div>
						<div className="descr">XP</div>
					</div>
				)}
				{!isMobile && (
					<div className="dot-con f-center">
						<svg xmlns="http://www.w3.org/2000/svg" width="3" height="3" viewBox="0 0 3 3" fill="none">
							<circle cx="1.5" cy="1.5" r="1" fill="#5D507D" />
						</svg>
					</div>
				)}
				{(activeFilter === "gemp" || !isMobile) && (
					<div className="rank-item">
						<div className="count">#{numberWithSeparator(userRankBalance)}</div>
						<div className={`grow-sign f-center ${isUserXpRankGrow ? "is-grow" : ""}`}>
							<Image src={isUserBalanceRankGrow ? growGreenIcon : growRedIcon} alt={""} width={18} height={18} />
						</div>
						<div className="descr">GEMP</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default UserStatsInfo;
