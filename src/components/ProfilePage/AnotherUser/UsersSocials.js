import React from "react";
import Image from "next/image";

import twitterImg from "../../../assets/img/FaqPage/twitter.png";
import discordImg from "../../../assets/img/FaqPage/discord.png";

import "../../../assets/scss/User/UserPage/UsersSocials.scss";

const UsersSocials = ({ twitterUsername, discordUsername }) => {
	const twitterClickHandler = () => {
		window.open(`https://twitter.com/${twitterUsername}`, "_blank");
	};

	const userSocials = [
		{ id: "twitter", title: twitterUsername ? `@${twitterUsername}` : "", img: twitterImg, onClick: twitterClickHandler },
		{ id: "discord", title: discordUsername ? `@${discordUsername}` : "", img: discordImg },
	];

	const isSocials = userSocials.find(({ title }) => !!title);

	return (
		isSocials && (
			<div className="socials-con-wrapper">
				<div className="block-title">Socials</div>
				<div className="socials-con">
					{userSocials.map(
						({ id, title, img, onClick }) =>
							!!title && (
								<div key={`socials-con${id}`} className={`social-item ${id === "twitter" ? "cursor-pointer" : ""}`} onClick={onClick}>
									<div className="info-wrap">
										<div className="img-con">
											<Image src={img} alt={""} width={24} height={24} />
										</div>
										<div className="descr">{title}</div>
									</div>
								</div>
							)
					)}
				</div>
			</div>
		)
	);
};

export default UsersSocials;
