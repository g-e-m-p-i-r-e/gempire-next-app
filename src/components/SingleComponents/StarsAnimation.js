import React, { useEffect, useRef } from "react";

const StarsAnimation = () => {
	const ref = useRef();
	const isStart = true;

	function stars() {
		const arr = [];
		for (let i = 0; i < 4; i++) {
			let e = document.createElement("div");
			arr.push(e);
			e.setAttribute("class", "star");
			ref.current.appendChild(e);
			e.style.top = Math.random() * +innerHeight + "px";

			let size = Math.random() * 10 + 5;
			let duration = Math.random() * 15;

			e.style.fontSize = size + "px";
			e.style.animationDuration = 2 + duration + "s";
			e.style.animationName = ["animate-dot-left", "animate-dot-right"][Math.floor(Math.random() * 2)];
		}
		setTimeout(() => {
			arr.forEach((e) => ref.current.removeChild(e));
		}, 10000);
	}

	useEffect(() => {
		let interval = null;
		if (isStart) {
			interval = setInterval(() => {
				stars();
			}, 200);
		}
		return () => {
			clearInterval(interval);
		};
	}, [isStart]);

	return <div className="starts-animation-con" ref={ref} />;
};

export default StarsAnimation;
