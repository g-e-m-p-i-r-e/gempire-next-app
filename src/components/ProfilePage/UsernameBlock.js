import React, { useEffect, useRef, useState } from "react";

import { setUser } from "../../redux/slices/main";
import { useAppDispatch, useAppSelector } from "../../redux";

import "../../assets/scss/ProfilePage/UsernameBlock.scss";
import fetchWithToken from "../../helpers/fetchWithToken";
import customToast from "../../helpers/customToast";

const EngRegex = /[^a-zA-Z0-9_]/g;

const UsernameBlock = () => {
	const dispatch = useAppDispatch();
	const inputRef = useRef();

	const username = useAppSelector((state) => state.main.user.username);

	const [isUsernameInputActive, setIsUsernameInputActive] = useState(false);
	const [newUsername, setNewUsername] = useState("");
	const handleFocus = () => {
		setIsUsernameInputActive(true);
		setNewUsername(username || "");
	};

	const onInputChange = (e) => {
		if (e.target.value.length > 16) {
			e.target.value = e.target.value.slice(0, 16);
		}

		const cutSymbols = e.target.value.replace(EngRegex, "", "");

		setNewUsername(`@${cutSymbols}`);
	};

	const postSaveUsername = async () => {
		try {
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
			setIsUsernameInputActive(false);
			setNewUsername("");
		} catch (e) {
			console.error(`Err at postSaveUsername: ${e}`);
		}
	};

	useEffect(() => {
		if (inputRef.current && isUsernameInputActive) {
			inputRef.current.focus();
		}
	}, [inputRef, isUsernameInputActive]);

	const editUsername = newUsername || username;

	return (
		<div className="input-con">
			<input ref={inputRef} autoComplete="off" type="text" disabled={!isUsernameInputActive} onChange={onInputChange} value={editUsername} className="input-item" placeholder="Add Username" />
			{!newUsername && (
				<div className="edit-btn" onClick={handleFocus}>
					Edit
				</div>
			)}
			{newUsername && (
				<div className="edit-btn save" onClick={postSaveUsername}>
					Save
				</div>
			)}
		</div>
	);
};

export default UsernameBlock;
