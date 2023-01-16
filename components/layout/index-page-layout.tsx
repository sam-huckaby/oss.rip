
import {Heading} from '~/components/ui';
import {RenderSection} from '~/components/sections';
import type {Page} from '~/models/page';
import type {Software} from '~/models/software';
import {SoftwareList} from '~/components/shared';

type Props = {
	page: Page;
	software: Software[];
	preview?: boolean;
}

const IndexPage = ({page, software, preview = false}: Props) => {
	if (preview && !page) {
		return <Heading level='h2'>Loading...</Heading>;
	}

	return (
		<>
			<div className="flex flex-row items-center pb-4">
				<span className="text-sm no-grow mr-4">Search:</span>
				<input className="border grow basis-[75%]" type="text" />
			</div>
			<div className="horizontal-wipeout bg-center bg-contain bg-no-repeat w-full h-[500px]">&nbsp;</div>
			<div className="flex flex-row items-center justify-center text-gray-400">Do not stare directly at the bugs</div>
			{page?.content?.map((section) => {
				if (!section || Object.keys(section).length === 0) {
					return null;
				}

				return <RenderSection key={section._key} section={section} />;
			})}
			<Heading level='h2' weight='semibold' className='py-8'>
				Recently Added Projects 
			</Heading>
			<SoftwareList software={software} />
		</>
	);
};

export default IndexPage;
