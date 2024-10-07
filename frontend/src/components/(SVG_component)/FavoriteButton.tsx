import React from 'react';

type Props = {
  fill: string;
  width?: string;
  height?:string;
};

function HomeButton({ fill,width='24',height='24' }: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.07987 12.7493L10.4531 18.7362C10.6452 18.9167 10.7413 19.007 10.8507 19.0412C10.948 19.0717 11.0522 19.0717 11.1494 19.0412C11.2589 19.007 11.3549 18.9167 11.5471 18.7362L17.9203 12.7493C19.7135 11.0648 19.9312 8.2928 18.4231 6.34898L18.1395 5.98348C16.3353 3.65811 12.7139 4.04809 11.4462 6.70426C11.2671 7.07946 10.733 7.07946 10.554 6.70426C9.28625 4.04809 5.66483 3.65811 3.86066 5.98348L3.57709 6.34898C2.06895 8.2928 2.2867 11.0648 4.07987 12.7493Z"
        fill={fill}
        stroke={fill}
        strokeWidth="2"
      />
    </svg>
  );
}

export default HomeButton;
