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

const ProductDetail = () => {
  const [mainImage, setMainImage] = useState("/path/to/main/image.jpg");

  const user = useSelector(selectLoggedInUser);

  const items = useSelector(selectItems);

  const totalAmount = Math.round(
    items.reduce((amount, item) => item.price * item.quantity + amount, 0)
  );

  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const handleImageClick = (imagePath) => {
    setMainImage(imagePath);
  };

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

  const [open, setopen] = useState(false);

  return (
    <>
 <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Sidebar */}
      <aside className=" bg-black text-white p-6 w-full">
        <div className="flex flex-col items-center text-center">
          <img
            className="w-28 h-28 rounded-full border-4 border-white"
            src="https://via.placeholder.com/150"
            alt="User Profile"
          />
          <h2 className="mt-6 text-xl font-semibold ">John Doe</h2>
          <p className="text-gray-400">johndoe@example.com</p>
        </div>
      
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 ">
        <h1 className="text-4xl font-bold mb-8 text-center">Account Details</h1>
        <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
        
        </div>
      </main>
    </div>
    
    </>
  );
};

export default ProductDetail;
