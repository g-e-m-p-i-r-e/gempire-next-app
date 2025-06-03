import { createSlice } from "@reduxjs/toolkit";

export const mainSlice = createSlice({
	name: "main",
	initialState: {
		isMobile: false,
		user: {
			_id: "",
			createdAt: 0,
			wallet: "",
			xp: 0,
			balance: 0,
			tickets: 2,
			quests: [
				// {
				// 	questId: "",
				// 	completedAt: 0,
				// },
			],
			referralCode: "",
			referralsCount: 0,
			badges: [
				// "id"
			],
			isPartner: false,
			discordData: {
				id: "",
				username: "",
			},
			twitterData: {
				id: "",
				username: "",
			},
			username: "",
		},
	},
	reducers: {
		setIsMobile: (state, action) => {
			state.isMobile = action.payload;
		},
		setUser: (state, action) => {
			state.user = {
				...state.user,
				...action.payload,
			};
		},
		addCompletedQuest: (state, action) => {
			state.user.quests.push({
				...action.payload,
			});
		},
		incTicketsCount: (state, action) => {
			state.user.tickets += action.payload;
		},
	},
});

export const { setIsMobile, incTicketsCount, addCompletedQuest, setUser } = mainSlice.actions;
