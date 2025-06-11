import React, { useEffect, useState } from "react";
import Image from "next/image";
import { UncontrolledTooltip } from "reactstrap";

import fetchWithToken from "../../helpers/fetchWithToken";
import { useAppSelector } from "../../redux";

import badge1m from "../../assets/img/ProfilePage/badges/1m.png";
import badge1w from "../../assets/img/ProfilePage/badges/1w.png";
import badge60d from "../../assets/img/ProfilePage/badges/60d.png";
import badge90d from "../../assets/img/ProfilePage/badges/90d.png";
import badgeLock from "../../assets/img/ProfilePage/badges/lock.png";

import "../../assets/scss/ProfilePage/BadgesBlock.scss";

const badgeImages = [
	{
		code: "badge1m",
		image: badge1m,
		hint: "You have been registered for 1 month",
	},
	{
		code: "badge1w",
		image: badge1w,
		hint: "You have been registered for 1 week",
	},
	{
		code: "badge60d",
		image: badge60d,
		hint: "You have been registered for 60 days",
	},
	{
		code: "badge90d",
		image: badge90d,
		hint: "You have been registered for 90 days",
	},
	{
		code: "bronzelottery",
		image: badgeLock,
		hint: "Bronze Lottery Badge",
	},
	{
		code: "silverlottery",
		image: badgeLock,
		hint: "Silver Lottery Badge",
	},
	{
		code: "goldlottery",
		image: badgeLock,
		hint: "Gold Lottery Badge",
	},
	{
		code: "platinumlottery",
		image: badgeLock,
		hint: "Platinum Lottery Badge",
	},
	{
		code: "lucky",
		image: badgeLock,
		hint: "Lucky Badge",
	},
	{
		code: "discord",
		image: badgeLock,
		hint: "Discord Badge",
	},
	{
		code: "twitter",
		image: badgeLock,
		hint: "Twitter Badge",
	},
];

const BadgesBlock = () => {
	const [badges, setBadges] = useState([]);
	const userBadges = useAppSelector((state) => state.main.user.badges);
	const createdAt = useAppSelector((state) => state.main.user.createdAt);

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
		const { success, data } = await fetchWithToken("/info/badges");
		if (success) {
			const apiBadges = data.map((b) => {
				const { image } = badgeImages.find((img) => img.code === b.code);
				const exist = userBadges.find((ub) => ub === b.id);
				return {
					name: b.name,
					code: b.code,
					image,
					exist: exist !== undefined,
					hint: badgeImages.find((img) => img.code === b.code)?.hint,
				};
			});

			const allBadges = [...apiBadges];

			const registrationBadgeId = getRegistrationBadge();

			if (registrationBadgeId) {
				const regBadge = {
					name: "Registration Badge",
					code: registrationBadgeId,
					image: badgeImages.find((img) => img.code === registrationBadgeId).image,
					hint: badgeImages.find((img) => img.code === registrationBadgeId)?.hint,
					exist: true,
				};
				allBadges.push(regBadge);
			}

			setBadges(allBadges.filter(({ exist }) => !!exist));
		} else {
			console.error("Failed to fetch badges");
		}
	};

	useEffect(() => {
		fetchBadges();
	}, []);

	return (
		!!badges.length && (
			<div className="badges-block-con">
				<div className="block-title">Badges</div>
				<div className="badges-con">
					{badges.length > 0 &&
						badges.map((badge) => (
							<div id={`badge-${badge.code}`} className="badge-img-con f-center" key={badge.name}>
								<Image src={badge.image} alt={""} width={64} height={72} />
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
			</div>
		)
	);
};

export default BadgesBlock;
