import "./styles.scss";

const Header = () => {
    return (
        <div className='main-header'>
            <div className='logo-section'>
                <img src="./logo.png" alt="Sidepanda" className='logo' />
            </div>

            <div className='navigation'>
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
                                <img src="./link.svg" alt="Link" className='link-icon' /> Share Link
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Header;