import React from 'react';

const PostButton = ({ fill = "currentColor"}) => (
    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_176_1231)">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M19.5433 6.7039C20 7.80653 20 9.20435 20 12C20 14.7956 20 16.1935 19.5433 17.2961C18.9343 18.7663 17.7663 19.9343 16.2961 20.5433C15.1935 21 13.7956 21 11 21H8C5.17157 21 3.75736 21 2.87868 20.1213C2 19.2426 2 17.8284 2 15V12C2 9.20435 2 7.80653 2.45672 6.7039C3.06569 5.23373 4.23373 4.06569 5.7039 3.45672C6.80653 3 8.20435 3 11 3C13.7956 3 15.1935 3 16.2961 3.45672C17.7663 4.06569 18.9343 5.23373 19.5433 6.7039ZM11 8.00014C11.5523 8.00014 12 8.44786 12 9.00014V10.9997H14C14.5523 10.9997 15 11.4474 15 11.9997C15 12.5519 14.5523 12.9997 14 12.9997H12V15.0001C12 15.5524 11.5523 16.0001 11 16.0001C10.4477 16.0001 10 15.5524 10 15.0001V12.9997H8C7.44772 12.9997 7 12.5519 7 11.9997C7 11.4474 7.44772 10.9997 8 10.9997H10V9.00014C10 8.44786 10.4477 8.00014 11 8.00014Z"
                  fill={fill}/>
        </g>
        <defs>
            <clipPath id="clip0_176_1231">
                <rect width="23" height="23" fill="white"/>
            </clipPath>
        </defs>
    </svg>


);

export default PostButton;