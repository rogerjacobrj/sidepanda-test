import { SelctedSlot, Slot } from "../scheduler/types";

export type SlotSectionProps = {
    timestamp: number | null;
    slots: Slot[];
    selectedSlot: SelctedSlot | null;
    chooseSlot: (slot: Slot, index: number) => void;
}