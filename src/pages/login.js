import React, { useEffect, useState } from "react";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useAppKitAccount, useDisconnect } from "@reown/appkit/react";
import { Container } from "reactstrap";

import getSEOOptions from "../helpers/getSEOOptions";
import sliceAddress from "../helpers/sliceAddress";

import EnterLogin from "../components/LoginPage/EnterLogin";
import Registration from "../components/LoginPage/Registration";

import arrowWhiteIcon from "../assets/img/common/arrowWhite.svg";

import "../assets/scss/LoginPage/main.scss";

const LoginPage = () => {
	const { address: evmAddress } = {}; //useAppKitAccount();
	const { disconnect } = useDisconnect();

	return (
		<div className="login-page-con">
			{!!evmAddress && (
				<div className="heading-wrap">
					<Container>
						<div className="heading-con">
							<div className="disconnect-btn" onClick={disconnect}>
								<div className="img-con">
									<Image src={arrowWhiteIcon} alt={""} width={24} height={24} />
								</div>
								Disconnect Wallet
							</div>
							<div className="wallet-con">{sliceAddress(evmAddress)}</div>
						</div>
					</Container>
				</div>
			)}
			{!evmAddress && <EnterLogin />}
			{evmAddress && <Registration />}
		</div>
	);
};

export const getServerSideProps = async ({ locale, resolvedUrl }) => ({
	props: {
		...(await serverSideTranslations(locale, ["common"])),
		...getSEOOptions(resolvedUrl),
	},
});
export default LoginPage;
