'use client';

import { getSignUpInfo } from '@/apis/memberApi';

const InfoComponent = ({ email }: { email: string }) => {
  const response = getSignUpInfo(email);
  return <div />;
};

export default InfoComponent;
