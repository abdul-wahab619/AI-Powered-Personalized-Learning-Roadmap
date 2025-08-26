import { BookOpen, Facebook, Github, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className=" w-full bg-white dark:bg-gray-800 shadow-2xl dark:shadow-black/50 py-6 border-t border-gray-400 dark:border-gray-700 transition-colors duration-300 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          {/* Logo */}

          <nav className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-600 items-center font-medium dark:text-white/60">
            <div className="flex items-center cursor-pointer hover:opacity-80 transition-opacity pr-5 ">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
            </div>

            <a
              href="#"
              className="p-2 hover:bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:text-white"
            >
              Home
            </a>
            <a
              href="#"
              className="p-2 hover:bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:text-white"
            >
              Goals
            </a>
            <a
              href="#"
              className="p-2 hover:bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:text-white"
            >
              AI Chat
            </a>
            <a
              href="#"
              className="p-2 hover:bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:text-white"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="p-2 hover:bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:text-white"
            >
              About
            </a>
            <a
              href="#"
              className="p-2 hover:bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:text-white"
            >
              Contact us
            </a>
            <a
              href="#"
              className="p-2 hover:bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:text-white"
            >
              Blogs
            </a>
          </nav>

          {/* Social Icons */}
          <div className="flex gap-6">
            {/* Facebook */}
            <a
              href="#"
              className="text-gray-600  hover:text-blue-600 transition-colors flex items-center "
            >
              <Facebook />
            </a>

            {/* Instagram */}
            <a
              href="#"
              className="text-gray-600  hover:text-pink-500 transition-colors flex items-center"
            >
              <Instagram />
            </a>

            {/* GitHub */}
            <a
              href="#"
              className="text-gray-600  hover:text-gray-900 transition-colors flex items-center"
            >
              <Github />
            </a>
          </div>
        </div>

        {/* Bottom Text */}
        <p className="text-center text-gray-500 dark:text-white/60 text-sm">
          &copy; 2024 Your Company, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
