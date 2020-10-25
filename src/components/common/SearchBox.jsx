import React from "react";

const SearchBox = ({ name, searchQuery, onChange, placeHolder }) => {
  return (
    <input
      name={name}
      value={searchQuery}
      onChange={(e) => onChange(e.currentTarget.value)}
      placeholder={placeHolder}
      className="form-control my-3"
    />
  );
};

export default SearchBox;
