import React from "react";
import Countdown from "react-countdown";

const showHoursBefore = 48;

const CustomTimer = ({ date, withSymbols = true, withDots = true, onComplete }) => (
	<Countdown
		date={date}
		zeroPadTime={2}
		onComplete={onComplete}
		daysInHours={true}
		renderer={({ formatted: { hours, minutes, seconds } }) => {
			const daysLeft = Math.floor(hours / 24);
			const hoursLeft = Math.floor(hours % 24);

			return (
				<div className="custom-timer">
					{!+hours && (
						<div className="value-con">
							<div className="value">
								00
								{withSymbols ? "H" : ""}
							</div>
							{withDots && <div className="dots">:</div>}
							<div className="value">
								{minutes}
								{withSymbols ? "M" : ""}
							</div>
							{withDots && <div className="dots">:</div>}
							<div className="value">
								{seconds}
								{withSymbols ? "S" : ""}
							</div>
						</div>
					)}
					{!!(+hoursLeft + daysLeft * 24) && hours < showHoursBefore && (
						<div className="value-con">
							<div className="value">
								{hoursLeft + daysLeft * 24}
								{withSymbols ? "H " : ":"}
							</div>
							{withDots && <div className="dots">:</div>}
							<div className="value">
								{minutes}
								{withSymbols ? "M " : ":"}
							</div>
							{withDots && <div className="dots">:</div>}
							<div className="value">
								{seconds}
								{withSymbols ? "S " : ""}
							</div>
						</div>
					)}
					{(!!+hoursLeft || !!daysLeft) && hours >= showHoursBefore && (
						<div className="value-con">
							<div className="value">
								{daysLeft}
								{"D "}
							</div>
							{withDots && <div className="dots">:</div>}
							<div className="value">
								{hoursLeft}
								{"H"}
							</div>
						</div>
					)}
				</div>
			);
		}}
	/>
);

export default CustomTimer;
