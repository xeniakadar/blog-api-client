import React from "react";
export default function Footer () {

  const userdetail = <a href="https://github.com/xeniakadar" className="hover:text-gray-400 pl-1">xeniakadar</a>;
  return (
    <footer className="bg-gray-700 text-white py-2 mt-5">
        <div className="container mx-auto text-center">
            <p className="mb-4 flex justify-center space-x-4 text-sm">© {new Date().getFullYear()} made with 🫶 by {userdetail}.</p>
        </div>
    </footer>
);
}
