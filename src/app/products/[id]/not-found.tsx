import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        We couldn't find the product you're looking for. It may have been removed or doesn't exist.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/products"
          className="btn-primary px-6 py-3 rounded-md font-medium flex items-center justify-center"
        >
          Browse Products
        </Link>
        <Link
          href="/"
          className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
} 