import React from 'react';

interface Props {
    status: string | 'offline';
}

export const OnlineStatus = ({ status }: Props) => {
    const getColor = () => {
        switch (status) {
            case 'away':
                return 'text-amber-500 outline-amber-500';
            case 'dnd':
                return 'text-red-500 outline-red-500';
            case 'online':
                return 'text-green-400 outline-green-400';
            default:
                return 'text-gray-500 outline-gray-500';
        }
    };

    const getStatus = () => {
        switch (status) {
            case 'away':
                return 'Away';
            case 'dnd':
                return 'DnD';
            case 'online':
                return 'Online';
            default:
                return 'Offline';
        }
    };

    return (
        <p className={'text-xs select-none font-bold px-2 flex items-center justify-center  space-x-1 rounded-full outline outline-1 ' + getColor()}>
            <span>•</span> <span>{getStatus()}</span>
        </p>
    );
};
