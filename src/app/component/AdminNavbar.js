// "use client";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// import {
//     Disclosure,
//     DisclosureButton,
//     DisclosurePanel,
//     Menu,
//     MenuButton,
//     MenuItem,
//     MenuItems,
// } from "@headlessui/react";
// import {
//     Bars3Icon,
//     XMarkIcon,
//     MoonIcon,
//     SunIcon,
// } from "@heroicons/react/24/outline";

// const navigation = [
//     { name: "Home", href: "/admin/home", current: true },
//     { name: "TotalUser", href: "/admin/alluser", current: false },
//     { name: "TotalComment", href: "/admin/allcomment", current: false },
//     { name: "TotalArticle", href: "/admin/allarticle.js", current: false },
//     { name: "Dashboard", href: "/admin/adminDashboard", current: false },
// ];

// function classNames(...classes) {
//     return classes.filter(Boolean).join(" ");
// }

// export default function AdminNavbar() {
//     const [userImage, setUserImage] = useState("/avter.png");
//     const [userName, setUserName] = useState("");
//     const [theme, setTheme] = useState("light");
//     const [hasMounted, setHasMounted] = useState(false);

//     useEffect(() => {
//         const img = localStorage.getItem("Image");
//         const name = localStorage.getItem("userName");
//         const storedTheme = localStorage.getItem("theme") || "light";

//         setUserImage(img && (img.startsWith("http") || img.startsWith("/")) ? img : "/avter.png");
//         setUserName(name || "");
//         setTheme(storedTheme);
//         setHasMounted(true);
//         document.documentElement.classList.toggle("dark", storedTheme === "dark");
//     }, []);

//     const toggleTheme = () => {
//         const newTheme = theme === "light" ? "dark" : "light";
//         setTheme(newTheme);
//         localStorage.setItem("theme", newTheme);
//         document.documentElement.classList.toggle("dark", newTheme === "dark");
//     };

//     const handleSignOut = () => {
//         if (!localStorage.getItem("adminToken")) {
//              localStorage.removeItem("adminUserName");
//             localStorage.removeItem("adminUserEmail");
//             localStorage.removeItem("adminImage");
//             localStorage.removeItem("adminToken");
//             localStorage.removeItem("adminRole");
//             window.location.href = "/admin/adminlogin";
//             // alert("Admin is not logged in");
//         } else {
//             // Clear only admin-related localStorage items
//             localStorage.removeItem("adminUserName");
//             localStorage.removeItem("adminUserEmail");
//             localStorage.removeItem("adminImage");
//             localStorage.removeItem("adminToken");
//             localStorage.removeItem("adminRole");
//             window.location.href = "/admin/adminlogin";
//         }
//     };

//     if (!hasMounted) return null;

//     return (
//         <Disclosure as="nav" className="bg-white dark:bg-gray-900 border-b shadow-sm sticky top-0 z-10">
//             { ({ open }) => (
//                 <>
//                     <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//                         <div className="flex h-16 items-center justify-between">
//                             <div className="flex items-center">
//                                 <DisclosureButton className="sm:hidden mr-2 p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none">
//                                     { open ? <XMarkIcon className="size-6" /> : <Bars3Icon className="size-6" /> }
//                                 </DisclosureButton>
//                                 <h3 className="text-2xl font-bold text-emerald-600">
//                                     Byte<span className="text-gray-800">Code</span>
//                                 </h3>
//                             </div>

//                             <div className="hidden sm:flex space-x-6">
//                                 { navigation.map((item) => (
//                                     <a
//                                         key={ item.name }
//                                         href={ item.href }
//                                         className={ classNames(
//                                             item.current
//                                                 ? "text-emerald-600 border-b-2 border-emerald-600"
//                                                 : "text-gray-700 hover:text-emerald-500",
//                                             "px-3 py-2 text-sm font-medium"
//                                         ) }
//                                     >
//                                         { item.name }
//                                     </a>
//                                 )) }
//                             </div>

//                             <div className="flex items-center space-x-4">


//                                 <Menu as="div" className="relative">
//                                     <MenuButton className="flex rounded-full text-sm focus:ring-2 focus:ring-white">
//                                         <Image
//                                             src={ userImage }
//                                             alt="User"
//                                             width={ 32 }
//                                             height={ 32 }
//                                             className="size-8 rounded-full object-cover"
//                                         />
//                                     </MenuButton>


//                                     <MenuItems className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black/5">
//                                         { !userName ? (
//                                             <>
//                                                 <MenuItem>
//                                                     { ({ active }) => (
//                                                         <a
//                                                             href="/admin/adminregitration"
//                                                             className={ classNames(
//                                                                 active ? "bg-gray-100 dark:bg-gray-700" : "",
//                                                                 "block px-4 py-2 text-sm text-gray-700 dark:text-gray-200"
//                                                             ) }
//                                                         >
//                                                             Sign Up
//                                                         </a>
//                                                     ) }
//                                                 </MenuItem>
//                                                 <MenuItem>
//                                                     { ({ active }) => (
//                                                         <a
//                                                             href="/admin/adminlogin"
//                                                             className={ classNames(
//                                                                 active ? "bg-gray-100 dark:bg-gray-700" : "",
//                                                                 "block px-4 py-2 text-sm text-gray-700 dark:text-gray-200"
//                                                             ) }
//                                                         >
//                                                             Sign In
//                                                         </a>
//                                                     ) }
//                                                 </MenuItem>
//                                             </>
//                                         ) : (
//                                             <>
//                                                 <MenuItem>
//                                                     { ({ active }) => (
//                                                         <a
//                                                             href="/user/profile"
//                                                             className={ classNames(
//                                                                 active ? "bg-gray-100 dark:bg-gray-700" : "",
//                                                                 "block px-4 py-2 text-sm text-gray-700 dark:text-gray-200"
//                                                             ) }
//                                                         >
//                                                             Your Profile
//                                                         </a>
//                                                     ) }
//                                                 </MenuItem>
//                                                 <MenuItem>
//                                                     { ({ active }) => (
//                                                         <button
//                                                             onClick={ handleSignOut }
//                                                             className={ classNames(
//                                                                 active ? "bg-gray-100 dark:bg-gray-700" : "",
//                                                                 "w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200"
//                                                             ) }
//                                                         >
//                                                             Sign Out
//                                                         </button>
//                                                     ) }
//                                                 </MenuItem>
//                                             </>
//                                         ) }
//                                     </MenuItems>
//                                 </Menu>
//                             </div>
//                         </div>
//                     </div>

//                     <DisclosurePanel className="sm:hidden bg-white dark:bg-gray-900 border-t px-4 pt-2 pb-3">
//                         { navigation.map((item) => (
//                             <DisclosureButton
//                                 key={ item.name }
//                                 as="a"
//                                 href={ item.href }
//                                 className={ classNames(
//                                     item.current
//                                         ? "text-emerald-600 border-l-4 border-emerald-500"
//                                         : "text-gray-700 hover:text-emerald-600",
//                                     "block pl-3 pr-4 py-2 text-base font-medium"
//                                 ) }
//                             >
//                                 { item.name }
//                             </DisclosureButton>
//                         )) }
//                     </DisclosurePanel>
//                 </>
//             ) }
//         </Disclosure>
//     );
// }



"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
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
  XMarkIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminNavbar() {
  const [userImage, setUserImage] = useState("/avter.png");
  const [userName, setUserName] = useState("");
  const [theme, setTheme] = useState("light");
  const [hasMounted, setHasMounted] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "Home", href: "/admin/home" },
    { name: "TotalUser", href: "/admin/alluser" },
    { name: "TotalComment", href: "/admin/allcomment" },
    { name: "TotalArticle", href: "/admin/allarticle.js" },
    { name: "Dashboard", href: "/admin/adminDashboard" },
  ];

  useEffect(() => {
    const img = localStorage.getItem("adminImage");
    const name = localStorage.getItem("adminUserName");
    const storedTheme = localStorage.getItem("theme") || "light";

    setUserImage(
      img && (img.startsWith("http") || img.startsWith("/")) ? img : "/avter.png"
    );
    setUserName(name || "");
    setTheme(storedTheme);
    setHasMounted(true);
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const handleSignOut = () => {
    localStorage.removeItem("adminUserName");
    localStorage.removeItem("adminUserEmail");
    localStorage.removeItem("adminImage");
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/adminlogin";
  };

  if (!hasMounted) return null;

  return (
    <Disclosure as="nav" className="bg-white dark:bg-gray-900 border-b shadow-sm sticky top-0 z-10">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Left Side */}
              <div className="flex items-center">
                <DisclosureButton className="sm:hidden mr-2 p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none">
                  {open ? <XMarkIcon className="size-6" /> : <Bars3Icon className="size-6" />}
                </DisclosureButton>
                <h3 className="text-2xl font-bold text-emerald-600">
                  Byte<span className="text-gray-800">Code</span>
                </h3>
              </div>

              {/* Center Nav Links */}
              <div className="hidden sm:flex space-x-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      pathname === item.href
                        ? "text-emerald-600 border-b-2 border-emerald-600"
                        : "text-gray-700 hover:text-emerald-500",
                      "px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              {/* Right Side */}
              <div className="flex items-center space-x-4">
                {/* <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full text-gray-700 hover:text-emerald-500"
                >
                  {theme === "light" ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
                </button> */}

                <Menu as="div" className="relative">
                  <MenuButton className="flex rounded-full text-sm focus:ring-2 focus:ring-white">
                    <Image
                      src={userImage}
                      alt="User"
                      width={32}
                      height={32}
                      className="size-8 rounded-full object-cover"
                    />
                  </MenuButton>

                  <MenuItems className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black/5">
                    {!userName ? (
                      <>
                        <MenuItem>
                          {({ active }) => (
                            <a
                              href="/admin/adminregitration"
                              className={classNames(
                                active ? "bg-gray-100 dark:bg-gray-700" : "",
                                "block px-4 py-2 text-sm text-gray-700 dark:text-gray-200"
                              )}
                            >
                              Sign Up
                            </a>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ active }) => (
                            <a
                              href="/admin/adminlogin"
                              className={classNames(
                                active ? "bg-gray-100 dark:bg-gray-700" : "",
                                "block px-4 py-2 text-sm text-gray-700 dark:text-gray-200"
                              )}
                            >
                              Sign In
                            </a>
                          )}
                        </MenuItem>
                      </>
                    ) : (
                      <>
                        <MenuItem>
                          {({ active }) => (
                            <a
                              href="/admin/profile"
                              className={classNames(
                                active ? "bg-gray-100 dark:bg-gray-700" : "",
                                "block px-4 py-2 text-sm text-gray-700 dark:text-gray-200"
                              )}
                            >
                              Your Profile
                            </a>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ active }) => (
                            <button
                              onClick={handleSignOut}
                              className={classNames(
                                active ? "bg-gray-100 dark:bg-gray-700" : "",
                                "w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200"
                              )}
                            >
                              Sign Out
                            </button>
                          )}
                        </MenuItem>
                      </>
                    )}
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>

          {/* Mobile Nav */}
          <DisclosurePanel className="sm:hidden bg-white dark:bg-gray-900 border-t px-4 pt-2 pb-3">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                className={classNames(
                  pathname === item.href
                    ? "text-emerald-600 border-l-4 border-emerald-500"
                    : "text-gray-700 hover:text-emerald-600",
                  "block pl-3 pr-4 py-2 text-base font-medium"
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
