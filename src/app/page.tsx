import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/services/productService";

export default async function Home() {
  // Get featured products (first 4 products from API)
  const products = await getAllProducts();
  const featuredProducts = products.slice(0, 4);

  // Categories for quick navigation
  const categories = [
    { name: "electronics", icon: "🔌", color: "bg-blue-100 text-blue-800" },
    { name: "jewelery", icon: "💍", color: "bg-purple-100 text-purple-800" },
    { name: "men's clothing", icon: "👔", color: "bg-amber-100 text-amber-800" },
    { name: "women's clothing", icon: "👗", color: "bg-pink-100 text-pink-800" },
  ];

  return (
    <div className="animate-[fadeIn_0.5s_ease-in]">
      {/* Hero Section */}
      <section className="relative h-[600px] mb-16">
        <div className="absolute inset-0 bg-gray-900">
          <Image
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
            alt="UT Mart"
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
        </div>
        <div className="relative z-10 h-full flex flex-col items-start justify-center text-left text-white px-8 md:px-16 max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-[slideUp_0.6s_ease-out]">
            Quality <span className="text-green-400">Products</span> For You
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl text-gray-200 animate-[slideUp_0.8s_ease-out]">
            Your one-stop shop for quality products at affordable prices. Shop from the comfort of your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-[slideUp_1s_ease-out]">
            <Link 
              href="/products" 
              className="btn-primary px-8 py-3 rounded-md text-lg font-medium flex items-center"
            >
              Shop Now
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link 
              href="/about" 
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-3 rounded-md text-lg font-medium transition-colors flex items-center"
            >
              About Us
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
        
        {/* Category Quick Access */}
        <div className="absolute -bottom-8 left-0 right-0 px-4">
          <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category, index) => (
                <Link 
                  key={index}
                  href={`/products?category=${category.name.toLowerCase()}`}
                  className={`${category.color} rounded-lg p-4 flex flex-col items-center justify-center transition-transform hover:scale-105`}
                >
                  <span className="text-3xl mb-2">{category.icon}</span>
                  <span className="font-medium capitalize">{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="mb-20 mt-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold section-heading inline-block">Featured Products</h2>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">Discover our carefully selected products that offer the best quality and value</p>
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <div key={product.id} className="animate-[fadeIn_0.5s_ease-in]" style={{ animationDelay: `${index * 0.1}s` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/products" 
            className="btn-secondary px-8 py-3 rounded-md font-medium inline-flex items-center"
          >
            View All Products
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-20 py-16 bg-gradient-to-br from-green-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold section-heading inline-block">Why Choose Us</h2>
            <p className="text-gray-600 mt-6 max-w-2xl mx-auto">We're committed to providing you with the best shopping experience</p>
          </div>
          
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">Quality Products</h3>
              <p className="text-gray-600">We ensure that all our products are of the highest quality, sourced directly from trusted suppliers.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">Affordable Prices</h3>
              <p className="text-gray-600">We offer competitive prices so you get the best value for your money with regular deals and discounts.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498.98m-1.472 2.684a1 1 0 01-.5.174h-5.13a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2h-5.13a1 1 0 01-.5-.174L9.272 4.684A1 1 0 018.323 4H5a2 2 0 00-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">Fast Delivery</h3>
              <p className="text-gray-600">We deliver your order quickly and efficiently to your doorstep with real-time tracking and updates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold section-heading inline-block">What Our Customers Say</h2>
            <p className="text-gray-600 mt-6 max-w-2xl mx-auto">Hear from our satisfied customers about their shopping experience</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md relative">
              <div className="absolute -top-6 left-6 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                R
              </div>
              <div className="pt-6">
                <div className="flex mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "The quality of products is exceptional. I love how everything is as described, and the delivery was faster than expected!"
                </p>
                <div className="font-semibold">Rahul Sharma</div>
                <div className="text-sm text-gray-500">Regular Customer</div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md relative">
              <div className="absolute -top-6 left-6 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                P
              </div>
              <div className="pt-6">
                <div className="flex mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "I've been shopping here for years and the service is consistently outstanding. The pricing is also very reasonable."
                </p>
                <div className="font-semibold">Priya Patel</div>
                <div className="text-sm text-gray-500">Loyal Customer</div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md relative">
              <div className="absolute -top-6 left-6 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                A
              </div>
              <div className="pt-6">
                <div className="flex mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "The online ordering system is so easy to use and the selection of products is amazing. Highly recommend!"
                </p>
                <div className="font-semibold">Amit Verma</div>
                <div className="text-sm text-gray-500">New Customer</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="mb-20 bg-gradient-to-r from-green-600 to-teal-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-3">Join Our Newsletter</h2>
          <p className="text-gray-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive updates on new products, special offers, and exclusive deals.
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800"
            />
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-md font-medium transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
