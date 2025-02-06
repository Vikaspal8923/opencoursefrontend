import React from 'react'

function Footer() {

  return (
    <footer className="bg-gray-950 text-gray-300 py-8">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Left Section */}
        <div className=' flex flex-col justify-start items-start '>
          <img width={200} height={20} src="/open-course-logo-3.png" alt="" />
          <p className="mt-1 text-sm ">
            To conquer the fear of placement.
          </p>
        </div>

        {/* Middle Section - Quick Links and Legal */}
        <div className="grid grid-cols-2 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-indigo-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/userpanel" className="hover:text-indigo-400 transition-colors">
                  Courses
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-indigo-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Contribute Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Section - Contact */}
        <div>
          
          <div className="flex flex-col justify-center md:justify-start items-start">
          <h3 className="text-lg font-semibold text-white mb-1">Get in Touch</h3>
          <div>
          <span className="text-lg">📧</span>
            <a href="mailto:aaryanmeena96@gmail.com" className="hover:text-indigo-400 transition-colors">
              aaryanmeena96@gmail.com
            </a>
          </div>
           
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center mt-8 border-t border-gray-700 pt-4">
        <p className="text-sm">
          Copyright © 2024 | All Rights Reserved.
        </p>
      </div>
    </footer>
  );


}

export default Footer