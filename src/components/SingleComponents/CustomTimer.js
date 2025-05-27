import React from "react";
import Countdown from "react-countdown";

const showHoursBefore = 48;

const CustomTimer = ({ date, withSymbols = true }) => (
	<Countdown
		date={date}
		zeroPadTime={2}
		daysInHours={true}
		renderer={({ formatted: { hours, minutes, seconds } }) => {
			const daysLeft = Math.floor(hours / 24);
			return (
				<div className="custom-timer">
					{!+hours && (
						<p className="value">
							{+minutes ? `${minutes}${withSymbols ? "M" : ""}` : ""}
							{withSymbols ? " " : ":"}
							{seconds}
							{withSymbols ? "S" : ""}
						</p>
					)}
					{!!+hours && hours < showHoursBefore && (
						<p className="value">
							{hours}
							{withSymbols ? "h" : ""}
							{withSymbols ? " " : ":"}
							{minutes}
							{withSymbols ? "m" : ""}
							{withSymbols ? " " : ":"}
							{seconds}
							{withSymbols ? "S" : ""}
						</p>
					)}
					{!!+hours && hours >= showHoursBefore && (
						<p className="value">
							{daysLeft}
							{withSymbols ? "d" : ""}
							{withSymbols ? " " : ":"}
							{hours}
							{withSymbols ? "h" : ""}
						</p>
					)}
				</div>
			);
		}}
	/>
);

export default CustomTimer;
