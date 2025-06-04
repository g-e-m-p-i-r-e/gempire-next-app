import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import sleep from "../../helpers/sleep";
import fetchWithToken from "../../helpers/fetchWithToken";
import customToast from "../../helpers/customToast";
import { incTicketsCount } from "../../redux/slices/main";

import LoaderLottie from "../SingleComponents/LoaderLottie";

import badgeImg from "../../assets/img/LotteryPage/rewards/badge.png";
import gempImg from "../../assets/img/LotteryPage/rewards/gemp.png";
import monadImg from "../../assets/img/LotteryPage/rewards/monad.png";
import nothingImg from "../../assets/img/LotteryPage/rewards/nothing.png";
import ticketImg from "../../assets/img/LotteryPage/rewards/ticket.png";
import xpImg from "../../assets/img/LotteryPage/rewards/xp.png";
import ticketBlackImg from "../../assets/img/common/ticketBlack.svg";
import ticketWhiteImg from "../../assets/img/common/ticketWhite.svg";
import centerArrowImg from "../../assets/img/LotteryPage/rewards/centerArrow.png";

import "../../assets/scss/LotteryPage/LotteryRow.scss";
import { useAppDispatch, useAppSelector } from "../../redux";
import CustomTimer from "../SingleComponents/CustomTimer";

const rewards = [
	{
		id: "badge",
		img: badgeImg,
		//title: "Star",
		descr: "Badge",
	},
	{
		id: "gemp",
		img: gempImg,
		//title: 0.5,
		descr: "GEMP",
	},
/*	{
		id: "monad",
		img: monadImg,
		title: 1,
		descr: "Monad",
	},*/
	{
		id: "nothing",
		img: nothingImg,
		//title: "Nothing",
		descr: "",
	},
	{
		id: "tickets",
		img: ticketImg,
		//title: "5",
		descr: "Ticket",
	},
	{
		id: "xp",
		img: xpImg,
		//title: "1,000",
		descr: "XP",
	},
];
const rewardsToShow = 30;

const LotteryRow = () => {
	const dispatch = useAppDispatch();
	const ticketsBalance = useAppSelector((state) => state.main.user.tickets);

	const carouselRef = useRef(null);

	const [randomRewards, setRandomRewards] = useState([]);
	const [winItem, setWinItem] = useState(null);

	const [isLoading, setIsLoading] = useState(false);
	const [isSpinningLoading, setIsSpinningLoading] = useState(false);
	const [state, setState] = useState("ready");
	const [timerTo, setTimerTo] = useState(0);

	const initWheel = (winItemRes) => {
		const rewardsCopy = [...rewards];
		const selectedRewards = [];

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



	const recoveryUserTickets = async () => {
		const { data } = await fetchWithToken("/lottery/user");
		dispatch(incTicketsCount(data?.tickets || 0));
	};

	const onSpin = async () => {
		if (carouselRef.current) {
			const winItemRef = carouselRef.current.querySelector("#isWin");
			if (winItemRef) {
				const itemRect = winItemRef.getBoundingClientRect();
				const carouselRect = carouselRef.current.getBoundingClientRect();

				const offsetToCenter = itemRect.left - carouselRect.left - carouselRect.width / 2 + itemRect.width / 2;

				carouselRef.current.style.transition = "transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)";
				carouselRef.current.style.transform = `translateX(-${offsetToCenter}px)`;

				await sleep(3500);

				setState("showReward");
			}
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
			await onSpin();
			setIsSpinningLoading(false);
		} catch (e) {
			console.error("Error onStart:", e);
		}
	};

	const getWinItem = async () => {
		try {
			setIsLoading(true);
			setState("ready");
			const { success, data, error } = await fetchWithToken("/lottery/spin", {
				method: "POST",
			});
			//
			// if (!res?.success) {
			// 	customToast({ toastId: "/lottery", type: "error", message: "Something went wrong while spin lottery. Please try again later." });
			// 	return false;
			// }

			// const winItem = res?.data?.reward
			const winItemRes = rewards.find((reward) => reward.id === data?.type);
			if (data.amount !== undefined && data.amount > 0) winItemRes.title = data?.amount;
			else if (data.type === "nothing") winItemRes.title = "Nothing";
			else if (data.type === "badge") winItemRes.title = data.badgeId;


			dispatch(incTicketsCount(-1));
			if (ticketsBalance - 1 <= 0) {
				setTimerTo(Date.now() + 1000 * 20);
			}
			setWinItem(winItemRes);
			await sleep(100);
			await onStart(winItemRes);
		} catch (e) {
			console.error("Error getWinItem:", e);
		}
	};

	const onClickBtn = () => {
		if (isLoading) return;

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

	useEffect(() => {
		if (!ticketsBalance) {
			setState("timer");
			setTimerTo(Date.now() + 1000 * 20);
		} else {
			initWheel();
		}
	}, []);

	useEffect( () => {
		if (ticketsBalance <= 0) {
			recoveryUserTickets();
		}
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
					<div className="center-arrow-con">
						<Image src={centerArrowImg} alt={""} width={15} />
					</div>

					<div ref={carouselRef} className="lottery-row-carousel">
						{randomRewards.map((reward, index) => (
							<div id={reward.isWin ? "isWin" : undefined} key={`${reward.id}${index}`} className="lottery-row-item">
								<div className="img-con">
									<Image src={reward.img} alt={""} width={64} height={64} priority />
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
							<Image src={winItem.img} alt={""} width={58} height={58} />
						</div>
						<div className={`title ${winItem.id === "nothing" ? "small" : ""}`}>{winItem.title}</div>
						{winItem.descr && <div className="descr">{winItem.descr}</div>}
					</div>
				)}

				{state === "timer" && (
					<div className="timer-block">
						<div className="timer-title">Start in</div>
						<CustomTimer
							withSymbols
							date={timerTo}
							onComplete={() => {
								dispatch(incTicketsCount(1));
								setState("ready");
								setTimerTo(0);
								initWheel();
							}}
						/>
					</div>
				)}
			</div>

			{state !== "timer" && (
				<div className="tickets-con">
					<div className="tickets-balance-con">
						<div className="descr">Balance</div>
						<div className="title">{ticketsBalance}</div>
						<div className="img-con f-center">
							<Image src={ticketWhiteImg} alt={""} width={14} height={14} />
						</div>
					</div>
					<div className="tickets-price-con">
						<div className="descr">Price</div>
						<div className="title">1</div>
						<div className="img-con f-center">
							<Image src={ticketBlackImg} alt={""} width={14} height={14} />
						</div>
					</div>
				</div>
			)}

			{state !== "timer" && (
				<div onClick={onClickBtn} className={`btn-item f-center ${isLoading || isSpinningLoading ? "disabled" : ""}`}>
					{state === "ready" && !isLoading && !isSpinningLoading && "Spin"}
					{((state === "ready" && isLoading) || isSpinningLoading) && "Spinning..."}
					{state === "showReward" && "Ok"}
				</div>
			)}
		</div>
	);
};

export default LotteryRow;
