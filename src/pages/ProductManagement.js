import React, { useEffect, useState } from "react";
import { Button, Container, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DeleteConfirmation from "../components/DeleteConfirmation/DeleteConfirmation";
import ProductTable from "../components/ProductTable/ProductTable";
import {
  createProduct,
  getCategoryList,
  editProductData,
  deleteCategoryData,
  getProductList,
  deleteProductData,
} from "../store/actions";
import { filterArray } from "../util/general";
import ProductModal from "../components/Modal/ProductModal";

function ProductManagement() {
  const [show, setShow] = useState(false);
  const [id, setId] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const dispatch = useDispatch();
  const { productData, productFilteredData, data } = useSelector((state) => state);
  console.log(productFilteredData);
  useEffect(() => {
    dispatch(getCategoryList());
    dispatch(getProductList());
  }, [dispatch]);

  const deleteProduct = (id) => {
    setId(id);
    setDeleteModalShow(true);
  };

  const confirmDelete = (id) => {
    dispatch(deleteProductData(id));
    setDeleteModalShow(false);
  };

  const handleClose = () => {
    dispatch({ type: "REMOVE_PRODUCT_EDIT_DATA" });
    setShow(false);
  };

  const handleEdit = (id) => {
    setShow(true);
    dispatch({ type: "EDIT_PRODUCT", payload: id });
  };

  const addProduct = (productData) => {
    let formData = new FormData();
    formData.append("title", productData.title);
    formData.append("categoryId", productData.categoryId);
    formData.append("categoryName", productData.categoryName);
    formData.append("image", productData.image);
    setShow(false);
    dispatch(createProduct(formData));
  };

  const editProduct = (id, productData) => {
    let formData = new FormData();
    productData.title && formData.append("title", productData.title);
    productData.categoryId && formData.append("categoryId", productData.categoryId);
    productData.categoryName && formData.append("categoryName", productData.categoryName);
    productData.image && formData.append("image", productData.image);
    setShow(false);
    dispatch(editProductData(id, productData));
  };
  const handleSearch = (e) => {
    let filters = {
      title: e.target.value,
    };
    let filteredData = filterArray(productData, filters);
    dispatch({ type: "PRODUCT_FILTERED_DATA", payload: filteredData });
  };
  const handleDropDown = (e) => {
    let filters = {
      categoryName: e,
    };
    let filteredData = filterArray(productData, filters);
    dispatch({ type: "PRODUCT_FILTERED_DATA", payload: filteredData });
  };

  return (
    <div className="mt-3">
      <Container>
        <div className="add-button">
          <Button onClick={() => setShow(!show)} variant="outline-primary">
            Add Product
          </Button>
        </div>
        {productData && productData.length > 0 && (
          <div className="filter_box_wrapper">
            <div className="rating_wise_filter">
              <input
                type="text"
                name="search"
                id="search"
                class="form-control"
                width="50%"
                placeholder="Search Product"
                onChange={handleSearch}
              />
            </div>
            <Dropdown onSelect={(e) => handleDropDown(e)} variant="Secondary">
              <Dropdown.Toggle id="dropdown-basic">
                {productData?.categoryId ? data.find((v) => v._id === productData?.categoryId).title : "Category"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {data?.length > 0 &&
                  data.map((v) => {
                    return (
                      <Dropdown.Item eventKey={v.title} key={v._id}>
                        {v.title}
                      </Dropdown.Item>
                    );
                  })}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
        {productFilteredData && productFilteredData.length > 0 && (
          <ProductTable handleEdit={handleEdit} deleteProduct={deleteProduct} />
        )}
        <ProductModal
          editProduct={editProduct}
          show={show}
          handleClose={handleClose}
          addProduct={addProduct}
          categories={data}
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

export default ProductManagement;
