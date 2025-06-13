import React, { useEffect, useState } from "react";
import Image from "next/image";
import { UncontrolledTooltip } from "reactstrap";

import fetchWithToken from "../../helpers/fetchWithToken";

import badge1m from "../../assets/img/ProfilePage/badges/1m.png";
import badge1w from "../../assets/img/ProfilePage/badges/1w.png";
import badge60d from "../../assets/img/ProfilePage/badges/60d.png";
import badge90d from "../../assets/img/ProfilePage/badges/90d.png";
import discord from "../../assets/img/ProfilePage/badges/discord.png";
import twitter from "../../assets/img/ProfilePage/badges/twitter.png";
import lotteryBronze from "../../assets/img/ProfilePage/badges/lotteryBronze.png";
import lotterySilver from "../../assets/img/ProfilePage/badges/lotterySilver.png";
import lotteryGold from "../../assets/img/ProfilePage/badges/lotteryGold.png";
import lotteryPlatinum from "../../assets/img/ProfilePage/badges/lotteryPlatinum.png";
import emojiSadImg from "../../assets/img/common/emojiSad.svg";

import "../../assets/scss/ProfilePage/BadgesBlock.scss";

const badgeImages = [
	{
		code: "badge1m",
		image: badge1m,
		hint: "Registered for 1 month",
	},
	{
		code: "badge1w",
		image: badge1w,
		hint: "Registered for 1 week",
	},
	{
		code: "badge60d",
		image: badge60d,
		hint: "Registered for 60 days",
	},
	{
		code: "badge90d",
		image: badge90d,
		hint: "Registered for 90 days",
	},
	{
		code: "bronzelottery",
		image: lotteryBronze,
		hint: "Bronze Lottery Badge",
	},
	{
		code: "silverlottery",
		image: lotterySilver,
		hint: "Silver Lottery Badge",
	},
	{
		code: "goldlottery",
		image: lotteryGold,
		hint: "Gold Lottery Badge",
	},
	{
		code: "platinumlottery",
		image: lotteryPlatinum,
		hint: "Platinum Lottery Badge",
	},
	{
		code: "discord",
		image: discord,
		hint: "Discord Badge",
	},
	{
		code: "twitter",
		image: twitter,
		hint: "Twitter Badge",
	},
	{
		code: "incrypted",
		image: lotteryPlatinum,
		hint: "Participated in Incrypted 2025",
	},
];

const BadgesBlock = ({ userBadges, registrationDate: createdAt }) => {
	const [badges, setBadges] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const getRegistrationBadge = () => {
		if (!createdAt) return null;

		const registrationDate = new Date(createdAt);
		const currentDate = new Date();
		const daysDiff = Math.floor((currentDate - registrationDate) / (1000 * 60 * 60 * 24));

		if (daysDiff >= 90) return "badge90d";
		if (daysDiff >= 60) return "badge60d";
		if (daysDiff >= 30) return "badge1m";
		if (daysDiff >= 7) return "badge1w";
		return null;
	};
	const fetchBadges = async () => {
		try {
			setIsLoading(true);
			const userBadgesArray = [];

			const registrationBadgeId = getRegistrationBadge();
			if (registrationBadgeId) {
				const { image, hint } = badgeImages.find((img) => img.code === registrationBadgeId);
				userBadgesArray.push({
					code: registrationBadgeId,
					image,
					hint,
				});
			}

			if (!userBadges.length) {
				setBadges(userBadgesArray);
				return;
			}

			const { success, data } = await fetchWithToken("/info/badges");

			if (!success) {
				console.error("Failed to fetch badges from server");
				return;
			}

			data.forEach((b) => {
				const exist = userBadges.find((ub) => ub === b.id);

				if (exist) {
					const { image, hint } = badgeImages.find((img) => img.code === b.code);

					userBadgesArray.push({
						code: b.code,
						image,
						hint,
					});
				}
			});

			setBadges(userBadgesArray);
		} catch (e) {
			console.error("Error fetching badges:", e);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchBadges();
	}, []);

	return (
		!isLoading && (
			<div className="badges-block-con">
				<div className="block-title">Badges</div>
				{!!badges.length && (
					<div className="badges-con">
						{badges.map((badge) => (
							<div id={`badge-${badge.code}`} className="badge-img-con f-center" key={`badge-${badge.code}`}>
								<Image src={badge.image} alt={""} width={72} height={81} />
								{badge.hint && (
									<UncontrolledTooltip target={`badge-${badge.code}`} placement={"top"} className="badge-info-tooltip">
										{badge.hint}
									</UncontrolledTooltip>
								)}
							</div>
						))}
						<div className="row-aligner"></div>
						<div className="row-aligner"></div>
						<div className="row-aligner"></div>
						<div className="row-aligner"></div>
						<div className="row-aligner"></div>
						<div className="row-aligner"></div>
					</div>
				)}
				{!badges.length && (
					<div className="badges-con">
						<div className="empty-list">
							<div className="img-con">
								<Image src={emojiSadImg} alt={""} width={36} height={36} />
							</div>
							<div className="descr">No earned badges yet</div>
						</div>
					</div>
				)}
			</div>
		)
	);
};

export default BadgesBlock;
