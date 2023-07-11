/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useAuth } from "../context/auth";
import { useState, useEffect, useRef } from "react";
/**
 *
 * @todo Condtionally render login/register and Profile name in NavBar
 */


export default function Nav() {
	const { logout, profileName, avatarImage } = useAuth();
	const [isDropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useRef(null);
  
	const toggleDropdown = () => {
	  setDropdownOpen(!isDropdownOpen);
	};
  
	const handleClickOutside = (event) => {
	  if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
		setDropdownOpen(false);
	  }
	};
  
	useEffect(() => {
	  document.addEventListener("click", handleClickOutside);
	  return () => {
		document.removeEventListener("click", handleClickOutside);
	  };
	}, []);
  
	return (
	  <nav className="bg-blue-600">
		<ul className="flex items-center justify-between px-5 py-3">
		  <ul className="flex items-center space-x-4">
			<li>
			  <Link href="/" passHref={true}>
				<a className="text-white font-bold text-xl">Todo</a>
			  </Link>
			</li>
		  </ul>
		  <ul className="flex">
			{!profileName && (
			  <>
				<li className="text-white mr-2">
				  <Link href="/login">
					<a className="text-white hover:text-gray-300">Login</a>
				  </Link>
				</li>
				<li className="text-white">
				  <Link href="/register">
					<a className="text-white hover:text-gray-300">Register</a>
				  </Link>
				</li>
			  </>
			)}
		  </ul>
		  {profileName && (
			<div
			  id="right-part-nav"
			  className="relative"
			  onClick={toggleDropdown}
			  ref={dropdownRef}
			>
			  <button className="flex items-center bg-gray-300 text-gray-700 font-semibold py-2 px-3 rounded">
				<img
				  className="h-8 w-8 rounded-full mr-2"
				  src={avatarImage}
				  alt="Profile"
				/>
				<span className="text-sm text-gray-700">{profileName}</span>
				<svg
				  className={`ml-1 fill-current h-4 w-4 ${
					isDropdownOpen ? "transform rotate-180" : ""
				  }`}
				  xmlns="http://www.w3.org/2000/svg"
				  viewBox="0 0 20 20"
				>
				  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
				</svg>
			  </button>
			  {isDropdownOpen && (
				<ul className="absolute right-0 mt-2 text-gray-700 bg-white border rounded shadow-lg">
				  <li>
					<a
					  className="block px-4 py-2 hover:bg-gray-100"
					  href="#"
					  onClick={logout}
					>
					  Logout
					</a>
				  </li>
				</ul>
			  )}
			</div>
		  )}
		</ul>
	  </nav>
	);
  }
