/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useAuth } from "../context/auth";
import { ToastContainer } from "react-toastify";
import Spinner from "./Spinner";
/**
 *
 * @todo Condtionally render login/register and Profile name in NavBar
 */

export default function Nav() {
	const { profileName, avatarImage, logout, token, isLoading } = useAuth();

	return (
		<nav className="bg-blue-600">
			<ToastContainer />
			<ul className="flex items-center justify-between py-3 px-12">
				<li className="ml-3">
					<Link href="/" passHref={true}>
						<a>
							<h1 className="text-white font-bold text-xl">Todo</h1>
						</a>
					</Link>
				</li>
				{/* //*Spinner loads if isLoading is true (from Context) */}
				{
					isLoading ? <Spinner/> : <div className="h-5"></div>
				}
				{/* //TODO: If token does no exist, render login/register; otherwise Profile name */}
				{
					!token ?
						<li>
							<ul className="flex">
								<li className="border border-white text-white px-6 py-2 rounded-2xl hover:text-blue-600 hover:bg-white transition-all duration-500 mx-4">
									<Link href="/login">Login</Link>
								</li>
								<li className="border border-white text-white px-6 py-2 rounded-2xl hover:text-blue-600 hover:bg-white transition-all duration-500 mx-4">
									<Link href="/register">Register</Link>
								</li>
							</ul>
						</li> :
						<li className="inline-block relative h-12">
							<div className="group inline-block relative ">
								<button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-xl inline-flex items-center hover:bg-gray-400 transition-all duration-500">
									<img src={avatarImage} className="mx-3" />
									<span className="mr-1">{profileName}</span>
									<svg
										className="fill-current h-4 w-4"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20">
										<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
									</svg>
								</button>
								<ul className="absolute hidden text-gray-700 pt-1 group-hover:block w-full text-center">
									<li className="">
										<span
											className="transition-all duration-500 rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap cursor-pointer"
											onClick={logout}>
											Logout
										</span>
									</li>
								</ul>
							</div>
						</li>
				}


			</ul>
		</nav>
	);
}
