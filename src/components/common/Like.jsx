import React from "react";

const Like = ({ liked, onLike }) => {
  return (
    <i
      className={liked ? "clickable fa fa-heart" : "clickable fa fa-heart-o"}
      aria-hidden="true"
      onClick={onLike}
    ></i>
  );
};

export default Like;
