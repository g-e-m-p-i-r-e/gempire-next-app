import React, { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

import sliceAddress from "../../helpers/sliceAddress";
import numberWithSeparator from "../../helpers/numberWithSeparator";

import LinkElement from "../SingleComponents/LinkElement";

import noQuestsBgImg from "../../assets/img/HomePage/noQuestsBg.png";
import noQuestsImg from "../../assets/img/HomePage/noQuests.png";

import "../../assets/scss/HomePage/ActivitiesList.scss";

const Skeleton = dynamic(() => import("react-loading-skeleton"));

const filterItems = [
	{
		id: "all",
		title: "All",
	},
	{
		id: "lottery",
		title: "Lottery",
	},
	{
		id: "quest",
		title: "Quests",
	},
];

const ActivitiesList = ({ isLoading, blockTitle, activities, withFilter }) => {
	const [activeFilter, setActiveFilter] = useState("all");
	const [itemsFiltered, setItemsFiltered] = useState([]);

	useEffect(() => {
		if (activeFilter === "all") {
			setItemsFiltered(activities);
		} else {
			setItemsFiltered(activities.filter((item) => item.actionType === activeFilter));
		}
	}, [activeFilter, activities]);

	return (
		<div className="custom-activities-con">
			<div className="block-title">{blockTitle}</div>
			{withFilter && !!activities.length && (
				<div className="filters-con">
					{filterItems.map(({ id, title }) => (
						<div key={`filter-item${id}`} className={`filter-item ${id === activeFilter ? "active" : ""}`} onClick={() => !isLoading && setActiveFilter(id)}>
							{title}
						</div>
					))}
				</div>
			)}
			{isLoading && (
				<div className="activities-list">
					{new Array(7).fill(null).map((_, i) => (
						<div key={`activity-item-sceleton${i}`} className="activity-item d-block overflow-hidden">
							<div className="title">
								<Skeleton baseColor="#ffffff00" highlightColor="#ffffff26" width={"100%"} height={24} />
							</div>
						</div>
					))}
				</div>
			)}
			{!isLoading && !!activities.length && (
				<div className="activities-list">
					{itemsFiltered.map(({ _id, userTag, userId, actionType, rewards }) => {
						const username = userTag.startsWith("0x") ? sliceAddress(userTag) : userTag;

						return (
							<div key={`activity-item${_id}`} className="activity-item">
								<div className="title">
									<p>
										<LinkElement href={`/user/${userId}`} className={"link-item"}>
											@{username}
										</LinkElement>
										{actionType === "lottery" ? " won the lottery" : " completed the quest"}
									</p>
								</div>
								<div className="rewards-con">
									{rewards.map(({ type, amount }) => (
										<div key={`reward-item-${type}`} className="reward-item">
											<div className="reward-title">{type}</div>
											{!!amount && <div className="reward-value">+{numberWithSeparator(amount, ",")}</div>}
										</div>
									))}
								</div>
							</div>
						);
					})}
				</div>
			)}
			{!isLoading && !activities.length && (
				<div className="no-activities-con">
					<div className="bg-img">
						<Image src={noQuestsBgImg} alt={""} layout={"fill"} />
					</div>
					<div className="img-con">
						<Image src={noQuestsImg} alt={""} width={48} height={48} />
					</div>
					<div className="title">No activities yet!</div>
					<div className="descr">
						Bigger rewards.
						<br />
						Longer grind. Stay tuned. 💥
					</div>
				</div>
			)}
		</div>
	);
};

export default ActivitiesList;
