import { FaHome, FaPen, FaSearch } from "react-icons/fa";
import { GiQuill } from "react-icons/gi";
import { Link } from "react-router-dom";
export default function FooterCom() {
  return (
    <>
      <footer className="sticky bottom-0 z-50 inline-flex items-center justify-center w-full p-2 rounded md:hidden bg-light dark:bg-blog ">
        <Link
          className="flex justify-center mr-5 font-bold text-center textlg dark:text-white"
          to="/"
        >
          <FaHome className="text-lg dark:text-white" />
          Home
        </Link>
        <Link
          className="flex justify-center mr-5 font-bold text-center textlg dark:text-white"
          to="/search"
        >
          <FaSearch className="text-lg dark:text-white" />
          Browse
        </Link>
        <Link
          className="flex justify-center mr-5 font-bold text-center textlg dark:text-white"
          to="/create-post"
        >
          <FaPen className="text-lg dark:text-white" /> Write
        </Link>
      </footer>
      <footer className="hidden m-4 rounded-lg shadow sm:flex bg-light dark:bg-light">
        <div className="w-full max-w-screen-xl p-4 mx-auto md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <Link
              to="/"
              className="flex items-center mb-4 text-2xl font-bold sm:mb-0"
            >
              <GiQuill />
              Socia<span className="text-blog">lize</span>
            </Link>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <Link
                  to="/"
                  className="mr-4 hover:underline md:mr-6 dark:text-black"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="mr-4 hover:underline md:mr-6 dark:text-black "
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/search"
                  className="mr-4 hover:underline md:mr-6 dark:text-black "
                >
                  Search
                </Link>
              </li>
              <li>
                <Link
                  to="/create-post"
                  className="mr-4 hover:underline md:mr-6 dark:text-black "
                >
                  Write
                </Link>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-black">
            © 2024{" "}
            <Link to="/" className="hover:underline">
              Socialize™
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
}
