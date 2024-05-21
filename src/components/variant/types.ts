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