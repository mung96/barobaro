import Header from '@/components/Header';
import StepBar from '@/components/post/StepBar';
import ProfilePhoto from '@/components/user/ProfilePhoto';

export default function SignUp() {
  return (
    <>
      <Header
        pageName="로그인"
        hasPrevBtn
        hasSearchBtn={false}
        hasAlertBtn={false}
      />
      <h1 className="text-black-100 text-[16px] font-bold">회원가입</h1>
      <StepBar currentStep={1} totalStep={2} />

      <h2>프로필을 설정해주세요.</h2>
      <div>
        <p>본인을 잘 나타낼 수 있는</p>
        <p>프로필 사진과 닉네임을 설정해주세요.</p>
      </div>
      <ProfilePhoto />
    </>
  );
}
