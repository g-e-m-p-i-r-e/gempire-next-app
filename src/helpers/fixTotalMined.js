import decimalAdjust from "./decimalAdjust";

const fixTotalMined = (totalMined) => {
	if (!totalMined) {
		return "0";
	}
	if (+totalMined < 1000) {
		return totalMined;
	}
	if (+totalMined < 1000000) {
		return `${decimalAdjust(+totalMined / 1000, 2)}K`;
	}
	if (+totalMined < 1000000000) {
		return `${decimalAdjust(+totalMined / 1000000, 2)}M`;
	}
	return `${decimalAdjust(+totalMined / 1000000000, 2)}B`;
};

export { fixTotalMined };
