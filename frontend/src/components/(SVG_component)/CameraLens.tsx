import Image from 'next/image';
import CameraLensBlack from '@/../public/assets/png/camera_lens.png';
import CameraLensWhite from '@/../public/assets/png/camera_lens_white.png';
import CameraLensBlue from '@/../public/assets/png/camera_lens_blue.png';
import CameraLensGray from '@/../public/assets/png/camera_lens_gray.png';

export default function CameraLens({
  fill,
  width = 32,
  height = 32,
}: {
  fill: string;
  width?: number;
  height?: number;
}) {
  if (fill === '#FFFFFF') {
    return (
      <Image src={CameraLensWhite} alt="white" width={width} height={height} />
    );
  }
  if (fill === '#3897F0') {
    return (
      <Image src={CameraLensBlue} alt="white" width={width} height={height} />
    );
  }
  if (fill === '#B6BDC8') {
    return (
      <Image src={CameraLensGray} alt="white" width={width} height={height} />
    );
  }
  return (
    <Image src={CameraLensBlack} alt="black" width={width} height={height} />
  );
}
