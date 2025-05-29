import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

import loader from "../../assets/lottie/loader.json";

const Lottie = dynamic(() => import("lottie-react").then((module) => module), { ssr: false });

const PawsLottie = ({ isShow }) => {
	const lottieRef = useRef(null);

	useEffect(() => {
		let timer = null;

		if (lottieRef.current) {
			if (isShow) {
				if (lottieRef.current) {
					lottieRef.current.goToAndPlay(0, true);
				}
			} else {
				timer = setTimeout(() => {
					lottieRef.current.goToAndStop(0, true);
				}, 3000);
			}
		}

		return () => () => {
			clearTimeout(timer);
		};
	}, [isShow, lottieRef.current]);

	return <Lottie lottieRef={lottieRef} animationData={loader} loop={true} />;
};

export default PawsLottie;
