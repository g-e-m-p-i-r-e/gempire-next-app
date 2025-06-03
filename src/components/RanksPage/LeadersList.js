import React, { useRef } from "react";
import Image from "next/image";

import sliceAddress from "../../helpers/sliceAddress";
import numberWithSeparator from "../../helpers/numberWithSeparator";
import { useAppSelector } from "../../redux";

import ImageFallback from "../SingleComponents/ImageFallback";
import CustomScrollbar from "../SingleComponents/CustomScrollbar";

import growGreenIcon from "../../assets/img/common/growGreen.svg";
import growRedIcon from "../../assets/img/common/growRed.svg";

import "../../assets/scss/RanksPage/LeadersList.scss";

const LeadersList = ({ title, leadersList, currency }) => {
	const isMobile = useAppSelector((state) => state.main.isMobile);

	const listRef = useRef();

	const topLeaders = leadersList.slice(0, 3);
	const restLeaders = leadersList.slice(3);

	return (
		<div className="leaders-list-con">
			{!!title && <div className="block-title">{title}</div>}
			<div className="top-leaders-con">
				{[topLeaders[1], topLeaders[0], topLeaders[2]].map((item, i) =>
					item ? (
						<div key={`${title}-leaders-${i}`} className={`leader-item ${i === 0 ? "silver" : ""} ${i === 1 ? "gold" : ""} ${i === 2 ? "bronze" : ""}`}>
							<div className="avatar-con">
								<div className="img-wrap" style={{ minHeight: i === 1 ? 108 : 77, minWidth: i === 1 ? 108 : 77 }}>
									<ImageFallback src={item.avatarSrc} width={i === 1 ? 100 : 70} height={i === 1 ? 100 : 70} />
								</div>
								<div className="place-number">
									<div className="num">
										{i === 0 && 2}
										{i === 1 && 1}
										{i === 2 && 3}
									</div>
								</div>
							</div>
							<div className="info-con">
								<div className="address">{item.username ? item.username : sliceAddress(item.wallet)}</div>
								<div className="amount">
									{numberWithSeparator(item.balance)} {currency}
								</div>
							</div>
						</div>
					) : (
						<span />
					)
				)}
			</div>
			{!!restLeaders.length && (
				<div ref={listRef} className="rest-leaders-list">
					<CustomScrollbar maxHeight={isMobile ? 400 : 0} options={{ autoHide: false }}>
						{restLeaders.map((item, i) => (
							<div key={`${title}-rest-leaders-${i}`} className="rest-leaders-list-item">
								<div className="side-con">
									<div className="avatar-con">
										<ImageFallback src={item.avatarSrc} width={38} height={38} />
									</div>
									<div className="info-con">
										<div className="address">{item.username ? item.username : sliceAddress(item.wallet)}</div>
										<div className="amount">
											{numberWithSeparator(item.balance)} {currency}
										</div>
									</div>
								</div>
								<div className="position-con">
									#{i + 4}{" "}
									<div className="grow-arrow">
										<Image src={item.isGrow ? growGreenIcon : growRedIcon} alt={""} width={18} height={18} />
									</div>
								</div>
							</div>
						))}
					</CustomScrollbar>
				</div>
			)}
		</div>
	);
};

export default LeadersList;
