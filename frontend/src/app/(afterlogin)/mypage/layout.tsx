type Props = {
  children : React.ReactNode
};

export default function MypageLayout({ children }:Props) {
  return (
    <div>
      {children}
    </div>
  );
}
