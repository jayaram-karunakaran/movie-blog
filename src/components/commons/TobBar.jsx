import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import FaceIcon from '@mui/icons-material/Face';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';


const TobBar = ({
  title,
  query,
  userData,
  setQuery,
  language,
  languageList,
  selectLang,
  isQueryTypeMovieName,
  setQueryType,
  loginOrOutClick,
  search,
  setSearch,
  showMenu,
  setMenu,navigate
}) => {


  const setSearchs = (event) => {
    let que = event.target.value;
    if (isQueryTypeMovieName || (!isQueryTypeMovieName && que.length <= 4))
      setQuery(que)
  };

  return (
    <div className={`h-14 flex flex-row items-center w-screen md:h-20 shadow fixed top-0 z-30 bg-blur bg-black/40`}>
      {!search ? (
        <div className="p-2 md:p-5 flex flex-1 items-center font-medium">
          <div className="flex items-center text-white">
            <TheaterComedyIcon sx={{ fontSize: { xs: 24, md: 45 } }} />
            <div className="pl-2 pt-2 text-sm md:text-3xl MagentaRose md:w-auto w-full flex justify-between">
              {title}
            </div>
          </div>

          <div className="flex-1 flex flow-row justify-end items-center">
            <div className=" px-2 text-2xl  cursor-pointer" onClick={() => setSearch(true)}>
              <SearchIcon sx={{ fontSize: { xs: 24, md: 32 } }} className="text-white" />
            </div>
            <LanguageSection {...{ language, languageList, selectLang }} />
          </div>

          <div onClick={() => setMenu(!showMenu)} className="relative">
            {userData ? <FaceIcon className="mr-3 text-white border p-1 rounded-full" sx={{ fontSize: { xs: 24, md: 45 } }} /> : <AccountCircleIcon sx={{ fontSize: { xs: 24, md: 40 }, }} className="mr-3 text-white" />}
            {showMenu ? <div className="bg-white z-20 absolute -right-0 top-12 w-40 p-4 rounded-md text-gray-600">
              {userData ? <div className="pb-2 mb-2 text-lg font-semibold text-black border-b"><EmojiPeopleIcon />{`Hi, ${userData?.name}`}</div> : null}
              <div className=" border-b pb-2" onClick={() => navigate("/watched")} >Watched Movies </div>
              <div className="pt-2" onClick={loginOrOutClick} >{userData ? 'Sign Out' : 'Sign In'}</div>
            </div> : null}
          </div>
        </div>
      ) : (
        <div
          className="p-2 flex flex-row items-center w-screen "
          style={{ animation: `fadeIn 1000ms ease-out` }}
        >
          <div className="text-sm flex-1 flex flex-row items-center md:pl-4"> <input autoFocus={true}
            type={isQueryTypeMovieName ? "text" : "number"} value={query}
            className="block w-full px-2 py-2 text-white  border rounded-full focus:border-black bg-black/50 md:text-xl pl-8"
            placeholder="Search by"
            onChange={setSearchs}
          />
            {query && query.length !== 4 && !isQueryTypeMovieName ? <div className="text-xs text-red-600 px-3 whitespace-nowrap">Enter a valid year</div> : null}
          </div>

          <div className="mx-2 text-xs md:text-base border rounded-full cursor-pointer flex flex-row whitespace-nowrap">
            <div onClick={() => setQueryType(true)} className={`p-1 border-r-2 rounded-l-full px-4 ${!isQueryTypeMovieName ? 'bg-black/50 text-white' : 'bg-white text-black'}`}>Movie Name</div>
            <div onClick={() => setQueryType(false)} className={`p-1 px-4 rounded-r-full  ${!isQueryTypeMovieName ? 'bg-white text-black' : 'bg-black/50 text-white'}`}>Year</div>
          </div>

          <div className="p-3 flex items-center cursor-pointer">
            <CloseIcon onClick={() => { setSearch(false); setQuery("") }} sx={{ color: "white" }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TobBar;


const LanguageSection = ({ language, languageList, selectLang }) => {
  return (
    <div className="pr-4">
      {languageList && languageList.length ? (
        <div className="flex flex-row items-center">
          <select onChange={selectLang} value={language} className="ml-1 w-24 md:w-28 rounded-2xl px-2">
            {languageList.map((e, i) => {
              return (
                <option key={i.toString()} value={e.iso_639_1}>
                  {e.name}
                </option>
              );
            })}
          </select>
        </div>
      ) : null}
    </div>
  );
};
