import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = (path) => {
    let { sortColumn, onSort } = this.props;
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else
      sortColumn = {
        path,
        order: "asc",
      };

    onSort(sortColumn);
  };

  renderSortIcon = (path) => {
    let { sortColumn } = this.props;
    if (sortColumn.path === path)
      return sortColumn.order === "asc" ? (
        <i className="fa fa-sort-asc"></i>
      ) : (
        <i className="fa fa-sort-desc"></i>
      );
  };

  render() {
    const { columns } = this.props;
    return (
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th
              key={index}
              onClick={() => this.raiseSort(column.path)}
              className="clickable"
            >
              {column.label} {this.renderSortIcon(column.path)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
