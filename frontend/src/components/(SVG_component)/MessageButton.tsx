import React from 'react';

function MessageButton({ fill = 'currentColor' }) {
  return (
    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.5206 5.5369C19.1666 6.50376 19.1666 7.8497 19.1666 10.5416C19.1666 13.2335 19.1666 14.5794 18.5206 15.5463C18.2409 15.9648 17.8815 16.3242 17.4629 16.6039C16.4961 17.2499 15.1501 17.2499 12.4583 17.2499H10.5416L9.21903 19.366C8.77986 20.0687 7.72566 19.963 7.43471 19.1871L6.70825 17.2499L6.64276 17.0534C6.21084 16.9577 5.85354 16.8155 5.5369 16.6039C5.11834 16.3242 4.75896 15.9648 4.47929 15.5463C3.83325 14.5794 3.83325 13.2335 3.83325 10.5416C3.83325 7.8497 3.83325 6.50376 4.47929 5.5369C4.75896 5.11834 5.11834 4.75896 5.5369 4.47929C6.50376 3.83325 7.8497 3.83325 10.5416 3.83325H12.4583C15.1501 3.83325 16.4961 3.83325 17.4629 4.47929C17.8815 4.75896 18.2409 5.11834 18.5206 5.5369Z"
        fill={fill}
      />
      <path
        d="M18.5206 5.5369L18.9363 5.25911L18.9363 5.25911L18.5206 5.5369ZM18.5206 15.5463L18.9363 15.8241L18.9363 15.8241L18.5206 15.5463ZM17.4629 16.6039L17.7407 17.0196L17.7407 17.0196L17.4629 16.6039ZM10.5416 17.2499V16.7499C10.3692 16.7499 10.209 16.8387 10.1176 16.9849L10.5416 17.2499ZM9.21903 19.366L9.64303 19.631L9.64303 19.631L9.21903 19.366ZM7.43471 19.1871L7.90287 19.0116L7.90287 19.0116L7.43471 19.1871ZM6.70825 17.2499L6.23391 17.408C6.23586 17.4139 6.23792 17.4197 6.24009 17.4255L6.70825 17.2499ZM6.64276 17.0534L7.1171 16.8953C7.06152 16.7286 6.92249 16.6033 6.7509 16.5653L6.64276 17.0534ZM5.5369 16.6039L5.81468 16.1882L5.81468 16.1882L5.5369 16.6039ZM4.47929 15.5463L4.06355 15.8241L4.06355 15.8241L4.47929 15.5463ZM4.47929 5.5369L4.06355 5.25911L4.06355 5.25911L4.47929 5.5369ZM5.5369 4.47929L5.25911 4.06355L5.25911 4.06355L5.5369 4.47929ZM17.4629 4.47929L17.7407 4.06355L17.7407 4.06355L17.4629 4.47929ZM19.6666 10.5416C19.6666 9.20605 19.6672 8.16676 19.5833 7.34175C19.4985 6.50839 19.3233 5.83839 18.9363 5.25911L18.1048 5.81468C18.3638 6.20226 18.5117 6.68866 18.5884 7.44296C18.666 8.20561 18.6666 9.18524 18.6666 10.5416H19.6666ZM18.9363 15.8241C19.3233 15.2448 19.4985 14.5748 19.5833 13.7414C19.6672 12.9164 19.6666 11.8771 19.6666 10.5416H18.6666C18.6666 11.8979 18.666 12.8776 18.5884 13.6402C18.5117 14.3945 18.3638 14.8809 18.1048 15.2685L18.9363 15.8241ZM17.7407 17.0196C18.2139 16.7035 18.6201 16.2972 18.9363 15.8241L18.1048 15.2685C17.8616 15.6325 17.5491 15.945 17.1852 16.1882L17.7407 17.0196ZM12.4583 17.7499C13.7938 17.7499 14.8331 17.7505 15.6581 17.6666C16.4914 17.5818 17.1614 17.4067 17.7407 17.0196L17.1852 16.1882C16.7976 16.4471 16.3112 16.595 15.5569 16.6717C14.7942 16.7493 13.8146 16.7499 12.4583 16.7499V17.7499ZM10.5416 17.7499H12.4583V16.7499H10.5416V17.7499ZM9.64303 19.631L10.9656 17.5149L10.1176 16.9849L8.79503 19.101L9.64303 19.631ZM6.96654 19.3627C7.40297 20.5265 8.98428 20.685 9.64303 19.631L8.79503 19.101C8.57545 19.4523 8.04834 19.3995 7.90287 19.0116L6.96654 19.3627ZM6.24009 17.4255L6.96654 19.3627L7.90287 19.0116L7.17642 17.0744L6.24009 17.4255ZM6.16841 17.2115L6.23391 17.408L7.18259 17.0918L7.1171 16.8953L6.16841 17.2115ZM5.25911 17.0196C5.63758 17.2725 6.05548 17.4354 6.53461 17.5416L6.7509 16.5653C6.36619 16.48 6.0695 16.3584 5.81468 16.1882L5.25911 17.0196ZM4.06355 15.8241C4.3797 16.2972 4.78596 16.7035 5.25911 17.0196L5.81468 16.1882C5.45072 15.945 5.13821 15.6325 4.89502 15.2685L4.06355 15.8241ZM3.33325 10.5416C3.33325 11.8771 3.33265 12.9164 3.41657 13.7414C3.50135 14.5748 3.67649 15.2448 4.06355 15.8241L4.89502 15.2685C4.63605 14.8809 4.48817 14.3945 4.41144 13.6402C4.33386 12.8776 4.33325 11.8979 4.33325 10.5416H3.33325ZM4.06355 5.25911C3.67649 5.83839 3.50135 6.50839 3.41657 7.34175C3.33265 8.16676 3.33325 9.20605 3.33325 10.5416H4.33325C4.33325 9.18524 4.33386 8.20561 4.41144 7.44296C4.48817 6.68866 4.63605 6.20226 4.89502 5.81468L4.06355 5.25911ZM5.25911 4.06355C4.78596 4.3797 4.3797 4.78596 4.06355 5.25911L4.89502 5.81468C5.13821 5.45072 5.45072 5.13822 5.81468 4.89502L5.25911 4.06355ZM10.5416 3.33325C9.20605 3.33325 8.16676 3.33265 7.34175 3.41657C6.50839 3.50135 5.83839 3.67649 5.25911 4.06355L5.81468 4.89502C6.20226 4.63605 6.68866 4.48817 7.44296 4.41144C8.20561 4.33386 9.18524 4.33325 10.5416 4.33325V3.33325ZM12.4583 3.33325H10.5416V4.33325H12.4583V3.33325ZM17.7407 4.06355C17.1614 3.67649 16.4914 3.50135 15.6581 3.41657C14.8331 3.33265 13.7938 3.33325 12.4583 3.33325V4.33325C13.8146 4.33325 14.7942 4.33386 15.5569 4.41144C16.3112 4.48817 16.7976 4.63605 17.1852 4.89502L17.7407 4.06355ZM18.9363 5.25911C18.6201 4.78596 18.2139 4.3797 17.7407 4.06355L17.1852 4.89502C17.5491 5.13822 17.8616 5.45072 18.1048 5.81468L18.9363 5.25911Z"
        fill={fill}
      />
      <ellipse cx="15.3333" cy="10.5416" rx="0.958333" ry="0.958333" fill="white" />
      <circle cx="11.5001" cy="10.5416" r="0.958333" fill="white" />
      <ellipse cx="7.66658" cy="10.5416" rx="0.958333" ry="0.958333" fill="white" />
    </svg>
  );
}

export default MessageButton;
