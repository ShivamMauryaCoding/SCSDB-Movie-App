import axios from "../../utils/axios";
import { loadmovie, removemovie } from "../reducers/movieSlice";
export { removemovie } from "../reducers/movieSlice";

export const asyncloadmovie = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/movie/${id}`);
    const externalid = await axios.get(`/movie/${id}/external_ids`);
    const recommendations = await axios.get(`/movie/${id}/recommendations`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const videos = await axios.get(`/movie/${id}/videos`);
    const translations = await axios.get(`/movie/${id}/translations`);

    const watchproviders = await axios.get(`/movie/${id}/watch/providers`);

    let theultimatedetails = {
      detail: detail.data,
      externalid: externalid.data,
      similar: similar.data.results,
      recommendations: recommendations.data.results,
      videos: videos.data.results.find((m) => m.type === "Trailer"),
      translations: translations.data.translations.map((t) => t.english_name),

      watchproviders: watchproviders.data.results?.IN || null,
    };

    dispatch(loadmovie(theultimatedetails)); // ✅ This is how you dispatch the action
  } catch (error) {
    console.log("Error:", error);
  }
};
