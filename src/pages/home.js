import React, { useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Col, Container, Row } from "reactstrap";
import Image from "next/image";

import getSEOOptions from "../helpers/getSEOOptions";
import fetchWithToken from "../helpers/fetchWithToken";
import customToast from "../helpers/customToast";
import { useAppDispatch, useAppSelector } from "../redux";
import { addCompletedQuest } from "../redux/slices/main";

import QuestsList from "../components/HomePage/QuestsList";
import LotteryRow from "../components/LotteryPage/LotteryRow";
import LinkElement from "../components/SingleComponents/LinkElement";

import aboutDesktopImg from "../assets/img/HomePage/aboutBg.png";
import aboutBgMobileImg from "../assets/img/HomePage/aboutBgMobile.png";

import "../assets/scss/HomePage/main.scss";

const Home = () => {
	const dispatch = useAppDispatch();
	const userQuestsProgress = useAppSelector((state) => state.main.user.quests);
	const isMobile = useAppSelector((state) => state.main.isMobile);

	const [isQuestsLoading, setIsQuestsLoading] = useState(true);

	const [dailyQuests, setDailyQuests] = useState([]);
	const [weeklyQuests, setWeeklyQuests] = useState([]);

	const getQuests = async () => {
		try {
			setIsQuestsLoading(true);

			const questRes = await fetchWithToken("/quest?limit=50&page=0");

			if (!questRes?.success) {
				customToast({ toastId: "/quest", type: "error", message: "Something went wrong while get quests list. Please try again later." });
				return false;
			}

			const { daily, weekly } = questRes?.data?.reduce(
				(acc, quest) => {
					const progress = userQuestsProgress.find((pr) => pr.questId === quest._id);
					let status = "NEW";

					if (progress?.completedAt) {
						status = "DONE";
					}

					const newItem = {
						...quest,
						status,
					};

					if (quest.type === "weekly") {
						acc.weekly.push(newItem);
					} else {
						acc.daily.push(newItem);
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

		if (status === "DONE") {
			dispatch(
				addCompletedQuest({
					questId,
					completedAt: Date.now(),
				})
			);
		}
		setDailyQuests(updatedDailyQuests);
		setWeeklyQuests(updatedWeeklyQuests);
	};

	useEffect(() => {
		getQuests();
	}, []);

	return (
		<div className="home-page-con">
			<Container>
				<Row className="justify-content-center">
					<Col xl={10}>
						<div className="test-con">
							<LotteryRow />
						</div>
						<div className="page-content-wrap">
							<div className="side-con">
								<QuestsList isLoading={isQuestsLoading} blockTitle={"Daily Mission Cards"} quests={dailyQuests} onQuestStatusChange={onQuestStatusChange} />
							</div>
							<div className="side-con">
								<QuestsList isLoading={isQuestsLoading} blockTitle={"Weekly Mission Cards"} quests={weeklyQuests} onQuestStatusChange={onQuestStatusChange} />
							</div>
						</div>
					</Col>
				</Row>
				<Row className="justify-content-center">
					<Col xl={10}>
						<div className="about-block-con">
							<div className="img-con">
								<Image src={isMobile ? aboutBgMobileImg : aboutDesktopImg} alt={""} width={isMobile ? 500 : 1074} height={201} />
							</div>
							<div className="about-con-wrap">
								<div className="descr-con">
									<div className="title">Stay tuned,</div>
									<div className="descr">it's on the way!</div>
								</div>
								<LinkElement href={"/faq"} className="btn-item f-center">
									About Us
								</LinkElement>
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
