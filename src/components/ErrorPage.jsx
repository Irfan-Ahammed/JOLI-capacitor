import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error); // Log error for debugging

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
    <h1 className="text-3xl font-bold text-red-600">Oops!</h1>
    <p className="text-gray-600">Sorry, an unexpected error occurred.</p>
    <p className="text-gray-500">
      <i>{ error}</i>
    </p>
  </div>
  );
};

export default ErrorPage;
