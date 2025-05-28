import React from "react";
import Image from "next/image";

import CustomSmallModal from "../SingleComponents/CustomSmallModal";

import crossImg from "../../assets/img/common/cross.svg";

import "../../assets/scss/ProfilePage/RefInfoModal.scss";

const RefInfoModal = ({ isOpen, setIsOpen }) => {
	return (
		<CustomSmallModal isOpen={isOpen} close={() => setIsOpen(false)} modalClassName={"ref-info-modal-modal"}>
			<div className="ref-info-con">
				<div className="cross f-center" onClick={() => setIsOpen(false)}>
					<Image src={crossImg} alt={""} width={22} height={22} />
				</div>
				<div className="title">Partner Program</div>
				<div className="descr">
					Unlock higher rewards by joining our Partner Program. As a partner, you’ll receive:
					<ul>
						<li>
							<span className="strong">10% of the earnings</span> from users you directly refer (Level 1)
						</li>
						<li>
							<span className="strong">2% from the earnings</span> of users they invite (Level 2)
						</li>
					</ul>
					This program is designed for <span className="diff">ambassadors, influencers, and community leaders</span> who want to grow with us. Once activated, you'll access advanced referral tools and higher commission rates.
					<br />
					<br />
					To qualify for the partner program, be as active as possible on the platform.
				</div>
			</div>
		</CustomSmallModal>
	);
};

export default RefInfoModal;
