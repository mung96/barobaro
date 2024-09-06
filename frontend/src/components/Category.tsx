import SmartPhoneButton from '@/components/(category_button)/SmartPhoneButtton';
import TeleScopeButton from '@/components/(category_button)/TeleScopeButton';
import CameraBodyButton from '@/components/(category_button)/CameraBodyButton';
import CameraLensButton from '@/components/(category_button)/CameraLensButton';
import EtcButton from '@/components/(category_button)/EtcButton';
import LightStickButton from './(category_button)/LightStickButton';

export default function Category() {
  return (
    <nav>
      <div className="flex flex-row, justify-center">
        <div className="flex flex-col items-center w-1/4">
          <LightStickButton />
          <p className="text-xs mt-2">응원봉</p>
        </div>
        <div className="flex flex-col items-center w-1/4">
          <SmartPhoneButton />
          <p className="text-xs mt-2">스마트폰</p>
        </div>
        <div className="flex flex-col items-center w-1/4">
          <TeleScopeButton />
          <p className="text-xs mt-2">망원경</p>
        </div>
      </div>
      <div className="flex flex-row justify-center mt-2.5">
        <div className="flex flex-col items-center w-1/4">
          <CameraBodyButton />
          <p className="text-xs mt-2">카메라 바디</p>
        </div>
        <div className="flex flex-col items-center w-1/4">
          <CameraLensButton />
          <p className="text-xs mt-2">카메라 렌즈</p>
        </div>
        <div className="flex flex-col items-center w-1/4">
          <EtcButton />
          <p className="text-xs mt-2">기타</p>
        </div>
      </div>
    </nav>
  );
}
