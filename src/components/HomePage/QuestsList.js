import React, { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

import noQuestsImg from "../../assets/img/HomePage/noQuests.png";
import noQuestsBgImg from "../../assets/img/HomePage/noQuestsBg.png";

import "../../assets/scss/HomePage/QuestsList.scss";
import fetchWithToken from "../../helpers/fetchWithToken";
import customToast from "../../helpers/customToast";

const Skeleton = dynamic(() => import("react-loading-skeleton"));

const QuestsList = ({ blockTitle, quests, isLoading, onQuestStatusChange }) => {
	const [isLoadingQuest, setIsLoadingQuest] = useState(false);
	const postCompleteQuest = async (questId) => {
		if (isLoadingQuest) {
			return;
		}

		try {
			setIsLoadingQuest(true);

			const res = await fetchWithToken("/quest/complete-quest", {
				method: "POST",
				body: {
					questId,
				},
			});

			if (!res?.success) {
				customToast({ toastId: "/quest/complete-quest", type: "error", message: "Something went wrong while complete quest. Please try again later." });
				return false;
			}

			onQuestStatusChange(questId, "DONE");
		} catch (e) {
			console.error(e);
		} finally {
			setIsLoadingQuest(false);
		}
	};
	const onQuestClick = (quest) => {
		if (quest.status === "DONE") {
			return;
		}

		if (quest?.data?.action === "link") {
			if (quest?.data?.url) {
				postCompleteQuest(quest._id);
				window.open(quest?.data?.url, "_blank");
			}
		}
	};
	return (
		<div className="custom-quests-con">
			<div className="block-title">{blockTitle}</div>
			{isLoading && (
				<div className="custom-quests-list">
					{new Array(3).fill(null).map((_, i) => (
						<div key={`custom-quests-list-sceleton${i}`} className="custom-quest-item d-block p-0 overflow-hidden">
							<Skeleton baseColor="#ffffff00" highlightColor="#ffffff26" width={"100%"} height={83} />
						</div>
					))}
				</div>
			)}
			{!isLoading && !!quests.length && (
				<div className="custom-quests-list">
					{quests.map((quest) => (
						<div key={quest._id} className="custom-quest-item">
							<div className="main-info-con">
								<div className="icon-con">
									<div className="icon-wrapper"></div>
								</div>
								<div className="info-con">
									<div className="title">{quest.title}</div>
									<div className="rewards-con">
										{!!quest?.rewards?.length &&
											quest.rewards.map(({ code, amount }) => (
												<div key={`reward-item${code}${amount}`} className="reward-item">
													<div className="reward-title">{`${code}`.toUpperCase()}</div>
													<div className="reward-value">+{amount}</div>
												</div>
											))}
									</div>
								</div>
							</div>
							<div className={`btn-con f-center ${quest.status}`} onClick={() => onQuestClick(quest)}>
								{quest.status === "NEW" && "Start"}
								{quest.status === "DONE" && "Claimed"}
							</div>
						</div>
					))}
				</div>
			)}
			{!isLoading && !quests.length && (
				<div className="no-quests-con">
					<div className="bg-img">
						<Image src={noQuestsBgImg} alt={""} layout={"fill"} />
					</div>
					<div className="img-con">
						<Image src={noQuestsImg} alt={""} width={48} height={48} />
					</div>
					<div className="title">Coming soon!</div>
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

export default QuestsList;
