import { useState, useRef, useEffect } from "react";
import "./styles.scss";

const Header = () => {
    const [isOpen, setMenuState] = useState(false);
    const hamburgerMenu = useRef<HTMLInputElement>(null);
    const mobileNavBar = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const toggleMobileMenuBar = () => {
        hamburgerMenu!.current!.classList.toggle("openMenu");
        const hasOpenClass = mobileNavBar!.current!.classList.contains("openMobileMenu");

        if (!hasOpenClass) {
            setMenuState(true);
            mobileNavBar!.current!.classList.add("openMobileMenu");
            mobileNavBar!.current!.classList.add("isAnimating");
            mobileNavBar!.current!.classList.add("slideInLeft");
        } else {
            setMenuState(false);
            mobileNavBar!.current!.classList.remove("openMobileMenu");
            mobileNavBar!.current!.classList.add("isAnimating");
            mobileNavBar!.current!.classList.add("slideOutLeft");
        }
    };

    const removeAnimationClasses = () => {
        if (isOpen) {
            mobileNavBar!.current!.classList.remove("isAnimating");
            mobileNavBar!.current!.classList.remove("slideInLeft");
        } else {
            mobileNavBar!.current!.classList.remove("isAnimating");
            mobileNavBar!.current!.classList.remove("slideOutLeft");
        }
    };

    return (
        <div className='main-header'>
            <div className='logo-section'>
                <img src="./logo.png" alt="Sidepanda" className='logo' />
            </div>

            <div className='navigation'>
                <div ref={hamburgerMenu} className="hamburgerMenu"
                    onClick={toggleMobileMenuBar}>
                    <span className="hamburgerMenuItem"></span>
                    <span className="hamburgerMenuItem"></span>
                    <span className="hamburgerMenuItem"></span>
                    <span className="hamburgerMenuItem"></span>
                </div>
                <div className="mobile-nav"
                    ref={mobileNavBar}
                    onAnimationEnd={() => removeAnimationClasses()}>
                    <ul>
                        <li><a href="#">About us</a></li>
                        <li><a href="#">Leadership</a></li>
                        <li><a href="#">Contact us</a></li>
                        <li>
                            <button className="outline-button">
                                <img src="./link.svg" alt="Share Link"
                                    className='link-icon' /> Share Link
                            </button>
                        </li>
                    </ul>
                </div>
                <nav>
                    <ul>
                        <li className="dropdown">
                            <a href="#">Menu <i className="arrow down"></i></a>
                            <ul className="dropdown-content">
                                <li><a href="#">About us</a></li>
                                <li><a href="#">Leadership</a></li>
                            </ul>
                        </li>
                        <li><a href="#">Contact us</a></li>
                        <li>
                            <button className="outline-button">
                                <img src="./link.svg" alt="Link"
                                    className='link-icon' /> Share Link
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Header;