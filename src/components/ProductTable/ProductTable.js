import React from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import ProductTableRow from "./ProductTableRow";

function ProductTable(props) {
  const { productFilteredData } = useSelector((state) => state);

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Category</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {productFilteredData?.length > 0 &&
            productFilteredData.map((value) => (
              <ProductTableRow
                key={value.id}
                data={value}
                editProduct={props.handleEdit}
                deleteProduct={props.deleteProduct}
              />
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ProductTable;
