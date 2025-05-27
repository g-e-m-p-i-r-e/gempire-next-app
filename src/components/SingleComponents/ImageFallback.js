import React, { useState } from "react";
import Image from "next/image";

import imgFallback from "../../assets/img/logoSmall.png";

const ImageFallback = ({ src, fallbackSrc = imgFallback, ...props }) => {
	const [currentSrc, setCurrentSrc] = useState(src);
	const onError = () => {
		setCurrentSrc(fallbackSrc);
	};

	return <Image src={currentSrc} onError={onError} alt={""} {...props} />;
};

export default ImageFallback;
