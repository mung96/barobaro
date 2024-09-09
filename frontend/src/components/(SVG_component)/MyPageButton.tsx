import React from 'react';

function MyPageButton({ fill = 'currentColor' }) {
  return (
    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.8334 7.66659C14.8334 9.50753 13.341 10.9999 11.5001 10.9999C9.65913 10.9999 8.16675 9.50753 8.16675 7.66659C8.16675 5.82564 9.65913 4.33325 11.5001 4.33325C13.341 4.33325 14.8334 5.82564 14.8334 7.66659Z"
        fill={fill}
        stroke={fill}
        strokeLinecap="round"
      />
      <path
        d="M4.60603 16.3972C5.20759 14.0426 7.6439 12.9375 10.0742 12.9375H12.9258C15.3561 12.9375 17.7924 14.0426 18.394 16.3972C18.4973 16.8017 18.5803 17.2337 18.6313 17.689C18.6929 18.2379 18.2398 18.6875 17.6875 18.6875H5.3125C4.76022 18.6875 4.30714 18.2379 4.36865 17.689C4.41968 17.2337 4.50269 16.8017 4.60603 16.3972Z"
        fill={fill}
        stroke={fill}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default MyPageButton;
