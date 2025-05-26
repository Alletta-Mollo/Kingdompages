import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { BookOpenText, Home, Info, Mail, Menu, X } from 'lucide-react';

const navItems = [
	{ name: 'Home', path: '/', icon: Home },
	{ name: 'Library', path: '/library', icon: BookOpenText },
	{ name: 'About Us', path: '/about', icon: Info },
	{ name: 'Contact Us', path: '/contact', icon: Mail },
];

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

	return (
		<div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-purple-50 to-sky-50"> {/* Updated to-sky-50 */}
			<header className="sticky top-0 z-50 shadow-lg glassmorphism">
				<nav className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-20">
						<NavLink to="/" className="flex items-center space-x-2">
							<motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
              >
                <BookOpenText className="h-10 w-10 gradient-text" />
              </motion.div>
							<span className="text-2xl font-bold gradient-text">Kingdom Pages</span>
						</NavLink>

						<div className="hidden md:flex items-center space-x-4">
							{navItems.map((item, index) => (
								<motion.div
                  key={item.name}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index + 0.5 }}
                >
									<NavLink
										to={item.path}
										className={({ isActive }) =>
											`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out hover:text-primary transform hover:scale-105 ${
												isActive ? 'text-primary font-semibold border-b-2 border-primary' : 'text-foreground/80'
											}`
										}
									>
										{item.name}
									</NavLink>
								</motion.div>
							))}
						</div>
            
						<div className="md:hidden flex items-center">
							<Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="Open menu">
								{isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
							</Button>
						</div>
					</div>
				</nav>

				<AnimatePresence>
					{isMobileMenuOpen && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.3, ease: 'easeInOut' }}
							className="md:hidden bg-card shadow-xl origin-top"
						>
							<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
								{navItems.map((item) => (
									<NavLink
										key={item.name}
										to={item.path}
										onClick={toggleMobileMenu}
										className={({ isActive }) =>
											`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
												isActive ? 'bg-primary/10 text-primary' : 'text-foreground/80 hover:bg-muted/50'
											}`
										}
									>
                    <div className="flex items-center space-x-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </div>
									</NavLink>
								))}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</header>

			<main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

			<footer className="bg-gradient-to-t from-purple-100 via-sky-50 to-transparent mt-12 py-12 text-center text-foreground/70"> {/* Updated via-sky-50 */}
				<motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
					<div className="flex justify-center space-x-6 mb-4">
            <BookOpenText className="h-8 w-8 text-primary" />
            <p className="text-sm">Kingdom Pages &copy; {new Date().getFullYear()}</p>
          </div>
					<p className="text-xs">Inspiring faith through digital stories.</p>
          <div className="mt-4 space-x-4">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
				</motion.div>
			</footer>
		</div>
	);
};

export default Layout;