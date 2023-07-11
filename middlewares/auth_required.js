/***
 * @todo Redirect the user to login page if token is not present.
 */
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { useCookies } from "react-cookie";


export default function AuthRequired({ children })  {
  const router = useRouter();

  // Function to check if the user is authenticated via cookies
  const isAuthenticated = () => {
    const [cookies] = useCookies(["token"]);
    return !!cookies.token; // Return true if the token is present, otherwise return false
  };

  const authenticated = isAuthenticated();

  useEffect(() => {
    if (!authenticated) {
      router.push('/login');
    }
  }, [router, authenticated]);

  if (!authenticated) {
    return null;
  }

  return children;
};


