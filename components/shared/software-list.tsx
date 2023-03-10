import Link from 'next/link';
import {Heading, Date, Tag} from '~/components/ui';
import PostBody from './post-body';
import PostImage from './image';
import type {Software} from '~/models/software';

type Props = {
	software: Software[];
};

const SoftwareList = ({ software }: Props) => (
	<div className='flex-col'>
		<div className='grid gap-4 grid-cols-1 md:grid-cols-2 grid-rows-1'>
			{software.map((softwareX) => {
				//if (!post.slug?.current) {
				//	return null;
				//}

				const keywords = softwareX.keywords?.map((tag) => <Tag key={tag}>{tag}</Tag>);

				return (
					<Link key={softwareX._id} href={`/reviews/${softwareX.slug.current}`}>
						<article className="hover:shadow-xl hover:transition-shadow hover:duration-500 transition-shadow duration-500 border p-2 rounded">
							<div className='flex-col'>
								{softwareX.featuredImage && <PostImage data={softwareX.featuredImage} width={600} height={450} />}
								<Heading level='h2'>{softwareX.softwareName}</Heading>
								<div className='flex flex-col md:flex-row items-center'>
									{softwareX.publishedAt && <Date publishedAt={softwareX.publishedAt} />}
									<div className='flex flex-row flex-wrap'>{keywords}</div>
								</div>
								{softwareX?.excerpt && <PostBody content={softwareX.excerpt} />}
							</div>
						</article>
					</Link>
				);
			})}
		</div>
	</div>
);

export default SoftwareList;
