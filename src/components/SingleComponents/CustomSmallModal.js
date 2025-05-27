import React, { useEffect, useState } from "react";
import { Modal } from "reactstrap";

import "../../assets/scss/SingleComponents/CustomSmallModal.scss";

const CustomSmallModal = ({ isOpen, isCloseAble = true, close, children, modalClassName }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isShowBackdrop, setisShowBackdrop] = useState(false);

	const onClose = async () => {
		if (!isCloseAble) return;
		setIsModalOpen(false);
		setisShowBackdrop(false);
		await new Promise((res) => {
			setTimeout(() => {
				close();
				res();
			}, 250);
		});
	};

	useEffect(() => {
		if (isOpen) {
			setisShowBackdrop(true);
			setTimeout(() => {
				setIsModalOpen(true);
			}, 250);
		}
		if (!isOpen && isModalOpen) {
			onClose();
		}
	}, [isOpen]);

	return (
		<Modal isOpen={isShowBackdrop} toggle={onClose} backdropClassName="swipe-able-popup-backdrop" modalClassName={`swipe-able-popup-modal ${modalClassName}`} className="swipe-able-popup-wrapper" zIndex={900}>
			<div className={`swipe-able-popup-container ${isModalOpen ? "is-open" : "is-close"}`}>{children}</div>
		</Modal>
	);
};

export default CustomSmallModal;
