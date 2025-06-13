import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Col, Container, Row } from "reactstrap";

import MainInfo from "./MainInfo";
import UsersSocials from "./UsersSocials";
import CopyInput from "../CopyInput";
import LoaderLottie from "../../SingleComponents/LoaderLottie";
import BadgesBlock from "../BadgesBlock";

import fetchWithToken from "../../../helpers/fetchWithToken";
import customToast from "../../../helpers/customToast";

import "../../../assets/scss/User/UserPage/main.scss";

const UserPage = () => {
	const { query } = useRouter();

	const [isLoading, setIsLoading] = useState(true);
	const [userData, setUserData] = useState(undefined);

	const getUserData = async () => {
		try {
			setIsLoading(true);

			const res = await fetchWithToken(`/user/profile?userId=${query.userId}`);

			if (!res?.success || !res?.data) {
				customToast({ toastId: "/user/userId", type: "error", message: "Something went wrong while get user data. Please try again later." });
				return false;
			}

			setUserData(res?.data);
			setIsLoading(false);
		} catch (e) {
			console.error("Error fetching user data:", e);
		}
	};

	useEffect(() => {
		if (query?.userId) {
			getUserData();
		}
	}, [query?.userId]);

	return (
		<div className="user-profile-page-con">
			{isLoading && (
				<div className="loader-con-wrap">
					<div className="loader-wrap">
						<LoaderLottie isShow />
					</div>
				</div>
			)}
			{!isLoading && (
				<Container>
					<Row className="justify-content-center">
						<Col xl={10}>
							<div className="page-content-wrap">
								<div className="side-block">
									<MainInfo username={userData.username} balance={userData.gemp} xp={userData.xp} isPartner={userData.isPartner} />
								</div>
								<div className="side-block">
									<UsersSocials discordUsername={userData?.discordData?.username} twitterUsername={userData?.twitterData?.username} />
									<div className="block-title">Info</div>
									<CopyInput title={"Digital wallet ID"} value={userData.wallet} />
								</div>
							</div>
						</Col>
					</Row>
					<Row className="justify-content-center">
						<Col xl={10}>
							<BadgesBlock userBadges={userData.badges} registrationDate={userData.createdAt} />
						</Col>
					</Row>
				</Container>
			)}
		</div>
	);
};

export default UserPage;
