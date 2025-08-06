import axios from "../../utils/axios";
import { loadtv, removetv } from "../reducers/tvSlice";
export { removetv } from "../reducers/tvSlice";

export const asyncloadtv = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/tv/${id}`);
    const externalid = await axios.get(`/tv/${id}/external_ids`);
    const recommendations = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const videos = await axios.get(`/tv/${id}/videos`);
    const translations = await axios.get(`/tv/${id}/translations`);

    const watchproviders = await axios.get(`/tv/${id}/watch/providers`);

    let theultimatedetails = {
      detail: detail.data,
      externalid: externalid.data,
      similar: similar.data.results,
      recommendations: recommendations.data.results,
      videos: videos.data.results.find((m) => m.type === "Trailer"),
      translations: translations.data.translations.map((t) => t.english_name),

      watchproviders: watchproviders.data.results?.IN || null,
    };

    dispatch(loadtv(theultimatedetails)); // ✅ This is how you dispatch the action
  } catch (error) {
    console.log("Error:", error);
  }
};
