'use client';
import { publicApi } from '@/libs/api/axios';
import { useParams } from 'next/navigation';
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
  files?: ProjectFile[];
  start_date: string;
  end_date: string;
  status: string;
}

const ProjectDetailById = () => {
    const params = useParams();
    const id = params?.id;
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjectById = async () => {
            if (!id) return;
            
            setLoading(true);
            try {
                const response = await publicApi.get(`project/${id}`);
                setProject(response.data?.data || null);
            } catch (error) {
                setError('Failed to fetch project');
            } finally {
                setLoading(false);
            }
        };

        fetchProjectById();
    }, [id]);

    const openImageModal = (imageUrl: string) => {
      setSelectedImage(imageUrl);
    };

    const closeImageModal = () => {
      setSelectedImage(null);
    };

    if (loading)
      return <div className="text-center py-8 text-white">Loading project...</div>;

    if (error)
      return <div className="text-center py-8 text-red-500">{error}</div>;

    if (!project) {
      return <div className="text-center py-8 text-gray-500">Project not found.</div>;
    }

    return (
      <div className='bg-bg border border-bd p-8 rounded-2xl shadow-xl max-w-3xl mx-auto my-8'>
        <div className="mb-4">
          <Link href="/projects" className="text-fg hover:underline">
            &larr; Back to Projects
          </Link>
        </div>
        
        <h2 className='text-2xl font-bold mb-4 text-fg'>{project.name}</h2>
        <p className='text-gray-700 mb-6'>{project.description}</p>
        
        <div className='mb-6 text-sm text-gray-500'>
          <div><span className="font-medium">Status:</span> {project.status}</div>
          <div><span className="font-medium">Start Date:</span> {new Date(project.start_date).toLocaleDateString()}</div>
          {project.end_date && (
            <div><span className="font-medium">Finished Date:</span> {new Date(project.end_date).toLocaleDateString()}</div>
          )}
        </div>
        
        {project.files && project.files.length > 0 && (
          <div className='mt-6'>
            <h3 className='text-lg font-semibold mb-4 text-fg'>Project Files</h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
              {project.files.map((file, index) => (
                file.type === 'image' ? (
                  <div 
                    key={index} 
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => openImageModal(file.url)}
                  >
                    <div className="relative h-48 w-full">
                      <Image
                        src={file.url}
                        alt={`Project ${project.name} image ${index}`}
                        fill
                        className="rounded-lg object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                ) : (
                  <a 
                    key={index} 
                    href={file.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-4 border border-bd rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="text-center">
                      <span className="text-fg">Document {index + 1}</span>
                    </div>
                  </a>
                )
              ))}
            </div>
          </div>
        )}

        {/* Image Preview Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={closeImageModal}>
            <div className="relative max-w-4xl w-full max-h-[90vh]" onClick={e => e.stopPropagation()}>
              <button 
                className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300"
                onClick={closeImageModal}
              >
                &times;
              </button>
              <div className="relative h-full w-full">
                <Image
                  src={selectedImage}
                  alt="Project preview"
                  width={800}
                  height={600}
                  className="object-contain max-h-[80vh] mx-auto"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
}

export default ProjectDetailById;