import KeyPadDelete from "@/components/(SVG_component)/(mypage)/KeyPadDelete";
import DisplayPassword from "@/components/user/DisplayPassword"
import useKeypad from "@/hooks/keypad/useKeyPadModel";
import usePasswordChange from "@/hooks/user/usePasswordModel";

type Props = {
    isNewPassword: boolean
}

const PasswordKeypad = ({ isNewPassword }: Props) => {
    const realPassword = '112233';
    const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'empty', 0, 'delete'];
    const { inputPassword, setInputPassword, passwordMessage, isFinished } =
        usePasswordChange(
            isNewPassword,
            isNewPassword ? undefined : realPassword,
        );
    const { passwordHandler, deleteHandler } = useKeypad(setInputPassword);

    //완료되면 inputPassword API 보내기

    return <><main className="flex flex-col justify-center items-center flex-1">
        <p className="text-[14px] text-black-100">{passwordMessage}</p>
        <p>{inputPassword}</p>
        <div className="mt-9">
            {!isFinished ? (
                <DisplayPassword length={inputPassword.length} />
            ) : null}
            {/* 비밀번호를 설정하고 완료되었다면 ---이걸 표시하지 않음. */}
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
                                className="w-full text-2xl h-[10dvh] flex items-center justify-center"
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
                                className="w-full text-2xl h-[10dvh] flex items-center justify-center active:rounded-lg active:bg-gray-100"
                                onClick={() => passwordHandler(key.toString())}
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