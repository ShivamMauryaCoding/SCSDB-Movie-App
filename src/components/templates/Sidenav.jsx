import React from "react";
import { Link } from "react-router-dom";

function Sidenav() {
  return (
    <div className="w-[20%] h-full border-r-2 border-zinc-200 p-10">
      <h1 className="text-2xl font-bold text-white">
        <i className=" text-[#6556CD] ri-tv-fill mr-1.5 "></i>
        <span className="text-2xl">SCSDB.</span>
      </h1>

      <nav className="flex flex-col gap-3 text-xl text-zinc-400">
        <h1 className="mt-10 mb-5 text-xl font-semibold text-white">
          New Feeds
        </h1>
        <Link
          to={"/trending"}
          className="p-5 rounded-lg hover:bg-[#6556CD] hover:text-white duration-300"
        >
          <i className="ri-fire-fill"></i> Trending
        </Link>
        <Link
          to={"/popular"}
          className="p-5 rounded-lg hover:bg-[#6556CD] hover:text-white duration-300"
        >
          <i className="ri-bard-fill"></i> Popular
        </Link>
        <Link
          to={"/movie"}
          className="p-5 rounded-lg hover:bg-[#6556CD] hover:text-white duration-300"
        >
          <i className="ri-movie-2-fill"></i> Movie
        </Link>
        <Link
          to={"/tvshows"}
          className="p-5 rounded-lg hover:bg-[#6556CD] hover:text-white duration-300"
        >
          <i className="ri-tv-2-fill"></i> Tv Shows
        </Link>
        <Link
          to={"/person"}
          className="p-5 rounded-lg hover:bg-[#6556CD] hover:text-white duration-300"
        >
          <i className="ri-team-fill"></i> People
        </Link>
      </nav>
      <hr className="border-none h-[1px] bg-zinc-400 mt-2" />
      <nav className="flex flex-col gap-2 text-xl text-zinc-400">
        <h1 className="mt-6 mb-2 text-xl font-semibold text-white">
          Website Information
        </h1>
        <Link className="p-5 rounded-lg hover:bg-[#6556CD] hover:text-white duration-300">
          <i className="ri-information-fill"></i> About SCSDB
        </Link>
        <Link className="p-5 rounded-lg hover:bg-[#6556CD] hover:text-white duration-300">
          <i className="ri-phone-fill"></i> Contact Us
        </Link>
      </nav>
    </div>
  );
}

export default Sidenav;
