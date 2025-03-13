import React from "react";

const Footer = () => {
  return (
    <footer className=" py-8 border-t border-slate-300">
      <div className="container px-5 md:px-10 lg:px-28 mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">About Joli</h3>
          <p className="text-gray-500 font-medium">
            Joli is a platform dedicated to connecting individuals with job opportunities that fit their skills and preferences. Our mission is to simplify job searching and hiring.
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul>
            <li className="mb-2">
              <a href="/about" className="text-gray-900 hover:text-primary hover:underline">About Us</a>
            </li>
            <li className="mb-2">
              <a href="/jobs" className="text-gray-900 hover:text-primary hover:underline">Jobs</a>
            </li>
            <li className="mb-2">
              <a href="/contact" className="text-gray-900 hover:text-primary hover:underline">Contact</a>
            </li>
            <li>
              <a href="/privacy" className="text-gray-900 hover:text-primary hover:underline">Privacy Policy</a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <p className="text-gray-900 hover:text-slate-500 mb-2">Email: support@joli.com</p>
          <p className="text-gray-900 hover:text-slate-500 mb-2">Phone: +91-9876543210</p>
          <p className="text-gray-900 hover:text-slate-500">Address: 123 Joli Street, Kochi, Kerala</p>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-500">
        &copy; {new Date().getFullYear()} Joli. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
