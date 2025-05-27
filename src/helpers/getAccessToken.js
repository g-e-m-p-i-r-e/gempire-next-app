import { deleteCookie, getCookie, hasCookie } from "cookies-next";
import isTokenExpired from "./isTokenExpired";

const getAccessToken = async (ctx = {}) => {
	let accessToken = "";

	if (hasCookie(`${process.env.ACCESS_TOKEN_PREFIX}-accessToken`, { ...ctx, domain: process.env.APP_DOMAIN })) {
		accessToken = await getCookie(`${process.env.ACCESS_TOKEN_PREFIX}-accessToken`, { ...ctx, domain: process.env.APP_DOMAIN });
		if (isTokenExpired(accessToken)) {
			await deleteCookie(`${process.env.ACCESS_TOKEN_PREFIX}-accessToken`, { ...ctx, domain: process.env.APP_DOMAIN });
			accessToken = "";
		}
	}

	return accessToken;
};

export default getAccessToken;
