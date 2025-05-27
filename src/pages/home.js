import React, { useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Col, Container, Row } from "reactstrap";

import getSEOOptions from "../helpers/getSEOOptions";
import fetchWithToken from "../helpers/fetchWithToken";
import customToast from "../helpers/customToast";
import { useAppSelector } from "../redux";

import QuestsList from "../components/HomePage/QuestsList";
import ActivitiesList from "../components/HomePage/ActivitiesList";

import "../assets/scss/HomePage/main.scss";

const Home = () => {
	const userQuestsProgress = useAppSelector((state) => state.main.user.quests);

	const [isQuestsLoading, setIsQuestsLoading] = useState(true);
	const [isActivityLoading, setIsActivityLoading] = useState(true);
	const [isUserActivityLoading, setIsUserActivityLoading] = useState(true);

	const [dailyQuests, setDailyQuests] = useState([]);
	const [weeklyQuests, setWeeklyQuests] = useState([]);
	const [activities, setActivities] = useState([]);
	const [userActivities, setUserActivities] = useState([]);

	const getQuests = async () => {
		try {
			setIsQuestsLoading(true);

			const questRes = await fetchWithToken("/quest");

			if (!questRes?.success) {
				customToast({ toastId: "/quest", type: "error", message: "Something went wrong while get quests list. Please try again later." });
				return false;
			}

			const { daily, weekly } = questRes?.data.reduce(
				(acc, quest) => {
					const progress = userQuestsProgress.find((progress) => progress.questId === quest._id);
					let status = "NEW";

					if (!!progress.completedAt) {
						status = "DONE";
					}

					const newItem = {
						...quest,
						status,
					};

					if (quest.type === "daily") {
						acc.daily.push(newItem);
					} else if (quest.type === "weekly") {
						acc.weekly.push(newItem);
					}
					return acc;
				},
				{ daily: [], weekly: [] }
			);

			setDailyQuests(daily);
			setWeeklyQuests(weekly);
		} catch (e) {
			console.error("Error getQuests:", e);
		} finally {
			setIsQuestsLoading(false);
		}
	};

	const getActivities = async () => {
		try {
			setIsActivityLoading(true);
			const res = await fetchWithToken("/activity");

			if (!res?.success || !res?.data) {
				customToast({ toastId: "/activity", type: "error", message: "Something went wrong while get activities list. Please try again later." });
				return false;
			}

			setActivities(res?.data);
		} catch (e) {
			console.error("Error getActivities:", e);
		} finally {
			setIsActivityLoading(false);
		}
	};
	const getUserActivities = async () => {
		try {
			setIsUserActivityLoading(true);
			const res = await fetchWithToken("/activity/last");

			if (!res?.success || !res?.data) {
				customToast({ toastId: "/activity/last", type: "error", message: "Something went wrong while get activities list. Please try again later." });
				return false;
			}

			setUserActivities(res?.data);
		} catch (e) {
			console.error("Error getUserActivities:", e);
		} finally {
			setIsUserActivityLoading(false);
		}
	};

	const onQuestStatusChange = (questId, status) => {
		const updatedDailyQuests = dailyQuests.map((quest) => {
			if (quest._id === questId) {
				return { ...quest, status };
			}
			return quest;
		});

		const updatedWeeklyQuests = weeklyQuests.map((quest) => {
			if (quest._id === questId) {
				return { ...quest, status };
			}
			return quest;
		});

		setDailyQuests(updatedDailyQuests);
		setWeeklyQuests(updatedWeeklyQuests);
	};

	useEffect(() => {
		getQuests();
		getActivities();
		getUserActivities();
	}, []);

	return (
		<div className="home-page-con">
			<Container>
				<Row className="justify-content-center">
					<Col xl={10}>
						<div className="page-content-wrap">
							<div className="side-con">
								<QuestsList isLoading={isQuestsLoading} blockTitle={"Daily Mission Cards"} quests={dailyQuests} onQuestStatusChange={onQuestStatusChange} />
								<QuestsList isLoading={isQuestsLoading} blockTitle={"Weekly Mission Cards"} quests={weeklyQuests} />
							</div>
							<div className="side-con">
								<ActivitiesList isLoading={isActivityLoading} blockTitle={"Recent activities of all players"} activities={activities} />
								<ActivitiesList isLoading={isUserActivityLoading} blockTitle={"Your activities"} activities={userActivities} withFilter />
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export const getServerSideProps = async ({ locale, resolvedUrl }) => ({
	props: {
		...(await serverSideTranslations(locale, ["common"])),
		...getSEOOptions(resolvedUrl),
	},
});
export default Home;
