import React from "react";

import { useAppSelector } from "../../redux";
import numberWithSeparator from "../../helpers/numberWithSeparator";

import ImageFallback from "../SingleComponents/ImageFallback";

import defaultAvatar from "../../assets/img/LoginPage/avatars/avatar1.png";

const MainInfo = (props) => {
	const username = useAppSelector((state) => state.main.user.username);
	const xp = useAppSelector((state) => state.main.user.xp);
	const balance = useAppSelector((state) => state.main.user.balance);

	const userLvlStats = [
		{ id: "xp", title: "XP", value: xp },
		{ id: "gemp", title: "GEMP", value: balance },
	];

	return (
		<div className="main-info-con">
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
