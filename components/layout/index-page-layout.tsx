'use client';
import { Heading } from '~/components/ui';
import { RenderSection } from '~/components/sections';
import type { Page } from '~/models/page';
import type { Software } from '~/models/software';
import { SoftwareList } from '~/components/shared';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { debounce } from '@mui/material/utils';
import { softwareFuzzyQuery } from '~/lib/queries/software';
import { sanityClient } from '~/lib/sanity/client';
import Link from 'next/link';

type Props = {
	page: Page;
	software: Software[];
	preview?: boolean;
}

const top100Films = [
	{ label: 'The Shawshank Redemption', year: 1994 },
	{ label: 'The Godfather', year: 1972 },
	{ label: 'The Godfather: Part II', year: 1974 },
];

const IndexPage = ({ page, software, preview = false }: Props) => {
	if (preview && !page) {
		return <Heading level='h2'>Loading...</Heading>;
	}

	const [value, setValue] = useState<Software | undefined>();
	const [options, setOptions] = useState([]);
	const [inputValue, setInputValue] = useState('');

	const getSoftware = React.useMemo(
		() =>
			debounce(
				async (
					request: { input: string },
					callback: (results?: any) => void,
				) => {
					const found = await sanityClient.fetch<Software>(softwareFuzzyQuery, {
						name: request.input,
						limit: 5,
					});

					callback(found);
				},
				400,
			),
		[inputValue],
	);

	React.useEffect(() => {
		let active = true;
		if (inputValue === '') {
			setOptions(value ? [value] : []);
			return undefined;
		}

		// This is a debounced function to query for software by name
		getSoftware({ input: inputValue }, (results?: Software[]) => {
			console.log(results);
			if (active) {
				let newOptions = [];

				if (value) {
					newOptions = [value];
				}

				if (results) {
					newOptions = [...newOptions, ...results];
				}

				setOptions(newOptions);
			}
		});

		return () => {
			active = false;
		};
	}, [value, inputValue, fetch]);

	return (
		<>
			<div className="flex flex-row items-center justify-center pb-4 text-gray-400">Do not stare directly at the bugs</div>
			<div className="flex flex-row items-center justify-center pb-4">
				<Autocomplete
					id="software-selector"
					className="w-full"
					getOptionLabel={(option: any) => option === '' ? '' : option.softwareName}
					noOptionsText="No software found"
					options={options}
					autoComplete
					disablePortal
					handleHomeEndKeys
					filterSelectedOptions
					autoHighlight
					value={value}
					sx={{ width: 300 }}
					onChange={(_event: any, newValue: Software) => {
						setOptions(newValue ? [newValue, ...options] : options);
						setValue(newValue);
					}}
					onInputChange={(_event, newInputValue) => {
						setInputValue(newInputValue);
					}}
					renderInput={(params) => (
						<TextField className="w-full" {...params} label="Search for software..." fullWidth />
					)}
					renderOption={(props, option, { selected }) => (
					// TODO: Figure out why arrowing down doesn't highlight options. Maybe I need to pass a prop?..
						<li {...props} className={`p-4 hover:bg-gray-100 focus:bg-red-600`}>
							<Link key={option._id} href={`/reviews/${option.slug.current}`}>
								<div className={`text-xl font-bold cursor-pointer`}>{option.softwareName}</div>
								<div className={`text-md italic cursor-pointer`}>{option.website}</div>
							</Link>
						</li>
					)}
				/>
			</div>
			{page?.content?.map((section) => {
				if (!section || Object.keys(section).length === 0) {
					return null;
				}

				return <RenderSection key={section._key} section={section} />;
			})}
			<Heading level='h2' weight='semibold' className='py-8'>
				Recently Reviewed Projects
			</Heading>
			<SoftwareList software={software} />
		</>
	);
};

export default IndexPage;
