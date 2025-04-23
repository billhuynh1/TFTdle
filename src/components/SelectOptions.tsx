import React, { useState } from "react";

interface SelectOptionsProps {
  options: string[];
  onSelect: (selectedOption: string) => void;
}

const SelectOptions = ({
  options,
  onSelect,
}: SelectOptionsProps): React.ReactElement => {
  const [selectedOption, setSelectedOption] = useState<string>(""); // State to hold the selected option

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue); // Update state
    onSelect(selectedValue); // Call the onSelect function with the selected value
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
