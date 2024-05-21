export type DateValuePiece = Date | null;

export type DateValue = DateValuePiece | [DateValuePiece, DateValuePiece];

export type Slot = {
    start_time: string;
    end_time: string
};

export type SelctedSlot = {
    slot: Slot;
    index: number;
};

export type CalendarSectionProps = {
    onDateSelect: (date: DateValue) => void;
    date: DateValue;
};

export type FooterProps = {
    slots: Slot[];
    selectedSlot: SelctedSlot;
    showDetailsPage: boolean;
    toggleDetailsPage: () => void;
};

export type SlotListProps = {
    timestamp: number | null;
    slots: Slot[];
    selectedSlot: SelctedSlot | null;
    chooseSlot: (slot: Slot, index: number) => void;
};

export type SlotSectionProps = {
    date: DateValue;
    loading: boolean;
    variant: VariantOptions;
    onVariantSelect: (variant: VariantOptions) => void;
    timestamp: number;
    slots: Slot[];
    selectedSlot: SelctedSlot;
    chooseSlot: (slot: Slot, index: number) => void;
    getStarted: () => void;
};

export type VariantProps = {
    label: string;
    placeholder: string;
    value: number;
    onVariantSelect: (option: VariantOptions) => void;
};

export type VariantOptions = {
    label: string;
    value: number;
};

export type BookingDetailsProps = {
    goBack: () => void;
    scheduleEvent: () => void;
    selectedSlot: SelctedSlot;
    duration: string;
    timestamp: number;
};

export type FormData = {
    name: string;
    email: string;
};

export type ValidationErrors = {
    name?: string;
    email?: string;
};