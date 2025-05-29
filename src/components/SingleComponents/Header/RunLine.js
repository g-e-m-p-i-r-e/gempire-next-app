import React, { useEffect, useState } from "react";

import "../../../assets/scss/SingleComponents/Header/RunLine.scss";

const items = [
	{
		_id: "12345",
		username: "Zed",
		rewards: [
			{ code: "gemp", amount: 100 },
			{ code: "xp", amount: 50 },
		],
	},
	{
		_id: "1",
		username: "Anonym",
		rewards: [
			{ code: "gemp", amount: 100 },
			{ code: "xp", amount: 50 },
		],
	},
	{
		_id: "2",
		username: "Andry",
		rewards: [{ code: "gemp", amount: 100 }],
	},
	{
		_id: "3",
		username: "yourmom",
		rewards: [{ code: "gemp", amount: 100.11 }],
	},
];

const RunLine = () => {
	const [activeItem, setActiveItem] = useState(null);

	const onFadeOut = ({ animationName }) => {
		if (animationName === "line-message-out") {
			setActiveItem(null);
		}
	};

	useEffect(() => {
		if (!activeItem) {
			setActiveItem(items[Math.floor(Math.random() * items.length)]);
		}
	}, [activeItem]);

	return (
		<div className="run-line-con">
			{activeItem && (
				<div className="line-message-con fade-in-con">
					<div className="line-message-con fade-out-con" onAnimationEnd={onFadeOut}>
						<div className="descr">@{activeItem.username} completed the mission</div>
						<div className="rewards-con">
							{!!activeItem?.rewards?.length &&
								activeItem.rewards.map(({ code, amount }) => (
									<div key={`reward-item${code}${amount}`} className="reward-item">
										<div className="reward-title">{`${code}`.toUpperCase()}</div>
										<div className="reward-value">+{amount}</div>
									</div>
								))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default RunLine;
