import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getLibraryItemById } from '@/pages/LibraryPage'; 
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Home, BookOpenText, FileText, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ReadingPage = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState([]);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const libraryItem = getLibraryItemById(itemId);
    setItem(libraryItem);
    if (libraryItem && libraryItem.type !== 'PDF' && libraryItem.content) {
      const wordsPerSegment = 150; 
      const words = libraryItem.content.split(/\s+/);
      const segments = [];
      for (let i = 0; i < words.length; i += wordsPerSegment) {
        segments.push(words.slice(i, i + wordsPerSegment).join(' '));
      }
      setPages(segments);
    } else if (libraryItem && libraryItem.type === 'PDF') {
      setPages([]); 
    } else {
      setPages(["Content not available."]);
    }
    setCurrentPage(0); 
  }, [itemId]);

  const nextPage = () => {
    if (item && item.type !== 'PDF' && currentPage < pages.length - 1) {
      setDirection(1);
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (item && item.type !== 'PDF' && currentPage > 0) {
      setDirection(-1);
      setCurrentPage(currentPage - 1);
    }
  };

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center">
        <BookOpenText size={64} className="text-primary mb-4 animate-pulse" />
        <h1 className="text-3xl font-bold gradient-text mb-2">Loading Content...</h1>
        <p className="text-muted-foreground">Please wait while we fetch the material.</p>
        <Button asChild variant="link" className="mt-4">
            <NavLink to="/library">Back to Library</NavLink>
        </Button>
      </div>
    );
  }

  const pageVariants = {
    initial: dir => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.9,
      rotateY: dir > 0 ? -45 : 45,
    }),
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: { type: "spring", stiffness: 120, damping: 20, duration: 0.5 }
    },
    exit: dir => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
      scale: 0.9,
      rotateY: dir > 0 ? 45 : -45,
      transition: { type: "spring", stiffness: 120, damping: 20, duration: 0.3 }
    })
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-4 md:p-8"
    >
      <Card className="shadow-2xl overflow-hidden glassmorphism border-primary/20">
        <CardHeader className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 p-6">
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <div className="flex items-center space-x-2">
              {item.type === 'PDF' ? <FileText className="h-8 w-8 text-red-500" /> : <BookOpenText className="h-8 w-8 text-primary" />}
              <CardTitle className="text-3xl md:text-4xl gradient-text mb-1">{item.title}</CardTitle>
            </div>
            <CardDescription className="text-md text-muted-foreground ml-10">By {item.author} - {item.type}</CardDescription>
          </motion.div>
        </CardHeader>
        
        <CardContent className="p-0 md:p-0 min-h-[500px] md:min-h-[70vh] flex flex-col justify-between relative overflow-hidden">
          {item.type === 'PDF' && item.pdfUrl ? (
            <iframe
              src={item.pdfUrl}
              title={item.title}
              className="w-full h-[calc(70vh-0px)] md:h-[calc(70vh-0px)] border-0"
              allowFullScreen
            >
              <p>Your browser does not support PDFs. Please download the PDF to view it: <a href={item.pdfUrl}>Download PDF</a>.</p>
            </iframe>
          ) : item.type !== 'PDF' && pages.length > 0 ? (
            <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentPage}
                  custom={direction}
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="text-lg leading-relaxed text-foreground/90 whitespace-pre-line prose max-w-none flex-grow"
                  style={{ perspective: "1000px" }} 
                >
                  {pages[currentPage]}
                </motion.div>
              </AnimatePresence>
              
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-border/50">
                <Button 
                  onClick={prevPage} 
                  disabled={currentPage === 0} 
                  variant="outline" 
                  className="group"
                >
                  <ChevronLeft size={20} className="mr-2 transition-transform duration-300 group-hover:-translate-x-1" /> Previous
                </Button>
                <span className="text-sm text-muted-foreground">Page {currentPage + 1} of {pages.length}</span>
                <Button 
                  onClick={nextPage} 
                  disabled={currentPage === pages.length - 1} 
                  variant="outline" 
                  className="group"
                >
                  Next <ChevronRight size={20} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          ) : (
             <div className="p-6 md:p-8 flex-grow flex items-center justify-center">
                <p className="text-muted-foreground text-xl">Content not available for this item.</p>
             </div>
          )}
        </CardContent>
      </Card>

      <motion.div 
        initial={{ y: 20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ delay: 0.4 }}
        className="mt-8 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
      >
        <Button asChild variant="ghost" className="group w-full sm:w-auto">
          <NavLink to="/library">
            <BookOpenText size={18} className="mr-2 transition-transform duration-300 group-hover:rotate-[-5deg]" /> Back to Library
          </NavLink>
        </Button>
        {item.type === 'PDF' && item.pdfUrl && (
           <Button asChild variant="outline" className="group w-full sm:w-auto border-accent text-accent hover:bg-accent/10 hover:text-accent">
            <a href={item.pdfUrl} target="_blank" rel="noopener noreferrer">
              Open PDF in New Tab <ExternalLink size={18} className="ml-2 transition-transform duration-300 group-hover:scale-110" />
            </a>
          </Button>
        )}
        <Button asChild variant="ghost" className="group w-full sm:w-auto">
          <NavLink to="/">
             <Home size={18} className="mr-2 transition-transform duration-300 group-hover:scale-110" /> Go Home
          </NavLink>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default ReadingPage;