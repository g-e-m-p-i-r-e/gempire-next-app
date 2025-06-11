import React from "react";
import Image from "next/image";
import { Col, Row } from "reactstrap";

import numberWithSeparator from "../../helpers/numberWithSeparator";
import { useAppSelector } from "../../redux";

import CustomScrollbar from "../SingleComponents/CustomScrollbar";

import lotteryRewardsImg from "../../assets/img/LotteryPage/rewards/lotteryRewardsImg";

import "../../assets/scss/ProfilePage/LotteryStartsBlock.scss";

const LotteryStartsBlock = () => {
	const lotteryHistory = useAppSelector((state) => state.main.user.lotteryHistory);

	const isLotteryHistoryEmpty = !lotteryHistory || Object.values(lotteryHistory).every((value) => !value);

	const rewards = [
		{
			id: "tickets",
			title: "Tickets",
			amount: lotteryHistory?.tickets || 0,
			counter: lotteryHistory?.ticketsCounter || 0,
		},
		{
			id: "xp",
			title: "XP",
			amount: lotteryHistory?.xp || 0,
			counter: lotteryHistory?.xpCounter || 0,
		},
		{
			id: "gemp",
			title: "GEMP",
			amount: lotteryHistory?.gemp || 0,
			counter: lotteryHistory?.gempCounter || 0,
		},
		{
			id: "badgesTotal",
			title: "Lottery Badge",
			amount: lotteryHistory?.badgeCounter || 0,
			counter: lotteryHistory?.badgeCounter || 0,
		},
	];

	return (
		!isLotteryHistoryEmpty && (
			<div className="lottery-block-con">
				<div className="title">LOTTERY WINS</div>
				<CustomScrollbar maxHeight={400} options={{ autoHide: false }}>
					<Row className="rewards-list-con m-0">
						{rewards.map(
							(reward, i) =>
								!!reward.amount && (
									<Col key={`reward-${reward.id}${i}`} xs={12} md={4} lg={3}>
										<div className="reward-item">
											<div className="img-wrap-con">
												<div className="img-con">
													<Image src={lotteryRewardsImg[reward.id]} alt={""} width={96} height={96} />
												</div>
												<div className="counter-con">x{numberWithSeparator(reward.counter, ",")}</div>
											</div>
											<div className="reward-descr-con">
												<div className={`reward-title ${reward.id === "badgesTotal" ? "small" : ""}`}>{reward.title}</div>
												<div className="reward-descr">Total</div>
												<div className="reward-value">{numberWithSeparator(reward.amount, ",")}</div>
											</div>
										</div>
									</Col>
								)
						)}
					</Row>
				</CustomScrollbar>
			</div>
		)
	);
};

export default LotteryStartsBlock;
