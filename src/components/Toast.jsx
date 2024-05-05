import React from "react";

const Toast = ({ errorMesg }) => {
  return (
    <div
      id="toast-bottom-right"
      className="fixed flex items-center w-full max-w-xs p-4 space-x-4 bg-red-400 text-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow right-5 bottom-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
      role="alert"
    >
      <i className="ri-error-warning-fill text-xl"></i>
      <div>
        <div className="text-lg font-semibold">{errorMesg}</div>
      </div>
    </div>
  );
};

export default Toast;
