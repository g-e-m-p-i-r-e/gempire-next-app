import React, { useEffect, useState } from "react";
import Image from "next/image";

import CustomSmallModal from "../SingleComponents/CustomSmallModal";

import avatar1Img from "../../assets/img/LoginPage/avatars/avatar1.png";
import avatar2Img from "../../assets/img/LoginPage/avatars/avatar2.png";
import avatar3Img from "../../assets/img/LoginPage/avatars/avatar3.png";
import avatar4Img from "../../assets/img/LoginPage/avatars/avatar4.png";
import crossImg from "../../assets/img/common/cross.svg";

import "../../assets/scss/LoginPage/SetAvatarModal.scss";
import { toast } from "react-toastify";
import customToast from "../../helpers/customToast";

const avatars = [
	{ id: 1, src: avatar1Img },
	{ id: 2, src: avatar2Img },
	{ id: 3, src: avatar3Img },
	{ id: 4, src: avatar4Img },
];

const SetAvatarModal = ({ isSetAvatarModal, setIsSetAvatarModal, setAvatarSrc }) => {
	const [activeDefaultAvatar, setActiveDefaultAvatar] = useState(1);
	const [activeSrc, setActiveSrc] = useState("");

	const onClose = () => {
		setIsSetAvatarModal(false);
		setActiveSrc("");
	};

	const onSelect = () => {
		setAvatarSrc(activeSrc);
		onClose();
	};

	const uploadPhoto = (event) => {
		const maxSize = 2 * 1024 * 1024; // 2MB
		const file = event.target.files[0];
		if (file && file.size > maxSize) {
			customToast({ toastId: "fileSize", type: "error", message: "File size exceeds 2MB" });
			return;
		}

		console.log("file", file);
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setAvatarSrc(reader.result);
				onClose();

				console.log("reader", reader);
			};
			reader.readAsDataURL(file);
		}
	};

	useEffect(() => {
		if (isSetAvatarModal) {
			setActiveSrc(avatars[0].src.src);
			setActiveDefaultAvatar(1);
		}
	}, [isSetAvatarModal]);

	return (
		<CustomSmallModal isOpen={isSetAvatarModal} close={onClose} modalClassName={"registration-avatar-modal"}>
			<div className="registration-avatar-con">
				<div className="cross f-center" onClick={() => setIsSetAvatarModal(false)}>
					<Image src={crossImg} alt={""} width={22} height={22} />
				</div>
				<div className="title">Set Avatar</div>
				<div className="avatars-btn-wrap">
					{avatars.map(({ id, src }) => (
						<div
							key={`avatars-btn${id}`}
							className={`avatars-btn-con ${id === activeDefaultAvatar ? " active" : ""}`}
							onClick={() => {
								setActiveDefaultAvatar(id);
								setActiveSrc(src.src);
							}}
						>
							<Image src={src} alt={""} width={72} height={72} />
						</div>
					))}
				</div>
				<div className="btns-con">
					<div className="btn-item" onClick={onSelect}>
						Set Avatar
					</div>
					<label className="btn-upload">
						Your Image File
						<input type="file" name="avatar" accept="image/png, image/jpeg, image/jpg" onChange={uploadPhoto} />
					</label>
				</div>
			</div>
		</CustomSmallModal>
	);
};

export default SetAvatarModal;
