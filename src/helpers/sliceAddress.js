const sliceAddress = (str, from = 6, to = -4) => `${str.slice(0, from)}...${str.slice(to)}`;

export default sliceAddress;
