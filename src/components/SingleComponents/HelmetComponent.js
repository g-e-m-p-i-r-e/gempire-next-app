import React from "react";
import { NextSeo } from "next-seo";

const HelmetComponent = ({ title, description, keywords, canonical }) => (
	<NextSeo
		title={title}
		description={description}
		canonical={canonical}
		openGraph={{
			type: "website",
			url: `${canonical}`,
			title: `${title}`,
			description: `${description}`,
			images: [
				{
					url: `${process.env.SITE_URL}/static/page-preview.png`,
					alt: "preview",
					width: 960,
					height: 960,
				},
			],
		}}
		additionalMetaTags={[
			{
				httpEquiv: "X-UA-Compatible",
				content: "IE=edge",
			},
			{
				name: "viewport",
				content: "width=device-width, user-scalable=no",
			},
			{
				name: "x-ua-compatible",
				content: "IE=edge; chrome=1",
			},
			{
				name: "description",
				content: `${description}`,
			},
			{
				name: "keywords",
				content: `${keywords}`,
			},
			{ name: "twitter:image", content: `${process.env.SITE_URL}/static/page-preview.png` },
			{
				property: "twitter:title",
				content: "GEMPIRE",
			},
			{
				property: "twitter:description",
				content: "Build your own Gempire",
			},
		]}
		additionalLinkTags={[
			{
				rel: "dns-prefetch",
				href: "https://fonts.googleapis.com",
			},
			{
				rel: "preconnect",
				href: "https://www.google-analytics.com",
			},
			{
				rel: "preconnect",
				href: "https://www.googletagmanager.com",
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com",
			},
			{
				rel: "icon",
				href: "/favicon.ico",
			},
			{
				rel: "icon",
				href: "/static/favicon-32x32.png",
				sizes: "32x32",
			},
		]}
		twitter={{
			site: "@gempire_app",
			cardType: "summary",
			card: "summary",
			creator: "@gempire_app",
		}}
	/>
);

export default HelmetComponent;
