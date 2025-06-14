import React, { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Tooltip } from "reactstrap";

import { useAppSelector } from "../../redux";
import numberWithSeparator from "../../helpers/numberWithSeparator";
import fetchWithToken from "../../helpers/fetchWithToken";
import customToast from "../../helpers/customToast";

import CopyInput from "./CopyInput";
import ImageFallback from "../SingleComponents/ImageFallback";
import RefInfoModal from "./RefInfoModal";
import CustomScrollbar from "../SingleComponents/CustomScrollbar";

import lockIcon from "../../assets/img/common/lock.svg";
import referralsIcon from "../../assets/img/common/referrals.svg";
import infoIcon from "../../assets/img/common/info.svg";
import arrowWhiteIcon from "../../assets/img/common/arrowWhite.svg";
import defaultAvatar from "../../assets/img/LoginPage/avatars/avatar1.png";

import "../../assets/scss/ProfilePage/ReferralsBlock.scss";

const Skeleton = dynamic(() => import("react-loading-skeleton"));

const ReferralsBlock = ({ openMainTab }) => {
	const isMobile = useAppSelector((state) => state.main.isMobile);

	const isPartner = useAppSelector((state) => state.main.user.isPartner);
	const referralCode = useAppSelector((state) => state.main.user.referralCode);
	const referralsCount = useAppSelector((state) => state.main.user.referralsCount);
	const referralIncome = useAppSelector((state) => state.main.user.referralIncome);
	const invitedByReferrals = useAppSelector((state) => state.main.user.invitedByReferrals);

	const [isLoading, setIsLoading] = useState(true);
	const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
	const [tooltipOpen, setTooltipOpen] = useState(false);

	const [referralsList, setReferralsList] = useState([]);

	const refLink = `${process.env.SITE_URL}/?r=${referralCode}`;

	const refStatisticsInfo = [
		{
			title: "Invited",
			amount: referralsCount,
		},
		{
			title: "Verified",
			amount: 0,
		},
		{
			title: "Invited by referrals",
			amount: invitedByReferrals,
		},
		{
			title: "Earned GEMP",
			amount: referralIncome,
		},
	];

	const getReferrals = async () => {
		try {
			setIsLoading(true);

			const res = await fetchWithToken("/referrals?limit=10");

			if (!res?.success) {
				customToast({ toastId: "/referrals", type: "error", message: "Something went wrong while get referrals list. Please try again later." });
				return false;
			}

			setReferralsList(res.data || []);
		} catch (e) {
			console.error("Error fetching referrals:", e);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getReferrals();
	}, []);

	return (
		<div className="profile-referral-block-con">
			{isMobile && (
				<div className="back-arrow" onClick={openMainTab}>
					<Image src={arrowWhiteIcon} alt={""} width={24} height={24} />
				</div>
			)}
			<div className="block-title">Referrals</div>
			<div className="referral-type">
				<div className={`referral-type-item ${!isPartner ? "active" : ""}`}>
					Users
					{isPartner && (
						<div className="icon-con f-center">
							<Image src={lockIcon} alt={""} width={14} height={14} />
						</div>
					)}
				</div>
				<div id={"partnerInfo"} className={`referral-type-item ${isPartner ? "active" : ""}`}>
					Partners
					{!isPartner && (
						<div className="icon-con f-center">
							<Image src={lockIcon} alt={""} width={14} height={14} />
						</div>
					)}
				</div>
				<Tooltip isOpen={tooltipOpen && !isPartner} target="partnerInfo" placement={"bottom"} className="partner-tooltip" toggle={() => setTooltipOpen(!tooltipOpen)}>
					Access will be granted upon obtaining partner status.
				</Tooltip>
			</div>
			<div className="referral-main-info-con">
				<div className="info-btn" onClick={() => setIsInfoModalOpen(true)}>
					<Image src={infoIcon} alt={""} width={20} height={20} />
				</div>

				<div className="info-title">Invite friends and earn</div>
				<div className="info-stats-con f-center">
					<div className="info-stats-item">
						<div className="title">{isPartner ? "10%" : "5%"}</div>
						<div className="descr">from level 1</div>
					</div>
					<div className="info-stats-item">
						<div className="title">2%</div>
						<div className="descr">from level 2</div>
					</div>
				</div>
				<div className="link-con">
					<CopyInput title={"Invite link"} value={refLink} />
				</div>
				<div className="statistics-wrapper">
					{refStatisticsInfo.map(({ title, amount }) => (
						<div key={`statistics-item-con${title}`} className="statistics-item-con">
							<div className="amount">{numberWithSeparator(amount, ",")}</div>
							<div className="title">{title}</div>
						</div>
					))}
				</div>
			</div>
			<div className="referrals-list-con">
				{isLoading && (
					<>
						{new Array(5).fill(null).map((_, i) => (
							<div key={`activity-item-sceleton${i}`} className="referrals-list-item d-block overflow-hidden">
								<div className="title">
									<Skeleton baseColor="#ffffff00" highlightColor="#ffffff26" width={"100%"} height={24} />
								</div>
							</div>
						))}
					</>
				)}
				{!isLoading && !referralsList.length && (
					<div className="no-refs">
						<div className="title">No referrals yet!</div>
						<div className="descr">Invite friends and earn GEMP.</div>
					</div>
				)}
				{!isLoading && !!referralsList.length && (
					<CustomScrollbar maxHeight={400} options={{ autoHide: false }}>
						{referralsList.map(({ _id, wallet, username, referralData, referralsCount }) => (
							<div key={`referralsList${_id}`} className="referrals-list-item">
								<div className="main-info">
									<div className="avatar-con">
										<ImageFallback src={defaultAvatar} width={24} height={24} />
									</div>
									<div className="username">{username || wallet}</div>
									<div className="ref-count-con">
										<div className="descr">{referralsCount}</div>
										<div className="icon-con">
											<Image src={referralsIcon} alt={""} width={12} height={12} />
										</div>
									</div>
								</div>
								<div className="rewards-con">
									<div className="reward-item">
										<div className="reward-title">{"gemp".toUpperCase()}</div>
										<div className="reward-value">{numberWithSeparator(referralData.gemp, ",")}</div>
									</div>
								</div>
							</div>
						))}
					</CustomScrollbar>
				)}
			</div>

			<RefInfoModal setIsOpen={setIsInfoModalOpen} isOpen={isInfoModalOpen} />
		</div>
	);
};

export default ReferralsBlock;
