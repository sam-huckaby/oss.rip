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
import { useRouter } from 'next/navigation';

type Props = {
	page: Page;
	software: Software[];
	preview?: boolean;
}

const IndexPage = ({ page, software/*, preview = false*/ }: Props) => {
	/* TODO: This should be replaced with a suspense loader in a loading.ts or something
	if (preview && !page) {
		return <Heading level='h2'>Loading...</Heading>;
	}
	*/

	const router = useRouter();

	const [value, setValue] = useState<Software | undefined>();
	const [options, setOptions] = useState([]);
	const [inputValue, setInputValue] = useState('');

	const getSoftware = React.useMemo(
		() =>
			debounce(
				async (
					request: { input: string },
					callback: (results?: Software[]) => void,
				) => {
					const found = await sanityClient.fetch<Software[]>(softwareFuzzyQuery, {
						name: request.input,
						limit: 5,
					});

					callback(found);
				},
				400,
			),
		[],
	);

	React.useEffect(() => {
		if (inputValue === '') {
			setOptions(value ? [value] : []);
			return undefined;
		}

		// This is a debounced function to query for software by name
		getSoftware({ input: inputValue }, (results?: Software[]) => {
				let newOptions = [];

				if (value) {
					newOptions = [value];
				}

				if (results) {
					newOptions = [...newOptions, ...results];
				}

				setOptions(newOptions);
		});
	}, [value, inputValue, getSoftware]);

	return (
		<>
			<div className="flex flex-row items-center justify-center pb-4 text-gray-400">Do not stare directly at the bugs</div>
			<div className="flex flex-row items-center justify-center pb-4">
				<Autocomplete
					id="software-selector"
					className="w-full"
					getOptionLabel={(option: Software) => option.softwareName}
					noOptionsText="No software found"
					options={options}
					autoComplete
					disablePortal
					handleHomeEndKeys
					filterSelectedOptions
					autoHighlight
					value={value}
					sx={{ width: 300 }}
					onChange={(_event, newValue: Software) => {
						router?.push?.(`/reviews/${newValue.slug.current}`);
						setValue(newValue);
					}}
					onInputChange={(_event, newInputValue) => {
						setInputValue(newInputValue);
					}}
					renderInput={(params) => (
						<TextField className="w-full" {...params} label="Search for software..." fullWidth />
					)}
					renderOption={
						(props, option) => {
							return (
								<li key={option.softwareName} {...props}>
									<div className={`text-xl font-bold cursor-pointer`}>{option.softwareName}</div>
									<div className={`text-md italic cursor-pointer`}>{option.website}</div>
								</li>
							);
						}
					}
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
