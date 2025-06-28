'use client';
import { publicApi } from '@/libs/api/axios';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectFile {
  path: string;
  url: string;
  type: string;
}

interface Project {
  id: number;
  name: string;
  description: string;
  files: ProjectFile[];
  start_date: string;
  end_date: string;
  status: string;
}

const Project = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<{url: string, type: string} | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      
      try {
        const response = await publicApi.get('project');
        setProjects(response.data?.data || []);
      } catch (error) {
        setError('Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const openMediaModal = (url: string, type: string) => {
    setSelectedMedia({ url, type });
  };

  const closeMediaModal = () => {
    setSelectedMedia(null);
  };

  if (loading)
    return <div className="text-center py-8 text-white">Loading projects...</div>;

  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;

  if (!projects || projects?.length === 0) {
    return <div className="text-center py-8 text-gray-500">No projects available now.</div>;
  }

  return (
    <div className='bg-bg rounded-2xl border justify-center pt-2 border-bd flex min-h-screen'>
      {projects && projects?.length > 0 ? (
        <div className='w-full p-4'>
          {projects?.map((item) => (
            <div key={item.id} className='bg-bg rounded-lg shadow-md p-4 mb-4'>
              <Link href={`/projects/${item.id}`}>
                <h2 className='text-xl font-semibold text-fg hover:underline'>{item.name}</h2>
              </Link>
              <p className='text-gray-700 mt-2'>{item.description}</p>
              <div className='mt-2 text-sm text-gray-500'>
                <span>Status: {item.status}</span> | 
                <span> Start: {new Date(item.start_date).toLocaleDateString()}</span> - 
                <span> Finish: {new Date(item.end_date).toLocaleDateString()}</span>
              </div>
              
              {item.files && item.files.length > 0 && (
                <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                  {item.files.map((file, index) => (
                    <div 
                      key={index} 
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => openMediaModal(file.url, file.type)}
                    >
                      <div className="relative h-48 w-full rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
                        {file.type === 'image' ? (
                          <Image
                            src={file.url}
                            alt={`Project ${item.name} image ${index}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <>
                            <video 
                              className="absolute inset-0 w-full h-full object-cover"
                              muted
                              disablePictureInPicture
                              disableRemotePlayback
                            >
                              <source src={file.url} type={`video/${file.path.split('.').pop()}`} />
                            </video>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                </svg>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>No projects found</div>
      )}

      {/* Media Preview Modal */}
      {selectedMedia && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" 
          onClick={closeMediaModal}
        >
          <div 
            className="relative max-w-4xl w-full max-h-[90vh]" 
            onClick={e => e.stopPropagation()}
          >
            <button 
              className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300"
              onClick={closeMediaModal}
            >
              &times;
            </button>
            <div className="relative h-full w-full bg-black rounded-lg overflow-hidden">
              {selectedMedia.type === 'image' ? (
                <Image
                  src={selectedMedia.url}
                  alt="Project preview"
                  width={800}
                  height={600}
                  className="object-contain max-h-[80vh] mx-auto"
                />
              ) : (
                <video
                  controls
                  autoPlay
                  className="w-full h-full max-h-[80vh] mx-auto"
                >
                  <source src={selectedMedia.url} type={`video/${selectedMedia.url.split('.').pop()}`} />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Project;