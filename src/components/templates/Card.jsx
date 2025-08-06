import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.png";

function Card({ data, title }) {
  return (
    <div className="flex flex-wrap w-full h-full bg-[#1F1E24] px-[5%]">
      {data.map((c, i) => (
        <Link
          key={i}
          to={`/${c.media_type || title}/details/${c.id}`}
          className="relative w-[25vh] object-cover mr-[5%] mb-[5%] "
        >
          <img
            className="h-[40vh] shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]"
            src={
              c.poster_path || c.backdrop_path || c.profile_path
                ? `https://image.tmdb.org/t/p/original/${
                    c.poster_path || c.backdrop_path || c.profile_path
                  }`
                : noimage
            }
            alt=""
          />
          <h1 className="mt-3 text-2xl font-semibold text-zinc-400">
            {c.name || c.title || c.original_name || c.original_title}
          </h1>

          {c.vote_average && (
            <div className="absolute bottom-[25%] right-[-10%] text-white text-xl font-semibold bg-yellow-600 w-[5vh] h-[5vh] rounded-full flex justify-center items-center">
              {(c.vote_average * 10).toFixed()} <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}

export default Card;
