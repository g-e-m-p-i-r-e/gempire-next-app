import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import { useAppDispatch } from "../../redux";
import { setUser } from "../../redux/slices/main";
import getAccessToken from "../../helpers/getAccessToken";
import fetchWithToken from "../../helpers/fetchWithToken";
import customToast from "../../helpers/customToast";

import LoaderResponsive from "../SingleComponents/LoaderResponsive";

const PageLayout = ({ Component, ...props }) => {
	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState(true);
	const { push } = useRouter();

	const getUserData = async () => {
		try {
			const res = await fetchWithToken("/user");

			if (!res?.success || !res?.data) {
				customToast({ toastId: "/user", type: "error", message: "Something went wrong while get user data. Please try again later." });

				return false;
			}

			dispatch(setUser(res?.data));

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

	useEffect(() => {
		authUser();
	}, []);

	return (
		<>
			{isLoading && (
				<div className="app-loader-con">
					<LoaderResponsive />
				</div>
			)}
			{!isLoading && <Component {...props} />}
		</>
	);
};

export default PageLayout;
