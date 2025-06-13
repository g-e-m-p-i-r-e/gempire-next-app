import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { useDisconnect } from "@reown/appkit/react";
import { deleteCookie } from "cookies-next";

import { useAppSelector } from "../../redux";

import UsersSocials from "./UsersSocials";
import MainInfo from "./MainInfo";
import UsernameBlock from "./UsernameBlock";
import CopyInput from "./CopyInput";
import BadgesBlock from "./BadgesBlock";
import ReferralsBlock from "./ReferralsBlock";
import LotteryStartsBlock from "./LotteryStartsBlock";

import "../../assets/scss/ProfilePage/main.scss";

const CurrentUserProfile = () => {
	const userWallet = useAppSelector((state) => state.main.user.wallet);
	const userBadges = useAppSelector((state) => state.main.user.badges);
	const registrationDate = useAppSelector((state) => state.main.user.createdAt);

	const isMobile = useAppSelector((state) => state.main.isMobile);

	const [activeMobileTab, setActiveMobileTab] = useState("main");

	const { disconnect } = useDisconnect();

	const onLogout = async () => {
		await deleteCookie(`${process.env.ACCESS_TOKEN_PREFIX}-accessToken`);
		await disconnect();
		window.location.href = "/login";
	};

	return (
		<div className="profile-page-con">
			<div className="scroll-wrapp">
				<Container>
					<Row className="justify-content-center">
						<Col xl={10}>
							<div className="page-content-wrap">
								<div className="main-block-con">
									{(!isMobile || (isMobile && activeMobileTab === "main")) && (
										<div className="side-con">
											<div className="side-title">Your Profile</div>
											<MainInfo openReferralsTab={() => setActiveMobileTab("referrals")} />

											<UsersSocials />

											<div className="info-block-wrapper">
												<div className="block-title">Info</div>
												<UsernameBlock />
												<CopyInput title={"Digital wallet ID"} value={userWallet} />
											</div>

											<div className="btn-logout f-center" onClick={onLogout}>
												Log Out
											</div>
										</div>
									)}
									{(!isMobile || (isMobile && activeMobileTab === "referrals")) && (
										<div className="side-con">
											<ReferralsBlock openMainTab={() => setActiveMobileTab("main")} />
										</div>
									)}
								</div>
							</div>
						</Col>
					</Row>
					<Row className="justify-content-center">
						<Col xl={10}>
							<BadgesBlock userBadges={userBadges} registrationDate={registrationDate} />

							<LotteryStartsBlock />
						</Col>
					</Row>
				</Container>
			</div>
		</div>
	);
};

export default CurrentUserProfile;
