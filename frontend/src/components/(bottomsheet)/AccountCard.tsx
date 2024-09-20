type Props = {
  isSelected : boolean;
  bank : string;
  account_name: string;
  width : number;
};

export default function AccountCard({
  isSelected, bank, account_name, width,
} : Props) {
  return (
    <div className="bg-amber-200 m-4 flex flex-col rounded-[10px]" style={{ width: `${width * 0.6}px`, height: `${width * 0.35}px` }}>
      <div className="flex flex-row justify-end m-3">
        {isSelected === true ? '현재 선택된 계좌입니다.' : null}
        {bank}
      </div>
      <div className="flex flex-1" />
      <div className="m-4">
        <div>
          {bank}
        </div>
        <div>
          {account_name}
        </div>
      </div>
    </div>
  );
}
