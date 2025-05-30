import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Image from "next/image";
import { useAppKit, useAppKitAccount, useDisconnect } from "@reown/appkit/react";
import { useSignMessage } from "wagmi";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";

import { useAppDispatch, useAppSelector } from "../../redux";
import fetchWithToken from "../../helpers/fetchWithToken";
import { setUser } from "../../redux/slices/main";
import customToast from "../../helpers/customToast";

import CustomSmallModal from "../SingleComponents/CustomSmallModal";

import logoImg from "../../assets/img/logo.png";
import boosterImg from "../../assets/img/LoginPage/booster.png";
import boosterMobileImg from "../../assets/img/LoginPage/boosterMobile.png";
import crossImg from "../../assets/img/common/cross.svg";

import "../../assets/scss/LoginPage/EnterLogin.scss";

const EnterLogin = () => {
	const dispatch = useAppDispatch();
	const { push } = useRouter();

	const { open } = useAppKit();
	const { disconnect } = useDisconnect();
	const { signMessageAsync } = useSignMessage();

	const isMobile = useAppSelector((state) => state.main.isMobile);
	const { address: evmAddress } = useAppKitAccount();

	const [isFaqOpen, setIsFaqOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isNewConnected, setIsNewConnected] = useState(false);
	const [isAskSingModal, setIsAskSingModal] = useState(false);

	const isConnectDisabled = isLoading;

	const postLogIn = async (message) => {
		try {
			const res = await fetchWithToken("/user/auth", {
				method: "POST",
				body: {
					address: evmAddress,
					signature: message,
				},
			});

			if (!res?.success || !res?.data) {
				customToast({ toastId: "/user/auth", type: "error", message: "Something went wrong while auth. Please try again later." });

				return false;
			}

			let expires = new Date();
			expires = new Date(expires.getUTCFullYear() + 1, expires.getUTCMonth(), expires.getUTCDate());

			await setCookie(`${process.env.ACCESS_TOKEN_PREFIX}-accessToken`, res.data.tokens.accessToken, { expires });
			dispatch(setUser(res.data.user));

			await push("/home", undefined, { shallow: true });
		} catch (error) {
			console.error("Error opening wallet:", error);
		}
	};

	const onSignMessage = async () => {
		try {
			setIsLoading(true);
			const res = await fetchWithToken("/user/nonce", {
				method: "POST",
				body: {
					address: evmAddress,
				},
			});

			if (!res?.success || !res?.data) {
				customToast({ toastId: "/user/nonce", type: "error", message: "Something went wrong while get nonce. Please try again later." });
				return false;
			}

			const nonce = res.data;

			const signatureFix = await signMessageAsync({ message: `Sign this message to authenticate: ${nonce}` });

			await postLogIn(signatureFix);
		} catch (error) {
			console.error("Error opening wallet:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const sign = async () => {
		customToast({ toastId: "/user/nonce", type: "error", message: evmAddress });
	};

	const openModal = async () => {
		if (!isConnectDisabled && !evmAddress) {
			await disconnect();
			await open();
			setIsNewConnected(true);
		} else {
			setIsAskSingModal(true);
		}
	};

	const cancelSign = async () => {
		await disconnect();
		setIsAskSingModal(false);
	};

	useEffect(() => {
		if (evmAddress && !isConnectDisabled && isNewConnected) {
			setIsAskSingModal(true);
		}
	}, [evmAddress, isNewConnected]);

	return (
		<>
			<Container>
				<Row className="flex-column-reverse flex-md-row">
					<Col md={6}>
						<div className="login-content-con">
							{!isMobile && (
								<div className="logo-con">
									<Image src={logoImg} alt={""} width={117} height={25} />
								</div>
							)}
							<div className="title" onClick={sign}>
								Join early.
								<br />
								Earn XP & GEMP
							</div>
							<div className="btns-con">
								<div className={`btn-item ${isConnectDisabled ? "disabled" : ""}`} onClick={openModal}>
									Connect Wallet
								</div>
								<div className="btn-faq" onClick={() => setIsFaqOpen(true)}>
									What is Web3 wallet?
								</div>
							</div>
						</div>
					</Col>
					<Col md={6}>
						<div className="img-con f-center">
							<Image src={isMobile ? boosterMobileImg : boosterImg} alt={""} width={isMobile ? 220 : 664} height={isMobile ? 220 : 744} />
						</div>
					</Col>
				</Row>
			</Container>

			<CustomSmallModal isOpen={isFaqOpen} close={() => setIsFaqOpen(false)} modalClassName={"login-faq-modal"}>
				<div className="login-faq-con">
					<div className="cross f-center" onClick={() => setIsFaqOpen(false)}>
						<Image src={crossImg} alt={""} width={22} height={22} />
					</div>
					<div className="title">What is Web3 wallet?</div>
					<div className="descr">
						A Web3 wallet is a tool for storing crypto and using <span className="strong">decentralized apps (dApps).</span> It lets you control your digital assets directly, without banks or other intermediaries.
					</div>
					<div className="descr mb-0">
						Popular Web3 wallets include{" "}
						<a href="https://metamask.io/download" className="link" target="_blank" rel="noreferrer">
							MetaMask
						</a>
						,{" "}
						<a href="https://trustwallet.com/download" className="link" target="_blank" rel="noreferrer">
							Trust Wallet
						</a>
						, and{" "}
						<a href="https://www.coinbase.com/wallet/downloads" className="link" target="_blank" rel="noreferrer">
							Coinbase Wallet
						</a>
						, and they are often used through browser extensions or mobile apps.
					</div>
				</div>
			</CustomSmallModal>

			<CustomSmallModal isOpen={isAskSingModal} backdrop={"static"} close={cancelSign} modalClassName={"login-faq-modal"}>
				<div className="login-faq-con">
					<div className="cross f-center" onClick={cancelSign}>
						<Image src={crossImg} alt={""} width={22} height={22} />
					</div>
					<div className="title">Sign In</div>
					<div className="descr">
						Sign the message to prove you own this wallet and proceed.
						<br />
						<span className="ligth">Canceling will disconnect you.</span>
					</div>
					<div className={`sign-btn ${isConnectDisabled ? "disabled" : ""}`} onClick={onSignMessage}>
						Sign
					</div>
				</div>
			</CustomSmallModal>
		</>
	);
};

export default EnterLogin;
