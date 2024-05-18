import { useEffect, useState } from "react";
import "./HeaderStyle.css";
import { Link, useNavigate } from "react-router-dom";
import { FaChartBar } from "react-icons/fa6";
import { CiBarcode } from "react-icons/ci";
import { useSelector } from 'react-redux';
import { FaSearch } from "react-icons/fa";

const Header2 = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!show) return;

    const links = [...document.querySelectorAll(".nav-link")];
    const navText = ["Home", "About", "Sign in", "Sign up"];
    const navImg = document.querySelector(".navbar-img");

    links.forEach((link, i) => {
      link.innerHTML = "";
      navText[i].split("").forEach((letter, j) => {
        const span = document.createElement("span");
        span.textContent = letter;
        span.style.cssText = `--i: .${j}s`;
        link.append(span);
      });
      link.addEventListener("mouseenter", () => {
        navImg.style.transform = `translate(${
          link.dataset.position
        }%,-50%) rotate(${link.dataset.position * 8}deg) scale(${link.dataset.position < 0 ? -1 : 1})`;
      });
    });
  }, [show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <div className={`total fixed top-0 w-full z-50 ${ show ? "h-screen" : "h-5" }`}>
      <div className={`shadow-lg w-full flex items-center py-3 justify-between px-10 header ${scrolled ? 'scrolled' : ''}`}>
        <div
          onClick={() => setShow(!show)}
          className={`z-10 cursor-pointer text-white p-3 rounded-full ${
            show ? "bg-gray-100 text-gray-900" : "bg-gray-700"
          }`}
        >
          {show ? <CiBarcode size={30} /> : <FaChartBar size={30} />}
        </div>
        <Link to="/">
          <img className="w-16 h-16 object-cover border-2 border-gray-500 rounded-full hover:scale-105 transition duration-300 cursor-pointer" src="/images/logo.png" alt="" />
        </Link>
        <form
          onSubmit={handleSubmit}
          className='bg-slate-100 p-3 rounded-lg flex items-center'
        >
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className='text-slate-600' />
          </button>
        </form>
        <div className="bg-gray-800 p-2 rounded-md">
          <Link to='/profile'>
            {currentUser ? (
              <img
                className='rounded-full h-12 w-12 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
            ) : (
              <li className='text-white  hover:underline list-none mt-3  text-lg font-bold'> Sign in</li>
            )}
          </Link>
        </div>
      </div>
      {show && (
        <div className="navbar">
          <video
            autoPlay
            muted
            loop
            src="/images/headerVideo3.mp4"
            className="nav-video"
          ></video>
          <img className="navbar-img" src="/images/dene1.png" alt="" />
          <div className="nav">
            {["Home", "About", "Sign in", "Sign up"].map(
              (text, index) => (
                <Link
                  data-position={
                    index === 0
                      ? 50
                      : index === 1
                      ? 25
                      : index === 2
                      ? 0
                      : index === 3
                      ? -25
                      : -50
                  }
                  key={index}
                  to={index === 0 ? "/" : `/${text.toLowerCase().split(" ").join("-")}`} 
                  className="nav-link"
                ></Link>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header2;
