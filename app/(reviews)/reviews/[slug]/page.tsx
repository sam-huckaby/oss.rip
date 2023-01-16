import {previewData} from 'next/headers';
import {softwareQuery, softwareWithReviewsQuery} from '~/lib/queries';
import {sanityClient} from '~/lib/sanity/client';
import {ReviewPageLayout} from '~/components/layout';
import {PreviewSuspense, PostPreview} from '~/components/previews';
import type {Software} from '~/models/software';

// NOTE TO FUTURE SELF: I need to do the following:
// - Rewrite this page to be software-centric and not post-centric
// - I think I need to rework this query to return reviews as well as software
// - I need to modify the <PostPageLayout> to show the list of reviews available for that software
//
// "software" just doesn't look like a real word anymore. I've typed it too many times... software software software...

const ReviewRoute = async ({params}: {params: {slug: string}}) => {
	const software = await sanityClient.fetch<Software>(softwareWithReviewsQuery, {
		slug: params.slug
	});

	if (!software) {
		console.log('no software', software);
	}

	if (previewData()) {
		return (
			<PreviewSuspense fallback={<ReviewPageLayout software={software} />}>
				<PostPreview query={softwareQuery} variables={{slug: params.slug}} />
			</PreviewSuspense>
		);
	}

	return <ReviewPageLayout software={software} />;
};

export default ReviewRoute;
