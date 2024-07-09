"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const routes = [
    { path: "/", title: "Home" },
    { path: "/posts", title: "Posts" },
  ];
  return (
    <div className="w-full flex justify-center gap-5 bg-yellow-50 py-2 shadow-sm">
      {routes.map((route, index) => (
        <Link
          href={route.path}
          key={index}
          className={
            "text-xl font-bold text-black px-6 pt-2 pb-1 rounded-xl duration-300 " +
            (pathname === route.path ? "bg-yellow-300" : "hover:bg-yellow-100")
          }
        >
          {route.title}
        </Link>
      ))}
    </div>
  );
};

export default Header;
