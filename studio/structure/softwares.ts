import {RiAppsLine} from 'react-icons/ri';
import type {StructureBuilder} from 'sanity/desk';

export const SoftwareMenuItem = (S: StructureBuilder) =>
	S.listItem()
		.title('Softwares')
		.icon(RiAppsLine)
		.child(S.documentTypeList('software').title('Softwares').filter('_type == $type').params({type: 'software'}));
