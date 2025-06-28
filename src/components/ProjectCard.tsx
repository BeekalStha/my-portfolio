'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { FiExternalLink, FiGithub } from 'react-icons/fi'

interface ProjectFile {
  path: string;
  url: string;
  type: string;
}

interface Project {
  id: number;
  name: string;
  description: string;
  files?: ProjectFile[];
  start_date?: string;
  end_date?: string;
  status?: string;
  technologies?: string[];
  github_url?: string;
  live_url?: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
  const firstImage = project.files?.find(file => file.type === 'image')
  const videoFiles = project.files?.filter(file => file.type === 'video') || []

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-card rounded-xl border border-bd overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Project Image/Thumbnail */}
      <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-800">
        {firstImage ? (
          <Image
            src={firstImage.url}
            alt={project.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No preview available
          </div>
        )}
        {videoFiles.length > 0 && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded flex items-center">
            <span className="mr-1">🎥</span>
            {videoFiles.length} video{videoFiles.length > 1 ? 's' : ''}
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-fg">
            <Link href={`/projects/${project.id}`} className="hover:underline">
              {project.name}
            </Link>
          </h3>
          {project.status && (
            <span className={`text-xs px-2 py-1 rounded-full ${
              project.status.toLowerCase() === 'completed' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
            }`}>
              {project.status}
            </span>
          )}
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 rounded-full text-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Dates */}
        {project.start_date && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            {new Date(project.start_date).toLocaleDateString()}
            {project.end_date && ` - ${new Date(project.end_date).toLocaleDateString()}`}
          </p>
        )}

        {/* Links */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
          <Link 
            href={`/projects/${project.id}`}
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            View Details →
          </Link>

          <div className="flex gap-3">
            {project.github_url && (
              <a 
                href={project.github_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="GitHub repository"
              >
                <FiGithub className="w-5 h-5" />
              </a>
            )}
            {project.live_url && (
              <a 
                href={project.live_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="Live demo"
              >
                <FiExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard