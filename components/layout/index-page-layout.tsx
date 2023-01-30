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

	const [value, setValue] = useState('');
	const [options, setOptions] = useState([]);
	const [inputValue, setInputValue] = useState('');

	const getSoftware = React.useMemo(
		() =>
			debounce(
				(
					request: { input: string },
					callback: (results?: any) => void,
				) => {
					console.log(request, callback);
					//(autocompleteService.current as any).getPlacePredictions(
					//	request,
					//	callback,
					//);
				},
				400,
			),
		[],
	);

	React.useEffect(() => {
		let active = true;
		if (inputValue === '') {
			setOptions(value ? [value] : []);
			return undefined;
		}

		getSoftware({ input: inputValue }, (results?: any) => {
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
			<div className="flex flex-row items-center pb-4">
				<Autocomplete
					disablePortal
					id="combo-box-demo"
					className="w-full"
					getOptionLabel={(option) =>
						typeof option === 'string' ? option : option.label
					}
					noOptionsText="No software found"
					options={options}
					autoComplete
					value={value}
					sx={{ width: 300 }}
					onChange={(event: any, newValue: string) => {
						console.log(event);
						setOptions(newValue ? [newValue, ...options] : options);
						setValue(newValue);
					}}
					onInputChange={(event, newInputValue) => {
						console.log(event);
						setInputValue(newInputValue);
					}}
					renderInput={(params) => (
						<TextField {...params} label="Search for software..." fullWidth />
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
