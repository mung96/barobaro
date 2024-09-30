import ProfilePhoto from '@/components/user/ProfilePhoto';
import SelectArea from '@/components/signup/SelectArea';

type Props = { process: number };

export default function SignUpContent({ process }: Props) {
  return (
    <div>{process === 1 ? <ProfilePhoto isSignup /> : <SelectArea />}</div>
  );
}
