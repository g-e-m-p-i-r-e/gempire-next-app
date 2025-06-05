import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import getSEOOptions from "../helpers/getSEOOptions";

import LotteryRow from "../components/LotteryPage/LotteryRow";

import "../assets/scss/LotteryPage/main.scss";
import ActivitiesList from "../components/HomePage/ActivitiesList";
import LotteryFAQ from "../components/LotteryPage/LotteryFAQ";
import fetchWithToken from "../helpers/fetchWithToken";
import customToast from "../helpers/customToast";

const Lottery = () => {
	const [isGlobalHistoryLoading, setIsGlobalHistoryLoading] = useState(false);
	const [isUserHistoryLoading, setIsUserHistoryLoading] = useState(false);

	const [globalHistory, setGlobalHistory] = useState([]);
	const [userHistory, setUserHistory] = useState([]);

	const fetchUserHistory = async () => {
		try {
			setIsUserHistoryLoading(true);
			const { success, data } = await fetchWithToken("/activity/spins?limit=15&page=0");

			if (!success) {
				customToast({ toastId: "/user/nonce", type: "error", message: "Something went wrong while fetching history" });
				return;
			}

			if (data) {
				const activitiesMapped = data.map((activity) => ({
					id: activity._id,
					...activity,
				}));
				setUserHistory(activitiesMapped);
				setIsUserHistoryLoading(false);
			}
		} catch (e) {
			console.error("Error fetching user history:", e);
		}
	};

	const fetchGlobalHistory = async () => {
		try {
			setIsGlobalHistoryLoading(true);
			const { success, data } = await fetchWithToken("/activity/spins/global?limit=15&page=0");
			if (!success) {
				customToast({ toastId: "/user/nonce", type: "error", message: "Something went wrong while fetching history" });
				return;
			}
			if (data) {
				const activitiesMapped = data.map((activity) => ({
					id: activity._id,
					...activity,
				}));
				setIsGlobalHistoryLoading(false);
				setGlobalHistory(activitiesMapped);
			}
		} catch (e) {
			console.error("Error fetching global history:", e);
		}
	};

	useEffect(() => {
		fetchGlobalHistory();
		fetchUserHistory();
	}, []);

	return (
		<div className="lottery-page-con">
			<Container>
				<Row className="justify-content-center">
					<Col xl={10}>
						<div className="page-content-wrap">
							<div className="side-con">
								<LotteryRow />
								{globalHistory.length > 0 && <ActivitiesList isLoading={isGlobalHistoryLoading} activities={globalHistory} blockTitle={"Player’s spins"} withFilter={false} />}
							</div>
							<div className="side-con">
								{userHistory.length > 0 && <ActivitiesList isLoading={isUserHistoryLoading} activities={userHistory} blockTitle={"Your spins"} withFilter={false} />}
								<LotteryFAQ />
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

export default Lottery;
