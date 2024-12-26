import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteItemFromCartAsync,
  increment,
  incrementAsync,
  selectCount,
  selectItems,
  updateItemAsync,
} from "./cartSlice";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { AiOutlineDelete } from "react-icons/ai";
import { Link, Navigate } from "react-router-dom";
import { selectAllProducts } from "../product/productSlice";


export default function Cart() {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const product = useSelector(selectAllProducts);

  const items = useSelector(selectItems);

  const totalAmount = Math.round(
    items.reduce((amount, item) => item.price * item.quantity + amount, 0)
  );

  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const handleQuantity = (e, item) => {
    dispatch(updateItemAsync({ ...item, quantity: +e.target.value }));
  };

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  const discountedPrice = Math.round(
    items.price * (1 - items.discountPercentage / 100)
  );

  return (
    <>
      {!items.length ? (
        <div className="mx-auto bg-white max-w-7xl md:px-8">
          <div className="flex flex-col items-center justify-center text-center ">
            <h1 className="text-5xl tracking-wide leading-relaxed mb-4 mt-6">
              Your cart is empty
            </h1>
            <Link to="/">
              <button className="mb-12 bg-black text-white py-3 px-7 text-lg">
                Continue shopping
              </button>
            </Link>
            <h1 className="tracking-wide font-medium text-3xl mb-3">
              Have an account?
            </h1>
            <p>
              <Link to="/login" className="font-bold ">
                Log in
              </Link>{" "}
              to check out faster
            </p>
          </div>
        </div>
      ) : (
        <div>
          {" "}
          <div className=" border-gray-200 px-0 mt-4">
            <div className="flex flex-row justify-between items-baseline mb-8 tracking-wide">
              <h1 className="text-3xl sm:text-4xl font-medium  text-gray-900">
                Your cart
              </h1>

              <Link to="/">
                <h3 className="underline underline-offset-4 text-xs sm:text-base text-gray-800">
                  or Continue shopping
                </h3>
              </Link>
            </div>

            <div className="flex flex-row justify-between items-center uppercase text-xs text-gray-700 pb-2 tracking-wider border-b border-gray-400 mb-2">
              <p>product</p>
              <p className="hidden md:block ml-5">Quantity</p>
              <p>total</p>
            </div>
            {items.map((item, id) => (
              <div key={item.id}>
              <table className="w-full text-sm table-fixed">
                <tbody>
                  <tr>
                    <td className="font-bold h-20 w-20">
                      {" "}
                      <div className="max-w-full flex align-top justify-start items-baseline top-0">
                        <Link to={`/product-detail/${item.id}`}>
                        <img
                          alt={item.thumbnail}
                          src={item.images[0]}
                          className="h-full w-full object-cover object-center"
                        /></Link>
                      </div>
                    </td>
                    <td className="px-2 py-6 break-words flex-wrap">
                      <p className="text-xs text-gray-500 pb-0.5">
                        {item.brand}
                      </p>
                      <h3 className="font-semibold text-base pb-1">
                        {item.title}
                      </h3>
                      <div className=" text-gray-500 mr-6 md:hidden flex items-center">
                          <label
                            htmlFor="quantity"
                            className="inline mr-3 text-sm font-medium leading-6 text-gray-900"
                          >
                            Qty
                          </label>
                          <select
                            onChange={(e) => handleQuantity(e, item)}
                            value={item.quantity}
                            className="text-xs"
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                          </select>
                          <button
                            onClick={(e) => handleRemove(e, item.id)}
                            type="button"
                            className="font-medium text-black hover:text-indigo-500"
                          >
                            <AiOutlineDelete className="text-xl text-gray-700 ml-4 " />
                          </button>
                        </div>
                    </td>
                    <td className="hidden md:block items-center mt-5 ml-5">
                      <div className="hidden md:flex items-center">
                      <label
                        htmlFor="quantity"
                        className="inline mr-3 text-sm font-medium leading-6 text-gray-900"
                      >
                        Qty
                      </label>
                      <select
                        onChange={(e) => handleQuantity(e, item)}
                        value={item.quantity}
                        className="text-xs"
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                      <button
                        onClick={(e) => handleRemove(e, item.id)}
                        type="button"
                        className="font-medium text-black hover:text-indigo-500"
                      >
                        <AiOutlineDelete className="text-xl text-gray-700 ml-4 " />
                      </button></div>
                    </td>
                    <td className="items-center w-1/5">
                      <p className="tracking-wider text-sm sm:text-lg float-right flex flex-col sm:flex-row">
                        <span className="mr-2">Rs. </span>
                        {Math.round(
                          item.price *
                            (1 - item.discountPercentage / 100) *
                            item.quantity
                        )}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table></div>
            ))}
          </div>
          <div className="mt-2 border-t border-b border-gray-400">
            <div className="flex text-sm text-gray-600 mb-1.5 mt-2 justify-between">
              <p className="mr-4">Total items in cart :</p>
              <p>{totalItems} items</p>
            </div>
            <div className="flex text-sm text-gray-600 justify-between mb-1.5">
              <p className="mr-2">Shipping :</p>
              <p className="text-sm text-gray-600  justify-between">
                <span className="underline underline-offset-2">Shipping</span>{" "}
                and taxes calculated at checkout.
              </p>
            </div>
            <div className="flex text-gray-700 justify-between items-baseline mb-1.5">
              <p className="text-2xl font-semibold mr-2">Total</p>
              <p className="tracking-wider text-2xl font-semibold">
                <span className="text-sm text-gray-600 mr-1">INR</span> ₹
                {totalAmount}.00
              </p>
            </div>
          </div>
          <div className="mt-4 flex justify-center">
              <Link to="/checkout">
                <button class="bg-black text-white text-base py-3 px-32 transition-all duration-500 relative group hover:pr-6 text-center">
                  <span class="relative inline-block transition-all duration-500 group-hover:pr-32">
                    Checkout
                    <span class="absolute top-0 right-0 opacity-0 group-hover:opacity-100 group-hover:right-0 transition-all duration-500">
                      &raquo;
                    </span>
                  </span>
                </button>
                </Link>
              </div>

        </div>
      )}
    </>
  );
}
