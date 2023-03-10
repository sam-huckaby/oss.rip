import {PortableText} from '@portabletext/react';
import type {BlockContent as BlockContentType} from '~/models/sections/block-content';
import type {SimpleBlockContent} from '~/models/objects/simple-block-content';

const PostBody = ({content}: {content: BlockContentType | SimpleBlockContent}) => {
	return (
		<div className={`max-w-2xl text-justify`}>
			<PortableText value={content.text} />
		</div>
	);
};

export default PostBody;
