import React, { useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Col, Container, Dropdown, DropdownMenu, DropdownToggle, Row } from "reactstrap";
import Image from "next/image";

import getSEOOptions from "../helpers/getSEOOptions";
import numberWithSeparator from "../helpers/numberWithSeparator";
import { useAppSelector } from "../redux";

import UserStatsInfo from "../components/RanksPage/UserStatsInfo";
import LeadersList from "../components/RanksPage/LeadersList";

import testAvatar from "../assets/img/LoginPage/avatars/avatar2.png";
import arrowWhiteIcon from "../assets/img/common/arrowWhite.svg";

import "../assets/scss/RanksPage/main.scss";
import fetchWithToken from "../helpers/fetchWithToken";
import customToast from "../helpers/customToast";

const listFilters = [
	{ id: "xp", title: "XP" },
	{ id: "gemp", title: "GEMP" },
];

const Ranks = () => {
	const isMobile = useAppSelector((state) => state.main.isMobile);

	const [activeFilter, setActiveFilter] = useState("xp");
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [isLeaderboardLoading, setIsLeaderboardLoading] = useState(true);
	const [leadersByXp, setLeadersByXp] = useState([]);
	const [leadersByBalance, setLeadersByBalance] = useState([]);
	const [totalUsersCount, setTotalUsersCount] = useState(0);

	const [xpUserData, setXpUserData] = useState(undefined);
	const [balanceUserData, setBalanceUserData] = useState(undefined);

	const getLeaderboard = async () => {
		try {
			setIsLeaderboardLoading(true);

			const leaderboardRes = await fetchWithToken("/leaderboard");

			if (!leaderboardRes?.success) {
				customToast({ toastId: "/leaderboard", type: "error", message: "Something went wrong while get quests list. Please try again later." });
				return false;
			}

			if (leaderboardRes?.data) {
				setLeadersByXp(
					leaderboardRes.data.xp.list.map((item) => ({
						...item,
						isGrow: true,
					}))
				);
				setLeadersByBalance(
					leaderboardRes.data.balance.list.map((item) => ({
						...item,
						isGrow: true,
					}))
				);
				setXpUserData(leaderboardRes.data.xp.userData);
				setBalanceUserData(leaderboardRes.data.balance.userData);
			}

			setTotalUsersCount(leaderboardRes.data.totalCount);
		} catch (e) {
			console.error("Error getLeaderboard:", e);
		} finally {
			setIsLeaderboardLoading(false);
		}
	};

	useEffect(() => {
		getLeaderboard();
	}, []);

	return (
		<div className="ranks-page-con">
			<div className="ranks-page-wrapper">
				<Container>
					<Row className="justify-content-center">
						<Col xl={10}>
							<div className="ranks-page-content-con">
								<div className="main-page-block">
									<div className="title">Recent activities of all players</div>
									<div className="general-stats-con">
										<div className="users-count">
											Total: <span className="strong">{numberWithSeparator(totalUsersCount, ",")}</span>
										</div>
										{isMobile && (
											<div className="filter-con">
												<div className="descr">Filter by</div>

												<Dropdown isOpen={dropdownOpen} toggle={() => setDropdownOpen(!dropdownOpen)} className="custom-drop-down-con">
													<DropdownToggle data-toggle="dropdown" tag="div">
														<div className="value-con">
															<div className="val">{listFilters.find(({ id }) => id === activeFilter)?.title}</div>
															<div className={`arrow-con ${dropdownOpen ? "active" : ""}`}>
																<Image src={arrowWhiteIcon} alt={""} width={24} height={24} />
															</div>
														</div>
													</DropdownToggle>
													<DropdownMenu>
														{listFilters.map(({ id, title }) => (
															<div
																key={`filter-item-${id}`}
																className={`dropdown-item ${activeFilter === id ? "active" : ""}`}
																onClick={() => {
																	setActiveFilter(id);
																	setDropdownOpen(false);
																}}
															>
																{title}
															</div>
														))}
													</DropdownMenu>
												</Dropdown>
											</div>
										)}
									</div>
								</div>

								{xpUserData && balanceUserData && <UserStatsInfo activeFilter={activeFilter} xpUserData={xpUserData} balanceUserData={balanceUserData} />}
							</div>
						</Col>
					</Row>
				</Container>

				<Container className="d-flex flex-grow-1 overflow-hidden">
					<Col xl={10} className="d-flex flex-grow-1 overflow-hidden">
						{!isMobile && (
							<div className="leaders-con">
								<div className="side-block">
									<LeadersList title={"XP Leaderboard"} leadersList={leadersByXp} currency={"XP"} />
								</div>
								<div className="side-block">
									<LeadersList title={"GEMP Leaderboard"} leadersList={leadersByBalance} currency={"GEMP"} />
								</div>
							</div>
						)}

						{isMobile && (
							<div className="leaders-con">
								<div className="side-block">
									{activeFilter === "xp" && <LeadersList title={""} leadersList={activeFilter === "xp" ? leadersByXp : leadersByBalance} currency={activeFilter === "xp" ? "XP" : "GEMP"} />}
									{activeFilter === "gemp" && <LeadersList title={""} leadersList={activeFilter === "xp" ? leadersByXp : leadersByBalance} currency={activeFilter === "xp" ? "XP" : "GEMP"} />}
								</div>
							</div>
						)}
					</Col>
				</Container>
			</div>
		</div>
	);
};

export const getServerSideProps = async ({ locale, resolvedUrl }) => ({
	props: {
		...(await serverSideTranslations(locale, ["common"])),
		...getSEOOptions(resolvedUrl),
	},
});
export default Ranks;
