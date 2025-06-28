// libs/utils/socialLinks.ts
import { FaGithub, FaLinkedin, FaFacebook, FaTwitter, FaGlobe } from 'react-icons/fa';
import { SiUpwork } from 'react-icons/si';

export type SocialLink = {
  url: string;
  platform: string;
  icon: React.ReactNode;
};

export const detectSocialPlatform = (url: string): SocialLink | null => {
  try {
    if (!url || typeof url !== 'string') return null;
    
    let normalizedUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      normalizedUrl = `https://${url}`;
    }

    const urlObj = new URL(normalizedUrl);
    const host = urlObj.hostname;

    if (host.includes('github.com')) {
      return {
        url: normalizedUrl,
        platform: 'GitHub',
        icon: <FaGithub className="text-gray-800" />,
      };
    }
    if (host.includes('linkedin.com')) {
      return {
        url: normalizedUrl,
        platform: 'LinkedIn',
        icon: <FaLinkedin className="text-blue-600" />,
      };
    }
    if (host.includes('facebook.com')) {
      return {
        url: normalizedUrl,
        platform: 'Facebook',
        icon: <FaFacebook className="text-blue-700" />,
      };
    }
    if (host.includes('twitter.com') || host.includes('x.com')) {
      return {
        url: normalizedUrl,
        platform: 'Twitter',
        icon: <FaTwitter className="text-blue-400" />,
      };
    }
    if (host.includes('upwork.com')) {
      return {
        url: normalizedUrl,
        platform: 'Upwork',
        icon: <SiUpwork className="text-green-600" />,
      };
    }

    return {
      url: normalizedUrl,
      platform: 'Website',
      icon: <FaGlobe className="text-gray-600" />,
    };
  } catch (error) {
    console.error('Invalid URL:', url);
    return null;
  }
};