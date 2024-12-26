import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { selectLoggedInUser } from '../features/auth/authSlice'
import { resetCartAsync } from '../features/cart/cartSlice'
import { resetOrder } from '../features/order/orderSlice'

export default function OrderSuccessPage() {
  const params = useParams()
  const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser)

  useEffect(()=>{
    dispatch(resetCartAsync(user.id))
    dispatch(resetOrder())
  },[dispatch, user])
  return (
    <>
    {!params.id && <Navigate to="/" replace={true}></Navigate>}
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center w-full h-full">
        <p className=" font-extrabold tracking-wider text-2xl">Order Successfully Placed</p>
        <h1 className="mt-4 text-3xl  tracking-wide text-gray-900 sm:text-5xl uppercase">
          Order Number #{params?.id}
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600 tracking-wide">
        You can check your order in My Account  > My orders
        </p>
        <div className="mt-6 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="px-8 py-3 tracking-wide border border-black hover:ring-1 hover-ring-inset transition-all ring-black"
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  </>
  )
}
