import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import sleep from "../../helpers/sleep";
import fetchWithToken from "../../helpers/fetchWithToken";
import customToast from "../../helpers/customToast";
import { incBalance, incLotteryHistory, incTicketsCount, pushBadge } from "../../redux/slices/main";
import { useAppDispatch, useAppSelector } from "../../redux";
import shuffleArray from "../../helpers/shuffleArray";

import LoaderLottie from "../SingleComponents/LoaderLottie";
import CustomTimer from "../SingleComponents/CustomTimer";
import LotteryInfoModal from "./LotteryInfoModal";

import gempImg from "../../assets/img/LotteryPage/rewards/gemp.png";
import ticketWhiteImg from "../../assets/img/common/ticketWhite.svg";
import centerArrowImg from "../../assets/img/LotteryPage/rewards/centerArrow.png";
import lotteryRewardsImg from "../../assets/img/LotteryPage/rewards/lotteryRewardsImg";
import ticketsBgImg from "../../assets/img/LotteryPage/ticketsBg.png";
import ticketsBgMobileImg from "../../assets/img/LotteryPage/ticketsBgMobile.png";

import "../../assets/scss/HomePage/LotteryPage/LotteryRow.scss";

dayjs.extend(utc);

const LotteryRow = () => {
	const dispatch = useAppDispatch();
	const ticketsBalance = useAppSelector((state) => state.main.user.tickets);
	const isMobile = useAppSelector((state) => state.main.isMobile);

	const carouselRef = useRef(null);

	const [randomRewards, setRandomRewards] = useState([]);
	const [winItem, setWinItem] = useState(null);

	const [isLoading, setIsLoading] = useState(false);
	const [isSpinningLoading, setIsSpinningLoading] = useState(false);
	const [state, setState] = useState("ready");
	const [timerTo, setTimerTo] = useState(0);

	const [rewards, setRewards] = useState([]);
	const fetchRewards = async () => {
		try {
			const { success, data } = await fetchWithToken("/info/lottery/rewards");
			if (!success) {
				customToast({ type: "error", message: "Failed to fetch lottery rewards." });
				return [];
			}
			const rewardsData = data.map((reward) => {
				let imgSrc = reward.img || lotteryRewardsImg[reward.id] || gempImg;
				if (reward.id === "badge") {
					imgSrc = lotteryRewardsImg[`${reward.id}${reward.title}`] || gempImg;
				}
				return {
					...reward,
					img: imgSrc,
					title: reward.title || "",
					descr: reward.descr || "",
				};
			});
			setRewards(rewardsData);

			return rewardsData;
		} catch (e) {
			console.error("Error fetching rewards:", e);
		}
		return [];
	};

	const initWheel = (winItemRes, itemsArray = rewards) => {
		const rewardsCopy = shuffleArray(itemsArray);
		const selectedRewards = [];
		const rewardsToShow = isMobile ? 30 : 50;

		for (let i = 0; i < rewardsToShow; i++) {
			if (i === rewardsToShow - 10 && winItemRes) {
				selectedRewards.push({ ...winItemRes, isWin: true });
			} else {
				const randomIndex = Math.floor(Math.random() * rewardsCopy.length);
				selectedRewards.push(rewardsCopy[randomIndex]);
			}
		}

		setRandomRewards(selectedRewards);
		setState("ready");
	};

	const onSpin = async (winItemRes) => {
		if (carouselRef.current) {
			const winItemRef = carouselRef.current.querySelector("#isWin");
			if (winItemRef) {
				const itemRect = winItemRef.getBoundingClientRect();
				const carouselRect = carouselRef.current.getBoundingClientRect();

				const offsetToCenter = itemRect.left - carouselRect.left - carouselRect.width / 2 + itemRect.width / 2;

				carouselRef.current.style.transition = "transform 6s cubic-bezier(0.25, 0.1, 0.25, 1)";
				carouselRef.current.style.transform = `translateX(-${offsetToCenter}px)`;

				await sleep(6500);

				setState("showReward");
				if (winItemRes && ["gemp", "xp", "tickets"].includes(winItemRes.id)) {
					dispatch(incBalance({ code: winItemRes.id, amount: +winItemRes.title }));
				}
				if (winItemRes && winItemRes.badgeId) {
					dispatch(pushBadge(winItemRes.badgeId));
				}
			}
		}
	};

	const setTimer = () => {
		const isAfter6PM = dayjs().utc().hour() >= 17;

		if (!isAfter6PM) {
			setTimerTo(dayjs().utc().set("hour", 17).set("minute", 0).set("second", 0).valueOf());
		} else {
			setTimerTo(dayjs().utc().add(1, "day").set("hour", 17).set("minute", 0).set("second", 0).valueOf());
		}
	};

	const onStart = async (winItemRes) => {
		try {
			setIsLoading(true);
			setIsSpinningLoading(true);

			await sleep(300);

			initWheel(winItemRes);
			await sleep(1500);

			if (carouselRef.current) {
				carouselRef.current.style.transition = "unset";
				carouselRef.current.style.transform = "translateX(0px)";

				setIsLoading(false);
			}

			await sleep(500);
			await onSpin(winItemRes);
			setIsSpinningLoading(false);

			if (ticketsBalance - 1 <= 0) {
				setTimer();
			}
		} catch (e) {
			console.error("Error onStart:", e);
		}
	};

	const recoveryUserTickets = async () => {
		const ticketsCount = ticketsBalance || 0;
		try {
			const res = await fetchWithToken("/lottery/user");
			if (!res?.success) {
				customToast({ toastId: "/lottery/user", type: "error", message: "Something went wrong while get lottery data. Please try again later." });
				setIsLoading(false);
				return ticketsCount;
			}

			dispatch(incTicketsCount(res?.data?.tickets || 0));

			return res?.data?.tickets || 0;
		} catch (e) {
			console.error("Error recoveryUserTickets:", e);
		}
		return ticketsCount;
	};

	const getWinItem = async () => {
		try {
			setIsLoading(true);
			setState("ready");
			const { success, data, error } = await fetchWithToken("/lottery/spin", {
				method: "POST",
			});

			if (!success) {
				customToast({ toastId: "/lottery", type: "error", message: "Something went wrong while spin lottery. Please try again later." });
				return false;
			}

			const winItemRes = rewards.find((reward) => reward.id === data?.type);
			if (data.amount !== undefined && data.amount > 0) winItemRes.title = data?.amount;
			else if (data.type === "nothing") winItemRes.title = "Nothing";
			else if (data.type === "badge") winItemRes.title = data.badgeId;

			if (data.type !== "nothing") {
				dispatch(incLotteryHistory({ code: data.type, amount: data.amount || 1 }));
			}

			dispatch(incTicketsCount(-1));

			setWinItem(winItemRes);
			await sleep(100);
			await onStart(winItemRes);
		} catch (e) {
			console.error("Error getWinItem:", e);
		}
	};

	const onClickBtn = () => {
		if (isLoading || state === "timer") return;

		if (state === "showReward") {
			if (ticketsBalance <= 0) {
				setState("timer");
				return;
			}
			setState("ready");
			return;
		}
		getWinItem();
	};

	const fetchLotteryData = async () => {
		setIsLoading(true);

		const defaultRewards = await fetchRewards();
		let isTicketsCount = !!ticketsBalance;

		if (ticketsBalance <= 0) {
			const count = await recoveryUserTickets();

			isTicketsCount = !!count;

			if (!count) {
				setState("timer");
				setTimer();
			}
		}

		if (isTicketsCount) {
			initWheel(null, defaultRewards);
		}

		setIsLoading(false);
	};

	const onTimerEnd = async () => {
		setIsLoading(true);
		const secondsRandom = Math.floor(Math.random() * 10) + 1; // Random seconds between 1 and 10
		setTimeout(() => {
			fetchLotteryData();
		}, secondsRandom);
	};

	const getBtnText = () => {
		if (isSpinningLoading) return "Spinning...";
		if (isLoading) return "Spin";
		if (state === "showReward") return "Ok";
		return "Spin";
	};

	useEffect(() => {
		fetchLotteryData();
	}, []);

	return (
		<div className="lottery-row-con">
			<div className="block-title">Lottery</div>
			<div className="lottery-row-carousel-wrapper">
				<div className={`loader-con ${isLoading ? "show" : ""}`}>
					<div className="lottie-wrap">
						<LoaderLottie isShow />
					</div>
				</div>

				<>
					{!!randomRewards.length && (
						<div className="center-arrow-con">
							<Image src={centerArrowImg} alt={""} width={15} />
						</div>
					)}

					<div ref={carouselRef} className="lottery-row-carousel">
						{randomRewards.map((reward, index) => (
							<div id={reward.isWin ? "isWin" : undefined} key={`${reward.id}${index}`} className="lottery-row-item">
								<div className="img-con">
									<Image src={reward.img} alt={""} width={isMobile ? 64 : 120} height={isMobile ? 64 : 120} priority />
								</div>
								<div className={`title ${reward.id === "nothing" ? "small" : ""}`}>{reward.title}</div>
								{reward.descr && <div className="descr">{reward.descr}</div>}
							</div>
						))}
					</div>
				</>

				{state === "showReward" && !!winItem && (
					<div className="reward-block">
						<div className="reward-title">Your reward</div>
						<div className="reward-img-con">
							<Image src={winItem.img} alt={""} width={isMobile ? 58 : 100} height={isMobile ? 58 : 100} />
						</div>
						<div className={`title ${winItem.id === "nothing" ? "small" : ""}`}>{winItem.title}</div>
						{winItem.descr && <div className="descr">{winItem.descr}</div>}
					</div>
				)}

				{state === "timer" && (
					<div className="timer-block">
						<div className="img-bg">
							<Image src={isMobile ? ticketsBgMobileImg : ticketsBgImg} alt={""} layout="fill" />
						</div>
						<div className="timer-title">Next spin available in</div>
						<CustomTimer withSymbols date={timerTo} onComplete={onTimerEnd} />
					</div>
				)}
			</div>

			<div className="tickets-con">
				<div className="tickets-balance-con">
					<div className="descr">Balance</div>
					<div className="title">{ticketsBalance}</div>
					<div className="img-con f-center">
						<Image src={ticketWhiteImg} alt={""} width={14} height={14} />
					</div>
				</div>
				<div className="tickets-balance-con">
					<div className="descr">Price</div>
					<div className="title">1</div>
					<div className="img-con f-center">
						<Image src={ticketWhiteImg} alt={""} width={14} height={14} />
					</div>
				</div>

				<LotteryInfoModal />
			</div>

			<div onClick={onClickBtn} className={`btn-item f-center ${isLoading || isSpinningLoading || state === "timer" ? "disabled" : ""}`}>
				{getBtnText()}
			</div>
		</div>
	);
};

export default LotteryRow;
