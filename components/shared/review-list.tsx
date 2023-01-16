import Link from 'next/link';
import {Heading, Date, Tag} from '~/components/ui';
import PostBody from './post-body';
import PostImage from './image';
import type {Review} from '~/models/review';

type Props = {
	reviews: Review[];
};

const ReviewList = ({ reviews }: Props) => (
	<div className='flex-col'>
		<div className='grid gap-4 grid-cols-2 grid-rows-1'>
			{reviews.map((review) => {
				//if (!post.slug?.current) {
				//	return null;
				//}

				const keywords = review.keywords?.map((tag) => <Tag key={tag}>{tag}</Tag>);

				return (
					<Link key={review._id} href={`/reviews/${review.software.slug.current}`}>
						<article>
							<div className='flex-col'>
								{review.featuredImage && <PostImage data={review.featuredImage} width={600} height={450} />}
								<Heading level='h2'>{review.title}</Heading>
								<div className='flex flex-row items-center'>
									{review.publishedAt && <Date publishedAt={review.publishedAt} />}
									<div className='flex flex-row'>{keywords}</div>
								</div>
								{review?.excerpt && <PostBody content={review.excerpt} />}
							</div>
						</article>
					</Link>
				);
			})}
		</div>
	</div>
);

export default ReviewList;
