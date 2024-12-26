import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../../auth/authSlice";
import { MdModeEdit } from "react-icons/md";

export default function UserProfile() {
  const user = useSelector(selectLoggedInUser);

  return (
    <>
      <div className="flex flex-col">
        {/* Sidebar */}
        <div className="text-black p-4 lg:min-w-1/3 border-b  border-gray-300">
          <div className="flex flex-col items-center text-center h-full justify-center">
            <img
              className="w-28 h-28 rounded-full shadow-md"
              src="https://via.placeholder.com/150"
              alt="User Profile"
            />
            <h2 className="mt-3 text-2xl font-bold">
              {user.name ? user.name : "New User"}
            </h2>
            <p className="mt-1 text-md tracking-wider">{user.email}</p>
          </div>
        </div>

        {/* Main Content */}

        <div className="">
          <h1 className="text-4xl mb-4 mt-4 tracking-wide">Account Details</h1>
          <table className="w-full table-fixed break-words">
            <tbody>
              <tr>
                <td className="break-words flex justify-between flex-wrap">
                  <h1 className="text-base">Name :</h1>
                  <h1 className="text-base">
                    {user.name ? user.name : "New User"}
                  </h1>
                </td>
              </tr>
              <tr>
                <td className="break-words flex justify-between flex-wrap">
                  <h1 className="text-base">Email Address :</h1>
                  <h1 className="text-base">{user.email}</h1>
                </td>
              </tr>
            </tbody>
          </table>

          <h1 className="text-4xl mb-4 mt-8 tracking-wide ">Your Address </h1>

          {user.addresses.map((address) => (
            <div className="flex items-center">
              <div className="flex mb-2 justify-between  p-2  border border-gray-600 w-full rounded-md">
                <div className="flex min-w-0  items-center">
                  <div className="min-w-0 flex-auto ">
                    <p className="text-sm font-semibold leading-6 tracking-wider">
                      {address.name}
                    </p>
                    <p className="truncate text-sm leading-6">
                      {address.street}, {address.city} , {address.state} ,{" "}
                      {address.pinCode}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex sm:flex-col sm:items-end justify-center">
                  <p className="text-sm  leading-6 ">{address.phone}</p>
                  <p className="text-sm leading-6 ">{address.email}</p>
                </div>
              </div>
              <div className="items-center ml-4">
             
                <MdModeEdit />
          
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
