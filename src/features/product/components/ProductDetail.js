import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProductsByIdAsync, selectProductById } from "../productSlice";
import { useParams } from "react-router-dom";
import { addToCartAsync } from "../../cart/cartSlice";
import { selectLoggedInUser } from "../../auth/authSlice";

const colors = [
  { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
  { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
  { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
];
const sizes = [
  { name: "XXS", inStock: false },
  { name: "XS", inStock: true },
  { name: "S", inStock: true },
  { name: "M", inStock: true },
  { name: "L", inStock: true },
  { name: "XL", inStock: true },
  { name: "2XL", inStock: true },
  { name: "3XL", inStock: true },
];
const highlight = [
  "Hand cut and sewn locally",
  "Dyed with our proprietary colors",
  "Pre-washed & pre-shrunk",
  "Ultra-soft 100% cotton",
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetail() {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[2]);
  const product = useSelector(selectProductById);
  const dispatch = useDispatch();
  const params = useParams();
  const user = useSelector(selectLoggedInUser);

  const handleCart = (e) => {
    e.preventDefault();
    const newItem = { ...product, quantity: 1, user: user.id };
    delete newItem["id"];
    dispatch(addToCartAsync(newItem));
  };

  useEffect(() => {
    dispatch(fetchAllProductsByIdAsync(params.id));
  }, [dispatch, params.id]);

  return (
    <div className="bg-white">
      {product && (
        <div className="flex flex-col md:flex-row lg:flex-row lg:space-x-8  justify-center sm:space-x-2">
          {/* Image Gallery */}
          <div className="lg:w-3/5 md:w-1/2 sm:w-full sm:h-full ">
            <div className="lg:grid lg:gird-cols-1">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="md:grid lg:gird lg:grid-cols-2 w-full h-full gap-2 md:grid-cols-1 sm:grid-cols-1 hidden">
              <img
                src={product.images[1]}
                alt={product.title}
                className="w-full h-full object-cover cursor-pointer "
              />
              <img
                src={product.images[2]}
                alt={product.title}
                className="w-full h-full object-cover cursor-pointer "
              />
              <img
                src={product.images[2]}
                alt="Thumbnai"
                className="w-full h-full object-cover cursor-pointer"
              />
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover cursor-pointer "
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:w-2/5 md:w-2/5">
            <p className="">{product.brand}</p>

            <h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium md:leading-tight lg:leading-tight 
              tracking-normal"
            >
              {product.title}
            </h1>

            <div className="flex flex-row items-baseline space-x-2 mt-2">
              <p className=" text-gray-600  line-through text-lg tracking-wider">
                Rs. {product.price}
              </p>
              <p className="text-xl text-gray-800 pl-2 pr-2 tracking-wider">
                Rs.{" "}
                {Math.round(
                  product.price * (1 - product.discountPercentage / 100)
                )}
                .00
              </p>
              <p className="pl-2 pr-2 bg-blue-300 rounded-xl text-sm">Sale</p>
            </div> 

            <p className="mb-3 text-xs mt-1 text-gray-600 leading-tight tracking-wider">
              <span className="underline mr-1">Shipping</span>Calculated at
              Checkout.
            </p>

            <p className="text-sm mb-2 text-gray-600">Size</p>
            <div className="flex space-x-2 mb-5">
              {["11", "12", "13"].map((size) => (
                <button
                  key={size}
                  className="border border-gray-700 px-3 py-2 rounded-full"
                >
                  {size}
                </button>
              ))}
            </div>

            <div className="flex flex-col md:flex-col lg:flex-col pb-5 pt-2 ">
              <button
                onClick={handleCart}
                type="submit"
                className="bg-black text-white px-6   py-2.5 mb-2 h-12 max-w-sm md:w-full"
              >
                Add to cart
              </button>
              <button className="border border-black text-black px-6 py-2.5 max-w-sm md:w-full hover:ring-1 hover:ring-black hover:ring-inset transition-all">
                Buy it now
              </button>
            </div>

            <p className="mb-4 leading-relaxed text-gray-700 tracking-wider text-pretty">
              {product.description}
            </p>

            <h2 className="text-xl mb-2 font-bold uppercase text-gray-700">
              Highlights
            </h2>
            <ul className="list-disc pl-5 mb-6 space-y-1 text-gray-700 tracking-wider">
              <li>Free Delivery Across India</li>
              <li>Cash on Delivery option available</li>
              <li>Handmade by Expert Artisans</li>
              <li>Extra Padding for Greater Comfort</li>
              <li>Stylish and Elegant Design</li>
              <li>High-Quality Vegan Leather</li>
            </ul>
            <div>
              <table className="table-auto w-full text-sm">
                <tbody>
                  <tr>
                    <td className="border px-4 py-2 font-bold">Material</td>
                    <td className="border px-4 py-2">
                      Vegan Leather / Synthetic Leather
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-bold">Toe Type</td>
                    <td className="border px-4 py-2">Round Toe</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-bold">Insole</td>
                    <td className="border px-4 py-2">Comfort Insole</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-bold">
                      Sole Material
                    </td>
                    <td className="border px-4 py-2">Alma Foot Sole</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-bold">Availability</td>
                    <td className="border px-4 py-2">
                      {product.availabilityStatus}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-bold">Warranty</td>
                    <td className="border px-4 py-2">
                      {product.warrantyInformation}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
