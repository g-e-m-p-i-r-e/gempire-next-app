import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import getSEOOptions from "../helpers/getSEOOptions";

import LotteryRow from "../components/LotteryPage/LotteryRow";

import "../assets/scss/LotteryPage/main.scss";
import ActivitiesList from "../components/HomePage/ActivitiesList";
import LotteryFAQ from "../components/LotteryPage/LotteryFAQ";

const Lottery = () => {
	const [isGlobalHistoryLoading, setIsGlobalHistoryLoading] = useState(false);
	const [isUserHistoryLoading, setIsUserHistoryLoading] = useState(false);

	const [globalHistory, setGlobalHistory] = useState([
		{
			_id: "1",
			title: "@Zed won the lottery",
			rewards: [{ code: "GEMP", amount: 1000 }],
		},
		{
			_id: "2",
			title: "@Alice won the lottery",
			rewards: [{ code: "XP", amount: 500 }],
		},
		{
			_id: "3",
			title: "@Bob won the lottery",
			rewards: [{ code: "mon", amount: 1 }],
		},
	]);
	const [userHistory, setUserHistory] = useState([]);

	return (
		<div className="lottery-page-con">
			<Container>
				<Row className="justify-content-center">
					<Col xl={10}>
						<div className="page-content-wrap">
							<div className="side-con">
								<LotteryRow />
								<ActivitiesList isLoading={isGlobalHistoryLoading} activities={globalHistory} blockTitle={"Player’s spins"} withFilter={false} />
							</div>
							<div className="side-con">
								<ActivitiesList isLoading={isGlobalHistoryLoading} activities={userHistory} blockTitle={"Your spins"} withFilter={false} />
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
