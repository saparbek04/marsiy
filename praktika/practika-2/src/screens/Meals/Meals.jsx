import { message, Spin } from 'antd'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Heading from '../../components/Heading/Heading'
import { addToCart } from '../../store/reducers/cartSlice'
import { fetchedMeals, fetchingErrorMeals, fetchingMeals } from '../../store/reducers/mealSlice'
import cartSound from '../../assets/music/Iphone.mp3'
import { useRef } from 'react'

const Meals = () => {
    const { meals, loadingMeals } = useSelector(store => store.meal)
    const { cartMeals } = useSelector(store => store.cart)
    const params = useParams()
    const dispatch = useDispatch()
    const cartMusicPlayer = useRef(null)

    useEffect(() => {
        dispatch(fetchingMeals())
        axios
        .get(`https://themealdb.com/api/json/v1/1/filter.php?c=${params.categoryName}`)
        .then(res => {
                console.log(res.data.meals)
                dispatch(fetchedMeals(res.data.meals))
            })
            .catch(err => {
                dispatch(fetchingErrorMeals())
            })
    }, [params])




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
                <h1 className='text-4xl'><span className='text-orange-500'>{params.categoryName}</span> Category</h1>
            </Heading>

            <audio className='hidden' src={cartSound} controls ref={cartMusicPlayer}></audio>


            {/* Our meals */}
        <Spin spinning={loadingMeals}>
            <div className='row py-12'>
                {
                    meals.map(item => (
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

export default Meals


//<i class='bx bx-cart'></i>