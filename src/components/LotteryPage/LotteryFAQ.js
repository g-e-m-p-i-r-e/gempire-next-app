import React from "react";

import "../../assets/scss/HomePage/LotteryPage/LotteryFAQ.scss";

const LotteryFaq = () => (
	<div className="lottery-faq-con">
		<div className="heading">
			<span className="bold">Welcome to the daily lottery </span>- your gateway to early rewards in the world of Gempire.
		</div>
		<br />

		<div className="descr">
			Spin the wheel once a day and <span className="bold">collect bonus XP or GEMPS</span> to strengthen your position before the full Gempire ecosystem opens. Every spin brings you closer <span className="bold">to the top of the leaderboard.</span>
		</div>
		<br />
		<ul>
			<li className="list-descr">
				Most spins <span className="bold">reward XP</span>
			</li>
			<li className="list-descr">
				Occasionally, you’ll <span className="bold">get GEMPS</span>
			</li>
			<li className="list-descr">
				And if luck truly favors you <span className="bold">— a rare MON drop might be yours.</span>
			</li>
		</ul>
		<div className="sub-title">
			No tricks. No payments.
			<br />
			Just one spin, every day.
		</div>
	</div>
);

export default LotteryFaq;
