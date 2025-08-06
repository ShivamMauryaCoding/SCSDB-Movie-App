import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removemovie } from "../store/actions/movieActions";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import HorizontalCards from "./templates/HorizontalCards";
import Loader from "./Loader";

function Moviedetails() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { info } = useSelector((state) => state.movie);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [id]);
  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)),url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "top 2%",
        backgroundSize: "cover",
      }}
      className="relative w-screen h-auto overflow-x-hidden px-[10%]"
    >
      {/* Part 1 Navigation */}
      <nav className="flex w-full gap-10 h-[10vh] items-center text-xl text-zinc-100">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line"
        ></Link>
        <a target="_blank" href={info.detail.homepage}>
          <i className="ri-external-link-line"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="ri-earth-fill"></i>
        </a>

        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
        >
          imdb
        </a>
      </nav>

      {/* Part 2 Detail & Poster */}

      <div className="flex w-full">
        <img
          className="h-[50vh] shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt=""
        />

        <div className="content ml-[5%] text-white">
          <h1 className="text-5xl font-black ">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title}
            <small className="text-xl font-bold text-zinc-300">
              ({info.detail.release_date.split("-")[0]})
            </small>
          </h1>
          <div className="flex items-center mt-3 mb-5 text-zinc-100 gap-x-5">
            <span className=" text-white text-xl font-semibold bg-yellow-600 w-[5vh] h-[5vh] rounded-full flex justify-center items-center">
              {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
            </span>
            <h1 className="text-2xl font-semibold leading-6 w-[60px]">
              User Score
            </h1>
            <h1>{info.detail.release_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(",")}</h1>
            <h1>{info.detail.runtime} min</h1>
          </div>

          <h1 className="text-xl italic font-semibold text-zinc-200">
            {info.detail.tagline}
          </h1>
          <h1 className="mt-5 mb-3 text-2xl">Overview</h1>
          <p>{info.detail.overview}</p>

          <h1 className="mt-5 mb-3 text-2xl">Movie Dubbed</h1>
          <p className="mb-10">{info.translations.join(", ")}</p>
          <Link
            className="p-5 font-semibold  mt-5 rounded-lg bg-[#6556CD]"
            to={`${pathname}/trailer`}
          >
            <i className="mr-3 text-xl ri-play-fill"></i>
            Play Trailer
          </Link>
        </div>
      </div>

      {/* Part 3 Available Platforms */}
      <div className="w-[80%] flex flex-col gap-y-5 mt-10">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex items-center text-white gap-x-5">
            <h1>Available on Platform</h1>
            {info.watchproviders.flatrate.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex items-center text-white gap-x-5">
            <h1>Available on Rent</h1>
            {info.watchproviders.rent.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md "
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex items-center text-white gap-x-5">
            <h1>Available to Buy</h1>
            {info.watchproviders.buy.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md "
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
      </div>

      {/* Part 4 Recommendations & Similar Stuff */}
      <hr className="mt-5 mb-2 text-zinc-200" />
      <h1 className="text-3xl font-bold text-white ">
        Recommendations & Similar Stuffs
      </h1>
      <HorizontalCards
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
      />
      <Outlet />
    </div>
  ) : (
    <Loader />
  );
}

export default Moviedetails;
