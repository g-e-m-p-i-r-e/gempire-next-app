import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Col, Container, Row } from "reactstrap";
import Image from "next/image";

import getSEOOptions from "../helpers/getSEOOptions";

import noShopImg from "../assets/img/ShopPage/noShop.png";

import "../assets/scss/ShopPage/main.scss";

const Shop = () => {
	return (
		<div className="shop-page-con">
			<Container>
				<Row className="justify-content-center">
					<Col xs={10} xl={5}>
						<div className="no-shop-con">
							<div className="img-con f-center">
								<Image src={noShopImg} alt={""} width={96} height={96} />
							</div>
							<div className="title">Coming Soon!</div>
							<div className="descr">
								Get ready for our <span class="strong">brand-new marketplace</span> with exclusive sticker packs and collectibles. <span class="strong">Unique drops, limited editions, and more</span> — launching soon!
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export const getServerSideProps = async ({ locale, resolvedUrl }) => ({
	props: {
		...(await serverSideTranslations(locale, ["common"])),
		...getSEOOptions(resolvedUrl),
	},
});
export default Shop;
