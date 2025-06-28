'use client';

import { useEffect, useState } from "react";
import { publicApi } from "../../libs/api/axios";

interface AboutMe {
    id: number;
    user_id: string | null;
    name: string;
    title: string;
    slug: string;
    website: string | null;
    email: string;
    phone: string;
    location: string;
    age: string;
    bio: string;
    description: string;
    profile_picture: string;
    social_links: string[] | null;
}

export const useAboutMe = (id: number) => {
    const [aboutMe, setAboutMe] = useState<AboutMe | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const transformLogoUrl = (logoPath: string) => {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, '') || '';
        return `${baseUrl.replace(/\/$/, '')}${logoPath}`;
    };

    const fetchAboutMe = async () => {
        try {
            const response = await publicApi.get('about-me');
            
            if (response.data?.success) {
                // If we have data array
                if (response.data.data?.length > 0) {
                    // Try to find by ID if ID is provided
                    if (id) {
                        const aboutMeData = response.data.data.find((about: AboutMe) => about.id === id);
                        if (aboutMeData) {
                            setAboutMe({
                                ...aboutMeData,
                                profile_picture: aboutMeData.profile_picture 
                                    ? transformLogoUrl(aboutMeData.profile_picture) 
                                    : '/images/RNN-image.jpg',
                            });
                        } else {
                            // If no match by ID but we have data, use the first item
                            setAboutMe({
                                ...response.data.data[0],
                                profile_picture: response.data.data[0].profile_picture
                                    ? transformLogoUrl(response.data.data.profile_picture)
                                    : '/images/RNN-image.jpg',
                            });
                        }
                    } else {
                        // If no ID provided, use the first item
                        setAboutMe({
                            ...response.data.data[0],
                            profile_picture: response.data.data[0].profile_picture
                                ? transformLogoUrl(response.data.data[0].profile_picture)
                                : '/images/RNN-image.jpg',
                        });
                    }
                } else {
                    throw new Error('No about me data found');
                }
            } else {
                throw new Error(response.data?.message || 'Failed to fetch about me data');
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : "Failed to fetch about me data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAboutMe();
    }, [id]);

    return { 
        aboutMe,
        isLoading: loading,
        error,
        refresh: fetchAboutMe,
    };
};