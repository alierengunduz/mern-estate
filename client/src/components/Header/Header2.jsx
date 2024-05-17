import { useEffect, useState } from "react";
import "./HeaderStyle.css";
import { Link } from "react-router-dom";
import { FaChartBar } from "react-icons/fa6";
import { CiBarcode } from "react-icons/ci";

const Header2 = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!show) return;

    const links = [...document.querySelectorAll(".nav-link")];
    const navText = ["About", "Clients", "Portfolio", "Careers", "Fun"];
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

  return (
    <div className="total relative w-full z-50 mb-10">
      <div
        onClick={() => setShow(!show)}
        className={`absolute top-5 right-5 z-10 cursor-pointer text-white  p-3 rounded-full ${
          show ? "bg-gray-800" : "bg-gray-700"
        }`}
      >
        {show ? <CiBarcode size={30} /> : <FaChartBar size={30} />}
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
          <div className="nav ">
            {["About", "Clients", "Portfolio", "Careers", "Fun"].map(
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
                  to="#"
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
