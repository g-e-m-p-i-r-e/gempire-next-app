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
			{
				property: "application-name",
				content: "PAWS",
			},
			{
				property: "apple-mobile-web-app-capable",
				content: "yes",
			},
			{
				property: "apple-mobile-web-app-status-bar-style",
				content: "default",
			},
			{
				property: "apple-mobile-web-app-title",
				content: "PAWS",
			},
			{
				property: "format-detection",
				content: "telephone=no",
			},
			{
				property: "mobile-web-app-capable",
				content: "yes",
			},
			{
				property: "msapplication-config",
				content: "/icons/browserconfig.xml",
			},
			{
				property: "msapplication-tap-highlight",
				content: "no",
			},
			{
				property: "theme-color",
				content: "#180d30",
			},
			{
				property: "msapplication-TileImage",
				content: "/icons/144.png",
			},
		]}
		additionalLinkTags={[
			{
				rel: "preconnect",
				href: "https://www.google-analytics.com",
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
			{
				rel: "icon",
				href: "/icons/72.png",
				sizes: "72x72",
			},
			{
				rel: "icon",
				href: "/icons/96.png",
				sizes: "96x96",
			},
			{
				rel: "icon",
				href: "/icons/144.png",
				sizes: "144x144",
			},
			{
				rel: "icon",
				href: "/icons/192.png",
				sizes: "192x192",
			},
			{
				rel: "apple-touch-icon",
				href: "/icons/512.png",
				sizes: "512x512",
			},
			{
				rel: "manifest",
				href: "/manifest.json",
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
