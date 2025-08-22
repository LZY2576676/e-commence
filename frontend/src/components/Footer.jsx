import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="border-t border-gray-200 pt-10 mt-20">
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between gap-8 mb-10">
                <div className="md:w-1/3 md:mr-4">
                    <img 
                      src={assets.logo} 
                      alt="Logo" 
                      style={{ width: '100px', height: 'auto', marginBottom: '1.25rem' }} 
                    />
                    <p className="text-gray-600 max-w-lg">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                    </p>
                </div>
                
                <div className="flex flex-row justify-center space-x-16 md:w-2/3">
                    {/* COMPANY Section */}
                    <div className="w-1/2 md:w-auto">
                        <p className="text-lg font-medium mb-4">COMPANY</p>
                        <ul className="flex flex-col gap-2 text-gray-600">
                            <li><Link to="/" className="hover:text-black transition-colors">Home</Link></li>
                            <li><Link to="/about" className="hover:text-black transition-colors">About us</Link></li>
                            <li><Link to="/collection" className="hover:text-black transition-colors">Collection</Link></li>
                            <li><a href="#" className="hover:text-black transition-colors">Privacy policy</a></li>
                        </ul>
                    </div>
                    
                    {/* GET IN TOUCH Section */}
                    <div className="w-1/2 md:w-auto">
                        <p className="text-lg font-medium mb-4">GET IN TOUCH</p>
                        <ul className="flex flex-col gap-2 text-gray-600">
                            <li className="flex items-center gap-2">
                                {/* Simplified phone icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="inline-block flex-shrink-0">
                                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                                </svg>
                                +123 456 7890
                            </li>
                            <li className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="inline-block flex-shrink-0">
                                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                                </svg>
                                info@example.com
                            </li>
                            <li className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="inline-block flex-shrink-0">
                                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                                </svg>
                                123 Main St, Anytown, USA
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div className="border-t border-gray-200 py-6 text-center text-sm text-gray-600">
                <p>Copyright 2024© forever.com - All Rights Reserved</p>
            </div>
        </div>
    </div>
  )
}

export default Footer