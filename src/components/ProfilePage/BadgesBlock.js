import React, { useEffect, useState } from "react";
import Image from "next/image";

import badge1m from "../../assets/img/ProfilePage/badges/1m.png";
import badge1w from "../../assets/img/ProfilePage/badges/1w.png";
import badge60d from "../../assets/img/ProfilePage/badges/60d.png";
import badge90d from "../../assets/img/ProfilePage/badges/90d.png";
import badgeLock from "../../assets/img/ProfilePage/badges/lock.png";

import "../../assets/scss/ProfilePage/BadgesBlock.scss";
import fetchWithToken from "../../helpers/fetchWithToken";
import { useAppSelector } from "../../redux";

const badgeImages = [
	{
		code: "badge1m",
		image: badge1m,
	},
	{
		code: "badge1w",
		image: badge1w,
	},
	{
		code: "badge60d",
		image: badge60d,
	},
	{
		code: "badge90d",
		image: badge90d,
	},
	{
		code: "lucky",
		image: badgeLock,
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
	const registrationBadgeId = getRegistrationBadge();
	const fetchBadges = async () => {
		const { success, data } = await fetchWithToken("/info/badges");
		if (success) {
			const apiBadges = data.map((b) => {
				const image = badgeImages.find((img) => img.code === b.code).image;
				const exist = userBadges.find((ub) => ub === b.id);
				return {
					name: b.name,
					code: b.code,
					image,
					exist: exist !== undefined,
				};
			});

			const allBadges = [...apiBadges];

			if (registrationBadgeId) {
				const regBadge = {
					name: "Registration Badge",
					code: registrationBadgeId,
					image: badgeImages.find((img) => img.code === registrationBadgeId).image,
					exist: true,
				};
				allBadges.push(regBadge);
			}

			console.log(allBadges);

			setBadges(allBadges);
		} else {
			console.error("Failed to fetch badges");
		}
	};

	useEffect(() => {
		fetchBadges();
	}, []);

	return (
		<div className="badges-block-con">
			<div className="block-title">Badges</div>
			<div className="badges-con">
				{badges.length > 0 &&
					badges
						.filter((badge) => badge.exist)
						.map((badge) => (
							<div className="badge-img-con f-center" key={badge.name}>
								<Image src={badge.image} alt={""} width={64} height={72} />
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
	);
};

export default BadgesBlock;
