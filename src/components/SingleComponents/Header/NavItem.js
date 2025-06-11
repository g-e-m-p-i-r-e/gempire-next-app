import React, { useEffect, useState } from "react";
import { Collapse } from "reactstrap";
import { useRouter } from "next/router";

import { useAppSelector } from "../../../redux";

import LinkElement from "../LinkElement";

const NavItem = ({ id, title, Icon, path, routes }) => {
	const { pathname } = useRouter();

	const isMobile = useAppSelector((state) => state.main.isMobile);

	const [hoveredId, setHoveredId] = useState("");
	const [activeId, setActiveId] = useState("");

	useEffect(() => {
		setActiveId(routes.find(({ path }) => pathname.includes(path))?.id || "");
	}, [pathname]);

	return (
		<LinkElement key={`nav-item-con${id}`} href={path} className={`nav-item-con ${id} ${hoveredId === id ? "hovered" : ""} ${activeId === id ? "active" : ""}`} onMouseEnter={() => setHoveredId(id)} onMouseLeave={() => setHoveredId("")}>
			<div className="icon-con f-center">
				<Icon />
			</div>
			<Collapse isOpen={!isMobile || hoveredId === id || activeId === id} horizontal>
				<div className="descr">{title}</div>
			</Collapse>
		</LinkElement>
	);
};

export default NavItem;
