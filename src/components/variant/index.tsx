/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment } from "react";
import Select from 'react-select';
import { VariantProps, VariantOptions } from "./types";

const Variant = (props: VariantProps) => {

    const { label, placeholder, onVariantSelect, value } = props;

    const options: VariantOptions[] = [
        { value: 30, label: '30 min' },
        { value: 60, label: '1 hour' }
    ];

    const style = {
        dropdownIndicator: (base: any) => ({
            ...base,
            "svg": {
                fill: "#378760"
            }
        }),
        control: (base: any) => ({
            ...base,
            background: '#FFFFFF',
            borderColor: '#C7C9D9',
            minHeight: '48px',
            height: '48px',
            borderRadius: '10px',
            fontSize: '14px'
        }),
        option: (base: any, state: any) => ({
            ...base,
            backgroundColor: state.isSelected ? "#378760" : "#FFFFFF",
            color: state.isSelected ? '#FFFFFF' : '#378760',
            '&:hover': {
                backgroundColor: state.isSelected ? '#378760' : 'rgb(222, 235, 255)',
            }
        }),
        singleValue: (base: any) => ({
            ...base,
            color: '#378760'
        }),
        placeholder: (base: any) => {
            return {
                ...base,
                fontSize: '14px'
            }
        }
    };

    return (
        <Fragment>
            <label>{label}</label>
            <Select
                options={options}
                placeholder={placeholder}
                styles={style} components={{
                    IndicatorSeparator: () => null
                }}
                onChange={(selection: VariantOptions | null) => {
                    onVariantSelect(selection!);
                }}
                value={options.filter(option => option.value === value)}
            />
        </Fragment>
    );
};

export default Variant;