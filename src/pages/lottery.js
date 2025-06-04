import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import getSEOOptions from "../helpers/getSEOOptions";

import LotteryRow from "../components/LotteryPage/LotteryRow";

import "../assets/scss/LotteryPage/main.scss";
import ActivitiesList from "../components/HomePage/ActivitiesList";
import LotteryFAQ from "../components/LotteryPage/LotteryFAQ";
import fetchWithToken from "../helpers/fetchWithToken";
import sliceAddress from "../helpers/sliceAddress";

const Lottery = () => {
	const [isGlobalHistoryLoading, setIsGlobalHistoryLoading] = useState(false);
	const [isUserHistoryLoading, setIsUserHistoryLoading] = useState(false);

	const [globalHistory, setGlobalHistory] = useState([]);
	const [userHistory, setUserHistory] = useState([]);

	const fetchUserHistory = async () => {
		const { success, data } = await fetchWithToken("/activity/spins");
		if (data) {
			const activitiesMapped = data.map((activity) => {
				const userTag = activity.userTag.startsWith("0x") ? sliceAddress(activity.userTag) : activity.userTag;
				const title = `@${userTag} won the lottery`;
				return {
					id: activity._id,
					title,
					...activity,
				};
			});
			setUserHistory(activitiesMapped);
		}
	};

	const fetchGlobalHistory = async () => {
		const { success, data } = await fetchWithToken("/activity/spins/global");
		if (data) {
			const activitiesMapped = data.map((activity) => {
				const userTag = activity.userTag.startsWith("0x") ? sliceAddress(activity.userTag) : activity.userTag;
				const title = `@${userTag} won the lottery`;
				return {
					id: activity._id,
					title,
					...activity,
				};
			});
			setGlobalHistory(activitiesMapped);
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
								{userHistory.length > 0 && <ActivitiesList isLoading={isGlobalHistoryLoading} activities={userHistory} blockTitle={"Your spins"} withFilter={false} />}
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
