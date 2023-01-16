import {SanityDocument, Slug} from '@sanity/types';
import {MetaFields} from './meta-fields';
import {PostSections} from './sections';
import {Image} from './sections/image';
import {SimpleBlockContent} from './objects/simple-block-content';
import {Person} from './person';
import {Software} from './software';

export interface Review extends SanityDocument {
	_type: 'post';
	publishedAt: string;
	slug: Slug;
	author: Person;
	title: string;
	software: Software;
	excerpt: SimpleBlockContent;
	keywords?: string[];
	meta?: MetaFields;
	featuredImage?: Image;
	content?: PostSections[];
}
