'use client';

import Header from '@/components/Header';
import { useEffect } from 'react';
import { getPINApi } from "@/apis/passwordApi";
import PasswordKeypad from '@/components/shared/PasswordKeypad';

type Props = {
  params: {
    passwordChangeStep: string;
  }
}

export default function PasswordChange({ params }: Props) {
  useEffect(() => {
    getPINApi()
  }, [])
  const isNewPassword = params.passwordChangeStep === 'new';

  return (
    <div className="flex flex-col h-[93dvh]">
      <header className="flex flex-col text-center font-bold">
        <Header pageName="" hasPrevBtn hasSearchBtn={false} hasAlertBtn />
        {isNewPassword ? `비밀번호 등록` : `비밀번호 변경`}

      </header>
      <PasswordKeypad isNewPassword={isNewPassword} />
    </div>
  );
}
