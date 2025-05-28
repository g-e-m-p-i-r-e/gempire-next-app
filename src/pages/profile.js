import React, { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Col, Container, Row } from "reactstrap";
import { useDisconnect } from "@reown/appkit/react";
import { deleteCookie } from "cookies-next";

import getSEOOptions from "../helpers/getSEOOptions";
import { useAppSelector } from "../redux";

import UsersSocials from "../components/ProfilePage/UsersSocials";
import MainInfo from "../components/ProfilePage/MainInfo";
import UsernameBlock from "../components/ProfilePage/UsernameBlock";
import CopyInput from "../components/ProfilePage/CopyInput";
import BadgesBlock from "../components/ProfilePage/BadgesBlock";
import ReferralsBlock from "../components/ProfilePage/ReferralsBlock";

import "../assets/scss/ProfilePage/main.scss";

const Profile = () => {
	const userWallet = useAppSelector((state) => state.main.user.wallet);
	const isMobile = useAppSelector((state) => state.main.isMobile);

	const [activeMobileTab, setActiveMobileTab] = useState("main");

	const { disconnect } = useDisconnect();

	const onLogout = async () => {
		await deleteCookie(`${process.env.ACCESS_TOKEN_PREFIX}-accessToken`);
		disconnect();
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

											<BadgesBlock />

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
export default Profile;
