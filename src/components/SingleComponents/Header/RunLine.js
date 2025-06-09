import React, { useEffect, useState } from "react";

import fetchWithToken from "../../../helpers/fetchWithToken";
import sliceAddress from "../../../helpers/sliceAddress";

import LinkElement from "../LinkElement";

import "../../../assets/scss/SingleComponents/Header/RunLine.scss";

const RunLine = () => {
	const [items, setItems] = useState([]);
	const [activeItem, setActiveItem] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const onFadeOut = ({ animationName }) => {
		if (animationName === "line-message-out") {
			setActiveItem(null);
		}
	};

	const getGlobalActivities = async () => {
		if (isLoading) return;

		try {
			setIsLoading(true);
			const res = await fetchWithToken("/history/global?limit=20&page=0");

			if (!res?.success || !res?.data) {
				return;
			}

			const activitiesMapped = res?.data.map((activity) => ({
				id: activity._id,
				...activity,
			}));

			setItems(activitiesMapped);
		} catch (e) {
			console.error("Error getGlobalActivities:", e);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getGlobalActivities();
	}, []);

	useEffect(() => {
		if (!activeItem && !!items.length) {
			setActiveItem(items[Math.floor(Math.random() * items.length)]);
		}
	}, [activeItem, items.length]);

	const username = activeItem ? (activeItem.userTag.startsWith("0x") ? sliceAddress(activeItem.userTag) : activeItem.userTag) : "";

	return (
		<div className="run-line-con">
			{activeItem && (
				<div className="line-message-con fade-in-con">
					<div className="line-message-con fade-out-con" onAnimationEnd={onFadeOut}>
						<div className="descr">
							<LinkElement href={`/user/${activeItem.userTag}`} className={"link-item"}>
								@{username}
							</LinkElement>
							{activeItem.actionType === "lottery" ? " won the lottery" : " completed the quest"}
						</div>
						<div className="rewards-con">
							{!!activeItem?.rewards?.length &&
								activeItem.rewards.map(({ type, amount }) => (
									<div key={`reward-item${type}${amount}`} className="reward-item">
										<div className="reward-title">{type === "tickets" ? `${type}` : `${type}`.toUpperCase()}</div>
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
