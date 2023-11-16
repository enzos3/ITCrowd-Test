import React, { useState, useEffect } from "react";

export default function DeleteProduct({ productId, onClose }) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [reloadFlag, setReloadFlag] = useState(false);

  const handleConfirm = async () => {
    try {
      // Make a DELETE request to delete the product
      const response = await fetch(
        `http://18.188.189.216:5000/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "8f65cabc4f6c97e5d251d9bd2de889652e50c2c28342bbfd59c85cde94d8a515",
          },
        }
      );
      setReloadFlag(true);
      if (response.ok) {
        console.log("Product deleted successfully");
        setIsConfirmed(true);
        onClose();
      } else {
        const errorData = await response.json();
        console.error(`Failed to delete product: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    if (reloadFlag) {
      setReloadFlag(false);
      onClose();
      window.location.reload();
    }
  }, [reloadFlag, onClose]);

  const handleCancel = () => {
    console.log("Deletion canceled");
    onClose();
  };

  useEffect(() => {
    console.log("DeleteProduct received productId:", productId);
  }, [productId]);

  useEffect(() => {
    console.log("DeleteProduct received onClose:", onClose);
  }, [onClose]);

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      {/* Black transparent overlay */}
      <div className='fixed inset-0 bg-black opacity-50'></div>

      {/* Modal */}
      <div className='bg-white border p-4 rounded shadow-md relative'>
        {!isConfirmed ? (
          <>
            <h1 className='text-xl font-bold mb-4'>
              Are you sure you want to delete this product?
            </h1>
            <div className='flex justify-evenly space-x-4 mt-4'>
              <button
                className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
                onClick={handleConfirm}>
                Yes, delete
              </button>
              <button
                className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded'
                onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <p className='text-green-500'>Product deleted successfully!</p>
        )}
      </div>
    </div>
  );
}
