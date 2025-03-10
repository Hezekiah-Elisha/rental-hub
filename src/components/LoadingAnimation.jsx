import React from "react";

export default function LoadingAnimation() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="card">
        <div className="loader">
          <p>loading</p>
          <div className="words">
            <span className="word">Properties</span>
            <span className="word">Houses</span>
            <span className="word">switches</span>
            <span className="word">cards</span>
            <span className="word">buttons</span>
          </div>
        </div>
      </div>
    </div>
  );
}
