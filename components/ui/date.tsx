import {formatInTimeZone} from 'date-fns-tz';

const Date = ({publishedAt}: {publishedAt: string}) => {
	const date = formatInTimeZone(publishedAt, 'Europe/Amsterdam', 'MMM dd, yyyy');

	return <p className='text-sm shrink-0'>{date}</p>;
};

export default Date;
