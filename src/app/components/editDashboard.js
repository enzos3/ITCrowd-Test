"use client";

import { useState, useEffect } from "react";

export default function UpdateProduct({ product, onClose }) {
  // Use optional chaining and nullish coalescing to handle potential undefined values
  const initialFormData = {
    id: product?._id || "",
    name: product?.name || "",
    brand: {
      _id: product?.brand?._id || "", // Include the _id of the brand
      name: product?.brand?.name || "",
    },
    price: product?.price || "",
    image_url: product?.image_url || "",
    description: product?.description || "",
  };

  console.log(initialFormData);

  const [formData, setFormData] = useState(initialFormData);
  const [reloadFlag, setReloadFlag] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      if (!product || !product._id) {
        throw new Error("Product ID is undefined");
      }

      const res = await fetch(
        `https://itcrowd-server.onrender.com/products/${product._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "8f65cabc4f6c97e5d251d9bd2de889652e50c2c28342bbfd59c85cde94d8a515",
          },
          body: JSON.stringify(formData),
        }
      );

      setReloadFlag(true);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  useEffect(() => {
    if (reloadFlag) {
      setReloadFlag(false);

      window.location.reload();
    }
  }, [reloadFlag]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the changed field is part of the brand object
    if (name.startsWith("brand.")) {
      const brandField = name.replace("brand.", "");
      setFormData((prevData) => ({
        ...prevData,
        brand: { ...prevData.brand, [brandField]: value },
      }));
    } else if (name === "brand") {
      // If the changed field is the entire brand object
      setFormData((prevData) => ({
        ...prevData,
        brand: { ...prevData.brand, name: value }, // Assuming 'name' is the field you want to update in the brand object
      }));
    } else {
      // If the changed field is outside the brand object
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  console.log(formData.description);
  return (
    <>
      <div
        id='updateProductModal'
        tabIndex='-1'
        aria-hidden='true'
        className=' overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-modal md:h-full'>
        <div className='relative p-4 w-full max-w-2xl h-full md:h-auto'>
          <div className='relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5'>
            <div className='flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600'>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                Update Product
              </h3>
              <button
                type='button'
                className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
                data-modal-toggle='updateProductModal'
                onClick={onClose}>
                <svg
                  aria-hidden='true'
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fillRule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clipRule='evenodd'></path>
                </svg>
                <span className='sr-only'>Close modal</span>
              </button>
            </div>
            <form onSubmit={handleUpdate}>
              <div className='grid gap-4 mb-4 sm:grid-cols-2'>
                <div>
                  <label
                    htmlFor='name'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Name
                  </label>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    value={formData.name}
                    onChange={handleChange}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                    placeholder='Ex. Apple iMac 27&ldquo;'
                  />
                </div>
                <div>
                  <label
                    htmlFor='brand'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Brand
                  </label>
                  <input
                    type='text'
                    name='brand'
                    id='brand'
                    value={formData.brand.name}
                    onChange={handleChange}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                    placeholder='Ex. Apple'
                  />
                </div>
                <div>
                  <label
                    htmlFor='price'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Price
                  </label>
                  <input
                    type='number'
                    value={formData.price}
                    onChange={handleChange}
                    name='price'
                    id='price'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                    placeholder='$299'
                  />
                </div>
                <div>
                  <label
                    htmlFor='category'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Image URL
                  </label>
                  <input
                    type='text'
                    value={formData.image_url}
                    onChange={handleChange}
                    name='image_url'
                    id='image_url'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                    placeholder='Image URL'
                  />
                </div>
                <div className='sm:col-span-2'>
                  <label
                    htmlFor='description'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Description
                  </label>
                  <textarea
                    id='description'
                    rows='5'
                    name='description'
                    value={formData.description}
                    onChange={handleChange}
                    className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                    placeholder='Write a description...'></textarea>
                </div>
              </div>
              <div className='flex items-center space-x-4'>
                <button
                  type='submit'
                  className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>
                  Update product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
