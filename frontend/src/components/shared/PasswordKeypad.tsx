import KeyPadDelete from "@/components/(SVG_component)/(mypage)/KeyPadDelete";
import DisplayPassword from "@/components/user/DisplayPassword"
import useKeypad from "@/hooks/keypad/useKeyPadModel";
import usePasswordChange from "@/hooks/user/usePasswordModel";

type Props = {
    needNewPassword: boolean
}

const PasswordKeypad = ({ needNewPassword }: Props) => {
    const realPassword = '112233';

    const { inputPassword, setInputPassword, passwordMessage, isFinished } =
        usePasswordChange(
            needNewPassword,
            needNewPassword ? undefined : realPassword,
        );
    const { passwordHandler, deleteHandler } = useKeypad(setInputPassword);
    return <><main className="flex flex-col justify-center items-center flex-1">
        <p className="text-[14px] text-black-100">{passwordMessage}</p>
        <div className="mt-9">
            {!isFinished ? (
                <DisplayPassword length={inputPassword.length} />
            ) : null}
            {/* 비밀번호를 설정하고 완료되었다면 ---이걸 표시하지 않음. */}
        </div>
    </main><section className="w-full max-w-[500px] mx-auto text-gray-600">
            <div className="grid grid-cols-3 gap-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <button
                        key={num}
                        type="button"
                        className="w-full text-2xl h-[10dvh] flex items-center justify-center"
                        onClick={() => passwordHandler(num.toString())}
                    >
                        {num}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-3 gap-1 mt-1">
                <div className="w-full bg-transparent" />
                <button
                    type="button"
                    className="w-full text-2xl h-[10dvh] flex items-center justify-center"
                    onClick={() => passwordHandler('0')}
                >
                    0
                </button>
                <button
                    type="button"
                    className="w-full text-2xl h-[10dvh] flex items-center justify-center"
                    onClick={deleteHandler}
                >
                    <KeyPadDelete />
                </button>
            </div>
        </section></>
}

export default PasswordKeypad;