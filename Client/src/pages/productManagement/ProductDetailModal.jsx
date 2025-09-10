import React from 'react';

const ProductDetailModal = ({ isOpen, onClose, product }) => {
  if (!isOpen || !product) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-white/30 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`fixed top-0 right-0 h-full w-200 bg-[#f1f0e9] z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Product Details</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="h-full overflow-y-auto pb-20">
          <div className="p-6">
            {/* Product Images */}
            <div className="mb-6">
              {product.productImages && product.productImages.length > 0 ? (
                <div className="space-y-4">
                  {/* Main Image */}
                  <div className="w-fit h-50 rounded-sm overflow-hidden">
                    <img
                      src={product.productImages[0].imagePath}
                      alt={product.productName}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full h-100 rounded-lg bg-gray-200 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Product Information */}
            <div className="space-y-4">
              {/* Product Name */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {product.productName || 'Product Name'}
                </h3>
              </div>

              {/* Price */}
              <div className="py-4 border-y border-gray-200">
                <span className="text-3xl font-bold text-green-600">
                  ₹{product.price || '0'}
                </span>
              </div>

              {/* Category */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-1">Category</h4>
                <p className="text-gray-600">
                  {product.productCategoryName || 'Not specified'}
                </p>
              </div>

              {/* Additional Details */}
              {product.gstTax && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">GST Tax</h4>
                  <p className="text-gray-600">{product.gstTax}%</p>
                </div>
              )}

              {product.stock && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">Stock</h4>
                  <p className="text-gray-600">{product.stock}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailModal;