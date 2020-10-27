import React, { Component } from "react";
import { readJsonObject } from "../../utilities/utils";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return readJsonObject(item, column.path);
  };

  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map((item, index) => {
          return (
            <tr key={index}>
              {columns.map((column, index) => (
                <td key={index}>{this.renderCell(item, column)}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    );
  }
}

export default TableBody;
