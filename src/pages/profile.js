import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Col, Container, Row } from "reactstrap";
import { useDisconnect } from "@reown/appkit/react";
import { deleteCookie } from "cookies-next";

import getSEOOptions from "../helpers/getSEOOptions";

import UsersSocials from "../components/ProfilePage/UsersSocials";
import MainInfo from "../components/ProfilePage/MainInfo";
import UsernameBlock from "../components/ProfilePage/UsernameBlock";
import UserWallet from "../components/ProfilePage/UserWallet";

import "../assets/scss/ProfilePage/main.scss";

const Profile = () => {
	const { disconnect } = useDisconnect();

	const onLogout = async () => {
		await deleteCookie(`${process.env.ACCESS_TOKEN_PREFIX}-accessToken`);
		disconnect();
		window.location.href = "/login";
	};

	return (
		<div className="profile-page-con">
			<Container>
				<Row className="justify-content-center">
					<Col xl={10}>
						<div className="page-content-wrap">
							<div className="page-title">Profile</div>
							<div className="main-block-con">
								<div className="side-con">
									<MainInfo />
								</div>
								<div className="side-con">
									<div className="socials-con-wrapper">
										<div className="block-title">Socials</div>
										<UsersSocials />
									</div>
									<div className="info-block-wrapper">
										<div className="block-title">Info</div>
										<UsernameBlock />
										<UserWallet />
									</div>
								</div>
							</div>
							<div className="btn-logout f-center" onClick={onLogout}>
								Log Out
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
export default Profile;
