import React from "react";

import { cookieStorage, createStorage } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";
import { monadTestnet } from "@reown/appkit/networks";
import { cookieToInitialState, WagmiProvider } from "wagmi";

export const projectId = process.env.REOWN_PROJECT_ID;

if (!projectId) {
	throw new Error("Project ID is not defined");
}

export const networks = [monadTestnet];

export const wagmiAdapter = new WagmiAdapter({
	storage: createStorage({
		storage: cookieStorage,
	}),
	ssr: true,
	projectId,
	networks,
});

const queryClient = new QueryClient();

createAppKit({
	adapters: [wagmiAdapter],
	projectId,
	networks: [monadTestnet],
	defaultNetwork: monadTestnet,
	metadata: {
		name: "Gempire",
		description: "Gempire",
		url: process.env.SITE_URL,
		icons: ["https://assets.reown.com/reown-profile-pic.png"],
	},
	features: {
		socials: [],
		email: false,
		analytics: false,
		swaps: false,
		onramp: false,
		receive: false,
		send: false,
	},
	allWallets: "HIDE",
});

const ReownConnectWrapper = ({ children }) => {
	const cookies = typeof window !== "undefined" ? document?.cookie || "" : "";
	const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig, cookies);

	return (
		<WagmiProvider config={wagmiAdapter.wagmiConfig} initialState={initialState}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</WagmiProvider>
	);
};

export default ReownConnectWrapper;
