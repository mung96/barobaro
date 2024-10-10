'use client';

import { useEffect, useState } from "react";
import Profile from './Profile';
import {getProfile} from "@/apis/profileApi";

export default function ProfileContainer() {
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const [profileNickname, setProfileNickname] = useState('');
    const [profileEmail, setProfileEmail] = useState('');

    useEffect(() => {
        const setProfile = async () => {
            try {
                const getProfileApi = await getProfile();
                const profileData = getProfileApi.data.body
                setProfileImageUrl(profileData.profileImage)
                setProfileNickname(profileData.nickname)
                setProfileEmail(profileData.email)
            } catch (err) {
                console.log(err);
            }
        }
        setProfile();
    })
    return (
        <>
            <Profile hasEmail hasEditBtn url={profileImageUrl} nickname={profileNickname} email={profileEmail} />
        </>
    )
}