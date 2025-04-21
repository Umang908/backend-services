import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us - UT Mart",
  description: "Learn about UT Mart's journey, mission, values, and the team behind your favorite grocery store.",
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-[fadeIn_0.5s_ease-in]">
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden mb-16 bg-gray-900">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3"
            alt="UT Mart" 
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>
        
        <div className="relative z-10 py-24 px-6 sm:px-12 lg:px-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Our Story</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            From a small family shop to your trusted neighborhood grocery store
          </p>
        </div>
      </div>
      
      {/* History Section */}
      <div className="mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 relative inline-block">
              Our Journey
              <span className="absolute -bottom-2 left-0 h-1 w-10 bg-green-500 rounded-full"></span>
            </h2>
            <p className="text-gray-600 mb-6">
              UT Mart was founded in 1995 by the Sharma family with a simple mission - to provide fresh, 
              quality groceries to our local community at fair prices. What started as a small 500 sq. ft. corner 
              shop has now grown into a beloved neighborhood institution.
            </p>
            <p className="text-gray-600 mb-6">
              Over the past 25+ years, we've expanded to multiple locations across the city while keeping our 
              commitment to quality, freshness, and community at the heart of everything we do. We've embraced 
              technology to improve our services while maintaining the personal touch that makes us special.
            </p>
            <p className="text-gray-600">
              In 2020, we launched our online store to better serve our customers during challenging times, 
              and we continue to innovate and grow while staying true to our roots as a family-owned business 
              that cares deeply about the communities we serve.
            </p>
          </div>
          
          <div className="relative h-96 rounded-xl overflow-hidden shadow-md">
            <Image 
              src="https://images.unsplash.com/photo-1569204550547-ba6308f2752a?ixlib=rb-4.0.3" 
              alt="UT Mart History" 
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
      
      {/* Mission Statement */}
      <div className="bg-gray-50 rounded-xl p-8 sm:p-12 mb-20 shadow-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl text-gray-700 mb-6">
            "To nourish our communities by providing fresh, quality groceries with exceptional service, 
            supporting local producers, and operating with integrity in everything we do."
          </p>
          <div className="flex justify-center">
            <Link href="/products" className="btn-primary py-3 px-8 rounded-md inline-flex items-center">
              Explore Our Products
              <svg className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Our Values */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="bg-green-100 w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality</h3>
            <p className="text-gray-600">
              We source the freshest and highest quality products, rigorously checking each item before it 
              reaches our shelves.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="bg-green-100 w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-gray-600">
              We believe in giving back to the communities we serve through partnerships, events, and charitable initiatives.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="bg-green-100 w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Local</h3>
            <p className="text-gray-600">
              We support local farmers and producers, showcasing their products and strengthening our local economy.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="bg-green-100 w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Service</h3>
            <p className="text-gray-600">
              We're committed to creating a warm, friendly shopping experience where every customer feels valued.
            </p>
          </div>
        </div>
      </div>
      
      {/* Our Team */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Team</h2>
        
        <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ">
          <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            <div className="relative h-72">
              <Image 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3" 
                alt="Rajesh Sharma" 
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-1">Rajesh Sharma</h3>
              <p className="text-gray-500 mb-4">Founder & CEO</p>
              <p className="text-gray-600">
                With over 30 years in the grocery business, Rajesh founded UT Mart with a vision to serve the community.
              </p>
            </div>
          </div>

        </div>
        </div>
      </div>
      
      {/* Achievements */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Achievements</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Best Grocery Store 2022</h3>
            </div>
            <p className="text-gray-600">
              Awarded by the City Business Association for excellence in service and product quality.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Sustainability Champion</h3>
            </div>
            <p className="text-gray-600">
              Recognized for our waste reduction initiatives and eco-friendly packaging solutions.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Digital Innovation Award</h3>
            </div>
            <p className="text-gray-600">
              Honored for our seamless integration of traditional grocery shopping with digital convenience.
            </p>
          </div>
        </div>
      </div>
      
      {/* CTA */}
      <div className="bg-green-50 rounded-xl p-8 sm:p-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Want to stay updated on our latest products, promotions, and community events? 
          Subscribe to our newsletter or follow us on social media.
        </p>
        
        <form className="max-w-md mx-auto mb-8">
          <div className="flex">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-l-md border-gray-300 focus:ring-green-500 focus:border-green-500"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-r-md hover:bg-green-700 transition-colors"
            >
              Subscribe
            </button>
          </div>
        </form>
        
        <div className="flex justify-center space-x-4">
          <a href="#" className="text-gray-400 hover:text-green-600 transition-colors">
            <span className="sr-only">Facebook</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-green-600 transition-colors">
            <span className="sr-only">Instagram</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-green-600 transition-colors">
            <span className="sr-only">Twitter</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
} 