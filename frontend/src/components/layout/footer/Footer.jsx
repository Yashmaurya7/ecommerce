import React from "react";
import { Link } from "react-router-dom";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import "./Footer.css";
import { SocialIcon } from "react-social-icons";
import footerLogo from "../../assets/footer-logo.png";

const footer = () => {
  // https://drive.google.com/file/d/1sj8pXoII0igc2S8FKkl6uypGSJkc09Bk/view?usp=sharing
  // const footerLogo = "https://drive.google.com/uc?export=view&id=1sj8pXoII0igc2S8FKkl6uypGSJkc09Bk"

  return (
    <div id="footer">
      <div className="our-company">
        <h3 className="foot-head">OUR COMPANY</h3>
        <ul className="foot-links">
          <Link to="/">
            <li>About Us</li>
          </Link>
          <Link to="/">
            <li>Career</li>
          </Link>
          <Link to="/">
            <li>Media</li>
          </Link>
          <Link to="/">
            <li>Blog</li>
          </Link>
          <Link to="/">
            <li>Customer Stories</li>
          </Link>
          <Link to="/">
            <li>Our Stores</li>
          </Link>
        </ul>
      </div>
      <div className="deliver-in">
        <h3 className="foot-head">WE DELIVER IN</h3>
        <ul className="foot-links">
          <Link to="/">
            <li>New York</li>
          </Link>
          <Link to="/">
            <li>California</li>
          </Link>
          <Link to="/">
            <li>Chicago</li>
          </Link>
          <Link to="/">
            <li>Washington</li>
          </Link>
          <Link to="/">
            <li>Hawai</li>
          </Link>
          <Link to="/">
            <li>Las Vegas</li>
          </Link>
          <Link to="/">
            <li>See All ...</li>
          </Link>
        </ul>
      </div>
      <div className="category">
        <h2 className="foot-head">SHOP BY CATEGORY</h2>
        <ul className="foot-links">
          <Link>
            <li>Living Room</li>
          </Link>
          <Link>
            <li>Sofa & Recliners</li>
          </Link>
          <Link>
            <li>Dining & Kitchen</li>
          </Link>
          <Link>
            <li>Bedroom & Mattress</li>
          </Link>
          <Link>
            <li>Storage</li>
          </Link>
          <Link>
            <li>Study & Office</li>
          </Link>
          <Link>
            <li>Lamps & Lighting</li>
          </Link>
          <Link>
            <li>Furnishing</li>
          </Link>
          <Link>
            <li>Outdoor</li>
          </Link>
          <Link>
            <li>Interior</li>
          </Link>
        </ul>
      </div>
      <div className="important-link">
        <h2 className="foot-head">IMPORTANT LINKS</h2>
        <ul className="foot-links">
          <Link>
            <li>Help Center</li>
          </Link>
          <Link>
            <li>Track Order</li>
          </Link>
          <Link>
            <li>Bulk Order</li>
          </Link>
          <Link>
            <li>Find A Store</li>
          </Link>
        </ul>
      </div>
      <div className="contact-us">
        <h2 className="foot-head">CONTACT US</h2>
        <ul className="foot-links">
          <Link>
            <li>
              <BsFillTelephoneFill className="phone-icon" />
              +1- 923-423-432
            </li>
          </Link>
          <Link>
            <li>
              <MdEmail className="email-icon" />
              premiumfurniture@gmail.com
            </li>
          </Link>
          <div className="social-icon flex">
            <li>
              <SocialIcon url="https://www.facebook.com/" bgColor="none" />{" "}
            </li>
            <li>
              <SocialIcon url="https://www.youtube.com/" bgColor="none" />{" "}
            </li>
            <li>
              <SocialIcon url="https://www.instagram.com/" bgColor="none" />{" "}
            </li>
            <li>
              <SocialIcon url="https://www.twitter.com/" bgColor="none" />{" "}
            </li>
          </div>
          <Link>
            <img src={footerLogo} alt="logo" className="" />
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default footer;
