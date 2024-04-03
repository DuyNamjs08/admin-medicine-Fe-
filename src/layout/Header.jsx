/* eslint-disable no-unused-vars */

import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchCmp from "../components/search/SearchCmp";
import BadgeCmp from "../components/badge/BadgeCmp";
import Avatar from "@mui/material/Avatar";
import ModelAccount from "./model/ModelAccount";
import { useOnOutsideClick } from "../hook/use-outside";

function Header() {
  const [data, setData] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [active, setActive] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setShowModel(false);
  }, [active]);
  const [isFixed, setIsFixed] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const { innerBorderRef } = useOnOutsideClick(() => setShowModel(false));
  return (
    <header>
      <nav className="bg-white border-[#0172bc] border-b-[1px]">
        <div
          className={`bg-[#1B3C73] py-4 px-3 text-white 
           fixed top-0 left-0 w-full z-50  
          }`}
        >
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl gap-2 sm:gap-0">
            <div className="md:w-auto md:mr-0"></div>
            <div className="flex items-center lg:order-2 flex-wrap justify-between w-full md:w-auto relative">
              <div className="flex gap-2 items-center">
                <SearchCmp />
                <BadgeCmp />
                <div
                  ref={innerBorderRef}
                  className="cursor-pointer"
                  onClick={() => setShowModel(true)}
                >
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  {showModel && (
                    <ModelAccount setActive={setActive} active={active} />
                  )}
                </div>

                {/* orther */}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
