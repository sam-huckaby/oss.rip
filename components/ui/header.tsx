import Link from 'next/link';
import MainNavigation from './main-navigation';
import type {SiteSettings} from '~/models/site-settings';

const Header = ({siteSettings}: {siteSettings: SiteSettings}) => {
	return (
		<header className='
			mx-auto max-w-5xl px-8 flex flex-row items-center h-16
			border-b border-b-slate-200'>
			<Link href='/'>
				<span className="text-2xl">OSS.rip</span>{' '}<span className="text-xs">(logo here someday)</span>
			</Link>
			<MainNavigation navigation={siteSettings.navigation} />
		</header>
	);
};

export default Header;
