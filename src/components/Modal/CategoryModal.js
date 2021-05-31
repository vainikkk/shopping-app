import React, { useState, useEffect } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

function CategoryModal({ show, handleShow, handleClose, addCategory, editCategory, parentCategories }) {
  const editData = useSelector((state) => state.editData);
  const dispatch = useDispatch();
  const [categoryData, setCategoryData] = useState({
    title: "",
    image: null,
  });

  useEffect(() => {
    if (editData) {
      setCategoryData(editData);
    }
  }, [editData]);

  const closeModal = () => {
    handleClose();
    setCategoryData({
      title: "",
      image: null,
    });
  };

  const handleEdit = () => {
    if (!categoryData.title || !categoryData.title.trim()) {
      dispatch({
        type: "SET_TOAST",
        payload: "Please Enter title",
        error: true,
      });
      return;
    } else {
      editCategory(editData._id, categoryData);
      setCategoryData({
        title: "",
        image: null,
      });
    }
  };

  const handleAdd = () => {
    if (!categoryData.title || !categoryData.title.trim()) {
      dispatch({ type: "SET_TOAST", payload: "Please Enter title", error: true });
      return;
    }
    if (!categoryData.parentCategoryId) {
      dispatch({ type: "SET_TOAST", payload: "Please select parent category", error: true });
      return;
    }
    if (!categoryData.image) {
      dispatch({ type: "SET_TOAST", payload: "Please upload a file", error: true });
      return;
    } else if (categoryData.rating > 5) {
      dispatch({ type: "SET_TOAST", payload: "Rating error" });
      return;
    } else {
      addCategory(categoryData);
      setCategoryData({
        title: "",
        image: null,
      });
    }
  };

  const handleImage = (e) => {
    setCategoryData({ ...categoryData, image: e.target.files[0] });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} className="category-modal-wrapper">
        <Modal.Header>
          <Modal.Title>{editData ? "Edit Category" : "Add Category"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="title"
                value={categoryData.title}
                onChange={(v) => setCategoryData({ ...categoryData, title: v.target.value })}
              />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Form.Label>Select Parent Category : </Form.Label>
              <Dropdown onSelect={(e) => setCategoryData({ ...categoryData, parentCategoryId: e })}>
                <Dropdown.Toggle id="dropdown-basic">
                  {categoryData?.parentCategoryId
                    ? parentCategories.find((v) => v._id === categoryData?.parentCategoryId).category
                    : "Parent Category"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {parentCategories?.length > 0 &&
                    parentCategories.map((v) => {
                      return (
                        <Dropdown.Item eventKey={v._id} key={v._id}>
                          {v.category}
                        </Dropdown.Item>
                      );
                    })}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <Form.Label>Image</Form.Label>
            <Form.File id="custom-file" label="Upload Category image" custom onChange={handleImage} />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          {editData ? (
            <Button variant="primary" onClick={handleEdit}>
              Edit Category
            </Button>
          ) : (
            <Button variant="primary" onClick={handleAdd}>
              Add Category
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CategoryModal;
