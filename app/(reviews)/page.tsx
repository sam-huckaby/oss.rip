import {previewData} from 'next/headers';
import {sanityClient} from '~/lib/sanity/client';
import {IndexPageLayout} from '~/components/layout';
import {IndexPagePreview, PreviewSuspense} from '~/components/previews';
import type {Page} from '~/models/page';
import { pageWithReviewsQuery } from '~/lib/queries/page';
import { Review } from '~/models/review';

type PageWithReviews = {
	page: Page;
	reviews: Review[];
};

const IndexRoute = async () => {
console.log("INFOSEC");
	const {page, reviews} = await sanityClient.fetch<PageWithReviews>(pageWithReviewsQuery, {
		slug: 'frontpage',
		limit: 2
	});
console.log(reviews);
	if (previewData()) {
		return (
			<PreviewSuspense fallback={<IndexPageLayout page={page} reviews={reviews} />}>
				<IndexPagePreview query={pageWithReviewsQuery} variables={{slug: 'frontpage', limit: 2}} />
			</PreviewSuspense>
		);
	}

	return <IndexPageLayout page={page} reviews={reviews} />;
};

export default IndexRoute;
