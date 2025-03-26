
export interface BraiderData {
  id: number | string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  specialties: string[];
  image: string;
  availability: string;
  experience: string;
  status: 'available' | 'soon' | 'unavailable';
  bio?: string;
  phone?: string;
  email?: string;
}

export const braidersData: BraiderData[] = [
  {
    id: 1,
    name: "Aminata Diallo",
    location: "Brooklyn, NY",
    rating: 4.9,
    reviews: 187,
    specialties: ["Box Braids", "Knotless Braids", "Fulani Braids"],
    image: "https://images.unsplash.com/photo-1611432579699-484f7990b127?q=80&w=2070&auto=format&fit=crop",
    availability: "Disponible",
    experience: "7 ans",
    status: "available",
    bio: "Spécialiste des tresses africaines avec plus de 7 ans d'expérience."
  },
  {
    id: 2,
    name: "Fatou Sow",
    location: "Bronx, NY",
    rating: 4.7,
    reviews: 142,
    specialties: ["Senegalese Twist", "Ghana Braids", "Feed-In Braids"],
    image: "https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?q=80&w=1974&auto=format&fit=crop",
    availability: "Disponible dans 2 jours",
    experience: "5 ans",
    status: "soon"
  },
  {
    id: 3,
    name: "Grace Okafor",
    location: "Queens, NY",
    rating: 5.0,
    reviews: 203,
    specialties: ["Lemonade Braids", "Goddess Braids", "Tribal Braids"],
    image: "https://images.unsplash.com/photo-1611679472919-36e505fdde7c?q=80&w=1974&auto=format&fit=crop",
    availability: "Non disponible",
    experience: "9 ans",
    status: "unavailable"
  },
  {
    id: 4,
    name: "Aisha Mohammed",
    location: "Harlem, NY",
    rating: 4.8,
    reviews: 156,
    specialties: ["Passion Twist", "Spring Twist", "Butterfly Locs"],
    image: "https://images.unsplash.com/photo-1533748430324-45f466e36c7c?q=80&w=2070&auto=format&fit=crop",
    availability: "Disponible",
    experience: "6 ans",
    status: "available"
  },
  {
    id: 5,
    name: "Precious Adeyemi",
    location: "Atlanta, GA",
    rating: 4.9,
    reviews: 178,
    specialties: ["Crochet Braids", "Faux Locs", "Twist Outs"],
    image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=1986&auto=format&fit=crop",
    availability: "Disponible",
    experience: "8 ans",
    status: "available"
  },
  {
    id: 6,
    name: "Monique Jean-Baptiste",
    location: "Miami, FL",
    rating: 4.6,
    reviews: 132,
    specialties: ["Micro Braids", "Kinky Twist", "Havana Twist"],
    image: "https://images.unsplash.com/photo-1507019403270-cca502add9f8?q=80&w=1974&auto=format&fit=crop",
    availability: "Disponible dans 3 jours",
    experience: "4 ans",
    status: "soon"
  },
];

// Helper function to transform profile data from Supabase to BraiderData format
export const transformProfileToBraider = (profile: any): BraiderData => {
  return {
    id: profile.id || Math.random().toString(),
    name: profile.name || profile.full_name || 'Unknown Braider',
    location: profile.location || 'Location not specified',
    image: profile.image || '/placeholder.svg',
    specialties: profile.specialties || [],
    rating: 4.5, // Default rating
    reviews: 0, // Default reviews count
    experience: profile.experience || '1+ years',
    bio: profile.description || profile.bio || '',
    status: 'available', // Default status
    availability: 'Disponible', // Default availability text
    phone: profile.phone || '',
    email: profile.email || '',
  };
};
