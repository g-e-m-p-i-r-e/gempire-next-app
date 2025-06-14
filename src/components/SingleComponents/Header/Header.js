import React, { useEffect, useState } from "react";
import Image                          from "next/image";
import { Col, Container, Row } from "reactstrap";

import { useAppSelector } from "../../../redux";

import NavItem from "./NavItem";
import UserStats from "./UserStats";
import RunLine from "./RunLine";
import LinkElement from "../LinkElement";

import logoImg from "../../../assets/img/logo.png";
import { Home, Shop, Leaderboard, Info, Profile } from "../../../assets/img/headerIcons";

import "../../../assets/scss/SingleComponents/Header/Header.scss";

const Header = () => {
	const isMobile = useAppSelector((state) => state.main.isMobile);
	const isAuth = !!useAppSelector((state) => state.main.user._id);
	const userWallet = useAppSelector((state) => state.main.user.wallet);
	const username = useAppSelector((state) => state.main.user.username);
	const [routes, setRoutes] = useState([
		{ id: "home", title: "Home", Icon: Home, path: "/home" },
		{ id: "ranks", title: "Ranks", Icon: Leaderboard, path: "/ranks" },
		{ id: "shop", title: "Shop", Icon: Shop, path: "/shop" },
		{ id: "about", title: "About Us", Icon: Info, path: "/faq", isDisabled: isMobile },
		{ id: "profile", title: "Profile", Icon: Profile, path: "/profile", isDisabled: !isMobile },
	]);

	useEffect(() => {
		if (username || userWallet) {
			setRoutes([
				{ id: "home", title: "Home", Icon: Home, path: "/home" },
				{ id: "ranks", title: "Ranks", Icon: Leaderboard, path: "/ranks" },
				{ id: "shop", title: "Shop", Icon: Shop, path: "/shop" },
				{ id: "about", title: "About Us", Icon: Info, path: "/faq", isDisabled: isMobile },
				{ id: "profile", title: "Profile", Icon: Profile, path: `/profile/${username || userWallet}`, isDisabled: !isMobile },
			]);
		}
	}, [username, userWallet]);

	return (
		isAuth && (
			<>
				<div className="header-wrapper">
					{!isMobile && (
						<Container className="container-wrap">
							<Row>
								<Col>
									<div className="header-con">
										<div className="side-block">
											<LinkElement className="logo-con" href={"/home"}>
												<Image src={logoImg} alt={""} width={117} height={25} />
											</LinkElement>
											<div className="nav-panel-con">{routes.map(({ id, title, Icon, path, isDisabled }) => !isDisabled && <NavItem key={`nav-item-con${id}`} id={id} title={title} Icon={Icon} path={path} routes={routes} />)}</div>
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
								<div className="nav-panel-con">{routes.map(({ id, title, Icon, path, isDisabled }) => !isDisabled && <NavItem key={`nav-item-con${id}`} id={id} title={title} Icon={Icon} path={path} routes={routes} />)}</div>
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
