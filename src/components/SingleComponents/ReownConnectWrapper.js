import React from "react";

import { cookieStorage, createStorage, cookieToInitialState, WagmiProvider } from "wagmi";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { monadTestnet } from "@reown/appkit/networks";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";

const projectId = process.env.REOWN_PROJECT_ID;

if (!projectId) {
	throw new Error("REOWN_PROJECT_ID is not defined");
}

const networks = [monadTestnet];

export const wagmiAdapter = new WagmiAdapter({
	storage: createStorage({
		storage: cookieStorage,
	}),
	ssr: true,
	projectId,
	networks,
});

const queryClient = new QueryClient();

export const modal = createAppKit({
	adapters: [wagmiAdapter],
	projectId,
	networks: [monadTestnet],
	defaultNetwork: monadTestnet,
	metadata: {
		name: "Gempire",
		description: "Gempire",
		url: process.env.SITE_URL,
		icons: [`${process.env.SITE_URL}/static/logo-400x400.png`],
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
	// allWallets: "HIDE",
});

const ReownConnectWrapper = ({ children, cookies }) => {
	const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig, cookies);

	return (
		<WagmiProvider config={wagmiAdapter.wagmiConfig} initialState={initialState}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</WagmiProvider>
	);
};
export default ReownConnectWrapper;
