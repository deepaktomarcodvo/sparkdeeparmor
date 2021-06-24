import React, { useState } from 'react';
import { uuidv4 } from '../../../utility'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import PropTypes from "prop-types";

const Table = ({ data, collumns, sortHandler }) => {
  const [sorting, setSortField] = useState({ sortBy: 'song_name', sortDirection: 'ASC' });

  const headerClickHandler = (field) => {
    const { sortBy, sortDirection } = sorting;
    let newDirection = 'ASC'
    if (sortBy === field) {
      newDirection = sortDirection === 'ASC' ? 'DESC' : 'ASC';
    }
    setSortField({ sortBy: field, sortDirection: newDirection });
    sortHandler(field, newDirection);
  }

  const renderSortIcon = (field) => {
    const { sortBy, sortDirection } = sorting;
    if (field === sortBy) {
      const icon = sortDirection === "ASC" ? faSortDown : faSortUp;
      return <span>{' '}<FontAwesomeIcon icon={icon} /></span>;
    }
    return null;
  }

  const renderCellValue = (row, col) => {
    if (col.cellRender) {
      return col.cellRender(row);
    }
    return row[col.field]
  }
  return (
    <div className="timeline px-3">
      <table>
        <thead>
          <tr>
            {collumns.map((col) => {
              return <th width={col.width} key={uuidv4()} onClick={() => headerClickHandler(col.field)}>{col.title}
                {renderSortIcon(col.field)}
              </th>
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            return <tr key={uuidv4()}>
              {collumns.map(col => {
                return <td width={col.width} key={uuidv4()}>{renderCellValue(row, col)}</td>
              })}
            </tr>
          })}
        </tbody>
      </table>
    </div >
  );
};


Table.propTypes = {
  data: PropTypes.array.isRequired,
  collumns: PropTypes.array.isRequired,
  sortHandler: PropTypes.func.isRequired
};

export default Table;
