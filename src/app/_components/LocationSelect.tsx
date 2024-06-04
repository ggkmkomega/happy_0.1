// locationselect.tsx
import { MapPin, SearchIcon } from "lucide-react";
import Select, { components } from "react-select";
import jsonProvincesOptions from "~/data/provinces.json";

// Select options
const options = jsonProvincesOptions;

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
      onChange={(value) => {
        form.setValue("locationSelect", value ?? { label: "", value: "" });
      }}
      isClearable={true}
      className="absolute top-0 h-full w-full text-start font-normal text-gray-600"
      styles={{
        input: (styles) => ({ ...styles, height: "40px" }),
        menuList: (styles) => ({ ...styles, zIndex: "100" }),
        indicatorsContainer: (styles) => ({
          ...styles,
          paddingInline: "0",
          width: "32px",
        }),

        valueContainer: (styles) => ({ ...styles, paddingInline: "0" }),
        option: (styles) => ({ ...styles, paddingInline: "0" }),
        dropdownIndicator: (styles) => ({
          ...styles,
          paddingInline: "0.25rem",
        }),
        clearIndicator: (styles) => ({
          ...styles,
          position: "absolute",
          right : "0"
        }),
        control: (base: any) => ({
          ...base,
          flexDirection: "row-reverse",
        }),
      }}
      components={{ IndicatorSeparator: () => null, DropdownIndicator, Option }}
      placeholder="Where To?"
      isSearchable={true}
      options={options}
    />
  );
};

export default LocationSelect;
