import slug from 'slugify';
import {format} from 'date-fns';
import {RiAppsLine} from 'react-icons/ri';
import {defineType, defineField} from 'sanity';

const software = defineType({
	name: 'software',
	type: 'document',
	title: 'Software',
	icon: RiAppsLine,
	groups: [
		{
			name: 'general',
			title: 'General'
		},
		{
			name: 'meta',
			title: 'Meta infomation'
		},
		{
			name: 'excerpt',
			title: 'Excerpt'
		},
		{
			name: 'content',
			title: 'Content'
		}
	],
	fields: [
		defineField({
			name: 'softwareName',
			title: 'Software Name',
			type: 'string',
			description: 'Name of the Software',
			group: 'general',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			description: 'Some frontends will require a slug to be set to be able to show the page',
			type: 'slug',
			options: {
				source: 'title',
				slugify: (input: string) => slug(input, {lower: true})
			},
			group: 'general',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			type: 'metaFields',
			name: 'meta',
			group: 'meta'
		}),
		defineField({
			name: 'author',
			title: 'Author',
			type: 'reference',
			description: 'Select author for post',
			to: [{type: 'person'}],
			group: 'meta',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'publishedAt',
			title: 'Published at',
			description: 'You can use this field to schedule post where you show them',
			type: 'datetime',
			group: 'meta',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'keywords',
			type: 'array',
			title: 'Keywords',
			description: 'Tags for your post',
			group: 'meta',
			of: [{type: 'string'}],
			options: {
				layout: 'tags'
			},
			validation: (Rule) => Rule.unique()
		}),
		defineField({
			name: 'excerpt',
			type: 'simpleBlockContent',
			title: 'Excerpt',
			description: 'This ends up on summary pages, when people share this software page in social media.',
			group: 'excerpt',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'featuredImage',
			title: 'Featured Image',
			description: 'Image that is displayed in posts lists',
			group: 'excerpt',
			type: 'mainImage'
		}),
		defineField({
			name: 'content',
			type: 'array',
			title: 'Content',
			description: 'Add, edit, and reorder sections with content',
			group: 'content',
			of: [{type: 'grid'}, {type: 'mainImage'}, {type: 'blockContent'}, {type: 'spacer'}, {type: 'youtube'}]
		})
	],
	initialValue: () => ({
		publishedAt: new Date().toISOString()
	}),
	preview: {
		select: {
			softwareName: 'softwareName',
			publishedAt: 'publishedAt'
		},
		prepare(selection) {
			const {softwareName, publishedAt} = selection;

			return {
				title: `${softwareName}`,
				subtitle: format(new Date(publishedAt), 'MMM dd yyyy HH:mm')
			};
		}
	}
});

export default software;
