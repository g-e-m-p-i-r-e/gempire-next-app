import React, { useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

import getSEOOptions from "../../helpers/getSEOOptions";
import { useAppSelector } from "../../redux";

import CurrentUserProfile from "../../components/ProfilePage/CurrentUserProfile";
import UserPage from "../../components/ProfilePage/AnotherUser/UserPage";

import "../../assets/scss/User/UserPage/main.scss";

const ProfilePage = () => {
	const { query } = useRouter();

	const userWallet = useAppSelector((state) => state.main.user.wallet);
	const username = useAppSelector((state) => state.main.user.username);

	const [page, setPage] = useState("");

	useEffect(() => {
		if (!query?.userId || query?.userId === userWallet || query?.userId === username) {
			setPage("currentUserProfile");
		} else {
			setPage("userProfile");
		}
	}, [query?.userId]);

	return (
		<>
			{page === "currentUserProfile" && <CurrentUserProfile />}
			{page === "userProfile" && <UserPage />}
		</>
	);
};

export const getServerSideProps = async ({ locale, resolvedUrl }) => ({
	props: {
		...(await serverSideTranslations(locale, ["common"])),
		...getSEOOptions(resolvedUrl),
	},
});

export default ProfilePage;
