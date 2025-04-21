import ProductCard from "@/components/ProductCard";
import { Metadata } from "next";
import { Suspense } from "react";
import ProductSort from "@/components/ProductSort";
import { getAllProducts, getProductsByCategory } from "@/services/productService";
import { getAllCategories } from "@/services/categoryService";
import { Product } from "@/types";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Products - UT Mart",
  description: "Browse our wide range of fresh and quality products at UT Mart",
};

interface ProductsPageProps {
  searchParams?: { 
    category?: string;
    sort?: string;
  };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  // Convert searchParams to a proper object and await its properties
  const params = searchParams ? await Promise.resolve(searchParams) : {};
  const selectedCategory = params.category || 'all';
  const sortBy = params.sort || 'featured';
  
  // Fetch all categories directly from backend API
  const categories = await getAllCategories();
  
  // Fetch products (all or by category)
  let products: Product[] = [];
  if (selectedCategory === 'all') {
    products = await getAllProducts();
  } else {
    products = await getProductsByCategory(selectedCategory);
  }
  
  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'name') return a.title.localeCompare(b.title);
    return 0; // featured or default
  });
  
  // Get all unique categories (from API)
  const allCategories = ['all', ...categories];
  
  return (
    <div className="animate-[fadeIn_0.5s_ease-in] bg-gray-50">
      {/* Hero Banner with parallax effect */}
      <div className="relative h-[350px] mb-12 overflow-hidden rounded-b-3xl shadow-lg">
        <img 
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
          alt="Fresh grocery products" 
          className="absolute inset-0 w-full h-full object-cover transform scale-110 hover:scale-100 transition-transform duration-10000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-800/70 to-emerald-700/70 z-10"></div>
        
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-6">
          <span className="text-green-300 text-sm uppercase tracking-wider font-bold mb-2">Fresh | Quality | Value</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
            Premium <span className="text-yellow-300">Grocery</span> Products
          </h1>
          <p className="text-green-100 md:text-lg max-w-3xl mx-auto mb-8 drop-shadow-md">
            Sourced directly from local farmers and premium brands. Discover everything you need for your kitchen and home.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#categories" className="bg-white text-green-800 px-6 py-3 rounded-full font-medium hover:bg-green-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300">
              Browse Categories
            </a>
            <a href="#products" className="bg-yellow-400 text-green-900 px-6 py-3 rounded-full font-medium hover:bg-yellow-300 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300">
              Shop Now
            </a>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div id="categories" className="max-w-7xl mx-auto mb-10 px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Top Categories</h2>
          <div className="h-1 w-24 bg-green-600 mx-auto rounded-full"></div>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {allCategories.map((category, index) => (
            <a 
              key={index}
              href={`/products?category=${category}`}
              className={`flex items-center gap-2 py-2 px-5 rounded-full transition-all duration-300 ${
                selectedCategory === category 
                  ? 'bg-green-600 text-white font-medium shadow-lg' 
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-green-300 hover:bg-green-50 shadow-md'
              }`}
            >
              <span className="capitalize">{category}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                selectedCategory === category 
                  ? 'bg-green-700 text-green-100' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {category === 'all' 
                  ? products.length 
                  : products.filter(p => p.category === category).length}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="p-6 rounded-xl shadow-md sticky top-24 border border-gray-200 bg-white">
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-2 text-gray-800 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filters
                </h2>
                <div className="h-1 w-16 bg-green-600 rounded-full mt-2"></div>
              </div>
              
              <div className="space-y-6">
                {/* Categories section */}
                <div className="p-4 rounded-lg border border-gray-200 bg-gray-50">
                  <h3 className="text-lg font-bold mb-3 text-gray-800 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {allCategories.map((category, index) => (
                      <a 
                        key={index}
                        href={`/products?category=${category}`}
                        className={`flex items-center justify-between w-full py-2 px-3 rounded-lg transition-all duration-300 ${
                          selectedCategory === category 
                            ? 'bg-green-600 text-white font-medium shadow-md' 
                            : 'hover:bg-white text-gray-700 hover:shadow'
                        }`}
                      >
                        <span className="capitalize flex items-center">
                          <span className={`w-2 h-2 rounded-full mr-2 ${
                            selectedCategory === category ? 'bg-white' : 'bg-green-500'
                          }`}></span>
                          {category}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          selectedCategory === category 
                            ? 'bg-green-700 text-green-100' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {category === 'all' 
                            ? products.length 
                            : products.filter(p => p.category === category).length}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
                
                {/* Sort By section */}
                <div className="p-4 rounded-lg border border-gray-200 bg-gray-50">
                  <h3 className="text-lg font-bold mb-3 text-gray-800 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                    </svg>
                    Sort By
                  </h3>
                  <div className="space-y-2">
                    {[
                      { value: 'featured', label: 'Featured', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
                      { value: 'price-low', label: 'Price: Low to High', icon: 'M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12' },
                      { value: 'price-high', label: 'Price: High to Low', icon: 'M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4' },
                      { value: 'name', label: 'Name (A-Z)', icon: 'M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4' }
                    ].map((option) => (
                      <a 
                        key={option.value}
                        href={`/products?category=${selectedCategory}&sort=${option.value}`}
                        className={`flex items-center w-full py-2 px-3 rounded-lg transition-all duration-300 ${
                          sortBy === option.value 
                            ? 'bg-green-600 text-white font-medium shadow-md' 
                            : 'hover:bg-white text-gray-700 hover:shadow'
                        }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={option.icon} />
                        </svg>
                        {option.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Promo Banner */}
              <div className="mt-6 overflow-hidden rounded-lg">
                <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 p-4 rounded-lg">
                  <div className="flex flex-col items-center text-center">
                    <span className="bg-white text-yellow-600 text-xs font-bold px-3 py-1 rounded-full mb-3">LIMITED TIME</span>
                    <h3 className="font-bold text-green-900 text-lg mb-1">Special Discount!</h3>
                    <p className="text-sm text-green-800 mb-3">
                      Use code <span className="font-bold">FRESH25</span> for 25% off on your first order
                    </p>
                    <a href="/special-offers" className="bg-green-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-green-700 transition-colors w-full text-center">
                      View Offers
                    </a>
                  </div>
                </div>
              </div>

              {/* Customer Support */}
              <div className="mt-6 p-4 rounded-lg shadow-md border border-green-100 bg-gradient-to-br from-green-50 to-emerald-50">
                <div className="flex items-center mb-3">
                  <span className="flex items-center justify-center bg-green-100 h-10 w-10 rounded-full text-green-600 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-bold text-green-800">Need Help?</h3>
                    <p className="text-xs text-green-700">We're here to assist you</p>
                  </div>
                </div>
                <a href="tel:+1234567890" className="flex items-center justify-center gap-2 bg-white text-green-700 font-medium py-2 px-3 rounded-lg hover:bg-green-700 hover:text-white transition-colors mt-2 shadow-sm border border-green-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Contact Support
                </a>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Results Summary and Sort (Mobile) */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 p-4 rounded-xl shadow-sm border border-gray-200 bg-white">
              <div className="mb-4 md:mb-0">
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedCategory === 'all' ? 'All Products' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`}
                </h2>
                <p className="text-gray-600">
                  Showing {sortedProducts.length} products
                </p>
              </div>
              
              <ProductSort selectedCategory={selectedCategory} sortBy={sortBy} />
            </div>
            
            {/* No Products Found */}
            {sortedProducts.length === 0 && (
              <div className="rounded-xl shadow-md p-10 text-center border border-gray-200 bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Products Found</h3>
                <p className="text-gray-600 mb-6">We couldn't find any products matching your criteria.</p>
                <a href="/products" className="inline-flex items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                  View All Products
                </a>
              </div>
            )}
            
            {/* Products Grid */}
            <Suspense fallback={
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="rounded-xl shadow-md p-4 animate-pulse border border-gray-200 bg-white">
                    <div className="h-48 bg-gray-100 rounded-lg mb-4"></div>
                    <div className="h-6 bg-gray-100 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-100 rounded w-1/2 mb-4"></div>
                    <div className="h-10 bg-gray-100 rounded"></div>
                  </div>
                ))}
              </div>
            }>
              <div id="products" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product, index) => (
                  <div 
                    key={product.id} 
                    className="animate-[fadeIn_0.5s_ease-in] transform hover:-translate-y-2 transition-all duration-300" 
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </Suspense>

            {/* Promotion Banner */}
            {sortedProducts.length > 0 && (
              <div className="mt-12 bg-gradient-to-r from-green-600 to-teal-500 rounded-xl p-6 shadow-xl text-white">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between">
                  <div className="mb-6 md:mb-0 text-center md:text-left">
                    <span className="bg-yellow-400 text-green-800 text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block">NEW USERS OFFER</span>
                    <h3 className="text-xl md:text-2xl font-bold mb-2">Get 10% off your first order!</h3>
                    <p className="text-green-100 max-w-md">
                      Sign up for our newsletter and receive a special discount code for your first purchase.
                    </p>
                  </div>
                  <div>
                    <a href="/newsletter" className="inline-block bg-white text-green-700 font-medium py-3 px-6 rounded-full hover:bg-green-50 transition-colors shadow-md">
                      Subscribe Now
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Features Section */}
            {sortedProducts.length > 0 && (
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Fresh Products</h3>
                    <p className="text-xs text-gray-600">Daily fresh and quality products</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Fast Delivery</h3>
                    <p className="text-xs text-gray-600">Free delivery for orders over ₹500</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Secure Payments</h3>
                    <p className="text-xs text-gray-600">Multiple secure payment options</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 