import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./templates/Topnav";
import Dropdown from "./templates/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "./templates/Card";
import Loader from "./Loader";

function TvShows() {
  const navigate = useNavigate();
  const [category, setcategory] = useState("airing_today");
  const [tv, settv] = useState([]);
  const [page, setpage] = useState(1);
  const [hasmore, sethasmore] = useState(true);
  document.title = "SCSDB | Tv Shows ";

  const GetTv = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);

      if (data.results.length > 0) {
        settv((preState) => [...preState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasmore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshHandler = () => {
    if (tv.length === 0) {
      GetTv();
    } else {
      setpage(1);
      settv([]);
      GetTv();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return tv.length > 0 ? (
    <div className="w-screen h-screen ">
      <div className="flex items-center justify-between w-full px-[3%] ">
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line"
          ></i>
          Tv Shows <small className="text-zinc-600">({category})</small>
        </h1>
        <div className="flex w-[80%] items-center gap-2">
          <Topnav />
          <Dropdown
            title="Category"
            options={["on_the_air", "top_rated", "popular", "airing_today"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>
      </div>
      <InfiniteScroll
        dataLength={tv.length}
        next={GetTv}
        hasMore={hasmore}
        loader={<h1>Loading...</h1>}
      >
        <Card data={tv} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
}

export default TvShows;
