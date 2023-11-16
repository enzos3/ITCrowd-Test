"use client";
import { useState, useEffect } from "react";
import DetailPopupCard from "./components/detailPopupCard";

const getProducts = async () => {
  try {
    const res = await fetch("http://18.188.189.216:5000/products", {
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

export default function Home() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProducts();
      setProducts(result);
    };

    fetchData();
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleClosePopup = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <section className='md:h-full flex items-center text-gray-600'>
        <div className='container px-5 py-24 mx-auto'>
          <div className='text-center mb-12'>
            <h5 className='text-base md:text-lg text-indigo-700 mb-1'>
              ITCrowd Challenge by Enzo Ariel Fiol
            </h5>
            <h1 className='text-4xl md:text-6xl text-gray-700 font-semibold'>
              Junior FullStack Javascript
            </h1>
          </div>
          <div className='flex flex-wrap -m-4'>
            {products && products.length > 0 ? (
              products.map((data) => (
                <div key={data._id} className='p-4 sm:w-1/2 lg:w-1/3'>
                  <div className='h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden'>
                    <img
                      className='lg:h-72 md:h-48 w-full object-cover object-center'
                      src={data.image_url}
                      alt='blog'
                    />
                    <div className='p-6 hover:bg-indigo-700 hover:text-white transition duration-300 ease-in'>
                      <h2 className='text-base font-medium text-indigo-300 mb-1'>
                        {data.brand.name}
                      </h2>
                      <h1 className='text-2xl font-semibold mb-3'>
                        {data.name}
                      </h1>

                      <div className='flex items-center flex-wrap '>
                        <a
                          className='text-indigo-300 inline-flex items-center md:mb-2 lg:mb-0 cursor-pointer'
                          onClick={() => handleProductClick(data)}>
                          Read More
                          <svg
                            className='w-4 h-4 ml-2'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            strokeWidth='2'
                            fill='none'
                            strokeLinecap='round'
                            strokeLinejoin='round'>
                            <path d='M5 12h14'></path>
                            <path d='M12 5l7 7-7 7'></path>
                          </svg>
                        </a>
                        <span className='text-green-500 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200'>
                          <svg
                            className='w-4 h-4 mr-1'
                            xmlns='http://www.w3.org/2000/svg'
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'>
                            <line x1='12' y1='1' x2='12' y2='23'></line>
                            <path d='M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'></path>
                          </svg>
                          {data.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No products available</p>
            )}
          </div>
        </div>
      </section>
      {selectedProduct && (
        <DetailPopupCard product={selectedProduct} onClose={handleClosePopup} />
      )}
    </>
  );
}
