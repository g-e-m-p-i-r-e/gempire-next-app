const numberWithSeparator = (num, separator = " ") => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);

export default numberWithSeparator;
