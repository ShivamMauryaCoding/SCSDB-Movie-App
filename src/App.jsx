import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Trending from "./components/Trending";
import Popular from "./components/Popular";
import Movie from "./components/Movie";
import TvShows from "./components/TvShows";
import People from "./components/People";
import Moviedetails from "./components/Moviedetails";
import Tvdetail from "./components/Tvdetail";
import Persondetails from "./components/Persondetails";

function App() {
  return (
    <div className="w-screen h-screen bg-[#1F1E24] flex ">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/trending" element={<Trending />}></Route>
        <Route path="/popular" element={<Popular />}></Route>
        <Route path="/movie" element={<Movie />}></Route>
        <Route path="/movie/details/:id" element={<Moviedetails />} />
        <Route path="/tvshows" element={<TvShows />}></Route>
        <Route path="/tv/details/:id" element={<Tvdetail />} />
        <Route path="/person" element={<People />}></Route>
        <Route path="/person/details/:id" element={<Persondetails />} />
      </Routes>
    </div>
  );
}

export default App;
