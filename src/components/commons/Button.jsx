import React from "react";

const Button = ({setopens}) => {


  const openModal=()=>{
    setopens(true)

  }
  return (
  
    <button className="bg-[#9352B3] text-white  px-6 py-2 rounded" onClick={openModal}>
      LogIn
    </button>

 
 
  );
};

export default Button;
