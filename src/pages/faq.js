import React, { useState } from "react";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Col, Collapse, Container, Row } from "reactstrap";

import getSEOOptions from "../helpers/getSEOOptions";

import faqImg from "../assets/img/FaqPage/faqMain.png";
import discordImg from "../assets/img/FaqPage/discord.png";
import twitterImg from "../assets/img/FaqPage/twitter.png";
import telegramImg from "../assets/img/FaqPage/telegram.png";
// import mediumImg from "../assets/img/FaqPage/medium.png";
import arrowWhiteImg from "../assets/img/common/arrowWhite.svg";

import "../assets/scss/FaqPage/main.scss";
import { useAppSelector } from "../redux";

const socials = [
	{
		id: "discord",
		img: discordImg,
		title: "Discord",
		link: "https://discord.gg/c3urWF6Tak",
	},
	{
		id: "twitter",
		img: twitterImg,
		title: "Twitter",
		link: "https://x.com/gempire_app",
	},
	{
		id: "telegram",
		img: telegramImg,
		title: "Telegram",
		link: "https://t.me/gempire_app",
	},
	// {
	// 	id: "medium",
	// 	img: mediumImg,
	// 	title: "Medium",
	// 	link: "",
	// },
];

const questions = [
	{
		title: "What are $GEMP and XP?",
		descr: "$GEMP is the in-game token of the Gempire project.<br/>XP (experience points) reflect a user's activity and determine their position on the leaderboard.",
	},
	{
		title: "What is the leaderboard?",
		descr: "The leaderboard shows your rank. Top-performing players receive additional rewards based on their standing.",
	},
	{
		title: "How can I earn $GEMP?",
		descr: "You can earn $GEMP by completing daily and weekly quests available on the platform. Participating in quests is the main way to accumulate tokens.",
	},
	{
		title: "Do I need to invest anything?",
		descr: "No. Participation in the pre-launch phase is completely free. All you need is a wallet, Twitter and Discord accounts - and a bit of motivation.",
	},
	{
		title: "Why should I join now?",
		descr: "Early participants have the chance to earn $GEMP before the official launch, climb the leaderboard, and gain exclusive advantages later on.",
	},
	{
		title: "What rewards are available in the daily lottery?",
		descr: "The daily lottery gives players a chance to win XP, $GEMP, and even test $MONAD - a token from the Monad ecosystem.",
	},
];
const Faq = () => {
	const isMobile = useAppSelector((state) => state.main.isMobile);

	const [activeQuestionId, setActiveQuestionId] = useState(-1);

	const toggleQuestion = (id) => {
		setActiveQuestionId((prevId) => (prevId === id ? -1 : id));
	};

	return (
		<div className="faq-page-con">
			<Container>
				<Row className="justify-content-center">
					<Col xl={10}>
						<div className="page-content-wrap">
							<div className="side-con">
								<div className="main-img-con f-center">
									<Image src={faqImg} alt={""} width={526} height={266} />
								</div>
								<div className="page-title">Welcome to Gempire</div>
								<div className="info-block">
									<div className="title">About Us</div>
									<div className="block-title">
										<span className="strong">Prelaunch </span>- your early access gateway into the world where builders rule.
									</div>
									<div className="descr">
										<span className="strong">Complete quests. Earn XP. Stack GEMPS. </span>This is your chance to prepare, level up, and secure your spot before the full game begins.
										<br />
										<br />
										The future of Gempire belongs<span className="strong"> to those who start early.</span>
										<br />
										The earlier you move -<span className="strong"> the stronger your voice in what comes next.</span>
									</div>
								</div>
								{!isMobile && (
									<div className="info-block">
										<div className="title">Our Socials</div>
										<div className="socials-block">
											{socials.map(({ id, img, link }) => (
												<a key={`social-item${id}`} href={link} target="_blank" rel="noreferrer" className="social-item">
													<div className="img-con f-center">
														<Image src={img} alt={""} width={64} height={64} />
													</div>
												</a>
											))}
										</div>
									</div>
								)}
							</div>
							<div className="side-con">
								<div className="info-block">
									<div className="title">FAQ</div>
									<div className="questions-con">
										{questions.map(({ title, descr }, index) => (
											<div key={`question-item${index}`} className="question-item-con">
												<div className="title-con" onClick={() => toggleQuestion(index)}>
													<div className="question-title">{title}</div>
													<div className={`arrow-con ${activeQuestionId === index ? "active" : ""}`}>
														<Image src={arrowWhiteImg} alt={""} width={24} height={24} />
													</div>
												</div>
												<Collapse isOpen={activeQuestionId === index}>
													<div className="question-descr" dangerouslySetInnerHTML={{ __html: descr }} />
												</Collapse>
											</div>
										))}
									</div>
								</div>
							</div>

							{isMobile && (
								<div className="info-block">
									<div className="title">Our Socials</div>
									<div className="socials-block">
										{socials.map(({ id, img, link }) => (
											<a key={`social-item${id}`} href={link} target="_blank" rel="noreferrer" className="social-item">
												<div className="img-con f-center">
													<Image src={img} alt={""} width={64} height={64} />
												</div>
											</a>
										))}
									</div>
								</div>
							)}
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export const getServerSideProps = async ({ locale, resolvedUrl }) => ({
	props: {
		...(await serverSideTranslations(locale, ["common"])),
		...getSEOOptions(resolvedUrl),
	},
});
export default Faq;
