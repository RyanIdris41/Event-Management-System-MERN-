import { Search, FilePenLine } from 'lucide-react';
import { PiMicrophoneStageLight } from 'react-icons/pi';
import { FaPeopleGroup } from 'react-icons/fa6';
import { LuCandlestickChart } from 'react-icons/lu';
import { LiaPeopleCarrySolid } from 'react-icons/lia';

export const links = [
    {
        name: 'find events',
        icon: Search,
        link: '/events',
    },
    {
        name: 'create events',
        icon: FilePenLine,
        link: '/dashboard/new-event',
    },
];

export const heros = [
    {
        name: 'Conference',
        icon: FaPeopleGroup,
        message:
            'Discover, learn, and connect with industry leaders at our cutting-edge conferences. A place where ideas meet execution.',
    },
    {
        name: 'Art Exhibition',
        icon: LuCandlestickChart,
        message:
            'Immerse yourself in the world of art. Explore exhibitions that showcase contemporary art, photography, and sculptures from emerging and established artists.',
    },
    {
        name: 'Live Performance',
        icon: PiMicrophoneStageLight,
        message:
            'Experience the magic of live performances. From captivating concerts to breathtaking theater productions, be ready to be moved and inspired.',
    },
    {
        name: 'Meetup',
        icon: LiaPeopleCarrySolid,
        message:
            'Connect with like-minded individuals at our curated meetups. A perfect opportunity to network, share ideas, and create lasting relationships.',
    },
];
