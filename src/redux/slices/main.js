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
			gemp: 0,
			tickets: 0,
			quests: [
				// {
				// 	questId: "",
				// 	completedAt: 0,
				// },
			],
			referralCode: "",
			referralsCount: 0,
			referralIncome: 0,
			invitedByReferrals: 0,
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
			lotteryHistory: {
				// tickets: 0,
				// ticketsCounter: 0,
				// xp: 0,
				// xpCounter: 0,
				// gemp: 0,
				// gempCounter: 0,
				// badgeCounter: 0,
			},
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
		incLotteryHistory: (state, action) => {
			const { code, amount } = action.payload;

			if (!state.user.lotteryHistory[code]) {
				state.user.lotteryHistory[code] = 0;
			}
			if (!state.user.lotteryHistory[`${code}Counter`]) {
				state.user.lotteryHistory[`${code}Counter`] = 0;
			}

			state.user.lotteryHistory[code] += amount;
			state.user.lotteryHistory[`${code}Counter`] += 1;
		},
		incBalance: (state, action) => {
			state.user[action.payload.code] += action.payload.amount;
		},
		pushBadge: (state, action) => {
			if (!state.user.badges.includes(action.payload)) {
				state.user.badges.push(action.payload);
			}
		},
	},
});

export const { setIsMobile, incLotteryHistory, incBalance, pushBadge, incTicketsCount, addCompletedQuest, setUser } = mainSlice.actions;
