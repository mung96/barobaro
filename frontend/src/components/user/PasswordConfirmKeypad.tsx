import KeyPadDelete from "@/components/(SVG_component)/(mypage)/KeyPadDelete";
import DisplayPassword from "@/components/user/DisplayPassword"
import useKeypad from "@/hooks/keypad/useKeyPadModel";
import { useEffect, useState } from "react";
import {getPINApi} from "@/apis/passwordApi";

type Props = {
    value?: number
    onChange?: (value: number) => void
}


const BUTTON_ACTIVE_TIME = 120;
const PasswordConfirmKeypad = ({ value, onChange }: Props) => {
    const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'empty', 0, 'delete'];
    const [inputPassword, setInputPassword] = useState('');

    const [activatedKeys, setActivatedKeys] = useState<number[]>([]);

    const { passwordHandler, deleteHandler } = useKeypad(setInputPassword!);

    useEffect(() => {
        onChange && onChange(Number(inputPassword));
    }, [inputPassword])

    const getPasswordFunction = async () => {
        const res = await getPINApi(inputPassword)
    }

    useEffect(()=>{
        if(inputPassword.length ===6){
            getPasswordFunction()
        }
    },[inputPassword])

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
        <div className="mt-9">
            <DisplayPassword length={inputPassword.length} />
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

export default PasswordConfirmKeypad;
