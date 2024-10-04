'use client';

import { useEffect } from 'react';
import { getSignUpInfo } from '@/apis/memberApi';

const InfoComponent = ({ email }: { email: string }) => {
  const response = getSignUpInfo(email);

  useEffect(() => {
    console.log(response);
  }, []);
  return <div>{/* <img src={response.profileImage} alt="profile" /> */}</div>;
};

export default InfoComponent;
