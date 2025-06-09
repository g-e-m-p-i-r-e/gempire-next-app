import React, { useEffect, useState } from "react";
import { Collapse } from "reactstrap";
import { useRouter } from "next/router";
import { useAppSelector } from "../../../redux";

const NavItem = ({ id, title, Icon, path, routes }) => {
	const { push, pathname } = useRouter();

	const isMobile = useAppSelector((state) => state.main.isMobile);

	const [hoveredId, setHoveredId] = useState("");
	const [activeId, setActiveId] = useState("");

	useEffect(() => {
		setActiveId(routes.find(({ path }) => pathname.includes(path))?.id || "");
	}, [pathname]);

	return (
		<div
			key={`nav-item-con${id}`}
			className={`nav-item-con ${id} ${hoveredId === id ? "hovered" : ""} ${activeId === id ? "active" : ""}`}
			onMouseEnter={() => setHoveredId(id)}
			onMouseLeave={() => setHoveredId("")}
			onClick={() => {
				push(path, undefined, { shallow: true });
			}}
		>
			<div className="icon-con f-center">
				<Icon />
			</div>
			<Collapse isOpen={!isMobile || hoveredId === id || activeId === id} horizontal>
				<div className="descr">{title}</div>
			</Collapse>
		</div>
	);
};

export default NavItem;
