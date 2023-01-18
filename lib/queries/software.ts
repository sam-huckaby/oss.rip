import {groq} from 'next-sanity';

export const softwareQuery = groq`
	*[_type == 'software' && slug.current == $slug][0] {
		...,
	}
`;

export const softwareWithReviewsQuery = groq`
	*[_type == 'software' && slug.current == $slug][0] {
		...,
		"reviews": *[_type == 'review' && references(^._id)] {
			_createdAt,
			title,
			editorial,
			content,
		}
	}
`;

export const softwaresQuery = groq`
	*[_type == 'software' && defined(slug.current)] | order(_createdAt desc)[0...$limit]
`;

export const allSoftwareSlug = groq`
	*[_type == 'software' && defined(slug.current)][].slug.current
`;
