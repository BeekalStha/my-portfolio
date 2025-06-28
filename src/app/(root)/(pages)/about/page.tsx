'use client';

import Image from 'next/image';
import { FiMail, FiPhone, FiMapPin, FiGlobe, FiLoader } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useAboutMe } from '@/hooks/useAboutMe';
import { detectSocialPlatform, SocialLink } from '@/libs/utils/socialLinks';

const HomePage = ({ params }: { params: { id: number } }) => {
  const { aboutMe, isLoading, error } = useAboutMe(params.id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FiLoader className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  if (error || !aboutMe) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error || 'Profile not found'}</p>
      </div>
    );
  }

  // Process social links with proper null checks
  const socialLinks = aboutMe.social_links
    ? aboutMe.social_links
        .map(detectSocialPlatform)
        .filter((link): link is SocialLink => link !== null)
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br bg-bg py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-bg rounded-2xl shadow-xl overflow-hidden border border-bd">
          {/* Profile Header */}
          <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 p-8 sm:p-10 text-white">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white shadow-lg overflow-hidden">
                <Image
                  src={aboutMe.profile_picture || '/images/RNN-image.jpg'}
                  alt={aboutMe.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 128px, 160px"
                  priority
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">{aboutMe.name}</h1>
                <p className="text-xl sm:text-2xl text-blue-100 mb-4">{aboutMe.title}</p>
                <p className="text-blue-100 max-w-lg">{aboutMe.bio}</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Personal Info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="rounded-xl p-6 shadow-sm bg-card">
                <h2 className="text-xl font-semibold mb-4 text-fg">Personal Details</h2>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <FiMail className="text-indigo-500 text-lg" />
                    <a href={`mailto:${aboutMe.email}`} className="text-gray-600 hover:text-indigo-600">
                      {aboutMe.email}
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <FiPhone className="text-indigo-500 text-lg" />
                    <a href={`tel:${aboutMe.phone}`} className="text-gray-600 hover:text-indigo-600">
                      {aboutMe.phone}
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <FiMapPin className="text-indigo-500 text-lg" />
                    <span className="text-gray-600">{aboutMe.location}</span>
                  </li>
                  {aboutMe.age && (
                    <li className="flex items-center gap-3">
                      <span className="text-indigo-500 text-lg">🎂</span>
                      <span className="text-gray-600">{aboutMe.age} years</span>
                    </li>
                  )}
                </ul>
              </div>

              {/* Social Links Section */}
              {socialLinks.length > 0 && (
                <div className="rounded-xl p-6 shadow-sm bg-card">
                  <h2 className="text-xl font-semibold mb-4 text-fg">Social Links</h2>
                  <ul className="space-y-3">
                    {socialLinks.map((link, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <span className="text-lg">{link.icon}</span>
                        <a 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-indigo-600 truncate"
                        >
                          {link.platform}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right Column - Bio */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-fg">About Me</h2>
                <div className="prose max-w-none text-gray-600">
                  <p className="whitespace-pre-line">{aboutMe.description}</p>
                </div>
              </div>

              {/* Skills Section */}
              <div className="mt-6 bg-card rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-fg">Technical Skills</h2>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                    Laravel
                  </span>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                    Next.js
                  </span>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                    React.js
                  </span>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                    JavaScript
                  </span>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                    TypeScript
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;