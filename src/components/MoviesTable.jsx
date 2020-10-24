import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/Table";
import Like from "./common/Like";
import AuthService from "../services/AuthService";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (item) => <Link to={`/movies/${item._id}`}>{item.title}</Link>,
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      content: (item) => (
        <Like liked={item.liked} onLike={() => this.props.onLike(item)} />
      ),
    },
  ];

  deleteButton = {
    content: (item) => (
      <button
        className="btn btn-danger btn-sm"
        onClick={() => this.props.onDelete(item)}
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = AuthService.getCurrentUser();
    if (user && user.isAdmin) {
      this.columns.push(this.deleteButton);
    }
  }

  render() {
    const { movies, sortColumn, onSort } = this.props;
    return (
      <>
        <Table
          data={movies}
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
      </>
    );
  }
}

export default MoviesTable;
