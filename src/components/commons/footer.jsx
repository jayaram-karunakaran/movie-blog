import React from "react";

function Footer() {
  return (
    <div className="flex items-center bg-black text-white/50 w-full p-4">
      
      <div className="cursor-pointer">
      <a target="_blank" href="https://www.linkedin.com/in/jayaram-karunakaran/" rel="noreferrer">
      <img alt="tmdb"
          width={48}
          height={"auto"}
          src="/me.png"
          className="p-1 rounded-full hover:bg-white/20"
        />
     
      <span className="mr-4">Jayaram <br /> Karunakaran </span>
      </a>
      </div>

      <div className="flex-1 flex-col flex items-end">
      <div className="pb-2">Powered by </div>
      <a target="_blank" href="https://www.themoviedb.org/" rel="noreferrer">
      <img alt="tmdb"
          width={80}
          height={"auto"}
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
        />
      </a>
      </div>
    </div>
  );
}

export default Footer;
