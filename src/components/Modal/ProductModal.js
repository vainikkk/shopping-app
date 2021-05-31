import React, { useState, useEffect } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

function ProductModal({ show, handleClose, addProduct, editProduct, categories }) {
  const editProductData = useSelector((state) => state.editProductData);
  const dispatch = useDispatch();
  const [productData, setProductData] = useState({
    title: "",
    image: null,
    categoryId: "",
  });

  useEffect(() => {
    if (editProductData) {
      setProductData(editProductData);
    }
  }, [editProductData]);

  const closeModal = () => {
    handleClose();
    setProductData({
      title: "",
      image: null,
    });
  };

  const handleEdit = () => {
    if (!productData.title || !productData.title.trim()) {
      dispatch({ type: "SET_TOAST", payload: "Please Enter title", error: true });
      return;
    }
    if (!productData.categoryId) {
      dispatch({ type: "SET_TOAST", payload: "Please select category", error: true });
      return;
    } else {
      editProduct(editProductData._id, productData);
      setProductData({
        title: "",
        image: null,
      });
    }
  };

  const handleAdd = () => {
    if (!productData.title || !productData.title.trim()) {
      dispatch({ type: "SET_TOAST", payload: "Please Enter title", error: true });
      return;
    }
    if (!productData.categoryId) {
      dispatch({ type: "SET_TOAST", payload: "Please select category", error: true });
      return;
    }
    if (!productData.image) {
      dispatch({ type: "SET_TOAST", payload: "Please upload a file", error: true });
      return;
    } else if (productData.rating > 5) {
      dispatch({ type: "SET_TOAST", payload: "Rating error", error: true });
      return;
    } else {
      addProduct(productData);
      setProductData({
        title: "",
        image: null,
      });
    }
  };

  const handleImage = (e) => {
    setProductData({ ...productData, image: e.target.files[0] });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} className="category-modal-wrapper">
        <Modal.Header>
          <Modal.Title>{editProductData ? "Edit Product" : "Add Product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="title"
                value={productData.title}
                onChange={(v) => setProductData({ ...productData, title: v.target.value })}
              />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Form.Label>Select Category : </Form.Label>
              <Dropdown
                onSelect={(e) =>
                  setProductData({
                    ...productData,
                    categoryId: e,
                    categoryName: categories.find((v) => v._id === e).title,
                  })
                }
              >
                <Dropdown.Toggle id="dropdown-basic">
                  {productData?.categoryId
                    ? categories.find((v) => v._id === productData?.categoryId).title
                    : "Parent Category"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {categories?.length > 0 &&
                    categories.map((v) => {
                      return (
                        <Dropdown.Item eventKey={v._id} key={v._id}>
                          {v.title}
                        </Dropdown.Item>
                      );
                    })}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <Form.Label>Image</Form.Label>
            <Form.File id="custom-file" label="Upload Product image" custom onChange={handleImage} />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          {editProductData ? (
            <Button variant="primary" onClick={handleEdit}>
              Edit Product
            </Button>
          ) : (
            <Button variant="primary" onClick={handleAdd}>
              Add Product
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductModal;
