import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getProductById } from "@/services/productService";
import { notFound } from "next/navigation";
import { Product } from "@/types";
import ProductActions from "@/components/ProductActions";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  // Parse the ID first
  const id = parseInt(params.id);
  
  try {
    const product = await getProductById(id);
    if (!product) {
      return {
        title: "Product Not Found - UT Mart",
        description: "The product you are looking for does not exist.",
      };
    }
    
    return {
      title: `${product.title} - UT Mart`,
      description: product.description.substring(0, 160),
    };
  } catch (error) {
    return {
      title: "Product Not Found - UT Mart",
      description: "The product you are looking for does not exist.",
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Parse the ID first
  const id = parseInt(params.id);
  
  // Fetch product details
  try {
    const product = await getProductById(id);
    
    if (!product) {
      notFound();
    }
    
    return (
      <div className="animate-[fadeIn_0.5s_ease-in]">
        <div className="mb-8">
          <Link 
            href="/products" 
            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Products
          </Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Product Image */}
            <div className="relative h-80 md:h-96 bg-white rounded-lg overflow-hidden border">
              <Image 
                src={product.image} 
                alt={product.title} 
                fill
                className="object-contain p-4"
              />
            </div>
            
            {/* Product Details */}
            <div className="flex flex-col">
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <span className="text-sm font-medium text-white bg-green-600 px-3 py-1 rounded-full capitalize">
                    {product.category}
                  </span>
                  <div className="ml-3 flex items-center">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i}
                          className={`h-5 w-5 ${i < Math.round(product.rating.rate) ? 'text-yellow-400' : 'text-gray-300'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm ml-2">({product.rating.count} reviews)</span>
                  </div>
                </div>
                
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{product.title}</h1>
                <p className="text-green-600 text-2xl font-bold mb-4">₹{product.price.toFixed(2)}</p>
                <div className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-md inline-flex items-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  In Stock ({product.stock || product.rating.count} available)
                </div>
              </div>
              
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-gray-600">{product.description}</p>
              </div>
              
              <div className="mt-auto">
                <ProductActions productData={JSON.stringify(product)} />
                
                <div className="border-t pt-4">
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Fast Delivery Available
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Genuine Product
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
} 