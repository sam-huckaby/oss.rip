import {RiUserSmileLine} from 'react-icons/ri';
import {defineType, defineField} from 'sanity';

const person = defineType({
	name: 'person',
	type: 'document',
	title: 'Persons',
	icon: RiUserSmileLine,
	fields: [
		defineField({
			name: 'name',
			title: 'Name',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'company',
			title: 'Company',
			type: 'string',
		}),
		defineField({
			name: 'email',
			title: 'email',
			type: 'email',
		}),
	],
	preview: {
		select: {
			title: 'name',
		}
	}
});

export default person;
