import { useUser } from "@clerk/clerk-react";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./components/custom/Header";

function App() {
  const {user,isLoaded,isSignedIn} = useUser()

  if(!isSignedIn && isLoaded) {
    return <Navigate to={'/auth/sign-in'} />
  }
  return (
    <>
    <Header/>
    <Outlet/>
    </>
  );
}

export default App;
