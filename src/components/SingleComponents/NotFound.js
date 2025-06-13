import React from "react";
import { Col, Row } from "reactstrap";

import "../../assets/scss/SingleComponents/NotFound.scss";
import LinkElement from "./LinkElement";

const NotFound = () => (
	<div className="not-found-container container">
		<Row noGutters={true}>
			<Col xs={12} lg={{ size: 8, offset: 2 }}>
				<div className="not-found-title-wrapper">
					<h1 className="not-found-title">Page Not Found</h1>
				</div>
				<div className="text-center main-page-button">
					<LinkElement href="/home" className="orange-button">
						Main Page
					</LinkElement>
				</div>
			</Col>
		</Row>
	</div>
);

export default NotFound;
