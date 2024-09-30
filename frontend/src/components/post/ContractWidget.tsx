type Props = {
  title: string;
  name: string | React.ReactNode;
  value: string;
  end?: string;
  [key: string]: any;
};

export const ContractWidget = ({ title, name, value, end, ...rest }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-base">{title}</p>
      <div className="bg-gray-500 py-1 flex w-fit rounded-md px-1">
        <p className="text-sm px-2 min-w-fit py-1">{name}</p>
        <input
          className="text-sm text-center bg-gray-500 outline-none inline-block max-w-40"
          value={value}
          {...rest}
        />
        {end && <p className="text-sm pr-2 py-1">{end}</p>}
      </div> 
    </div>
  );
};
