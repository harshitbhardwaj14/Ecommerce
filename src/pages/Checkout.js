import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import {
  deleteItemFromCartAsync,
  increment,
  incrementAsync,
  selectCount,
  selectItems,
  updateItemAsync,
} from "../../src/features/cart/cartSlice";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  selectLoggedInUser,
  updateUserAsync,
} from "../features/auth/authSlice";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import {
  createOrderAsync,
  selectCurrentOrder,
} from "../features/order/orderSlice";
import Navbar from "../features/navbar/Navbar";

const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "$90.00",
    quantity: 1,
    thumbnail:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    price: "$32.00",
    quantity: 1,
    thumbnail:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
  // More products...
];

function Checkout() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const user = useSelector(selectLoggedInUser);
  const items = useSelector(selectItems);
  const currentOrder = useSelector(selectCurrentOrder);

  const totalAmount = Math.round(
    items.reduce((amount, item) => item.price * item.quantity + amount, 0)
  );

  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const handleQuantity = (e, item) => {
    dispatch(updateItemAsync({ ...item, quantity: +e.target.value }));
  };
  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };
  const discountedPrice = Math.round(
    items.price * (1 - items.discountPercentage / 100)
  );

  const handleAddress = (e) => {
    setSelectedAddress(user.addresses[e.target.value]);
  };
  const handlePayment = (e) => {
    setPaymentMethod(e.target.value);
  };
  const handleOrder = (e) => {
    if (selectedAddress && paymentMethod) {
      const order = {
        items,
        totalAmount,
        totalItems,
        user,
        paymentMethod,
        selectedAddress,
        status: "pending",
      };
      dispatch(createOrderAsync(order));
    } else {
      alert("Enter Address and Payment method");
    }
  };

  return (
    <>
      <Navbar>
        {!items.length && <Navigate to="/" replace={true}></Navigate>}
        {currentOrder && (
          <Navigate
            to={`/order-success/${currentOrder.id}`}
            replace={true}
          ></Navigate>
        )}
        <div className="md:px-32">
          <div
            className="flex  sm:flex md:flex lg:hidden items-center py-4 cursor-pointer select-none justify-between border-y shadow-sm border-gray-300"
            onClick={() => setOpen((prev) => !prev)}
          >
            <div className="inline-flex items-center">
              {!open ? (
                <>
                  <p className="mr-1">Show order summary</p>
                  <IoMdArrowDropdown className="text-2xl" />
                </>
              ) : (
                <>
                  <p className="mr-1">Hide order summary</p>
                  <IoMdArrowDropup className="text-2xl" />
                </>
              )}
            </div>

            <div className="font-bold text-xl flex">
              <p>
                <span className="mr-2 text-base">INR</span>₹{totalAmount}
              </p>
            </div>
          </div>
          {open && (
            <div className="block lg:hidden py-4">
              {" "}
              <CheckoutCart
                items={items}
                totalAmount={totalAmount}
                totalItems={totalItems}
                handleOrder={handleOrder}
              ></CheckoutCart>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-x-8 lg:grid-cols-5 py-4 lg:py-0 md:px-32 lg:px-0">
          <div className="lg:col-span-3">
            <form
              className="bg-white"
              noValidate
              onSubmit={handleSubmit((data) => {
                console.log(data);
                dispatch(
                  updateUserAsync({
                    ...user,
                    addresses: [...user.addresses, data],
                  })
                );
                reset();
              })}
            >
              <div className="space-y-6">
                <div className="pb-6 border-b">
                  <h1 className="text-2xl font-semibold text-gray-900 tracking-wide">
                    Contact
                  </h1>
                  <p className="text-sm leading-6 text-gray-600 tracking-wider">
                    Use a permanent address where you can receive mail.
                  </p>
                  <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6 mb-8">
                    <div className="sm:col-span-6">
                      <div className="mt-2">
                        <input
                          id="phone"
                          {...register("phone", {
                            required: "phone is required",
                          })}
                          type="tel"
                          placeholder="Phone"
                          className="block w-full border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register("email", {
                            required: "email is required",
                          })}
                          type="email"
                          placeholder="Email address"
                          className="block w-full border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 rounded-md"
                        />
                      </div>
                    </div>

                    <h1 className="text-2xl font-semibold text-gray-900 tracking-wide mt-6">
                      Delivery
                    </h1>

                    <div className="sm:col-span-6">
                      <div className="mt-2">
                        <input
                          id="name"
                          {...register("name", {
                            required: "name is required",
                          })}
                          type="text"
                          placeholder="Full name"
                          className="block w-full  border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <div className="mt-2">
                        <input
                          id="street"
                          {...register("street", {
                            required: "street is required",
                          })}
                          type="text"
                          placeholder="Street address"
                          className="block w-full border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <div className="mt-2">
                        <input
                          id="city"
                          {...register("city", {
                            required: "city is required",
                          })}
                          type="text"
                          placeholder="City"
                          autoComplete="address-level2"
                          className="block w-full border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <div className="mt-2">
                        <input
                          id="state"
                          {...register("state", {
                            required: "state is required",
                          })}
                          type="text"
                          placeholder="State / Province"
                          className="block w-full  border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <div className="mt-2">
                        <input
                          id="pinCode"
                          {...register("pinCode", {
                            required: "pinCode is required",
                          })}
                          type="text"
                          placeholder="ZIP / Postal code"
                          className="block w-full border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-x-2">
                    <button
                      type="submit"
                      className="bg-black w-full sm:w-3/12 py-2.5 text-base font-normal text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 border border-black focus-visible:outline-indigo-600 tracking-wider hover:bg-white hover:text-black transition"
                    >
                      Add Address
                    </button>
                  </div>{" "}
                </div>

                <div className="">
                  <h2 className="text-2xl font-semibold text-gray-900 tracking-wide">
                    Address
                  </h2>
                  <p className="text-sm leading-6 text-gray-600 tracking-wider">
                    Choose form existing Address :
                  </p>

                  {/* Address stacked list */}

                  <ul role="list" className="py-2 mt-2">
                    {user.addresses.map((address, index) => (
                      <li
                        key={index}
                        className="flex mb-2 justify-between gap-x-6 py-3 px-3 border-solid border rounded-sm bg-gray-200 shadow-sm"
                      >
                        <div className="flex min-w-0 gap-x-4 items-center ">
                          <input
                            onChange={handleAddress}
                            name="address"
                            type="radio"
                            value={index}
                            className="h-4 w-4  border-gray-200 text-indigo-600 focus:ring-indigo-600 "
                          />
                          <div className="min-w-0 flex-auto ">
                            <p className="text-sm font-semibold leading-6 text-gray-900 tracking-wider">
                              {address.name}
                            </p>
                            <p className="truncate text-sm leading-5 text-gray-500">
                              {address.street}, {address.city} , {address.state}{" "}
                              , {address.pinCode}
                            </p>
                          </div>
                        </div>
                        <div className="hidden sm:flex sm:flex-col sm:items-end justify-center">
                          <p className="text-sm  leading-6 text-gray-500">
                            {address.phone}
                          </p>
                          <p className="text-sm leading-6 text-gray-500">
                            {address.email}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 space-y-10">
                    <fieldset>
                      <legend className="text-2xl  font-semibold text-gray-900 tracking-wide">
                        Payment
                      </legend>
                      <p className="text-sm leading-6 text-gray-600 tracking-wider">
                        Choose one :
                      </p>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-x-3 border bg-gray-200 w-full py-3 rounded-sm px-2">
                          <input
                            id="cash"
                            name="payments"
                            type="radio"
                            onChange={handlePayment}
                            value="cash"
                            checked={paymentMethod === "cash"}
                            className="h-4 w-4 border-gray-200 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="cash"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Cash on Delivery (COD)
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3 border bg-gray-200 w-full py-3 px-2 rounded-sm">
                          <input
                            id="card"
                            name="payments"
                            type="radio"
                            onChange={handlePayment}
                            value="card"
                            checked={paymentMethod === "card"}
                            className="h-4 w-4 border-gray-200 text-indigo-600 focus:ring-indigo-600 "
                          />
                          <label
                            htmlFor="card"
                            className="block text-sm font-medium leading-6 text-gray-900 "
                          >
                            Card Payment
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3"></div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>

              <div className="flex lg:hidden justify-center mt-4">
                <button
                  onClick={handleOrder}
                  className="bg-black px-10 py-2.5 text-base font-normal text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 border border-black focus-visible:outline-indigo-600 tracking-wider hover:bg-white hover:text-black hover:transition w-full md:max-w-sm"
                >
                  Pay Now
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-2 hidden lg:block px-4">
            <CheckoutCart
              items={items}
              totalAmount={totalAmount}
              totalItems={totalItems}
              handleOrder={handleOrder}
            ></CheckoutCart>
            <div className="flex justify-center my-3">
              <button
                onClick={handleOrder}
                className="bg-black px-10 py-2.5 text-base font-normal text-white shadow-sm border border-black tracking-wider hover:bg-white hover:text-black hover:transition w-full"
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      </Navbar>
    </>
  );
}

export default Checkout;

function CheckoutCart({ items, totalItems, totalAmount, handleOrder }) {
  return (
    <>
      <div>
        {" "}
        <div className=" border-gray-200 px-0 py-0">
          <div className="flex flex-row justify-between items-baseline mb-8 tracking-wide">
            <h1 className="text-3xl sm:text-4xl font-medium  text-gray-900">
              Your cart
            </h1>

            <Link to="/">
              <h3 className="underline underline-offset-4 text-xs sm:text-base text-gray-800">
                Continue shopping
              </h3>
            </Link>
          </div>

          <div className="flex flex-row justify-between items-center uppercase text-xs text-gray-700 pb-2 tracking-wider border-b border-gray-400">
            <p>product</p>
            <p>total</p>
          </div>
          {items.map((item) => (
            <table className="w-full text-sm table-fixed" >
              <tbody>
                <tr>
                  <td className="font-bold h-20 w-20">
                    {" "}
                    <div className="max-w-full flex align-top justify-start items-baseline top-0">
                      <img
                        alt={item.thumbnail}
                        src={item.images[0]}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </td>
                  <td className="px-2 py-4 break-words flex-wrap">
                    <p className="text-xs text-gray-500 pb-0.5">{item.brand}</p>
                    <h3 className="font-semibold text-sm pb-0.5">
                      <a href={item.href}>{item.title}</a>
                    </h3>
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </td>
                  <td className="items-center w-1/5">
                    <p className="tracking-wider text-sm sm:text-base float-right flex flex-col sm:flex-row">
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
            </table>
          ))}
        </div>
        <div className="border-t border-b border-gray-400 py-2 px-1">
          <div className="flex text-sm text-gray-600 mb-1 justify-between">
            <p className="mr-4">Total items in cart :</p>
            <p>{totalItems} items</p>
          </div>
          <div className="flex text-sm text-gray-600 justify-between">
            <p className="mr-2">Shipping :</p>
            <p className="text-sm text-gray-600  justify-between">
              <span className="underline underline-offset-2">Shipping</span>{" "}
              calculated at checkout.
            </p>
          </div>
          <div className="flex text-lg font-medium text-gray-700 justify-between items-baseline ">
            <p className="text-xl font-bold mr-2">Total</p>
            <p className="tracking-wider text-2xl font-bold">
              <span className="text-sm text-gray-600 mr-1">INR</span> ₹
              {totalAmount}.00
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
