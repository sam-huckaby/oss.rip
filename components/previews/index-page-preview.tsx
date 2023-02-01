'use client';

import {usePreview as _usePreview} from '~/lib/sanity/preview';
import {IndexPageLayout} from '~/components/layout';
import type {Page} from '~/models/page';
import type {UsePreview} from 'next-sanity/preview';
import { Software } from '~/models/software';

type PageWithSoftware = {
	page: Page;
	software: Software[];
};

type Props = {
	query: string;
	variables: Record<string, string | number>;
};

const usePreview: UsePreview<PageWithSoftware> = _usePreview;

const Preview = ({query, variables}: Props) => {
	const data = usePreview(null, query, variables);

	return <IndexPageLayout preview page={data.page} software={data.software} />;
};

export default Preview;
