
import "./navbar.css";

export default function Navbar() {
  return <div className="NavOptionsBar">
    <div className="leftNavOptionsBar">
      <a href="#" className="NavOptions">Home</a>
      <a href="#" className="NavOptions">About</a>
      <a href="#" className="NavOptions">Academics</a>
      <a href="#" className="NavOptions">Research</a>
      <a href="#" className="NavOptions">Resources</a>
      <a href="#" className="NavOptions">Contact Us</a>
    </div>

    <div className="rightNavOptionsBar">
    <button className="loginButton">Login</button>
    </div>
    
    </div>
}