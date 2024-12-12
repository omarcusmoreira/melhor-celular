import React from "react";

const IphoneIcon = ({ width = 32, height = 56 }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 56" // Matches the drawing's native dimensions
        width={width} // Scales the drawing proportionally
        height={height}
        aria-label="Smartphone icon"
      >
        {/* Outer border with white fill */}
        <path
          d="M21.5,1h-11A2.5,2.5,0,0,0,8,3.5v25A2.5,2.5,0,0,0,10.5,31h11A2.5,2.5,0,0,0,24,28.5V3.5A2.5,2.5,0,0,0,21.5,1Z"
          fill="white"
        />
        {/* Screen area with black fill */}
        <path
          d="M23,28.5A1.5,1.5,0,0,1,21.5,30h-11A1.5,1.5,0,0,1,9,28.5V3.5A1.5,1.5,0,0,1,10.5,2H12v.5a.5.5,0,0,0,.5.5h7a.5.5,0,0,0,.5-.5V2h1.5A1.5,1.5,0,0,1,23,3.5Z"
          fill="black"
        />
      </svg>
    );
  };
  
  

export const Header: React.FC = () => {
  return (
    <header className="bg-[#054A91] text-[#DAE3ED] flex items-center h-[87px]">
      <div className="container mx-auto flex items-center justify-center">
        <h1 className="text-[56px] font-bold flex items-center mr-[-4px] font-nunito">
          M
        </h1>
        <IphoneIcon />
      </div>
    </header>
  );
};
