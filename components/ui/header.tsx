import Link from 'next/link';
import MainNavigation from './main-navigation';
import type {SiteSettings} from '~/models/site-settings';
import { Encode_Sans_SC } from "@next/font/google";

const encodeSansSC = Encode_Sans_SC({
  weight: "400",
  subsets: ['latin']
});

const Header = ({siteSettings}: {siteSettings: SiteSettings}) => {
	return (
		<header className={`horizontal-wipeout
			mx-auto max-w-5xl
			pl-12 pr-8 pt-8
			flex flex-row items-start
			border-b border-b-slate-200
      ${encodeSansSC.className}`}>
			<Link href='/' className="-ml-12 pl-12">
				<div className="
					flex flex-row items-center
					border-4 border-black rounded-t-full
					h-[64px] w-[64px]">
					<span className="text-2xl bg-white -ml-[36px] -mt-[12px]">OSS.</span><span className="text-black font-bold text-xl uppercase">rip</span>
				</div>
			</Link>
			<MainNavigation navigation={siteSettings.navigation} />
		</header>
	);
};

export default Header;
