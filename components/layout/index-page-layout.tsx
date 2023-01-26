
import {Heading} from '~/components/ui';
import {RenderSection} from '~/components/sections';
import type {Page} from '~/models/page';
import type {Software} from '~/models/software';
import {SoftwareList} from '~/components/shared';
//import autoComplete from '@tarekraafat/autocomplete.js/dist/autoComplete';

type Props = {
	page: Page;
	software: Software[];
	preview?: boolean;
}

const IndexPage = ({page, software, preview = false}: Props) => {
	if (preview && !page) {
		return <Heading level='h2'>Loading...</Heading>;
	}

//	new autoComplete({
//		selector: "#reviewSearcher",
//		placeHolder: "Search for Software...",
//		data: {
//			src: ["Sauce - Thousand Island", "Wild Boar - Tenderloin", "Goat - Whole Cut"]
//		},
//		resultItem: {
//			highlight: true,
//		}
//	});

	return (
		<>
			<div className="flex flex-row items-center justify-center pb-4 text-gray-400">Do not stare directly at the bugs</div>
			<div className="flex flex-row items-center pb-4">
				<span className="text-sm no-grow mr-4">Search:</span>
				<input className="border grow basis-[75%]" type="text" id="reviewSearcher" />
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
