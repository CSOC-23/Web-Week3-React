/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useAuth } from "../context/auth";
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default function Nav(props) {
  const [bodyColor, setBodyColor] = useState('');

  const { logout, profileName, avatarImage, token } = useAuth();

  const handleColorChange = (color) => {
    document.body.style.backgroundColor = color;
    setBodyColor(color);
  };

  return (
    <nav className="Navbar">
      <ul className="flex items-center justify-between p-5">
        <ul className="flex items-center justify-between space-x-4"><li><Link href="/" passHref={true}>
              <a><h1 className="text-pink font-bold text-xl">Todo</h1></a></Link>
          </li>
        </ul>
        {!token && (
          <ul className="flex">
            <li className="text-pink mr-2">
              <Link href="/login">Login</Link>
            </li>
            <li className="text-pink">
              <Link href="/register">Register</Link>
            </li>
          </ul>
        )}
        <div className="d-flex">
          <div
            className="bg-primary rounded mx-2"
            onClick={() => handleColorChange('primary')}
            style={{ height: '30px', width: '30px', cursor: 'pointer' }}
          ></div>
          <div
            className="bg-danger rounded mx-2"
            onClick={() => handleColorChange('danger')}
            style={{ height: '30px', width: '30px', cursor: 'pointer' }}
          ></div>
          <div
            className="bg-success rounded mx-2"
            onClick={() => handleColorChange('success')}
            style={{ height: '30px', width: '30px', cursor: 'pointer' }}
          ></div>
          <div
            className="bg-warning rounded mx-2"
            onClick={() => handleColorChange('warning')}
            style={{ height: '30px', width: '30px', cursor: 'pointer' }}
          ></div>
        </div>

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
      </ul>
    </nav>
  );
}

Nav.propTypes = {
  title: PropTypes.string,
  aboutText: PropTypes.string,
};
