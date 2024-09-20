import React from 'react';

interface AttatchImageParam {
  className: string;
}
export default function AttatchImage({ className }: AttatchImageParam) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.08334 6.08337C2.08334 3.87423 3.8742 2.08337 6.08334 2.08337H13.9167C16.1258 2.08337 17.9167 3.87423 17.9167 6.08337V13.9167C17.9167 16.1258 16.1258 17.9167 13.9167 17.9167H6.08334C3.8742 17.9167 2.08334 16.1258 2.08334 13.9167V6.08337Z"
        stroke="#747483"
      />
      <path
        d="M2.08334 12.0832L4.55551 9.61108C5.43784 8.72878 6.9038 8.86096 7.61407 9.88686L8.76645 11.5513C9.43113 12.5114 10.7735 12.7002 11.6773 11.9608L13.1825 10.7293C13.9777 10.0787 15.1366 10.1365 15.8632 10.863L17.9167 12.9165"
        stroke="#747483"
      />
      <circle cx="13.75" cy="6.25" r="1.25" fill="#747483" />
    </svg>
  );
}
