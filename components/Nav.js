/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useAuth } from "../context/auth";
import { useRouter } from 'next/router';
/**
 *
 * @todo Condtionally render login/register and Profile name in NavBar
 */

export default function Nav() {
	const router = useRouter();
	const { logout, profileName, avatarImage } = useAuth();

	const handleRegisterClick = () => {
		router.push('/register');
	  };

	  const handleLoginClick = () => {
		router.push('/login');
	  };

	return (
		<nav className="navbar">
			<ul className="flex items-center justify-between p-5">
				<ul className="flex items-center justify-between space-x-4">
					<li>
						<Link href="/" passHref={true}>
							<a>
								<h1 className="text-my-white font-bold text-5xl font-custom-2">Todo</h1>
							</a>
						</Link>
					</li>
				</ul>
				<ul className="flex">
					<li className="text-my-white mr-2 text-3xl">
					<button onClick={handleLoginClick}>Login</button>
					</li>
					<div className="w-0.5 bg-my-olive h-auto border rounded-full"></div>
					<li className="text-[#F6EDD9] text-3xl ml-2">
					<button onClick={handleRegisterClick}>Register</button>
					</li>
				</ul>
				<div className="inline-block relative w-28">
					<div className="group inline-block relative">
						<button className="text-my-white font-semibold py-2 px-4 rounded flex flex-col items-center">
							<img src={avatarImage} />
							<span className="text-base font-custom-1">{profileName}</span>
							<svg
								className="fill-current h-4 w-4"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20">
								<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
							</svg>
						</button>
						<ul className="absolute hidden text-gray-700 pt-1 group-hover:block">
							<li className="">
								<a
									className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
									href="#"
									onClick={logout}>
									Logout
								</a>
							</li>
						</ul>
					</div>
				</div>
			</ul>
		</nav>
	);
}
