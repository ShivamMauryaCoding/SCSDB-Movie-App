import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.png";

function Topnav() {
  const [query, setquery] = useState("");
  const [serches, setsearches] = useState([]);

  const getSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      // console.log(data.results);
      setsearches(data.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSearches();
  }, [query]);
  // console.log(serches);

  return (
    <div className="w-[80%] mx-auto h-[10vh] flex  items-center relative  ">
      <i className="text-3xl text-zinc-400 ri-search-line"></i>
      <input
        onChange={(e) => setquery(e.target.value)}
        value={query}
        type="text"
        className=" text-zinc-200 w-[50%] mx-10 p-5 text-xl outline-none border-none bg-transparent"
        placeholder="search anything"
      />
      {query.length > 0 && (
        <i
          onClick={() => setquery("")}
          className="text-3xl text-zinc-400 ri-close-fill"
        ></i>
      )}

      <div className="absolute z-[100] w-[50%] max-h-[50vh] bg-zinc-200 top-[100%] left-17.5  overflow-auto rounded-b-xl">
        {serches.map((s, i) => (
          <Link
            to={`/${s.media_type}/details/${s.id}`}
            key={i}
            className="flex items-center justify-start w-full p-10 font-semibold duration-300 border-b-2 border-zinc-100 text-zinc-600 hover:text-black hover:bg-zinc-300"
          >
            <img
              className="w-[10vh]  object-cover rounded mr-3 shadow-lg"
              src={
                s.backdrop_path || s.profile_path
                  ? `https://image.tmdb.org/t/p/original/${
                      s.backdrop_path || s.profile_path
                    }`
                  : noimage
              }
              alt=""
            />
            <span>
              {s.name || s.title || s.original_name || s.original_title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Topnav;
