import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import getSEOOptions from "../helpers/getSEOOptions";

import EnterLogin from "../components/LoginPage/EnterLogin";

import "../assets/scss/LoginPage/main.scss";

const LoginPage = () => (
	<div className="login-page-con">
		<EnterLogin />
	</div>
);
export const getServerSideProps = async ({ locale, resolvedUrl }) => ({
	props: {
		...(await serverSideTranslations(locale, ["common"])),
		...getSEOOptions(resolvedUrl),
	},
});
export default LoginPage;
