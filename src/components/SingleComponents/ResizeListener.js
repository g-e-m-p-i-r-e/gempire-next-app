import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppDispatch } from "../../redux";
import { setIsMobile } from "../../redux/slices/main";

const ResizeListener = () => {
	const dispatch = useAppDispatch();
	const { asPath } = useRouter();

	const resizeListener = () => {
		dispatch(setIsMobile(window.innerWidth < 768));
	};

	useEffect(() => {
		resizeListener();
		window.addEventListener("resize", resizeListener);
		return () => {
			window.removeEventListener("resize", resizeListener);
		};
	}, [asPath]);
	return <></>;
};

export default ResizeListener;
