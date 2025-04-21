"use client";

import { useRouter } from 'next/navigation';

interface ProductSortProps {
  selectedCategory: string;
  sortBy: string;
}

export default function ProductSort({ selectedCategory, sortBy }: ProductSortProps) {
  const router = useRouter();
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(`/products?category=${selectedCategory}&sort=${e.target.value}`);
  };
  
  return (
    <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-200">
      <span className="text-xs font-medium text-gray-700 mr-2 pl-2">Sort by:</span>
      <div className="relative">
        <select 
          id="mobile-sort"
          className="appearance-none bg-transparent pr-8 py-2 text-xs text-gray-700 font-medium focus:outline-none"
          onChange={handleSortChange}
          value={sortBy}
        >
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name (A-Z)</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
      </div>
    </div>
  );
} 