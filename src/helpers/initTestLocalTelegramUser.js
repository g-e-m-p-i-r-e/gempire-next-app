import { mockTelegramEnv, parseInitData } from "@telegram-apps/sdk-react";

const initTestLocalTelegramUser = () => {
	if (window && process.env.BUILD_ENV === "local") {
		const initDataRaw = new URLSearchParams([
			[
				"user",
				JSON.stringify({
					id: 99281932,
					first_name: "Andrew",
					last_name: "Rogue",
					username: "rogue",
					language_code: "en",
					is_premium: true,
					allows_write_to_pm: true,
				}),
			],
			["hash", "89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31"],
			["auth_date", "1716922846"],
			["start_param", "debug"],
			["chat_type", "sender"],
			["chat_instance", "8428209589180549439"],
		]).toString();
		mockTelegramEnv({
			themeParams: {},
			initData: parseInitData(initDataRaw),
			initDataRaw,
			version: "7.2",
			platform: "tdesktop",
		});
	}
};

export default initTestLocalTelegramUser;
