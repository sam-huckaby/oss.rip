import {SanityDocument, Slug} from '@sanity/types';
import {MetaFields} from './meta-fields';
import {PostSections} from './sections';
import {Image} from './sections/image';
import {SimpleBlockContent} from './objects/simple-block-content';
import {Person} from './person';
import { Review } from './review';

export interface Software extends SanityDocument {
	_type: 'post';
	publishedAt: string;
	slug: Slug;
	author: Person;
	softwareName: string;
	reviews: Review[];
	excerpt: SimpleBlockContent;
	keywords?: string[];
	website: string;
	meta?: MetaFields;
	featuredImage?: Image;
	content?: PostSections[];
}
