import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookHeart, Feather, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const FeatureCard = ({ icon, title, description, delay }) => (
  <motion.div
    className="bg-card p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center glassmorphism"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="p-4 bg-gradient-to-br from-primary to-secondary rounded-full mb-4 text-primary-foreground">
      {React.createElement(icon, { size: 32 })}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
    <p className="text-foreground/80 text-sm">{description}</p>
  </motion.div>
);

const HomePage = () => {
  return (
    <div className="space-y-16">
      <section className="text-center py-12 md:py-20 bg-gradient-to-b from-purple-100/30 via-blue-100/20 to-transparent rounded-xl shadow-inner">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold mb-6 gradient-text"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          Welcome to Kingdom Pages
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-foreground/90 max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        >
          Discover a curated collection of Christian digital material: uplifting books, engaging comics, and inspiring stories for all ages.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4, type: 'spring', stiffness: 150 }}
        >
          <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground shadow-lg transform hover:scale-105 transition-transform duration-300 group">
            <NavLink to="/library">
              Explore Our Library <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </NavLink>
          </Button>
        </motion.div>
      </section>

      <section>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">
          What We Offer
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={BookHeart}
            title="Inspiring Books"
            description="Dive into a world of faith-based literature that nourishes the soul and strengthens your spirit."
            delay={0.2}
          />
          <FeatureCard
            icon={Feather}
            title="Engaging Comics & Stories"
            description="Experience timeless truths and biblical narratives brought to life through vibrant comics and captivating short stories."
            delay={0.4}
          />
          <FeatureCard
            icon={Users}
            title="Community Focused"
            description="Connect with stories that resonate, share insights, and grow in a community of like-minded readers."
            delay={0.6}
          />
        </div>
      </section>

      <section className="py-12 md:py-20 bg-card/70 rounded-xl shadow-xl glassmorphism">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6 gradient-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Featured Content
          </motion.h2>
          <motion.p 
            className="text-lg text-foreground/80 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover our handpicked selections that are currently inspiring readers.
          </motion.p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "The Pilgrim's Journey", type: "Book", imgUrl: "https://images.unsplash.com/photo-1694388001616-1176f534d72f" },
              { title: "Heroes of Faith", type: "Comic Series", imgUrl: "https://images.unsplash.com/photo-1580377968131-bac075a3e7ab" },
              { title: "Parables Reimagined", type: "Short Stories", imgUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-background p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              >
                <div className="w-full h-48 bg-gradient-to-br from-purple-200 to-blue-200 rounded-md mb-4 flex items-center justify-center">
                  <img src={item.imgUrl} alt={item.title} className="object-cover h-full w-full rounded-md opacity-70" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.type}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="text-center">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-6 gradient-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Ready to Explore?
        </motion.h2>
        <motion.p 
          className="text-lg text-foreground/80 max-w-xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Join our community and embark on a journey of faith and inspiration.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4, type: 'spring', stiffness: 150 }}
        >
          <Button asChild size="lg" className="bg-gradient-to-r from-accent to-green-400 hover:from-accent/90 hover:to-green-400/90 text-accent-foreground shadow-lg transform hover:scale-105 transition-transform duration-300 group">
            <NavLink to="/contact">
              Get In Touch <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </NavLink>
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;