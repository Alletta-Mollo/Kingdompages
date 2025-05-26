import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from "@/components/ui/slider";
import { Search, Filter, SortAsc, BookOpen, Star, Clock, FileText, Book } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const mockData = [
  { id: 1, title: "The Great Adventure", author: "John Doe", genre: "Fiction", length: 250, rating: 4.5, type: "Book", coverImgUrl: "https://images.unsplash.com/photo-1646156262402-801f1b25deb0", content: "Chapter 1: The Journey Begins...\n\nOnce upon a time, in a land far, far away, lived a brave adventurer named Alex. Alex was known throughout the kingdom for their courage and kind heart. One sunny morning, a royal messenger arrived with an urgent scroll. The King needed Alex's help! A fearsome dragon had been spotted near the Crystal Mountains, and the kingdom was in peril.\n\nAlex didn't hesitate. Packing a sturdy sword, a map, and some provisions, they set off towards the mountains. The path was treacherous, winding through dark forests and over roaring rivers. Along the way, Alex met a wise old owl who offered a cryptic piece of advice: \"The greatest strength is not in the sword, but in the wit.\"\n\nChapter 2: The Dragon's Lair...\n\nAfter many days of travel, Alex reached the Crystal Mountains. Smoke billowed from a large cave, and a fearsome roar echoed through the peaks. Taking a deep breath, Alex entered the dragon's lair. The dragon was enormous, with scales as green as emeralds and eyes like burning coals. It guarded a vast treasure, but Alex wasn't interested in gold. They needed to protect the kingdom.\n\nRemembering the owl's words, Alex decided to talk to the dragon instead of fighting. \"Great dragon,\" Alex began, \"why do you threaten our kingdom?\" The dragon, surprised, replied that it was lonely and misunderstood. Alex, using their wit, proposed a solution: the dragon could become the kingdom's protector, using its might for good. The dragon, touched by Alex's kindness and wisdom, agreed. And so, the adventurer and the dragon became unlikely friends, and the kingdom lived in peace and prosperity." },
  { id: 2, title: "Faithful Heroes: Vol 1", author: "Jane Smith", genre: "Comic", length: 60, rating: 4.8, type: "Comic", coverImgUrl: "https://images.unsplash.com/photo-1580377968131-bac075a3e7ab", content: "Page 1: Panel 1 - City in peril. Caption: Metro City was under attack! Page 2: Panel 1 - Enter Captain Faith! Caption: But hope was not lost! Captain Faith arrives!" },
  { id: 3, title: "Whispers of Hope", author: "Peter Jones", genre: "Stories", length: 120, rating: 4.2, type: "Story", coverImgUrl: "https://images.unsplash.com/photo-1506894768936-c82799873398", content: "The old lighthouse keeper, Samuel, often told tales of the sea. One stormy night, a ship was lost. Samuel, with unwavering hope, kept the light burning bright, guiding them to safety. His simple act of faith became a beacon of hope for the entire village." },
  { id: 4, title: "Chronicles of Light (PDF)", author: "Alice Brown", genre: "Fiction", length: 320, rating: 4.9, type: "PDF", coverImgUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765", pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
  { id: 5, title: "Guardians of Truth", author: "David Wilson", genre: "Comic", length: 75, rating: 4.6, type: "Comic", coverImgUrl: "https://images.unsplash.com/photo-1618259769402-9d9944a001c5", content: "Panel after panel of dynamic action showcasing the Guardians as they protect ancient secrets from falling into the wrong hands. Their powers are derived from their commitment to truth and justice." },
  { id: 6, title: "Parables for Today (PDF)", author: "Sarah Davis", genre: "Stories", length: 90, rating: 4.3, type: "PDF", coverImgUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f", pdfUrl: "https://www.clickdimensions.com/links/TestPDFfile.pdf" },
  { id: 7, title: "Journey to the Son", author: "Michael Clark", genre: "Fiction", length: 180, rating: 4.0, type: "Book", coverImgUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b", content: "A metaphorical novel about a man's spiritual journey, facing his doubts and fears, and ultimately finding redemption and peace through his unwavering faith and search for divine connection." },
  { id: 8, title: "The Comic Testament", author: "Various Artists", genre: "Comic", length: 150, rating: 4.7, type: "Comic", coverImgUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794", content: "Key biblical stories retold in comic book format, making them accessible and engaging for a new generation. From Creation to Revelation, vividly illustrated." },
  { id: 9, title: "Short Stories of Grace", author: "Emily White", genre: "Stories", length: 70, rating: 4.4, type: "Story", coverImgUrl: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d", content: "A heartwarming collection of tales where characters experience moments of unexpected grace and kindness, transforming their lives and perspectives. Each story is a gentle reminder of the power of compassion." },
];

const genres = ["All", "Fiction", "Comic", "Stories", "PDF"];
const authors = ["All", ...new Set(mockData.map(item => item.author))];

const LibraryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedAuthor, setSelectedAuthor] = useState('All');
  const [lengthRange, setLengthRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState('title_asc');
  const [showFilters, setShowFilters] = useState(false);

  const filteredAndSortedData = useMemo(() => {
    let items = mockData;

    if (searchTerm) {
      items = items.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (selectedGenre !== 'All') {
      items = items.filter(item => item.genre === selectedGenre);
    }
    if (selectedAuthor !== 'All') {
      items = items.filter(item => item.author === selectedAuthor);
    }
    items = items.filter(item => item.length >= lengthRange[0] && item.length <= lengthRange[1]);

    items.sort((a, b) => {
      if (sortBy === 'title_asc') return a.title.localeCompare(b.title);
      if (sortBy === 'title_desc') return b.title.localeCompare(a.title);
      if (sortBy === 'author_asc') return a.author.localeCompare(b.author);
      if (sortBy === 'author_desc') return b.author.localeCompare(a.author);
      if (sortBy === 'rating_desc') return b.rating - a.rating;
      return 0;
    });

    return items;
  }, [searchTerm, selectedGenre, selectedAuthor, lengthRange, sortBy]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="space-y-8">
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 md:p-8 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-xl shadow-lg glassmorphism"
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-4xl font-bold gradient-text">Our Digital Library</h1>
          <Button onClick={() => setShowFilters(!showFilters)} variant="outline" className="md:hidden flex items-center gap-2">
            <Filter size={18} /> {showFilters ? "Hide" : "Show"} Filters
          </Button>
        </div>
        
        <div className="relative mb-6">
          <Input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 text-lg h-12 bg-background/80 focus:ring-primary"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>

        <motion.div 
          className={`grid md:grid-cols-2 lg:grid-cols-4 gap-4 ${showFilters || window.innerWidth >= 768 ? 'grid' : 'hidden'}`}
          initial={false}
          animate={showFilters || window.innerWidth >= 768 ? "visible" : "hidden"}
          variants={{
            visible: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
            hidden: { opacity: 0, height: 0, transition: { duration: 0.3 } }
          }}
        >
          <div>
            <Label htmlFor="genre-select" className="text-sm font-medium text-foreground/80">Genre</Label>
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger id="genre-select" className="w-full bg-background/80">
                <SelectValue placeholder="Filter by genre" />
              </SelectTrigger>
              <SelectContent>
                {genres.map(genre => (
                  <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="author-select" className="text-sm font-medium text-foreground/80">Author</Label>
            <Select value={selectedAuthor} onValueChange={setSelectedAuthor}>
              <SelectTrigger id="author-select" className="w-full bg-background/80">
                <SelectValue placeholder="Filter by author" />
              </SelectTrigger>
              <SelectContent>
                {authors.map(author => (
                  <SelectItem key={author} value={author}>{author}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="lg:col-span-2">
            <Label htmlFor="length-slider" className="text-sm font-medium text-foreground/80">
              Length (pages/issues): {lengthRange[0]} - {lengthRange[1]}
            </Label>
            <Slider
              id="length-slider"
              min={0}
              max={500}
              step={10}
              value={lengthRange}
              onValueChange={setLengthRange}
              className="mt-2 accent-primary"
            />
          </div>

          <div>
            <Label htmlFor="sort-select" className="text-sm font-medium text-foreground/80">Sort By</Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger id="sort-select" className="w-full bg-background/80">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title_asc">Title (A-Z)</SelectItem>
                <SelectItem value="title_desc">Title (Z-A)</SelectItem>
                <SelectItem value="author_asc">Author (A-Z)</SelectItem>
                <SelectItem value="author_desc">Author (Z-A)</SelectItem>
                <SelectItem value="rating_desc">Rating (High to Low)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>
      </motion.section>

      {filteredAndSortedData.length > 0 ? (
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredAndSortedData.map(item => (
            <motion.div key={item.id} variants={itemVariants}>
              <Card className="h-full flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/80 glassmorphism transform hover:-translate-y-1">
                <CardHeader className="p-0">
                  <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center overflow-hidden">
                    <img src={item.coverImgUrl} alt={item.title} className="object-cover h-full w-full opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                  <CardTitle className="text-xl mb-1 gradient-text">{item.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground mb-2">By {item.author}</CardDescription>
                  <div className="flex items-center space-x-2 text-xs text-foreground/70">
                    {item.type === 'PDF' ? (
                      <span className="flex items-center"><FileText size={14} className="mr-1 text-red-500"/> {item.type}</span>
                    ) : (
                      <span className="flex items-center"><Book size={14} className="mr-1 text-primary"/> {item.type}</span>
                    )}
                    <span className="flex items-center"><Clock size={14} className="mr-1 text-secondary"/> {item.length} {item.type === 'PDF' ? 'MB' : 'pages'}</span>
                    <span className="flex items-center"><Star size={14} className="mr-1 text-accent"/> {item.rating}/5</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 border-t border-border/50">
                  <Button asChild variant="outline" className="w-full hover:bg-primary/10 hover:text-primary transition-colors group">
                    <NavLink to={`/read/${item.id}`}>
                      Read <BookOpen size={16} className="ml-2 transition-transform duration-300 group-hover:scale-110" />
                    </NavLink>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Search size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-xl text-muted-foreground">No items match your criteria. Try adjusting your filters.</p>
        </motion.div>
      )}
    </div>
  );
};

export const getLibraryItemById = (id) => {
  return mockData.find(item => item.id === parseInt(id));
};

export default LibraryPage;