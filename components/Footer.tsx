import React from 'react';
import FacebookIcon from './icons/FacebookIcon';
import TwitterIcon from './icons/TwitterIcon';
import InstagramIcon from './icons/InstagramIcon';
import YoutubeIcon from './icons/YoutubeIcon';


const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Newsletter Section */}
        <div className="bg-slate-100 dark:bg-navy p-8 rounded-lg mb-12 flex flex-col md:flex-row items-center justify-between">
            <div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Stay Ahead of the Curve</h3>
                <p className="text-slate-600 dark:text-slate-300">Subscribe to our newsletter for daily headlines and breaking news alerts.</p>
            </div>
            <form className="mt-4 md:mt-0 flex w-full max-w-md">
                <input type="email" placeholder="Enter your email" className="w-full px-4 py-2 rounded-l-md border-0 focus:ring-2 focus:ring-deep-red dark:bg-slate-800 dark:text-white" />
                <button type="submit" className="bg-deep-red text-white font-semibold px-6 py-2 rounded-r-md hover:bg-red-700 transition-colors">Subscribe</button>
            </form>
        </div>
        
        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold text-slate-800 dark:text-white mb-4">News</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-deep-red dark:hover:text-gold">World</a></li>
              <li><a href="#" className="hover:text-deep-red dark:hover:text-gold">Politics</a></li>
              <li><a href="#" className="hover:text-deep-red dark:hover:text-gold">Economy</a></li>
              <li><a href="#" className="hover:text-deep-red dark:hover:text-gold">Technology</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 dark:text-white mb-4">Features</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-deep-red dark:hover:text-gold">Mahama 360°</a></li>
              <li><a href="#" className="hover:text-deep-red dark:hover:text-gold">Podcasts & Video</a></li>
              <li><a href="#" className="hover:text-deep-red dark:hover:text-gold">Mahama Investigates</a></li>
              <li><a href="#" className="hover:text-deep-red dark:hover:text-gold">Community Forum</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 dark:text-white mb-4">About</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-deep-red dark:hover:text-gold">About Us</a></li>
              <li><a href="#" className="hover:text-deep-red dark:hover:text-gold">Careers</a></li>
              <li><a href="#" className="hover:text-deep-red dark:hover:text-gold">Contact</a></li>
              <li><a href="#" className="hover:text-deep-red dark:hover:text-gold">Advertise</a></li>
            </ul>
          </div>
           <div>
            <h4 className="font-bold text-slate-800 dark:text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-deep-red dark:hover:text-gold">Terms of Use</a></li>
              <li><a href="#" className="hover:text-deep-red dark:hover:text-gold">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-deep-red dark:hover:text-gold">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-deep-red dark:hover:text-gold">Accessibility</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright & Socials */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm">&copy; {new Date().getFullYear()} Mahama News Hub. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-deep-red dark:hover:text-gold" aria-label="Facebook"><FacebookIcon /></a>
            <a href="#" className="hover:text-deep-red dark:hover:text-gold" aria-label="Twitter"><TwitterIcon /></a>
            <a href="#" className="hover:text-deep-red dark:hover:text-gold" aria-label="Instagram"><InstagramIcon /></a>
            <a href="#" className="hover:text-deep-red dark:hover:text-gold" aria-label="YouTube"><YoutubeIcon /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
