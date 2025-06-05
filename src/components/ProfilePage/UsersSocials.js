import React from "react";
import Image from "next/image";

import { useAppSelector } from "../../redux";

import twitterImg from "../../assets/img/FaqPage/twitter.png";
import discordImg from "../../assets/img/FaqPage/discord.png";
import editImg from "../../assets/img/common/edit.svg";

import "../../assets/scss/ProfilePage/UsersSocials.scss";
import fetchWithToken from "../../helpers/fetchWithToken";

const UsersSocials = () => {
	const twitterUsername = useAppSelector((state) => state.main.user.twitterData.username);
	const discordUsername = useAppSelector((state) => state.main.user.discordData.username);

	const fetchTwitterToken = async () => {
		try {
			const { data, error } = await fetchWithToken("/twitter/auth", {
				method: "GET",
			});
			return data;
		} catch (error) {
			console.error(error);
		}
	};

	const authTwitter = async () => {
		const token = await fetchTwitterToken();
		window.location.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${token}`;
	};

	const twitterClickHandler = () => {
		if (!twitterUsername) {
			authTwitter();
		} else {
			window.open(`https://twitter.com/${twitterUsername}`, "_blank");
		}
	};

	const userSocials = [
		{ id: "twitter", title: twitterUsername ? `@${twitterUsername}` : "Connect", img: twitterImg, onClick: twitterClickHandler },
		{ id: "discord", title: discordUsername ? `@${discordUsername}` : "Connect", img: discordImg },
	];

	return (
		<div className="socials-con-wrapper">
			<div className="block-title">Socials</div>
			<div className="socials-con">
				{userSocials.map(({ id, title, img, onClick }) => (
					<div key={`socials-con${id}`} className="social-item" onClick={onClick}>
						<div className="info-wrap">
							<div className="img-con">
								<Image src={img} alt={""} width={24} height={24} />
							</div>
							<div className="descr">{title}</div>
						</div>
						<div className="edit-btn f-center">
							<Image src={editImg} alt={""} width={18} height={18} />
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default UsersSocials;
