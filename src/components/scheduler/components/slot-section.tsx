import Variant from './variant';
import { SlotSectionProps } from '../types';
import SlotList from './slot-list';

const SlotSection = (props: SlotSectionProps) => {

    const { date, loading, variant, onVariantSelect, timestamp,
        slots, selectedSlot, chooseSlot, getStarted } = props;

    return (
        <div className='time-slot'>
            {date && !loading && <div className='progress-content'>
                <div className='variant-selection'>
                    <Variant
                        label="Select from variants"
                        placeholder="Choose variant"
                        onVariantSelect={onVariantSelect}
                        value={variant.value}
                    />
                </div>
                <div className='divider'></div>
                <SlotList
                    timestamp={timestamp}
                    slots={slots}
                    selectedSlot={selectedSlot}
                    chooseSlot={chooseSlot}
                />
            </div>}

            {date && loading && <div className='loader-wrapper'>
                <div className="loader"></div>
            </div>}

            {!date && slots.length === 0 &&
                <div className='get-started'>
                    <p>Choose a date and time to schedule the appointment</p>
                    <button
                        className='start-button'
                        onClick={getStarted}>
                        Get Started
                    </button>
                </div>}
        </div>
    );
};

export default SlotSection;