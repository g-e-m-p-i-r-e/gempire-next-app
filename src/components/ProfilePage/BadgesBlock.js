import React from "react";
import Image from "next/image";

import badge1m from "../../assets/img/ProfilePage/badges/1m.png";
import badge1w from "../../assets/img/ProfilePage/badges/1w.png";
import badge60d from "../../assets/img/ProfilePage/badges/60d.png";
import badge90d from "../../assets/img/ProfilePage/badges/90d.png";
import badgeLock from "../../assets/img/ProfilePage/badges/lock.png";

import "../../assets/scss/ProfilePage/BadgesBlock.scss";

const BadgesBlock = () => {
	const badges = [badge1m, badge1w, badge60d, badge90d, badgeLock, badgeLock, badgeLock];
	return (
		<div className="badges-block-con">
			<div className="block-title">Badges</div>
			<div className="badges-con">
				{badges.map((img) => (
					<div className="badge-img-con f-center">
						<Image src={img} alt={""} width={64} height={72} />
					</div>
				))}
				<div className="row-aligner"></div>
				<div className="row-aligner"></div>
				<div className="row-aligner"></div>
				<div className="row-aligner"></div>
				<div className="row-aligner"></div>
				<div className="row-aligner"></div>
			</div>
		</div>
	);
};

export default BadgesBlock;
