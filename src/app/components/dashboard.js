"use client";
import { useState, useEffect, useRef } from "react";
import UpdateProduct from "./editDashboard";
import DeleteProduct from "./deleteProduct";
import CreateProduct from "./createProduct";

const isLoggedIn = () => {
  return !!localStorage.getItem("username");
};

const getDashProducts = async () => {
  try {
    const res = await fetch("https://itcrowd-server.onrender.com/products", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch information");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading information", error);
    return { products: [] };
  }
};

export default function DashboardData() {
  const [products, setProducts] = useState([]);
  const [modalState, setModalState] = useState({
    isVisible: false,
    selectedProduct: null,
  });
  const popupRef = useRef(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [createModalVisible, setCreateModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDashProducts();
        console.log("Fetched data on the client side:", result);
        setProducts(result);
      } catch (error) {
        console.error("Error fetching data on the client side:", error);
      }
    };

    if (typeof window !== "undefined") {
      fetchData();
    }
  }, []);

  const handleShowDeleteModal = (e, productId) => {
    e.stopPropagation();
    console.log("Delete modal requested for product ID:", productId);
    setDeleteModalVisible(true);
    setDeleteProductId(productId);
    console.log("Delete modal visible:", deleteModalVisible);
  };

  const handleHideDeleteModal = () => {
    console.log("Hiding delete modal");
    setDeleteModalVisible(false);
    setDeleteProductId(null);
    console.log("Delete modal visible:", deleteModalVisible);
  };

  const handleShowPopup = (e, data) => {
    e.stopPropagation();
    setModalState({
      isVisible: true,
      selectedProduct: data,
    });
  };

  const handleHidePopup = () => {
    setModalState({
      isVisible: false,
      selectedProduct: null,
    });
  };

  const handleShowCreateModal = () => {
    setCreateModalVisible(true);
  };

  const handleHideCreateModal = () => {
    setCreateModalVisible(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        handleHidePopup();
      }
    };

    document.body.addEventListener("click", handleOutsideClick);

    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (!isLoggedIn()) {
      window.location.href = "/";
    }
  }, []);

  return (
    <>
      <div className='flex h-screen bg-gray-100'>
        {/* Main Content */}
        <div className='flex-1 p-4'>
          <div className='bg-white rounded-lg shadow-md p-4'>
            {/* Placeholder for CRUD operations */}
            <div className='flex justify-between m-3'>
              <h2 className='text-2xl font-bold mb-4'>Product Management</h2>
              <button
                id='defaultModalButton'
                className='block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                type='button'
                onClick={handleShowCreateModal}>
                Create product
              </button>
            </div>
            {/* Excel-like horizontal list */}
            <div className='overflow-x-auto'>
              <table className='min-w-full'>
                <thead>
                  <tr>
                    <th className='border p-2'>Name</th>
                    <th className='border p-2'>Description</th>
                    <th className='border p-2'>Price</th>
                    <th className='border p-2'>Image</th>
                    <th className='border p-2'>Brand</th>
                    <th className='border p-2'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((data) => (
                    <tr key={data.id}>
                      <td className='border p-2'>{data.name}</td>
                      <td className='border p-2'>{data.description}</td>
                      <td className='border p-2'>{data.price}</td>
                      <td className='border p-2'>
                        <div className='w-10 h-10 grid m-auto justify-center overflow-hidden rounded-full'>
                          <img
                            src={data.image_url}
                            alt={data.id}
                            className='w-full h-full object-cover'
                          />
                        </div>
                      </td>
                      <td className='border p-2'>{data.brand.name}</td>
                      <td className='border p-2'>
                        <div className='flex justify-evenly space-x-2'>
                          <button
                            className='inline-flex items-center text-sm font-medium bg-green-100 hover:bg-green-300 dark:hover:bg-gray-700 p-1.5 dark:hover-bg-gray-800 text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100'
                            type='button'
                            onClick={(e) => handleShowPopup(e, data)}>
                            Edit
                          </button>
                          <button
                            type='button'
                            onClick={(e) => handleShowDeleteModal(e, data._id)}
                            className='text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900'>
                            <svg
                              className='mr-1 -ml-1 w-5 h-5'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                              xmlns='http://www.w3.org/2000/svg'>
                              <path
                                fillRule='evenodd'
                                d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                                clipRule='evenodd'></path>
                            </svg>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Popup card */}
      {modalState.isVisible && (
        <div
          ref={popupRef}
          className={`absolute bg-white border p-4 rounded shadow-md ${
            modalState.isVisible ? "block" : "hidden"
          }`}>
          <ul className='list-none p-0 m-0'>
            <li className='mb-2'>
              <button
                className='text-blue-500 hover:underline focus:outline-none'
                onClick={() => {
                  handleHidePopup();
                  setModalState({
                    isVisible: true,
                    selectedProduct: modalState.selectedProduct,
                  });
                }}>
                Edit
              </button>
              {modalState.isVisible && (
                <UpdateProduct
                  product={modalState.selectedProduct}
                  onClose={() => {
                    setModalState({
                      isVisible: false,
                      selectedProduct: null,
                    });
                  }}
                />
              )}
            </li>
            <li>
              <button
                type='button'
                className='text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900'
                onClick={() => handleShowDeleteModal(null, deleteProductId)}>
                <svg
                  className='mr-1 -ml-1 w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fillRule='evenodd'
                    d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                    clipRule='evenodd'></path>
                </svg>
                Delete
              </button>
            </li>
          </ul>
        </div>
      )}
      {deleteModalVisible && (
        <DeleteProduct
          productId={deleteProductId}
          onClose={handleHideDeleteModal}
        />
      )}

      {createModalVisible && <CreateProduct onClose={handleHideCreateModal} />}
    </>
  );
}
