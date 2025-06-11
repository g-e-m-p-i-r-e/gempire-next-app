import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { setUser } from "../../redux/slices/main";
import { useAppDispatch, useAppSelector } from "../../redux";
import fetchWithToken from "../../helpers/fetchWithToken";
import customToast from "../../helpers/customToast";

import successMark from "../../assets/img/common/successMark.svg";

import "../../assets/scss/ProfilePage/UsernameBlock.scss";

const EngRegex = /[^a-zA-Z0-9_]/g;

const UsernameBlock = () => {
	const dispatch = useAppDispatch();
	const inputRef = useRef();

	const username = useAppSelector((state) => state.main.user.username);

	const [newUsername, setNewUsername] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isSaved, setIsSaved] = useState(false);

	const handleFocus = () => {
		setNewUsername(username || "");
		if (inputRef.current) {
			inputRef.current.focus();
		}
	};

	const onInputChange = (e) => {
		if (e.target.value.length > 16) {
			e.target.value = e.target.value.slice(0, 16);
		}

		const cutSymbols = e.target.value.replace(EngRegex, "", "");

		setNewUsername(`@${cutSymbols}`);
	};

	const postSaveUsername = async () => {
		if (isLoading) {
			return;
		}
		try {
			setIsLoading(true);

			const usernameCutted = newUsername.replace(EngRegex, "");
			if (usernameCutted === username) {
				return;
			}

			if (!usernameCutted || usernameCutted.length < 3 || usernameCutted.length > 16) {
				customToast({ toastId: "/user/username", type: "error", message: "Username must be between 3 and 16 characters." });
				return;
			}

			const { success, error } = await fetchWithToken("/user/username", {
				method: "POST",
				body: { username: usernameCutted },
			});
			if (!success && error?.message?.toLowerCase()?.includes("duplicate")) {
				customToast({ toastId: "username", type: "error", message: "This username is already taken. Please choose another one." });
				return;
			}
			if (!success) {
				customToast({ toastId: "username", type: "error", message: "Something went wrong while save username. Please try again later." });
				return;
			}

			dispatch(setUser({ username: usernameCutted }));
			setNewUsername("");
			setIsSaved(true);
			if (inputRef.current) {
				inputRef.current.blur();
			}
		} catch (e) {
			console.error(`Err at postSaveUsername: ${e}`);
		} finally {
			setIsLoading(false);
		}
	};

	const handleKeyDown = async (event) => {
		if (event.key === "Enter") {
			await postSaveUsername();
		}
	};

	useEffect(() => {
		let timer = null;

		if (isSaved) {
			timer = setTimeout(() => {
				setIsSaved(false);
			}, 2000);
		}
		return () => {
			if (timer) {
				clearTimeout(timer);
			}
		};
	}, [isSaved]);

	const onBlur = () => {
		if (inputRef.current && newUsername.length === 1) {
			setNewUsername("");
		}
	};

	const editUsername = newUsername || (username ? `@${username}` : "");

	return (
		<div className="input-con">
			<input ref={inputRef} autoComplete="off" type="text" onKeyDown={handleKeyDown} onChange={onInputChange} onBlur={onBlur} value={editUsername} className="input-item" placeholder="Add Username" />
			{!newUsername && !isSaved && (
				<div className="edit-btn" onClick={handleFocus}>
					Edit
				</div>
			)}
			{newUsername && !isSaved && (
				<div className="edit-btn save" onClick={postSaveUsername}>
					Save
				</div>
			)}
			{isSaved && (
				<div className="edit-btn">
					<Image src={successMark} alt={""} width={16} height={16} />
				</div>
			)}
		</div>
	);
};

export default UsernameBlock;
