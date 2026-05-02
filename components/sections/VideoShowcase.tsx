// Video Showcase Section Component for Habimint
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

interface VideoShowcaseProps {
  videoUrl?: string;
  thumbnailUrl?: string;
}

export const VideoShowcase: React.FC<VideoShowcaseProps> = ({
  videoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  thumbnailUrl = '/video-thumbnail.jpg',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-20 bg-habimint-dark text-white">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="See Habimint in Action"
          subtitle="Discover how our journals can transform your daily practice"
        />

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
            {!isPlaying ? (
              <>
                {/* Thumbnail */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-habimint-primary to-habimint-accent cursor-pointer"
                  onClick={() => setIsPlaying(true)}
                >
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.button
                      className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Play video"
                    >
                      <Play className="w-10 h-10 text-habimint-primary ml-1" fill="currentColor" />
                    </motion.button>
                  </div>
                </div>
              </>
            ) : (
              // Video Player
              // TODO: Replace with actual video embed when available
              <iframe
                src={videoUrl}
                title="Habimint Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>

          {/* Video Description */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-lg text-habimint-primary-light max-w-2xl mx-auto">
              Watch how Habimint journals guide you through a transformative journey of self-discovery and growth.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};