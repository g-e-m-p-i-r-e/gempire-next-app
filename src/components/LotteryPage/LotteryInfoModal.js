import React, { useState } from "react";
import Image from "next/image";

import infoImg from "../../assets/img/common/infoBlack.svg";
import crossImg from "../../assets/img/common/cross.svg";
import CustomSmallModal from "../SingleComponents/CustomSmallModal";
import LotteryFaq from "./LotteryFAQ";

const LotteryInfoModal = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	return (
		<>
			<div className="tickets-price-con" onClick={() => setIsModalOpen(true)}>
				<div className="title">Info</div>
				<div className="img-con">
					<Image src={infoImg} alt={""} width={14} height={14} />
				</div>
			</div>

			<CustomSmallModal isOpen={isModalOpen} close={() => setIsModalOpen(false)} modalClassName={"lottery-faq-modal"}>
				<div className="lottery-faq-modal-con">
					<div className="cross f-center" onClick={() => setIsModalOpen(false)}>
						<Image src={crossImg} alt={""} width={22} height={22} />
					</div>
					<div className="title">Lottery Information</div>

					<LotteryFaq />
				</div>
			</CustomSmallModal>
		</>
	);
};

export default LotteryInfoModal;
