import React, { useEffect, useRef } from "react";
import { useAppSelector } from "../../redux";

const StarsAnimation = () => {
	const isMobile = useAppSelector((state) => state.main.isMobile);

	const ref = useRef();
	const isStart = true;

	function stars() {
		const arr = [];
		for (let i = 0; i < 4; i++) {
			const e = document.createElement("div");
			arr.push(e);
			e.setAttribute("class", "star");
			ref.current.appendChild(e);
			e.style.top = `${Math.random() * +window.innerHeight}px`;

			const size = Math.random() * 10 + 5;
			const duration = Math.random() * 15;

			e.style.fontSize = `${size}px`;
			e.style.animationDuration = `${2 + duration}s`;
			e.style.animationName = ["animate-dot-left", "animate-dot-right"][Math.floor(Math.random() * 2)];
		}
		setTimeout(() => {
			if (ref.current?.removeChild) {
				arr.forEach((e) => ref.current.removeChild(e));
			}
		}, 10000);
	}

	useEffect(() => {
		let interval = null;
		if (isStart && !isMobile) {
			interval = setInterval(() => {
				stars();
			}, 200);
		}
		return () => {
			clearInterval(interval);
		};
	}, [isStart, isMobile]);

	return (
		<div className="starts-animation-wrapper">
			<div className="starts-animation-con" ref={ref} />
		</div>
	);
};

export default StarsAnimation;
