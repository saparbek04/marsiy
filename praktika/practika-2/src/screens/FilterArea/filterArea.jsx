import { Spin } from 'antd'
import axios from 'axios'
import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Heading from '../../components/Heading/Heading'
import { addToCart } from '../../store/reducers/cartSlice'
import cartSound from '../../assets/music/Iphone.mp3'

import { fetchedArea, fetchingArea, fetchingErrorArea } from '../../store/reducers/areaSlice'

const FilterArea = () => {
    const { area, loadingArea } = useSelector(store => store.area)
    const params = useParams()
    const { cartMeals } = useSelector(store => store.cart)
    const cartMusicPlayer = useRef(null)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchingArea())

        axios
            .get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${params.area}`)
            .then(res => {
                console.log(res.data)
                dispatch(fetchedArea(res.data.meals))
            })
            .catch(err => {
                fetchingErrorArea()
            })
    },[params])


    function addingMealToBasket(meal) {


        dispatch(addToCart(meal))
        cartMusicPlayer.current.currentTime = 0
        cartMusicPlayer.current.play()
        setTimeout(() => {
            cartMusicPlayer.current.pause()
        }, 2000)

        message.success("Product added to cart")
    }
  return (
    <>
    <div className='container mx-auto'>
            <Heading>
            <h1>The <span className='text-orange-500'>{params.area}</span> of Meals</h1>
            </Heading>

            <audio className='hidden' src={cartSound} controls ref={cartMusicPlayer}></audio>

            {/* Our meals */}
        <Spin spinning={loadingArea}>
            <div className='row py-12'>
                {
                    area.map(item => (
                        <div className='item relative' >

                                <Link to={`/meal/${item.idMeal}`}key={item.idMeal}>
                                    <img className='rounded-md' src={item.strMealThumb}/>
                                    <h1 className='w-full truncate'>{item.strMeal}</h1>
                                </Link>
                                <button onClick={() => addingMealToBasket(item)} className={`absolute p-4 bg-orange-500 text-white text-3xl top-4 right-4 rounded-md shadow-md transition duration-200 hover:bg-orange-600 active:opacity-75 transform active:scale-95 outline-none`} disabled = {cartMeals.find(x => x.idMeal === item.idMeal)}>
                                {
                                    cartMeals.findIndex(x => x.idMeal === item.idMeal) === -1 ? (
                                        <i className='bx bx-cart'></i> ) : (<i className='bx bx-check'></i>
                                    )
                                }
                                </button>
                            </div>
                    ))
                }
            </div>
            <Link to={"/cart"} className={`w-[100px] h-[70px] rounded-md shadow-md bg-orange-500 flex gap-4 items-center justify-center fixed bottom-[100px] right-[5%] px-4 text-4xl text-white`} >
            <i className='bx bx-cart flex'></i>
                ({ cartMeals.length })
            </Link>
        </Spin>
        </div>
    </>
    
  )
}

export default FilterArea