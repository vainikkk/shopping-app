import React from "react";
import EDIT_IMAGE from "../../assets/images/Edit.svg";
import DELETE_IMAGE from "../../assets/images/delete.svg";

function CategoryTableRow({ data, deleteCategory, editCategory }) {
  return (
    <tr>
      <td>
        {typeof data.image === "object" ? (
          <img src={URL.createObjectURL(data.image)} alt="category" className="round-image" />
        ) : (
          <img src={`data:image/jpeg;base64,${data.image}`} alt="category" className="round-image" />
        )}
      </td>
      <td>{data.title}</td>
      <td>{data.totalProduct}</td>
      <td>
        <img src={EDIT_IMAGE} alt={"EDIT"} onClick={() => editCategory(data._id)} className="svg-image" />
      </td>
      <td>
        <img src={DELETE_IMAGE} alt={"DELETE"} onClick={() => deleteCategory(data._id)} className="svg-image" />
      </td>
    </tr>
  );
}

export default CategoryTableRow;
