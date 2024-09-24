"use client";

import Link from 'next/link';
import {
    UserGroupIcon,
    HomeIcon,
    PlayIcon,
    ChartBarIcon
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';


const links = [
    { name: 'Home', href: '/', icon: HomeIcon },
    {
        name: 'Gioca',
        href: '/play',
        icon: PlayIcon,
    },
    { name: 'Classifica', href: '/leaderboard', icon: ChartBarIcon },
];


export default function SideBar() {

    const pathname = usePathname();

    return (
        <div className='flex flex-col px-2 md:px-0'>
            <div className="flex h-full md:flex-col px-3 py-4 md:px-2">
                <Link
                    className="mb-2 flex items-end justify-start rounded-md p-4"
                    href="https://www.mlmodena.it"
                >
                    <div className="w-16 text-white md:w-32">
                        {/* <AcmeLogo /> */}
                        <img src='logos/mlmodena-logo.png'></img>
                    </div>
                </Link>
                <Link
                    className="mb-2 flex items-end justify-start rounded-md p-4"
                    href="https://www.unimore.it"
                >
                    <div className="w-32 text-white md:w-32">
                        <img src='logos/unimore.png'></img>
                    </div>
                </Link>
            </div>

            <div>
                <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                    {/* <NavLinks /> */}
                    {links.map((link) => {
                        const LinkIcon = link.icon;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={clsx(
                                    'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                                    {
                                        'bg-sky-100 text-blue-600': pathname === link.href,
                                    },
                                )}
                            >
                                <LinkIcon className="w-6" />
                                <p className="">{link.name}</p>
                            </Link>
                        );
                    })}

                    <div className="hidden h-auto w-full grow rounded-md  md:block"></div>
                </div>
            </div>
        </div>
    );
}
