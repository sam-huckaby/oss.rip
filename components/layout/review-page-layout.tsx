import type { Software } from '~/models/software';
import { Date, Heading, Tag } from '~/components/ui';
import { RenderSection } from '~/components/sections';
import { Review } from '~/models/review';
import Link from 'next/link';

const ReviewPage = ({ software, preview = false }: { software: Software; preview?: boolean }) => {
	const keywords = software.keywords?.map((tag) => <Tag className="mb-2" key={tag}>{tag}</Tag>);

	if (preview && !software) {
		return <Heading level='h2'>Loading…</Heading>;
	}

	const editorials = [];
	const nonEditorials = [];

	for (let i = 0; i < software.reviews?.length; i++) {
		if (software.reviews[i].editorial) {
			editorials.push(software.reviews[i]);
		} else {
			nonEditorials.push(software.reviews[i]);
		}
	}

	const ReviewBox = (review: Review, editorial: boolean = false) => {
		return <div className={`p-4  ${!editorial ? "bg-gray-100" : ""}`}>
			<Heading level='h3' className="border-b">{review.title}</Heading>
			{
				review.content?.map(
					(section) => {
						if (!section || Object.keys(section).length === 0) {
							return null;
						}

						return <RenderSection key={section._key} section={section} />;
					}
				)
			}
		</div>;
	};

	return (
		<article>
			<div className='pb-2 mb-2 border-b'>
				<Heading className="mb-2" level='h1'>{software.softwareName}</Heading>
				<div className="text-sm">
					<Link className="underline text-purple-600 hover:no-underline" href={software.website} target="_blank">{software.website}</Link>
				</div>
				<div className='flex flex-col md:flex-row items-start md:items-center'>
					{software.publishedAt && <div className="flex flex-row my-2"><span className="text-sm font-bold">Published:</span>&nbsp;<Date publishedAt={software.publishedAt} /></div>}
					<div className='flex flex-row flex-wrap'>{keywords}</div>
				</div>
			</div>
			<div className="flex flex-col md:flex-row">
				<div className="flex flex-col basis-1/2">
					<Heading level='h2'>Editors Take</Heading>
					{editorials.map((review: Review) => ReviewBox(review, true))}
				</div>
				<div className="flex flex-col basis-1/2">
					<Heading level='h2'>Hot Takes</Heading>
					{nonEditorials.map((review: Review) => ReviewBox(review))}
				</div>
			</div>
		</article>
	);
};

export default ReviewPage;
