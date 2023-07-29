import React from "react";

function Error({ className, src }) {
  return (
    <div className={className}>
      <img src={src} alt="error" />
    </div>
  );
}

export default Error;
