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

const UserStatsInfo = ({ activeFilter }) => {
	const isMobile = useAppSelector((state) => state.main.isMobile);

	const userAddress = "0x123123123123123222";
	const userXp = 100;
	const userBalance = 100;
	const userRankXp = 100;
	const userRankBalance = 100;
	const isUserXpRankGrow = true;
	const isUserBalanceRankGrow = false;
	const userAvatarSrc = "";

	return (
		<div className="users-info-con">
			<div className="side-con">
				<div className="avatar-con">
					<ImageFallback src={userAvatarSrc} fallbackSrc={avatar1Icon} width={38} height={38} />
				</div>
				<div className="main-info-con">
					<div className="address">{sliceAddress(userAddress)}</div>
					<div className="balances-con">
						{activeFilter === "xp" && <div className="descr">{numberWithSeparator(userXp)} XP</div>}
						{!isMobile && (
							<div className="dot-con f-center">
								<svg xmlns="http://www.w3.org/2000/svg" width="3" height="3" viewBox="0 0 3 3" fill="none">
									<circle cx="1.5" cy="1.5" r="1" fill="#5D507D" />
								</svg>
							</div>
						)}
						{activeFilter === "gemp" && <div className="descr">{numberWithSeparator(userBalance)} GEMP</div>}
					</div>
				</div>
			</div>
			<div className="side-con">
				{activeFilter === "xp" && (
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
				{activeFilter === "gemp" && (
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
