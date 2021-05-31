import React from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import CategoryTableRow from "./CategoryTableRow";

function CategoryTable(props) {
  const { filteredData } = useSelector((state) => state);

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Total Product</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredData?.length > 0 &&
            filteredData.map((value) => (
              <CategoryTableRow
                key={value.id}
                data={value}
                editCategory={props.handleEdit}
                deleteCategory={props.deleteCategory}
              />
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default CategoryTable;
