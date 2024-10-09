'use client';

import Image from "next/image";
import Logo from '@/../public/assets/png/barobaro_logo.png';
import { useRouter, useSearchParams } from "next/navigation";
// import { jwtDecode } from "jwt-decode";
import { getProfile } from "@/apis/profileApi";
import { useEffect } from "react";
import { useProfileSet } from "@/store/useMyProfile";
import { AxiosError } from "axios";
import { axiosInstance } from "@/apis/axiosInstance";

const RedirectComponent = () => {
  const searchParams = useSearchParams();
  localStorage.setItem('token', searchParams.get('token')!);
  // const decoded = jwtDecode(searchParams.get('token')!);
  // console.log(decoded);
  const setProfile = useProfileSet();
  const getCertification = async (imp_uid: string) => {
    const body = {
      "impUid": imp_uid,
    };
    console.log(body.impUid);
    const response = await axiosInstance.post(`/auth/authentication`, body);
    console.log(response);
    return response;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileResponse = await getProfile();
        console.log(profileResponse);
        setProfile({
          profileImage: profileResponse.data.body.profileImage,
          nickname: profileResponse.data.body.nickname,
          phoneNumber: profileResponse.data.body.phoneNumber,
          email: profileResponse.data.body.email,
          name: profileResponse.data.body.name,
          isAuthenticated: profileResponse.data.body.isAuthenticated,
        })
      } catch (error) {
        if (error instanceof AxiosError) {
          alert(error.response?.data.header.message)
        }
      }
    }
    fetchData();
  }, [])

  const router = useRouter();
  router.push('/home');

  return <section className="w-full h-[100dvh] flex flex-col justify-center items-center  animate-pulse">
    <Image src={Logo} alt="baro" width={280} height={280} />
    <p className="text-2xl">잠시만 기다려주세요.</p>
  </section>
}


export default RedirectComponent;

