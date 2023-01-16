import type {Software} from '~/models/software';
import {Date, Heading, Tag} from '~/components/ui';
import {RenderSection} from '~/components/sections';

const ReviewPage = ({software, preview = false}: {software: Software; preview?: boolean}) => {
	const keywords = software.keywords?.map((tag) => <Tag key={tag}>{tag}</Tag>);

	if (preview && !software) {
		return <Heading level='h2'>Loading…</Heading>;
	}
console.log(software.reviews);
	return (
		<article>
			<div className='pb-2'>
				<Heading level='h2'>{software.softwareName}</Heading>
				<div className='flex flex-row items-center'>
					{software.publishedAt && <Date publishedAt={software.publishedAt} />}
					<div className='flex flex-row'>{keywords}</div>
				</div>
			</div>
			{software?.reviews?.[0]?.content?.map((section) => {
				console.log(section);
				if (!section || Object.keys(section).length === 0) {
					return null;
				}

				return <RenderSection key={section._key} section={section} />;
			})}
		</article>
	);
};

export default ReviewPage;
