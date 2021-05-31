import React from "react";
import EDIT_IMAGE from "../../assets/images/Edit.svg";
import DELETE_IMAGE from "../../assets/images/delete.svg";

function ProductTableRow({ data, deleteProduct, editProduct }) {
  return (
    <tr>
      <td>
        {typeof data.image === "object" ? (
          <img src={URL.createObjectURL(data.image)} alt="product" className="round-image" />
        ) : (
          <img src={`data:image/jpeg;base64,${data.image}`} alt="product" className="round-image" />
        )}
      </td>
      <td>{data.title}</td>
      <td>{data.categoryName}</td>
      <td>
        <img src={EDIT_IMAGE} alt={"EDIT"} onClick={() => editProduct(data._id)} className="svg-image" />
      </td>
      <td>
        <img src={DELETE_IMAGE} alt={"DELETE"} onClick={() => deleteProduct(data._id)} className="svg-image" />
      </td>
    </tr>
  );
}

export default ProductTableRow;
