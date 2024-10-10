import { postPINApi } from "@/apis/passwordApi";
import KeyPadDelete from "@/components/(SVG_component)/(mypage)/KeyPadDelete";
import DisplayPassword from "@/components/user/DisplayPassword"
import useKeypad from "@/hooks/keypad/useKeyPadModel";
import usePasswordChange from "@/hooks/user/usePasswordModel";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
    isNewPassword: boolean
}
const BUTTON_ACTIVE_TIME = 120;
const PasswordKeypad = ({ isNewPassword }: Props) => {
    const realPassword = '112233';
    const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'empty', 0, 'delete'];
    const router = useRouter();
    const registPINPassword = async (passwordData: { password: string, checkPassword: string }) => {
        try {
            await postPINApi(passwordData);
        } catch (error) {
            console.error("비밀번호 등록에 실패했습니다:", error)
        }
    }
    const successPostPIN = async () => {
        await registPINPassword({ password: newPassword, checkPassword: inputPassword })
        router.back();
    }
    const [activatedKeys, setActivatedKeys] = useState<number[]>([]);



    const { newPassword, inputPassword, setInputPassword, passwordMessage, isFinished } =
        usePasswordChange(
            isNewPassword,
            isNewPassword ? undefined : realPassword, successPostPIN
        );
    const { passwordHandler, deleteHandler } = useKeypad(setInputPassword);

    //완료되면 inputPassword API 보내기
    const handleButtonClick = (selectedKey: number) => {
        passwordHandler(selectedKey.toString());
        // 나머지 숫자 중 랜덤하게 2개의 숫자를 선택
        const remainingKeys = keys.filter(key => key !== selectedKey && key !== 'empty' && key !== 'delete');
        const randomKeys: number[] = [];
        while (randomKeys.length < 2) {
            const randomIndex = Math.floor(Math.random() * remainingKeys.length);
            const randomKey = remainingKeys[randomIndex];
            if (!randomKeys.includes(randomKey as number)) {
                randomKeys.push(randomKey as number);
            }
        }

        setActivatedKeys([selectedKey, ...randomKeys]);

        setTimeout(() => {
            setActivatedKeys([]);
        }, BUTTON_ACTIVE_TIME);
    };
    return <><main className="flex flex-col justify-center items-center flex-1">
        <p className="text-[14px] text-black-100">{passwordMessage}</p>
        <p className="text-[14px] text-black-100">{newPassword}</p>

        <p>{inputPassword}</p>
        <div className="mt-9">
            {!isFinished ? (
                <DisplayPassword length={inputPassword.length} />
            ) : null}
        </div>
    </main>
        <section className="w-full max-w-[500px] mx-auto text-gray-600">
            <div className="grid grid-cols-3 gap-1">
                {keys.map((key, index) => {
                    if (key === 'empty') {
                        return <div key={index} className="w-full bg-transparent" />;
                    } else if (key === 'delete') {
                        return (
                            <button
                                key={index}
                                type="button"
                                className="w-full text-2xl h-[10dvh] flex items-center justify-center rounded-xl active:bg-gray-100"
                                onClick={deleteHandler}
                            >
                                <KeyPadDelete />
                            </button>
                        );
                    } else {
                        return (
                            <button
                                key={index}
                                type="button"
                                className={`w-full text-2xl h-[10dvh] flex rounded-xl items-center justify-center 
                                    ${activatedKeys.includes(key as number) ? 'bg-gray-100' : ''}`}
                                onClick={() => handleButtonClick(key as number)}
                            >
                                {key}
                            </button>
                        );
                    }
                })}
            </div>
        </section></>
}

export default PasswordKeypad;