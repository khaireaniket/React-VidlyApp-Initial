import React from "react";

const Genres = ({
  genres,
  idProperty,
  textProperty,
  selectedGenre,
  onGenreChange,
}) => {
  return (
    <div className="list-group">
      <a
        className={
          selectedGenre
            ? "clickable list-group-item"
            : "clickable list-group-item active"
        }
        onClick={() => onGenreChange(null)}
      >
        All Genres
      </a>
      {genres.map((genre) => {
        const id = genre[idProperty];
        const text = genre[textProperty];
        return (
          <a
            key={id}
            className={
              selectedGenre === text
                ? "clickable list-group-item active"
                : "clickable list-group-item"
            }
            onClick={() => onGenreChange(text)}
          >
            {text}
          </a>
        );
      })}
    </div>
  );
};

Genres.defaultProps = {
  idProperty: "_id",
  textProperty: "name",
};

export default Genres;
