const title = 'OSS.rip';
const description = 'A place to review open source software and tell it like it is.';
const url = 'https://oss.rip/';

const config = {
	title,
	description,
	canonical: url,
	openGraph: {
		type: 'website',
		locale: 'en_EN',
		url,
		site_name: 'https://oss.rip',
		title,
		description,
		images: [
			//{
			//	url: 'https://nextjs-sanity-template.now.sh/favicon.svg',
			//	alt: title,
			//	width: 1280,
			//	height: 720
			//}
		]
	}
};

export default config;
