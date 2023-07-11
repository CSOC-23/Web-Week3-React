/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import 'bootstrap/dist/css/bootstrap.css';
// import "bootstrap/dist/js/bootstrap.bundle.min";
import $ from 'jquery';
import Popper from 'popper.js';
import Link from "next/link";
import { useAuth } from "../context/auth";
/**
 *
 * @todo Condtionally render login/register and Profile name in NavBar
 */

export default function Nav(props) {
	const { logout, profileName, avatarImage } = useAuth();
	return (
		// <nav className="" style={{backgroundColor: '#DE483A'}}>
		// {/* // <nav className="bg-blue-600"> */}
		// 	<ul className="flex items-center justify-between p-5">
		// 		<ul className="flex items-center justify-between space-x-4">
		// 			<li>
		// 				<Link href="/" passHref={true}>
		// 					<a>
		// 						<h1 className="text-white font-bold text-xl">Todo</h1>
		// 					</a>
		// 				</Link>
		// 			</li>
		// 		</ul>
		// 		<ul className="flex">
		// 			<li className="text-white mr-2">
		// 				<Link href="/login">Login</Link>
		// 			</li>
		// 			<li className="text-white">
		// 				<Link href="/register">Register</Link>
		// 			</li>
		// 		</ul>
		// 		<div className="inline-block relative w-28">
		// 			<div className="group inline-block relative">
		// 				<button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
		// 					<img src='https://cdn-icons-png.flaticon.com/512/6915/6915597.png' style={{height: '2vh'}}/>
		// 					<span className="mr-1">{profileName}</span>
		// 					<svg
		// 						className="fill-current h-4 w-4"
		// 						xmlns="http://www.w3.org/2000/svg"
		// 						viewBox="0 0 20 20">
		// 						<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
		// 					</svg>
		// 				</button>
		// 				<ul className="absolute hidden text-gray-700 pt-1 group-hover:block">
		// 					<li className="">
		// 						<a
		// 							className="rounded-b bg-gray-200 hover:bg-red-400 py-2 px-4 block whitespace-no-wrap"
		// 							href="#"
		// 							onClick={logout}>
		// 							Logout
		// 						</a>
		// 					</li>
		// 				</ul>
		// 			</div>
		// 		</div>
		// 	</ul>
		// </nav>
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid">
				<a className="navbar-brand" href="#">Navbar</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<ul className="navbar-nav me-auto mb-2 mb-lg-0">
					<li className="nav-item">
					<a className="nav-link active" aria-current="page" href="#">Home</a>
					</li>
					<li className="nav-item">
					<a className="nav-link" href="#">Link</a>
					</li>
				</ul>
				<li className="nav-item dropdown" style={{right: '1vh', listStyle: 'none'}}>
					<a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
						Dropdown
					</a>
					<ul className="dropdown-menu">
						<li><a className="dropdown-item" href="#">Action</a></li>
						<li><a className="dropdown-item" href="#">Another action</a></li>
						<li><hr className="dropdown-divider"/></li>
						<li><a className="dropdown-item" href="#">Something else here</a></li>
					</ul>
					</li>
				</div>
			</div>
		</nav>
	);
}
