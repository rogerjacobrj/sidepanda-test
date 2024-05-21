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