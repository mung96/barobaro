type Props = {
  fill: string;
  width?: string;
  height?: string;
};

export default function Etc({ fill, width = '32', height = '32' }: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="6.5" cy="16" r="2.5" fill={fill} />
      <circle cx="16" cy="16" r="2.5" fill={fill} />
      <circle cx="25.5" cy="16" r="2.5" fill={fill} />
    </svg>
  );
}
