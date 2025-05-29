import React from "react";
import App from "next/app";
import { parse } from "next-useragent";
import { appWithTranslation } from "next-i18next";
import { setCookie } from "cookies-next";
import { ToastContainer } from "react-toastify";

import { setIsMobile } from "../redux/slices/main";
import { store } from "../redux";

import StoreProvider from "../components/NextComponets/StoreProvider";
import HelmetComponent from "../components/SingleComponents/HelmetComponent";
import PageLayout from "../components/NextComponets/PageLayout";
import ReownConnectWrapper from "../components/SingleComponents/ReownConnectWrapper";
import ResizeListener from "../components/SingleComponents/ResizeListener";
import Header from "../components/SingleComponents/Header/Header";
import { Scripts } from "../layout";
import StarsAnimation from "../components/SingleComponents/StarsAnimation";

import "../assets/scss/main.scss";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";

class WebApp extends App {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			url: "",
		};
	}

	render() {
		const { Component, pageProps, initialReduxState, clientSideDispatches, pathname } = this.props;

		return (
			<ReownConnectWrapper>
				<StoreProvider initialReduxState={initialReduxState} clientSideDispatches={clientSideDispatches}>
					<div className="app-with-bg" />
					<StarsAnimation />
					<HelmetComponent {...pageProps} />

					<div id="next-app">
						<div className="main-body">
							{pathname !== "/login" && <Header />}

							<PageLayout Component={Component} {...pageProps} />
						</div>

						<ResizeListener />
						<Scripts />
						<ToastContainer />
					</div>
				</StoreProvider>
			</ReownConnectWrapper>
		);
	}
}

WebApp.getInitialProps = async (context) => {
	const { ctx } = context;
	const isSSR = typeof window === "undefined";

	let ua = "";
	let reduxStore = null;
	if (isSSR) {
		ua = parse(ctx.req.headers["user-agent"]);
	} else {
		ua = { isMobile: window.innerWidth < 768 || (window && "ontouchstart" in window) || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 };
	}

	const { accessToken, refreshToken } = ctx.query;

	if (accessToken || refreshToken) {
		await setCookie(`${process.env.ACCESS_TOKEN_PREFIX}-accessToken`, accessToken, { ...ctx, domain: process.env.APP_DOMAIN });
		await setCookie(`${process.env.ACCESS_TOKEN_PREFIX}-refreshToken`, refreshToken, { ...ctx, domain: process.env.APP_DOMAIN });
	}

	if (isSSR) {
		reduxStore = store();
		const { dispatch } = reduxStore;

		dispatch(setIsMobile(ua.isMobile));
	}

	return {
		...(await App.getInitialProps(context)),
		pathname: ctx.pathname,
		initialReduxState: reduxStore,
		clientSideDispatches: [],
	};
};

export default appWithTranslation(WebApp);
