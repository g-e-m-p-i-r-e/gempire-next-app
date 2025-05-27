import React, { useState } from "react";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Col, Collapse, Container, Row } from "reactstrap";

import getSEOOptions from "../helpers/getSEOOptions";

import faqImg from "../../src/assets/img/FaqPage/faqMain.png";
import discordImg from "../../src/assets/img/FaqPage/discord.png";
import twitterImg from "../../src/assets/img/FaqPage/twitter.png";
import arrowWhiteImg from "../../src/assets/img/common/arrowWhite.svg";

import "../assets/scss/FaqPage/main.scss";
import { useAppSelector } from "../redux";

const socials = [
	{
		id: "discord",
		img: discordImg,
		title: "Discord",
		link: "https://discord.gg",
	},
	{
		id: "twitter",
		img: twitterImg,
		title: "Twitter",
		link: "https://x.com",
	},
];

const questions = [
	{
		title: "Question 1",
		descr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	},
	{
		title: "Question 2",
		descr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	},
	{
		title: "Question 3",
		descr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	},
	{
		title: "Question 4",
		descr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
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
								<div className="main-img-con">
									<Image src={faqImg} alt={""} width={477} height={254} />
								</div>
								<div className="page-title">Build your own GEMPIRE!</div>
								<div className="info-block">
									<div className="title">About Us</div>
									<div className="descr">
										Welcome to our platform, where we redefine the lottery experience through the power of cryptocurrency!
										<br />
										<br />
										Our unique games let you <span className="strong">purchase</span> tickets with digital currencies, <span className="strong">giving</span> you the opportunity to <span className="strong">win incredible prizes</span> that could change your life. Thanks to our cutting-edge blockchain technology, every transaction and drawing is meticulously documented, <span className="strong">guaranteeing</span> a fair and trustworthy environment.
										<br />
										<br />
										<span className="strong">Dive into the excitement and discover if fortune favors you!</span>
									</div>
								</div>
								{!isMobile && (
									<div className="info-block">
										<div className="title">Our Socials</div>
										<div className="socials-block">
											{socials.map(({ id, title, img, link }) => (
												<a key={`social-item${id}`} href={link} target="_blank" rel="noreferrer" className="social-item">
													{title}
													<div className="img-con f-center">
														<Image src={img} alt={""} width={32} height={32} />
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
													<div className="question-descr">{descr}</div>
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
										{socials.map(({ id, title, img, link }) => (
											<a key={`social-item${id}`} href={link} target="_blank" rel="noreferrer" className="social-item">
												{title}
												<div className="img-con f-center">
													<Image src={img} alt={""} width={32} height={32} />
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
