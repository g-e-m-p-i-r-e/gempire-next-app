import React from "react";
import Image from "next/image";
import { Col, Container, Row } from "reactstrap";
import { useRouter } from "next/router";

import { useAppSelector } from "../../../redux";

import NavItem from "./NavItem";
import UserStats from "./UserStats";
import RunLine from "./RunLine";

import logoImg from "../../../assets/img/logo.png";
import { Home, Shop, Leaderboard, Profile, Info } from "../../../assets/img/headerIcons";

import "../../../assets/scss/SingleComponents/Header/Header.scss";

const routes = [
	{ id: "home", title: "Home", Icon: Home, path: "/home" },
	{ id: "ranks", title: "Ranks", Icon: Leaderboard, path: "/ranks" },
	{ id: "shop", title: "Shop", Icon: Shop, path: "/shop" },
	{ id: "about", title: "About Us", Icon: Info, path: "/faq" },
	{ id: "profile", title: "Profile", Icon: Profile, path: "/profile" },
];

const Header = () => {
	const { push } = useRouter();

	const isMobile = useAppSelector((state) => state.main.isMobile);
	const isAuth = !!useAppSelector((state) => state.main.user._id);

	return (
		isAuth && (
			<>
				<div className="header-wrapper">
					{!isMobile && (
						<Container>
							<Row>
								<Col>
									<div className="header-con">
										<div className="side-block">
											<div
												className="logo-con"
												onClick={() => {
													push("/home", undefined, { shallow: true });
												}}
											>
												<Image src={logoImg} alt={""} width={117} height={25} />
											</div>
											<div className="nav-panel-con">
												{routes.map(({ id, title, Icon, path }) => (
													<NavItem key={`nav-item-con${id}`} id={id} title={title} Icon={Icon} path={path} routes={routes} />
												))}
											</div>
										</div>
										<UserStats />
									</div>
								</Col>
							</Row>
						</Container>
					)}

					{isMobile && (
						<>
							<Container>
								<Row>
									<Col>
										<div className="header-con">
											<UserStats />
										</div>
									</Col>
								</Row>
							</Container>

							<div className="mobile-navbar-con">
								<div className="nav-panel-con">
									{routes.map(({ id, title, Icon, path }) => (
										<NavItem key={`nav-item-con${id}`} id={id} title={title} Icon={Icon} path={path} routes={routes} />
									))}
								</div>
							</div>
						</>
					)}

					<RunLine />
				</div>
			</>
		)
	);
};

export default Header;
