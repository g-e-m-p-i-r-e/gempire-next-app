import React from "react";
import Image from "next/image";
import { Col, Row } from "reactstrap";

import numberWithSeparator from "../../helpers/numberWithSeparator";

import CustomScrollbar from "../SingleComponents/CustomScrollbar";

import lotteryRewardsImg from "../../assets/img/LotteryPage/rewards/lotteryRewardsImg";

import "../../assets/scss/ProfilePage/LotteryStartsBlock.scss";

const LotteryStartsBlock = () => {
	const rewards = [
		{
			id: "tickets",
			title: "Tickets",
			amount: 7,
		},
		{
			id: "xp",
			title: "XP",
			amount: 10000,
		},
		{
			id: "gemp",
			title: "GEMP",
			amount: 1000,
		},
		{
			id: "badgeBronze",
			title: "Bronze",
			amount: 1000,
		},
		{
			id: "badgeSilver",
			title: "Silver",
			amount: 1000,
		},
		{
			id: "badgeGold",
			title: "Gold",
			amount: 1000,
		},
		{
			id: "badgePlatinum",
			title: "Platinum",
			amount: 1000,
		},
	];

	return (
		<div className="lottery-block-con">
			<div className="title">LOTTERY WINS</div>
			<CustomScrollbar maxHeight={400} options={{ autoHide: false }}>
				<Row className="rewards-list-con m-0">
					{rewards.map((reward, i) => (
						<Col key={`reward-${reward.id}${i}`} xs={12} md={4} lg={3}>
							<div className="reward-item">
								<div className="img-wrap-con">
									<div className="img-con">
										<Image src={lotteryRewardsImg[reward.id]} alt={""} width={96} height={96} />
									</div>
									<div className="counter-con">x{numberWithSeparator(reward.amount, ",")}</div>
								</div>
								<div className="reward-descr-con">
									<div className="reward-title">{reward.title}</div>
									<div className="reward-descr">{reward.id.includes("badge") ? "Badge" : "Total"}</div>
									{!reward.id.includes("badge") && <div className="reward-value">{numberWithSeparator(reward.amount, ",")}</div>}
								</div>
							</div>
						</Col>
					))}
				</Row>
			</CustomScrollbar>
		</div>
	);
};

export default LotteryStartsBlock;
