import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchingCategories, fetchingErrorCategories, fetchedCategories } from '../../store/reducers/categorySlice'
import "./Home.scss"
import { Spin } from 'antd'
import Heading from '../../components/Heading/Heading'
import { Link } from 'react-router-dom'


const Home = () => {
  const { loadingCategories, categories } = useSelector(state => state.category)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchingCategories())
    axios
      .get("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then(res => {
        console.log(res)
        dispatch(fetchedCategories(res.data.categories))
      })
      .catch(err => {
        dispatch(fetchingErrorCategories(err))
        console.log(err)
      })
  }, [])
  return (
    <>
    <Heading>All categories</Heading>
      <div className='container w-[90%] mx-auto py-12'>
        <Spin spinning={loadingCategories}>
          <div className='row'>
            {categories?.map(item => (
              <Link key={item.idCategory} to={`category/${item.strCategory}`}>
                <div className='item'>
                  <img src={item.strCategoryThumb} />
                  <h1>{item.strCategory}</h1>
                </div>
              </Link>
            ))}
          </div>
        </Spin>
      </div>
    </>
  )
}

export default Home