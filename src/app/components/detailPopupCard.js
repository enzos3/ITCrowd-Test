import { useState } from "react";

const DetailPopupCard = ({ product, onClose }) => {
  const [showPopup, setShowPopup] = useState(true);

  const handleClosePopup = () => {
    setShowPopup(false);
    onClose();
  };

  const handleBuyNow = () => {
    console.log("Buy Now clicked!");
  };

  return (
    <>
      {showPopup && product ? (
        <div className='fixed inset-0 z-50 w-full h-full flex items-center justify-center bg-opacity-50 bg-black overflow-hidden'>
          {/* Close Button */}

          <div className='lg:w-[27rem]'>
            <div className='bg-white dark:bg-gray-900 p-6 rounded-md shadow-md flex flex-col-reverse items-center md:flex-row'>
              <div className=' w-60 md:w-1/2'>
                <img
                  className='w-60 h-auto object-cover object-center rounded-md mb-4 md:mb-0'
                  src={product.image_url}
                  alt={product.name}
                />
              </div>
              <div className='w-60 md:w-1/2 mx-4'>
                <div className='flex justify-end'>
                  <button onClick={handleClosePopup} className=' text-red-600'>
                    <svg
                      className='w-6 h-6'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M6 18L18 6M6 6l12 12'></path>
                    </svg>
                  </button>
                </div>
                <h2 className='mb-2 text-lg font-semibold leading-tight text-gray-900 md:text-xl dark:text-white'>
                  {product.name}
                </h2>
                <p className='mb-4 text-md font-bold leading-tight text-gray-900 md:text-lg dark:text-white'>
                  $ {product.price}
                </p>
                <dl>
                  <dt className='mb-2 font-semibold leading-tight text-gray-900 dark:text-white'>
                    Details
                  </dt>
                  <dd className='mb-2 text-sm leading-tight text-gray-500 sm:mb-4 dark:text-gray-400'>
                    {product.description}
                  </dd>
                </dl>

                {/* Buy Now Button */}
                <button
                  onClick={handleBuyNow}
                  className='bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-primary-300 text-white font-medium rounded-md text-sm px-6 py-2.5 m-4 text-center mx-auto block mt-4 transition duration-300 ease-in-out'>
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DetailPopupCard;
