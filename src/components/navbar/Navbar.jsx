import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import { MdLanguage } from "react-icons/md";
import { MdArrowDropDown } from 'react-icons/md';
import newRequest from "../../utils/newRequest";


function Navbar() {
  const [active, setActive] = useState(false);//ye navbar ka css change honeka hook hai
  const [open, setOpen] = useState(false);// signin hai ya nhi uska hook hai
  const [dropdownOpen, setDropdownOpen] = useState(false); //ye explore more ka dropdown ka hook hai

  // this is to show searchbar in navbar after scrolling at fix heightlocation

  const [scrollPosition, setScrollPosition] = useState(0);
  const [showSearchBar, setShowSearchBar] = useState(false);
  


  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollPosition >= 370) { // Adjust the height here
      setShowSearchBar(true);
    } else {
      setShowSearchBar(false);
    }
  }, [scrollPosition]);


  const currentUser= JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  // const handleLogout = async () => {
  //   try {
  //     await newRequest.post("/auth/logout");
  //     localStorage.setItem("currentUser", null);
  //     navigate("/");
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  const handleLogout = async () => {
    try {
      console.log("Logging out...");
      await newRequest.post("/auth/logout");
      console.log("Logout successful.");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
  }
  };
  

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="links">
          <span>Freelanza Business  <MdArrowDropDown /></span>

           <div className="dropdown">
   
        <span>Explore more</span>
        <MdArrowDropDown />
     

      {dropdownOpen && (
        <div className="dropdown-content">
          <ul>
            {/* Add your dropdown items here */}
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </div>
      )}
    </div>
    <span>Find Job <MdArrowDropDown /></span>
  
          <nav>
            {showSearchBar && (
              <div className="search-bar">
                <input className="searching" type="search" placeholder="Search" />
              </div>
            )}
          </nav>
        </div>
        <div className="logo">
        <Link className="link" to="/">
            <span className="text">Freelanza</span>
          </Link>

  <span className="dot">.</span>
</div>

        <div className="links">
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MdLanguage />
            English
          </span>
          <span>Hire FreeLancer</span>
        
          {!currentUser ?.isSeller && <span>Become a Seller</span>}
          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img
                src={currentUser.img || "/img/noavtar.png"}
                alt=""
              />
              <span>{currentUser?.username}</span>
              {open && <div className="options">
                {currentUser.isSeller && (
                  <>
                    <Link className="link" to="/mygigs">
                      Gigs
                    </Link>
                    <Link className="link" to="/add">
                      Add New Gig
                    </Link>
                  </>
                )}
                <Link className="link" to="/orders">
                  Orders
                </Link>
                <Link className="link" to="/messages">
                  Messages
                </Link>
                <Link className="link" onClick={handleLogout}>
                  Logout
                </Link>
              </div>}
            </div>
          ) : (
            <>
             <Link className="link" to="/Login"> <span>Sign in</span></Link>
              <Link className="link" to="/register">
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link menuLink" to="/">
              Graphics & Design
            </Link>
            <Link className="link menuLink" to="/">
              Video & Animation
            </Link>
            <Link className="link menuLink" to="/">
              Writing & Translation
            </Link>
            <Link className="link menuLink" to="/">
              AI Services
            </Link>
            <Link className="link menuLink" to="/">
              Digital Marketing
            </Link>
            <Link className="link menuLink" to="/">
              Music & Audio
            </Link>
            <Link className="link menuLink" to="/">
              Programming & Tech
            </Link>
            <Link className="link menuLink" to="/">
              Business
            </Link>
            <Link className="link menuLink" to="/">
              Lifestyle
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

export default Navbar;
