import React from "react";
export const Loader = ({ loader }) => loader ? 
  <div className="absolute inset-0 text-white MagentaRose flex justify-center items-center w-full h-screen md:text-2xl bg-black/90" style={{zIndex:9999}}>
    Loading Movies, Please wait
  </div> : null
