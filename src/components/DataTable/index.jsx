import React from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@material-ui/core";

function DataTable({
  headerData,
  rows,
  keyPropName,
  ContainerComponent,
  tableProps
}) {
  return (
    <TableContainer component={ContainerComponent}>
      <Table {...tableProps}>
        <TableHead>
          <TableRow>
            {headerData.map(({ key, label, cellProps, ...rest }) => (
              <TableCell key={key} {...cellProps} {...rest}>
                {label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row[keyPropName]} {...row.props}>
              {headerData.map(({ key, cellProps }) => (
                <TableCell key={key} {...cellProps}>
                  {row[key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

DataTable.propTypes = {
  headerData: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  keyPropName: PropTypes.string.isRequired,
  ContainerComponent: PropTypes.elementType,
  tableProps: PropTypes.object
};

DataTable.defaultProps = {
  ContainerComponent: Paper
};

export default DataTable;
