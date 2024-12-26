import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../../auth/authSlice";
import {
  fetchLoggedInUserOrderAsync,
  selectLoggedInUserOrderAsync,
  selectUserOrders,
} from "../userSlice";
import { fetchItemsByUserId } from "../../cart/cartAPI";
import { Link } from "react-router-dom";

import { selectAllProducts } from "../../product/productSlice";

const UserOrders = () => {
  const order = [
    {
      id: "WU88191111",
      date: "Jul 6, 2021",
      amount: "$160.00",
      items: [
        {
          name: "Micro Backpack",
          price: "$70.00",
          description:
            "Are you a minimalist looking for a compact carry option? The Micro Backpack is the perfect size for your essential everyday carry items. Wear it like a backpack or carry it like a satchel for all-day use.",
          imageUrl: "https://example.com/micro-backpack.png", // replace with actual image URL
          deliveryDate: "July 12, 2021",
        },
        {
          name: "Nomad Shopping Tote",
          price: "$90.00",
          description:
            "This durable shopping tote is perfect for the world traveler. Its yellow canvas construction is water, fray, tear-resistant. The matching handle, backpack straps, and shoulder loops provide multiple carry options for a day out on your next adventure.",
          imageUrl: "https://example.com/nomad-shopping-tote.png", // replace with actual image URL
          deliveryDate: "July 12, 2021",
        },
      ],
    },
  ];

  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const orders = useSelector(selectUserOrders);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrderAsync(user.id));
  });
  const products = useSelector(selectAllProducts);

  return (
    <div>
      <h1 className="text-4xl mb-2 font-semibold">Orders</h1>
      <p className="text-gray-600 mb-10">
        Check the status of recent orders, manage returns, and discover similar
        products.
      </p>
      {orders.map((order) => (
        <>
          <div
            key={order.id}
            className="bg-white border border-gray-200 rounded-lg p-4 mb-8 shadow-md"
          >
            <h1 className="text-2xl font-bold tracking-wide">
              Order #{order.id}
            </h1>

            {order.items.map((item, index) => (
              <div className="py-2" key={item.id}>
                {" "}
                <div className="flex items-center border-t py-2.5 space-x-8">
                  <img
                    className="w-24 h-24 object-cover rounded-md"
                    src={item.images[0]}
                    alt={item.name}
                  />

                  <div className="flex-col  mb-0.5 text-sm ml-6">
                    <div className="font-semibold flex justify-between mb-1 flex-col">
                      <p>{item.title}</p>
                      <p>Rs. {item.price}</p>
                    </div>

                    <p>{item.description}</p>
                    <p className=" mt-1">Qty: {item.quantity}</p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm flex font-semibold">
                    <p className=" text-gray-500 mr-2">Status :</p>
                    <p className="text-red-500 uppercase">{order.status}</p>
                  </div>
                  <div className="flex justify-end space-x-4 font-semibold text-indigo-500 text-sm">
                    <Link to={`/product-detail/${item.id}`}>
                      <button className="hover:underline underline-offset-4">
                        View product
                      </button>
                    </Link>
                    <p>|</p>
                    <button className="hover:underline underline-offset-4">
                      Buy again
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="border-t pt-2 text-sm space-y-1">
              <div className="flex">
                <p className="pr-2">Name :</p>
                <p className="font-semibold">{order.selectedAddress.name}</p>
              </div>
              <div className="flex">
                {" "}
                <p className="pr-2">Contact Number :</p>
                <p className="font-semibold"> {order.selectedAddress.phone}</p>
              </div>
              <div className="flex">
                <p className="pr-2">Shipping Address :</p>
                <p className="font-semibold">
                  {order.selectedAddress.street}, {order.selectedAddress.city},{" "}
                  {order.selectedAddress.state}, {order.selectedAddress.pinCode}
                </p>
              </div>
              <div className="flex">
                <p className="pr-2">Payment Method : </p>
                <p className="font-semibold">{order.paymentMethod}</p>
              </div>
              <div className="flex text-lg font-bold">
                <p className="pr-2">Total payable amount :</p>
                <p className="tracking-wider">Rs. {order.totalAmount}</p>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default UserOrders;
