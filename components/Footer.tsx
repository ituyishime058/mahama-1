
import React from 'react';
import FacebookIcon from './icons/FacebookIcon';
import TwitterIcon from './icons/TwitterIcon';
import InstagramIcon from './icons/InstagramIcon';
import YoutubeIcon from './icons/YoutubeIcon';
import { useTranslation } from '../hooks/useTranslation';

interface FooterProps {
    onInfoPageClick: (page: 'about' | 'careers' | 'contact' | 'advertise') => void;
}

const Footer: React.FC<FooterProps> = ({ onInfoPageClick }) => {
  const { t } = useTranslation();
  return (
    <footer className="bg-white dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Newsletter Section */}
        <div className="bg-slate-100 dark:bg-navy p-8 rounded-lg mb-12 flex flex-col md:flex-row items-center justify-between">
            <div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{t('stayAhead')}</h3>
                <p className="text-slate-600 dark:text-slate-300">{t('newsletterDesc')}</p>
            </div>
            <form className="mt-4 md:mt-0 flex w-full max-w-md">
                <input type="email" placeholder={t('enterYourEmail')} className="w-full px-4 py-2 rounded-l-md border-0 focus:ring-2 focus:ring-deep-red dark:bg-slate-800 dark:text-white" />
                <button type="submit" className="bg-deep-red text-white font-semibold px-6 py-2 rounded-r-md hover:bg-red-700 transition-colors">{t('subscribe')}</button>
            </form>
        </div>
        
        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold text-slate-800 dark:text-white mb-4">{t('news')}</h4>
            <ul className="space-y-2 text-sm">
              <li><button className="hover:text-deep-red dark:hover:text-gold">{t('world')}</button></li>
              <li><button className="hover:text-deep-red dark:hover:text-gold">{t('politics')}</button></li>
              <li><button className="hover:text-deep-red dark:hover:text-gold">{t('economy')}</button></li>
              <li><button className="hover:text-deep-red dark:hover:text-gold">{t('technology')}</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 dark:text-white mb-4">{t('features')}</h4>
            <ul className="space-y-2 text-sm">
              <li><button className="hover:text-deep-red dark:hover:text-gold">{t('mahama_360')}</button></li>
              <li><button className="hover:text-deep-red dark:hover:text-gold">{t('podcastsAndVideo')}</button></li>
              <li><button className="hover:text-deep-red dark:hover:text-gold">{t('mahamaInvestigates')}</button></li>
              <li><button className="hover:text-deep-red dark:hover:text-gold">{t('communityForum')}</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 dark:text-white mb-4">{t('aboutMNH')}</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onInfoPageClick('about')} className="hover:text-deep-red dark:hover:text-gold">{t('aboutUs')}</button></li>
              <li><button onClick={() => onInfoPageClick('careers')} className="hover:text-deep-red dark:hover:text-gold">{t('careers')}</button></li>
              <li><button onClick={() => onInfoPageClick('contact')} className="hover:text-deep-red dark:hover:text-gold">{t('contact')}</button></li>
              <li><button onClick={() => onInfoPageClick('advertise')} className="hover:text-deep-red dark:hover:text-gold">{t('advertise')}</button></li>
            </ul>
          </div>
           <div>
            <h4 className="font-bold text-slate-800 dark:text-white mb-4">{t('legal')}</h4>
            <ul className="space-y-2 text-sm">
              <li><button className="hover:text-deep-red dark:hover:text-gold">{t('termsOfUse')}</button></li>
              <li><button className="hover:text-deep-red dark:hover:text-gold">{t('privacyPolicy')}</button></li>
              <li><button className="hover:text-deep-red dark:hover:text-gold">{t('cookiePolicy')}</button></li>
              <li><button className="hover:text-deep-red dark:hover:text-gold">{t('accessibility')}</button></li>
            </ul>
          </div>
        </div>

        {/* Copyright & Socials */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm">&copy; {new Date().getFullYear()} {t('logoText')}. {t('allRightsReserved')}</p>
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