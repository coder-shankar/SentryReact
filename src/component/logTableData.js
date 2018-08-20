import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const getIssuedAt = data => {
  var issuedAt = data
    .split('T')
    .join(', Time: ')
    .split('Z');

  return issuedAt[0];
};

const TableData = ({
  data = [],
  handleChangeStatus = f => f,
  //   handleClick = f => f,
  //   handleDeleteClick = f => f,
}) => {
  return data.map((data, i) => (
    <TableRow key={i}>
      <TableCell>{i + 1}</TableCell>

      <TableCell
        onClick={() => {
          // handleClick(data.project_name);
          //   handleClick({ id: data.id, name: data.project_name });
        }}
      >
        {getIssuedAt(data.updated_at)}
      </TableCell>

      <TableCell
        onClick={() => {
          // handleClick(data.project_name);
          //   handleClick({ id: data.id, name: data.project_name });
        }}
      >
        {data.type}
      </TableCell>

      <TableCell
        onClick={() => {
          //   handleDeleteClick(data.id, data.project_name);
        }}
      >
        {data.message}
      </TableCell>

      <TableCell
        className="delete"
        onClick={() => {
          //   handleDeleteClick(data.id, data.project_name);
        }}
      >
        <img src={require('../img/delete.png')} alt="delete" />
      </TableCell>

      <TableCell
        onClick={() => {
          //   handleDeleteClick(data.id, data.project_name);
        }}
      >
        <label className="switch">
          {data.resolved ? (
            <input type="checkbox" defaultChecked />
          ) : (
            <input type="checkbox" />
          )}

          <span
            onClick={() => handleChangeStatus(data.id)}
            className="slider"
          />
        </label>
      </TableCell>
    </TableRow>
  ));
};

export default TableData;