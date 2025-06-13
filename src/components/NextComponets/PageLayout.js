import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import { deleteCookie, setCookie } from "cookies-next";
import { useAppDispatch } from "../../redux";
import { setUser } from "../../redux/slices/main";
import getAccessToken from "../../helpers/getAccessToken";
import fetchWithToken from "../../helpers/fetchWithToken";

import PawsLottie from "../SingleComponents/LoaderLottie";

const PageLayout = ({ Component, ...props }) => {
	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState(true);
	const { push, pathname, query, asPath } = useRouter();

	const getUserData = async () => {
		try {
			const res = await fetchWithToken("/user");

			if (!res?.data) {
				await deleteCookie(`${process.env.ACCESS_TOKEN_PREFIX}-accessToken`, { domain: process.env.APP_DOMAIN });
				return false;
			}

			dispatch(setUser(res?.data));
			// TODO redirect on login
			if (pathname !== "/404") {
				await push(pathname === "/" ? "/home" : asPath, undefined, { shallow: true });
			}

			return true;
		} catch (e) {
			toast.error("Something went wrong while log in");
			console.error(e);
		}

		return false;
	};

	const authUser = async () => {
		const accessToken = await getAccessToken();
		let isLogIn = false;

		if (accessToken) {
			isLogIn = await getUserData();
		}

		if (!isLogIn) {
			await push("/login", undefined, { shallow: true });
		}

		setIsLoading(false);
	};

	const reconnectUser = async () => {
		await setCookie("gempire-coupon", query.coupon);
		await deleteCookie(`${process.env.ACCESS_TOKEN_PREFIX}-accessToken`);
		window.location.href = "/login";
	};

	useEffect(() => {
		if (navigator.serviceWorker) {
			navigator.serviceWorker.register("/sw.js", { scope: "/" });
		}

		if (query?.r) {
			setCookie("gempire-r", query.r);
		}

		if (query?.coupon) {
			reconnectUser();
			return () => {};
		}

		authUser();
	}, []);

	return (
		<>
			{isLoading && (
				<div className="app-loader-con">
					<div className="lottie-wrap">
						<PawsLottie />
					</div>
				</div>
			)}
			{!isLoading && <Component {...props} />}
		</>
	);
};

export default PageLayout;
