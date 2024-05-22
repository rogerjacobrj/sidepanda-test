import { FooterProps } from "../types";
import { Link } from "react-router-dom";

const Footer = (props: FooterProps) => {

    const { slots, selectedSlot, showDetailsPage, toggleDetailsPage } = props;

    return (
        <div className='calendar-footer'>
            <div className='author'>
                Powered by <Link to='https://www.sidepanda.com/appointo' target="_blank">Appointo</Link>
            </div>
            <div className='footer-btn'>
                {slots.length > 0 && selectedSlot && !showDetailsPage &&
                    <button className='next-btn' onClick={toggleDetailsPage}>
                        Next <i className="arrow right"></i>
                    </button>}
            </div>
        </div>
    );
};

export default Footer;