import Image from "next/image";
import CameraLensBlack from "@/../public/assets/png/camera_lens.png"
import CameraLensWhite from "@/../public/assets/png/camera_lens_white.png"
export default function CameraLens({ fill = "currentColor"}) {
    if (fill === "#FFFFFF") {
        return (
            <Image src={CameraLensWhite} alt='white' width={32} height={32} />
        )
    } else {
        return (
            <Image src={CameraLensBlack} alt='black' width={32} height={32} />
        )
    }
}