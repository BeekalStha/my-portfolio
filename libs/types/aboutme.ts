
export default interface AboutMe {
  
    name: string;
    title: string;
    id: string;
    email: string;
    phone?: string;
    location?: string;
    // Personal Details
    age?: number;
    bio: string;
    description: string;
    // Media
    profile_picture: string;
    slug: string;
    user_id: string; // Foreign key reference

    //   // Social Media Links (using an array of objects for better structure)
    //   social_links: {
    //     platform: 'github' | 'linkedin' | 'twitter' | 'instagram' | 'dribbble' | 'behance' | 'personal';
    //     url: string;
    //     icon?: string; // Optional icon class or SVG
    //   }[];
    social_links: string[];
    // System Fields
    created_at?: Date;
    updated_at?: Date;
    website?: string; // Optional field for personal website or portfolio

    //   // Additional Optional Fields
    //   resume_url?: string;
    //   skills?: string[];
    //   available_for_work?: boolean;
}