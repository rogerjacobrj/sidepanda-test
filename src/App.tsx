import './App.scss'
import Header from './components/header';
import Calendar from 'react-calendar';
import { useState } from 'react';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];


const App = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div>
      <Header />

      <div className='booking-wrapper'>
        <div className='booking-container'>
          <div className='calendar-slot-wrapper'>
            <div className='calendar'>
              <div className='calendar-title'>Test Service</div>
              <p className='calendar-timezone'><b>Timezone:</b> Asia/Calcutta</p>
              <div className='calendar-input'>
                <Calendar
                  calendarType="hebrew"
                  tileClassName="custom-calendar-title"
                  onChange={onChange} value={value} />
              </div>
            </div>
            <div className='time-slot'>
              <div className='variant-selection'>
                <label>Select from variants</label>
                <select>
                  <option>30 Min</option>
                  <option>1 Hour</option>
                </select>
              </div>
              <div className='divider'></div>
              <div className='slot-section'>
                <div className='slot-date'>Thursday, Dec 2 - Available Slots</div>
                <div className='slots'>
                  <div className='slot'>03:30 AM - 04:00 AM</div>
                  <div className='slot active'>
                    <span>04:00 AM - 05:00 AM</span>
                    <span>
                      <img src='./check.svg' alt='Booked' />
                    </span>
                  </div>
                  <div className='slot'>05:30 AM - 06:00 AM</div>
                  <div className='slot'>06:30 AM - 07:00 AM</div>
                  <div className='slot'>06:30 AM - 07:00 AM</div>
                  <div className='slot'>06:30 AM - 07:00 AM</div>
                  <div className='slot'>06:30 AM - 07:00 AM</div>
                  <div className='slot'>06:30 AM - 07:00 AM</div>
                  <div className='slot'>06:30 AM - 07:00 AM</div>
                  <div className='slot'>06:30 AM - 07:00 AM</div>
                  <div className='slot'>06:30 AM - 07:00 AM</div>
                  <div className='slot'>06:30 AM - 07:00 AM</div>
                  <div className='slot'>06:30 AM - 07:00 AM</div>
                  <div className='slot'>06:30 AM - 07:00 AM</div>
                </div>
              </div>
            </div>
          </div>
          <div className='calendar-footer'>
            <div className='author'>Powered by <a href=''>Appointo</a></div>
            <div className='footer-btn'>
              <button className='next-btn'>Next <i className="arrow right"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
