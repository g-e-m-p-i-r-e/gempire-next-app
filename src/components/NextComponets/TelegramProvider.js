import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import Script from "next/script";
import { useRouter } from "next/router";
import initTestLocalTelegramUser from "../../helpers/initTestLocalTelegramUser";

export const TelegramContext = createContext({});

export const TelegramProvider = ({ children }) => {
	const [webApp, setWebApp] = useState(null);
	const [isExpanded, setIsExpanded] = useState(false);
	const [isContentAvailable, setIsContentAvailable] = useState(false);
	const { pathname, push } = useRouter();

	useEffect(() => {
		const app = window.Telegram?.WebApp;
		let timer = null;
		initTestLocalTelegramUser();

		const expand = () => {
			if (app && !app.isExpanded) {
				app.expand();
			}
		};

		if (app) {
			app.ready();
			setWebApp(app);

			app.expand();
			app.onEvent("viewportChanged", expand);

			const headerColor = app.themeParams.bg_color || "bg_color";
			app.setHeaderColor(headerColor);
			app.disableVerticalSwipes();

			const backgroundColor = app.themeParams.secondary_bg_color || "secondary_bg_color";
			app.setBackgroundColor(backgroundColor);

			app.BackButton.onClick(() => {
				window.history.back();
			});

			timer = setTimeout(() => {
				setIsExpanded(true);
			}, 50);
		}
		return () => {
			app.offEvent("viewportChanged", expand);
			clearTimeout(timer);
		};
	}, []);

	useEffect(() => {
		if (webApp && pathname === "/") {
			webApp.BackButton.hide();
		} else if (webApp && pathname !== "/") {
			webApp.BackButton.show();
		}
	}, [webApp, pathname]);

	const pageRefreshAsync = async () => {
		await push(pathname, undefined, { shallow: true });
		setIsContentAvailable(true);
	};

	useEffect(() => {
		if (isExpanded) {
			pageRefreshAsync();
		}
	}, [isExpanded]);

	const value = useMemo(
		() =>
			webApp
				? {
						webApp,
						unsafeData: webApp.initDataUnsafe,
						user: webApp.initDataUnsafe.user,
					}
				: {},
		[webApp]
	);

	return (
		<TelegramContext.Provider value={value}>
			<Script src="/telegram-web-app.js" strategy="beforeInteractive" />
			{isContentAvailable && children}
		</TelegramContext.Provider>
	);
};

export const useTelegram = () => useContext(TelegramContext);
