import SignatureClear from '@/components/(SVG_component)/SignatureClear';
import { FC, useEffect, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

type SignatureAreaParam = {
  handleSignature: (sign: string) => void;
  saveTrigger: boolean;
};
const SignatureArea: FC<SignatureAreaParam> = ({
  handleSignature,
  saveTrigger,
}: SignatureAreaParam) => {
  const signatureRef = useRef<SignatureCanvas | null>(null);

  const clear = () => {
    if (signatureRef.current === null) return;
    signatureRef.current.clear();
  };

  useEffect(() => {
    if (saveTrigger === true) {
      if (signatureRef.current === null) return;
      const dataUrl = signatureRef.current
        .getTrimmedCanvas()
        .toDataURL('image/png');

      handleSignature(dataUrl);
    }
  }, [saveTrigger]);

  return (
    <div className="relative flex">
      <div className="flex w-full">
        <SignatureCanvas
          ref={signatureRef}
          canvasProps={{
            className: 'w-full h-full', // Tailwind CSS 클래스
          }}
        />
      </div>
      <div
        onClick={clear}
        className=" absolute left-1 top-1 z-10 cursor-pointer"
        role="presentation"
      >
        <SignatureClear />
      </div>
    </div>
  );
};

export default SignatureArea;
