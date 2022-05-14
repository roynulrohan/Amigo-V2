import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { UPDATE_PHOTO } from '../graphql/mutations';
import { UPDATE_PHOTOURL } from '../redux/constants';
import { AuthReducer, UserData } from '../types';
import { doesImageExist } from '../utils';
import { OnlineStatus } from './OnlineStatus';

interface Props {
    user: UserData;
    dispatch: Dispatch;
}
export const ProfilePanel = ({ user, dispatch }: Props) => {
    const [pictureURL, setPictureURL] = useState('');
    const [pictureSubmitDisabled, setPictureSubmitDisabled] = useState(true);
    const [updatePhotoMutation] = useMutation(UPDATE_PHOTO);
    const preferredStatus = useSelector((state: AuthReducer) => state.auth.preferredStatus);

    useEffect(() => {
        if (pictureURL === '') {
            setPictureSubmitDisabled(true);
        } else {
            doesImageExist(pictureURL)
                .then(() => {
                    setPictureSubmitDisabled(false);
                })
                .catch(() => {
                    setPictureSubmitDisabled(true);
                });
        }
    }, [pictureURL]);

    const updatePhoto = () => {
        updatePhotoMutation({ variables: { url: pictureURL } })
            .then(({ data }) => {
                dispatch({ type: UPDATE_PHOTOURL, payload: { newPhotoURL: data?.updatePhoto?.newPhotoURL } });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className='px-2 py-4 overflow-x-clip'>
            <div className='relative'>
                <div className='flex overflow-hidden mb-3'>
                    <div className='relative dummy-profile-card min-w-[200px] w-[200px] min-h-[200px] h-[200px] p-4'>
                        <img src={user.photoURL ? user.photoURL : '/images/cat.png'} alt='' className='w-full h-full rounded-lg object-cover' />
                    </div>

                    <div className='p-4 flex justify-between h-[140px] w-full'>
                        <div className='flex flex-col items-start space-y-3 w-full'>
                            <p className='text-3xl text-cyan-400 font-bold'>{user.username}</p>
                            <OnlineStatus status={preferredStatus} />

                            <p className='bg-gray-300 h-[10px] w-full font-bold'></p>
                            <p className='bg-gray-500 h-[10px] w-3/4 font-bold'></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-6 px-4'>
                <div>
                    <label htmlFor='first_name' className='block mb-2 text-base font-medium text-gray-900 dark:text-gray-300'>
                        Profile Picture
                    </label>
                    <input
                        type='text'
                        value={pictureURL}
                        onChange={(e) => {
                            setPictureURL(e.target.value);
                        }}
                        className='block p-3 w-full text-sm rounded-lg bg-darkest placeholder-gray-400 text-white outline-none border border-gray-600 focus:ring-rose-500  focus:border-rose-500'
                        placeholder='https://example.com/pic.png'
                    />
                    <button
                        onClick={() => {
                            updatePhoto();
                        }}
                        disabled={pictureSubmitDisabled}
                        className='mt-3 w-full bg-rose-500 disabled:bg-rose-800 text py-1 px-4 rounded-lg focus:outline focus:outline-1 focus:outline-white'>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};
