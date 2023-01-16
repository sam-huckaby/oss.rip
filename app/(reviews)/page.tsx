import {previewData} from 'next/headers';
import {sanityClient} from '~/lib/sanity/client';
import {IndexPageLayout} from '~/components/layout';
import {IndexPagePreview, PreviewSuspense} from '~/components/previews';
import type {Page} from '~/models/page';
import { pageWithSoftwareQuery } from '~/lib/queries/page';
import { Software } from '~/models/software';

type PageWithSoftware = {
	page: Page;
	software: Software[];
};

const IndexRoute = async () => {
	//const {page, software} = await sanityClient.fetch<PageWithSoftware>(pageWithSoftwareQuery, {
	const results = await sanityClient.fetch<PageWithSoftware>(pageWithSoftwareQuery, {
		slug: 'frontpage',
		limit: 2
	});

	const { page, software } = results;

	if (previewData()) {
		return (
			<PreviewSuspense fallback={<IndexPageLayout page={page} software={software} />}>
				<IndexPagePreview query={pageWithSoftwareQuery} variables={{slug: 'frontpage', limit: 2}} />
			</PreviewSuspense>
		);
	}

	return <IndexPageLayout page={page} software={software} />;
};

export default IndexRoute;
