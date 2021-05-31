import React, { useEffect, useState } from "react";
import { Button, Container, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DeleteConfirmation from "../components/DeleteConfirmation/DeleteConfirmation";
import CategoryTable from "../components/CategoryTable/CategoryTable";
import {
  createCategory,
  getCategoryList,
  editCategoryData,
  deleteCategoryData,
  getParentCategoryList,
} from "../store/actions";
import { filterArray } from "../util/general";
import CategoryModal from "../components/Modal/CategoryModal";

function CategoryManagement() {
  const [show, setShow] = useState(false);
  const [id, setId] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const dispatch = useDispatch();
  const { data, filteredData, parentCategories } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getCategoryList());
    dispatch(getParentCategoryList());
  }, [dispatch]);

  const deleteCategory = (id) => {
    setId(id);
    setDeleteModalShow(true);
  };

  const confirmDelete = (id) => {
    dispatch(deleteCategoryData(id));
    setDeleteModalShow(false);
  };

  const handleClose = () => {
    dispatch({ type: "REMOVE_CATEGORY_EDIT_DATA" });
    setShow(false);
  };

  const handleEdit = (id) => {
    setShow(true);
    dispatch({ type: "EDIT", payload: id });
  };

  const addCategory = (data) => {
    let formData = new FormData();
    formData.append("title", data.title);
    formData.append("parentCategoryId", data.parentCategoryId);
    formData.append("image", data.image);
    setShow(false);
    dispatch(createCategory(formData));
  };

  const editCategory = (id, data) => {
    let formData = new FormData();
    data.title && formData.append("title", data.title);
    data.parentCategoryId && formData.append("parentCategoryId", data.parentCategoryId);
    data.image && formData.append("image", data.image);
    setShow(false);
    dispatch(editCategoryData(id, data));
  };
  const handleSearch = (e) => {
    let filters = {
      title: e.target.value,
    };
    let filteredData = filterArray(data, filters);
    dispatch({ type: "FILTERED_DATA", payload: filteredData });
  };

  return (
    <div className="mt-3">
      <Container>
        <div className="add-button">
          <Button onClick={() => setShow(!show)} variant="outline-primary">
            Add Category
          </Button>
        </div>
        {data && data.length > 0 && (
          <div className="filter_box_wrapper">
            <div className="rating_wise_filter">
              <input
                type="text"
                name="search"
                id="search"
                class="form-control"
                width="50%"
                placeholder="Search category"
                onChange={handleSearch}
              />
            </div>
          </div>
        )}
        {filteredData && filteredData.length > 0 && (
          <CategoryTable handleEdit={handleEdit} deleteCategory={deleteCategory} />
        )}
        <CategoryModal
          editCategory={editCategory}
          show={show}
          handleClose={handleClose}
          addCategory={addCategory}
          parentCategories={parentCategories}
        />
        <DeleteConfirmation
          title="Confirmation Popup"
          bodyDescription="Are you sure to Delete!"
          buttonName="DELETE"
          show={deleteModalShow}
          id={id}
          handleClose={() => setDeleteModalShow(false)}
          confirmDelete={confirmDelete}
        />
      </Container>
    </div>
  );
}

export default CategoryManagement;
