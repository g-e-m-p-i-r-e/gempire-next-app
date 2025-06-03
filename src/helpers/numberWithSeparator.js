const numberWithSeparator = (num, separator = " ") => {
	const [integerPart, decimalPart] = num.toString().split(".");
	return `${integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator)}${decimalPart ? `.${decimalPart}` : ""}`;
};

export default numberWithSeparator;
