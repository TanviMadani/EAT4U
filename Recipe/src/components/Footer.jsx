import React from "react";
import { motion } from "framer-motion";
import { 
    FiInstagram, 
    FiTwitter, 
    FiFacebook, 
    FiYoutube,
    FiMail,
    FiPhone,
    FiMapPin
} from "react-icons/fi";

const Footer = () => {
    const footerLinks = {
        company: [
            { name: "About Us", href: "#" },
            { name: "Careers", href: "#" },
            { name: "Press", href: "#" },
            { name: "Blog", href: "#" }
        ],
        support: [
            { name: "Help Center", href: "#" },
            { name: "Contact Us", href: "#" },
            { name: "Privacy Policy", href: "#" },
            { name: "Terms of Service", href: "#" }
        ],
        legal: [
            { name: "Cookie Policy", href: "#" },
            { name: "GDPR", href: "#" },
            { name: "Accessibility", href: "#" },
            { name: "Sitemap", href: "#" }
        ]
    };

    const socialLinks = [
        { icon: FiInstagram, href: "#", label: "Instagram" },
        { icon: FiTwitter, href: "#", label: "Twitter" },
        { icon: FiFacebook, href: "#", label: "Facebook" },
        { icon: FiYoutube, href: "#", label: "YouTube" }
    ];

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-white">🍳 RecipeHub</h3>
                        <p className="text-gray-400">
                            Your ultimate destination for delicious recipes and cooking inspiration.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="text-gray-400 hover:text-white transition-colors"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-6 h-6" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Company</h4>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <motion.a
                                        href={link.href}
                                        whileHover={{ x: 5 }}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </motion.a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Support</h4>
                        <ul className="space-y-2">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <motion.a
                                        href={link.href}
                                        whileHover={{ x: 5 }}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </motion.a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-center space-x-3">
                                <FiMail className="w-5 h-5" />
                                <span>support@recipehub.com</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <FiPhone className="w-5 h-5" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <FiMapPin className="w-5 h-5" />
                                <span>123 Cooking Street, Food City</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} RecipeHub. All rights reserved.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            {footerLinks.legal.map((link) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    whileHover={{ scale: 1.05 }}
                                    className="text-gray-400 hover:text-white text-sm transition-colors"
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
