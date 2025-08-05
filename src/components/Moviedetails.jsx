import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { asyncloadmovie, removemovie } from "../store/actions/movieActions";
import { Link, useNavigate, useParams } from "react-router-dom";

function Moviedetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie);
    };
  }, []);
  return (
    <div style={{}} className="w-screen h-screen px-[10%]">
      <nav className="w-full text-zinc-300">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line"
        ></Link>
        <a href="">
          <i className="ri-external-link-line"></i>
        </a>
        <a href="">
          <i className="ri-earth-fill"></i>
        </a>

        <a href="">imdb</a>
      </nav>
    </div>
  );
}

export default Moviedetails;
