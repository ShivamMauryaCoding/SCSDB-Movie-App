import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.png";

function HorizontalCards({ data }) {
  return (
    <div className="flex w-[100%] p-5 mb-3  overflow-x-auto">
      {data.length > 0 ? (
        data.map((d, i) => (
          <Link
            to={`/${d.media_type}/details/${d.id}`}
            className="min-w-[20%] min-h-[20vh] rounded-md overflow-hidden bg-zinc-900 mb-5  mr-5"
            key={i}
          >
            <img
              className="object-cover w-full h-[45vh]"
              src={
                d.profile_path || d.poster_path
                  ? `https://image.tmdb.org/t/p/original/${
                      d.profile_path || d.poster_path
                    }`
                  : noimage
              }
              alt=""
            />
            <div className="px-2 text-white">
              <h1 className="text-xl font-black ">
                {" "}
                {(d.name || d.title || d.original_name || d.original_title)
                  .length > 20
                  ? (
                      d.name ||
                      d.title ||
                      d.original_name ||
                      d.original_title
                    ).slice(0, 20) + "..."
                  : d.name || d.title || d.original_name || d.original_title}
              </h1>
              <p className="mt-3 mb-3 ">
                {d.overview.slice(0, 80) + "..."}
                <span className="text-zinc-500">more</span>
              </p>
            </div>
          </Link>
        ))
      ) : (
        <h1 className="mt-5 text-3xl font-black text-center text-white">
          Nothing to show
        </h1>
      )}
    </div>
  );
}

export default HorizontalCards;
