// locationselect.tsx
import Select, { components } from "react-select";
import { MapPin, SearchIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { FormField } from "~/components/ui/form";

// Select options
const options = [
    { value: 'Annaba', label: 'Annaba' },
    { value: 'Oran', label: 'Oran' },
    { value: 'Souk Ahras', label: 'Souk Ahras' }
];

const DropdownIndicator = (props: any) => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator className="flex justify-start" {...props}>
                <SearchIcon className="w-[2rem] text-gray-600" />
            </components.DropdownIndicator>
        )
    );
};

const Option = (props: any) => {
    return (
        components.Option && (
            <components.Option {...props}>
                <div className="flex">
                    <MapPin className="w-[2rem] text-gray-600" />
                    {props.children}
                </div>
            </components.Option>
        )
    );
};

const LocationSelect = ({ form }: { form: any }) => {
    return (
        <Select
            onChange={(value) => { form.setValue("locationSelect", value ?? { label: "", value: "" }) }}
            className="w-full h-full absolute top-0 text-start font-normal text-gray-600"
            styles={{
                input: (styles) => ({ ...styles, height: '40px' }),
                menuList: (styles) => ({ ...styles, zIndex: '100' }),
                indicatorsContainer: (styles) => ({ ...styles, paddingInline: '0', width: "32px" }),
                valueContainer: (styles) => ({ ...styles, paddingInline: '0' }),
                option: (styles) => ({ ...styles, paddingInline: '0' }),
                dropdownIndicator: (styles) => ({ ...styles, paddingInline: "0.25rem" }),
                control: (base: any) => ({
                    ...base,
                    flexDirection: 'row-reverse',
                }),
            }}
            components={{ IndicatorSeparator: () => null, DropdownIndicator, Option }}
            placeholder="Where To?"
            isSearchable={true}
            options={options} />
    );
};

export default LocationSelect;
