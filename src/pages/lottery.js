import React, { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import getSEOOptions from "../helpers/getSEOOptions";

const Lottery = () => {
	const [activeTab, setActiveTab] = useState("main");

	return <div className="main-page-con">Lottery</div>;
};

export const getServerSideProps = async ({ locale, resolvedUrl }) => ({
	props: {
		...(await serverSideTranslations(locale, ["common"])),
		...getSEOOptions(resolvedUrl),
	},
});
export default Lottery;
