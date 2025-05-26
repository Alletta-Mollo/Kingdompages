import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import LibraryPage from '@/pages/LibraryPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import ReadingPage from '@/pages/ReadingPage'; 
import { Toaster } from '@/components/ui/toaster';

function App() {
	return (
		<Router>
			<Layout>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/library" element={<LibraryPage />} />
					<Route path="/about" element={<AboutPage />} />
					<Route path="/contact" element={<ContactPage />} />
          <Route path="/read/:itemId" element={<ReadingPage />} />
				</Routes>
			</Layout>
      <Toaster />
		</Router>
	);
}

export default App;