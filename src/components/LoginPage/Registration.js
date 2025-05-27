import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Image from "next/image";

import SetAvatarModal from "./SetAvatarModal";

import logoImg from "../../assets/img/logo.png";
import charImg from "../../assets/img/LoginPage/registrationChar.png";
import photoImg from "../../assets/img/LoginPage/photo.svg";

import "../../assets/scss/LoginPage/Registration.scss";
import { useAppSelector } from "../../redux";

const Registration = () => {
	const isMobile = useAppSelector((state) => state.main.isMobile);

	const [isSetAvatarModal, setIsSetAvatarModal] = useState(false);
	const [avatarSrc, setAvatarSrc] = useState("");

	return (
		<>
			<Container>
				<Row>
					<Col md={6}>
						<div className="registration-content-con">
							<div className="logo-con">
								<Image src={logoImg} alt={""} width={117} height={25} />
							</div>
							<div className="title">Set Nick & Avatar</div>
							<div className="descr">Personalize your profile to stand out in GEMPIRE.</div>
							<div className={`avatar-con f-center ${avatarSrc ? "active" : ""}`} onClick={() => setIsSetAvatarModal(true)}>
								<Image src={avatarSrc || photoImg} alt={""} width={avatarSrc ? 84 : 36} height={avatarSrc ? 84 : 36} />
							</div>
							<div className="btn-avatar" onClick={() => setIsSetAvatarModal(true)}>
								Choose avatar
							</div>
							<input type="text" className="name-input" placeholder="Nickname" />
							<div className="btn-item f-center disabled">Create profile</div>
						</div>
					</Col>
					{!isMobile && (
						<Col md={6}>
							<div className="img-con f-center h-100">
								<Image src={charImg} alt={""} width={664} height={432} />
							</div>
						</Col>
					)}
				</Row>
			</Container>

			<SetAvatarModal isSetAvatarModal={isSetAvatarModal} setIsSetAvatarModal={setIsSetAvatarModal} setAvatarSrc={setAvatarSrc} />
		</>
	);
};

export default Registration;
