import { Spin } from "antd";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  fetchedYoutube,
  fetchingYoutube,
  fetchingYoutubeError,
} from "../../store/reducers/youtbeSlice";

const MealsYoutube = () => {
  const { youtube, loadingYt } = useSelector((store) => store.mealYt);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchingYoutube());
    axios
      .get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.idMeal}`
      )
      .then((res) => {
        console.log(res.data.meals);
        dispatch(fetchedYoutube(res.data.meals[0]));
      })
      .catch((err) => {
        dispatch(fetchingYoutubeError(err));
      });
  }, [params]);
  
  const {
    strMeal,
    strCategory,
    strArea,
    strTags,
    strYoutube,
    strMealThumb,
    strInstructions,
  } = youtube;
  return (
    <>
      <div className="w-[80%] mx-auto">
        <Spin spinning={loadingYt}>
          <div className="meal-info flex justify-between items-center p-[1rem] my-[2rem] mx-0 border-2 border-[rgba(0,0,0,.1)] shadow-md flex-wrap">
            <h1 className="text-xl font-semibold">{strMeal}</h1>
            <div className="meal-tags flex gap-2">
              <Link to={`/category/${strCategory}`}>
                <p>{strCategory}</p>
              </Link>
              <Link to={`/filterArea/${strArea}`}>
                <p>{strArea}</p>
              </Link>
              {strTags && <b>{strTags}</b>}
              <p onClick={() => navigate(-1)}>Back</p>
            </div>
          </div>

          <div className="youtube flex gap-6 w-full text-gray-600 p-[1rem] my-[2rem] mx-0 border-2 border-[rgba(0,0,0,.1)] shadow-md">
            <iframe
              className="w-full"
              width={900}
              height={506}
              src={`https://www.youtube.com/embed/${
                strYoutube && strYoutube.slice(-11)
              }`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>

          <div className="flex gap-6 w-full text-gray-600 p-[1rem] my-[2rem] mx-0 border-2 border-[rgba(0,0,0,.1)] shadow-md">
            <img className="w-[20rem] rounded-md" src={strMealThumb} />
            <p>{strInstructions}</p>
          </div>
        </Spin>
      </div>
    </>
  );
};

export default MealsYoutube;
