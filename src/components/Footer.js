import React from "react";
export default function Footer () {
  return (
    <footer className="bg-gray-700 text-white py-2 mt-5">
        <div className="container mx-auto text-center">
            <p className="mb-4 flex justify-center space-x-4">© {new Date().getFullYear()} made with 🫶 by
            <div className="pl-1">
                <a href="https://github.com/xeniakadar" className="hover:text-gray-400">xeniakadar</a>
            </div>
            .</p>
        </div>
    </footer>
);
}
