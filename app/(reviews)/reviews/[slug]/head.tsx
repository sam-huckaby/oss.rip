import {softwareQuery, siteSettingsQuery} from '~/lib/queries';
import {sanityClient, urlForImage} from '~/lib/sanity/client';
import {DefaultHead} from '~/components/shared';
import type {SiteSettings} from '~/models/site-settings';
import type {Software} from '~/models/software';

const Head = async ({params}: {params: {slug: string}}) => {
	const [siteSettings, software] = await Promise.all([
		sanityClient.fetch<SiteSettings>(siteSettingsQuery),
		sanityClient.fetch<Software>(softwareQuery, {
			slug: params.slug
		})
	]);

	const title = `${software?.softwareName} | ${siteSettings?.title}`;
	const description = software?.meta?.metaDescription || siteSettings?.description;
	const ogTitle = software?.meta?.openGraphTitle ?? title;
	const ogDescription = software?.meta?.openGraphDescription;
	const ogImage =
		(software?.meta?.openGraphImage && urlForImage(software.meta.openGraphImage).width(1200).height(627).fit('crop').url()) ?? null;


	return (
		<>
			<DefaultHead />
			<title>{title}</title>
			{description && <meta name='description' content={description} />}
			<meta property='og:title' content={ogTitle} />
			{ogImage && <meta property='og:image' content={ogImage} />}
			{ogDescription && <meta property='og:description' content={ogDescription} />}
		</>
	);
};

export default Head;
