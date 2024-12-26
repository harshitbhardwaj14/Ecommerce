import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { LuMenu } from "react-icons/lu";
import { CiMenuBurger } from "react-icons/ci";
import { useSelector } from "react-redux";
import { selectItems } from "../cart/cartSlice";
import { RiShoppingCartLine } from "react-icons/ri";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
  { name: "Reports", href: "#", current: false },
];
const userNavigation = [
  { name: "My Profile", link: "/profile" },
  { name: "My Orders", link: "/orders" },
  { name: "Sign out", link: "/login" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar({ children }) {
  const items = useSelector(selectItems);
  return (
    <>
      <div className="text-center p-2 bg-black text-white text-sm">
        <p>Free Shipping Across India</p>
      </div>

      <div className="min-h-full bg-white">
        <Disclosure as="nav" className="border-b-2 border-b-gray-200">
          <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 flex h-24 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link to="/">
                  <div className="text-3xl font-medium tracking-wider hover:-translate-y-1 transition-all">
                    OverSole
                  </div>
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="ml-8 flex items-baseline space-x-4 cursor-pointer">
                  <div>|</div>
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? "page" : undefined}
                      className={classNames(
                        item.current
                          ? "text-gray-800 underline underline-offset-4"
                          : "text-gray-600 hover:underline underline-offset-4",
                        "px-1.5 py-2 text-base"
                      )}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-x-6">
              <Link to="/cart">
                <button className="">
                  <RiShoppingCartLine className="h-7 w-7 hover:-translate-y-1.5 transition-all" />
                </button>
                {items.length > 0 && (
                  <span class="inline-flex text-center rounded-full bg-black text-xs font-medium text-white -mb-2 -ml-3 px-1.5 py-0 relative">
                    {items.length}
                  </span>
                )}
              </Link>

              {/* Profile dropdown */}
              <Menu as="div" className="relative hidden md:block">
                <div>
                  <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src={user.imageUrl}
                      className="h-8 w-8 rounded-full"
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right  bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  {userNavigation.map((item) => (
                    <Menu.Item key={item.name}>
                      {({ active }) => (
                        <Link
                          to={item.link}
                          className={classNames(
                            active ? "bg-gray-200" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          {item.name}
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </MenuItems>
              </Menu>

              <div className="md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md  text-black ">
                  <CiMenuBurger className="block h-6 w-6" aria-hidden="true" />
                </Disclosure.Button>
              </div>
            </div>
          </header>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 ">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-black text-white"
                      : "text-gray-900 hover:underline underline-offset-4",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="space-y-1 px-6 pb-3 pt-2 sm:px-3 border-t ">
              <div className="flex items-center gap-x-4 mb-2">
                <img
                  alt=""
                  src={user.imageUrl}
                  className="h-8 w-8 rounded-full"
                />
                <div className="flex items-start flex-col">
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                </div>
              </div>
              <div className="space-x-12 text-center space-y-4 pb-2">
              {userNavigation.map((item) => (
                <Disclosure.Button key={item.name}>
                  {({ active }) => (
                    <Link
                      to={item.link}
                      className={classNames(
                        active
                          ? ""
                          : "",
                        "text-base font-medium border px-4 py-2 rounded-md hover:bg-gray-900 hover:text-white transition-all border-gray-300"
                      )}
                    >
                      {item.name}
                    </Link>
                  )}
                </Disclosure.Button>
              ))}</div>
            </div>
          </DisclosurePanel>
        </Disclosure>

        <main>
          <div className="mx-auto max-w-7xl px-2 py-6 sm:px-6 lg:px-12">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}

export default Navbar;
