import {RiChat1Line} from 'react-icons/ri';
import type {StructureBuilder} from 'sanity/desk';

export const ReviewMenuItem = (S: StructureBuilder) =>
	S.listItem()
		.title('Reviews')
		.icon(RiChat1Line)
		.child(S.documentTypeList('review').title('Reviews').filter('_type == $type').params({type: 'review'}));
