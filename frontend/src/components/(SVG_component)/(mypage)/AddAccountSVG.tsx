type Props = {
  size: number;
  color: string;
};

export default function AddAccountSVG({ size, color }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10ZM11 6V9H14V11H11V14H9V11H6V9H9V6H11Z"
        fill={color}
      />
    </svg>
  );
}
