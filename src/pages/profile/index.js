import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "../../redux";

const Index = () => {
	const { push } = useRouter();

	const username = useAppSelector((state) => state.main.user.username);
	const wallet = useAppSelector((state) => state.main.user.wallet);

	useEffect(() => {
		push(`/profile/${username || wallet}`, undefined, { shallow: true });
	}, []);
	return <></>;
};

export default Index;
