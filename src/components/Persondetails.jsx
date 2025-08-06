import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson, removeperson } from "../store/actions/personAction";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import HorizontalCards from "./templates/HorizontalCards";
import Loader from "./Loader";
import Dropdown from "./templates/Dropdown";

function Persondetails() {
  const [category, setcategory] = useState("movie");
  const { id } = useParams();
  const { pathname } = useLocation();
  const { info } = useSelector((state) => state.person);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);
  return info ? (
    <div className="flex w-full px-[6%] h-auto overflow-y-auto  bg-[#1F1E24] flex-col">
      {/* Part-1 Navigation */}
      <nav className="flex items-center w-full gap-10 text-xl text-zinc-100">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line"
        ></Link>
      </nav>

      <div className="flex w-full ">
        {/* Part-2 left poster and details */}
        <div className="w-[20%] mt-5">
          <img
            className="h-[42vh] shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]"
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
            alt=""
          />
          <hr className="w-full mt-5 mb-2 text-zinc-200" />
          {/* Social Media Links */}
          <div className="flex text-2xl text-white gap-x-5">
            <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              <i className="ri-earth-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            >
              <i className="ri-facebook-circle-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            >
              <i className="ri-instagram-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://twitter.com/${info.externalid.twitter_id}`}
            >
              <i className="ri-twitter-x-fill"></i>
            </a>
          </div>

          {/* Personal Information */}
          <h1 className="my-5 text-2xl font-semibold text-zinc-400">
            Person Info
          </h1>
          <h1 className="text-lg font-semibold text-zinc-400">Known For</h1>
          <h1 className=" text-zinc-400">{info.detail.known_for_department}</h1>
          <h1 className="text-lg font-semibold text-zinc-400">Gender</h1>
          <h1 className=" text-zinc-400">
            {info.detail.gender === 2 ? "Male" : "Female"}
          </h1>
          <h1 className="text-lg font-semibold text-zinc-400">BirthDay</h1>
          <h1 className=" text-zinc-400">{info.detail.birthday}</h1>
          <h1 className="text-lg font-semibold text-zinc-400">DeathDay</h1>
          <h1 className=" text-zinc-400">
            {info.detail.deathday ? info.detail.deathday : " Chill Alive !"}
          </h1>
          <h1 className="text-lg font-semibold text-zinc-400">
            Place of Birth
          </h1>
          <h1 className=" text-zinc-400">{info.detail.place_of_birth}</h1>
          <h1 className="text-lg font-semibold text-zinc-400">Also Known as</h1>
          <h1 className=" text-zinc-400">
            {info.detail.also_known_as.join(", ")}
          </h1>
        </div>
        {/* Part-3 right poster and details */}
        <div className="w-[80%] ml-[5%]  text-white">
          <h1 className="my-5 text-6xl font-black text-zinc-400">
            {info.detail.name}
          </h1>
          <h1 className="text-xl font-semibold text-zinc-400">Biography</h1>
          <p className="mt-3">{info.detail.biography}</p>
          <h1 className="mt-5 text-lg font-semibold text-zinc-400">
            Known For
          </h1>
          <HorizontalCards data={info.combinedCredits.cast} />

          <div className="flex justify-between w-full">
            <h1 className="mt-5 text-xl font-semibold text-zinc-400">Acting</h1>
            <Dropdown
              title={"Category"}
              options={["tv", "movie"]}
              func={(e) => setcategory(e.target.value)}
            />
          </div>
          <div className="mt-5 mb-5 w-full h-[50vh] text-zinc-400 list-disc overflow-x-hidden overflow-y-auto shadow-xl border-2 border-zinc-700 p-5 shadow-[rgba(255,255,255,.3)]">
            {info[category + "Credits"].cast.map((c, i) => (
              <li
                key={i}
                className="p-5 duration-300 rounded cursor-pointer hover:text-white hover:bg-[#121114]"
              >
                <Link to={`/${category}/details/${c.id}`}>
                  <span>
                    {c.name || c.title || c.original_name || c.original_title}
                  </span>
                  <span className="block ml-5">
                    {c.character && `Character Name : ${c.character}`}
                  </span>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
}

export default Persondetails;
