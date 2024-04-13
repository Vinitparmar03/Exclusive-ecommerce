import React from "react";
import "./Footer.css";
import { IoSendSharp } from "react-icons/io5";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";
import qr from "../../assets/qrCode.png";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="grid-container">
          <div className="grid-item">
            <h3>Exclusive</h3>
            <ul>
              <li>
                <a href="#">Subscribe</a>
              </li>
              <li>
                <a href="#">Get 10% off your 1st offer</a>
              </li>
              <li>
                <div className="email-input">
                  <input type="text" placeholder="Enter your email" />
                  <IoSendSharp />
                </div>
              </li>
            </ul>
          </div>
          <div className="grid-item">
            <h3>Support</h3>
            <ul>
              <li>
                <a href="#">111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</a>
              </li>
              <li>
                <a href="#">exclusive@gmail.com</a>
              </li>
              <li>
                <a href="#">+88015-88888-9999</a>
              </li>
            </ul>
          </div>
          <div className="grid-item">
            <h3>Account</h3>
            <ul>
              <li>
                <a href="#">My Account</a>
              </li>
              <li>
                <a href="#">Login / Register</a>
              </li>
              <li>
                <a href="#">cart</a>
              </li>
              <li>
                <a href="#">shop</a>
              </li>
            </ul>
          </div>
          <div className="grid-item">
            <h3>Quick Link</h3>
            <ul>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Term Of Use</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
          <div className="grid-item">
            <h3>Download App</h3>
            <ul>
              <li>
                <div className="download">
                  <img src={qr} alt="" className="qr" />
                  <img
                    src="https://static.spacecrafted.com/e0c86b080a0d4d27bbbaafc66cbe50b8/i/b923d2d3fdb34465a0c28966ae7a852a/1/4SoifmQp45JMgBnHp7ed2/Android-App-Store-logos.png"
                    alt=""
                    className="store"
                  />
                </div>
              </li>
              <ul className="social-icons">
                <li>
                  <a href="#">
                    <BsFacebook />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <BsInstagram />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <BsTwitter />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <BsGithub />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <BsDribbble />
                  </a>
                </li>
              </ul>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© copyright vinit 2022. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
