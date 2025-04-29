import React, { useState } from "react";

interface SelectOptionsProps<T extends string | number> {
  options: T[];
  onSelect: (selectedOption: T) => void;
}

const SelectOptions = <T extends string | number>({
  options,
  onSelect,
}: SelectOptionsProps<T>): React.ReactElement => {
  const [selectedOption, setSelectedOption] = useState<T | undefined>(
    undefined,
  );

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let selectedValue: T;

    if (typeof options[0] === "string") {
      // If options are strings
      selectedValue = event.target.value as T;
    } else {
      // If options are numbers, convert to number
      selectedValue = (
        event.target.value ? parseInt(event.target.value, 10) : NaN
      ) as T;
    }

    setSelectedOption(selectedValue);
    onSelect(selectedValue);
  };

  return (
    <div className="select-options__container">
      <select
        id="options-select"
        value={selectedOption}
        onChange={handleChange}
        aria-label="Select a character"
        className="select-options"
      >
        <option value="">--Select--</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectOptions;
