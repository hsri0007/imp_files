import React from "react";

const Select = ({ data }) => {
  return (
    <div>
      <select name="cars" id="cars">
        {data?.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
