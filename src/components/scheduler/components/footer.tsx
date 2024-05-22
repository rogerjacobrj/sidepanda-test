import { FooterProps } from "../types";

const Footer = (props: FooterProps) => {

    const { slots, selectedSlot, showDetailsPage, toggleDetailsPage } = props;

    return (
        <div className='calendar-footer'>
            <div className='author'>Powered by <a href=''>Appointo</a></div>
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