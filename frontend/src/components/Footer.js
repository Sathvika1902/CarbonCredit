const Footer = () => (
    <footer className="bg-gray-900 text-white py-8 text-center">
        <div className="container mx-auto">
            <p className="text-sm mb-2">
                &copy; {new Date().getFullYear()} Carbon Clear. All rights reserved.
            </p>
            <p className="text-xs mb-4">
                Empowering sustainability through blockchain technology.
            </p>
            <div className="flex justify-center space-x-6">
                <a href="/privacy" className="text-xs hover:text-green-400">
                    Privacy Policy
                </a>
                <a href="/terms" className="text-xs hover:text-green-400">
                    Terms of Service
                </a>
                <a href="/contact" className="text-xs hover:text-green-400">
                    Contact Us
                </a>
            </div>
        </div>
    </footer>
);

export default Footer;
