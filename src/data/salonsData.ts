
export interface SalonData {
  id: number | string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  specialties: string[];
  image: string;
  hiringStatus: boolean;
  description?: string;
  website?: string;
  phone?: string;
  email?: string;
}

export const salonsData: SalonData[] = [
  {
    id: 1,
    name: "Afro Beauty Salon",
    location: "Brooklyn, NY",
    rating: 4.8,
    reviews: 124,
    specialties: ["Box Braids", "Locs", "Twist Outs"],
    image: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=2036&auto=format&fit=crop",
    hiringStatus: true,
    description: "Specializing in natural hair care and protective styles for over 10 years."
  },
  {
    id: 2,
    name: "Crown & Glory Hair Studio",
    location: "Harlem, NY",
    rating: 4.6,
    reviews: 98,
    specialties: ["Faux Locs", "Cornrows", "Crochet Braids"],
    image: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?q=80&w=2187&auto=format&fit=crop",
    hiringStatus: true,
    description: "Award-winning salon with a team of highly skilled stylists."
  },
  {
    id: 3,
    name: "Braided Paradise",
    location: "Atlanta, GA",
    rating: 4.9,
    reviews: 210,
    specialties: ["Knotless Braids", "Senegalese Twist", "Feed-in Braids"],
    image: "https://images.unsplash.com/photo-1559599076-9c61d8e1b77c?q=80&w=2069&auto=format&fit=crop",
    hiringStatus: false,
    description: "The premier destination for all your braiding needs in Atlanta."
  },
  {
    id: 4,
    name: "Natural Roots Salon",
    location: "Houston, TX",
    rating: 4.7,
    reviews: 156,
    specialties: ["Passion Twists", "Box Braids", "Goddess Braids"],
    image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=2074&auto=format&fit=crop",
    hiringStatus: true,
    description: "Focused on healthy hair practices and stunning protective styles."
  },
  {
    id: 5,
    name: "Essence Hair Boutique",
    location: "Philadelphia, PA",
    rating: 4.5,
    reviews: 89,
    specialties: ["Fulani Braids", "Ghana Braids", "Micro Braids"],
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1976&auto=format&fit=crop",
    hiringStatus: true,
    description: "Family-owned salon with deep roots in traditional African braiding techniques."
  },
  {
    id: 6,
    name: "Royal Scalp Hair Studio",
    location: "Washington DC",
    rating: 4.8,
    reviews: 132,
    specialties: ["Flat Twists", "Bantu Knots", "Cornrows"],
    image: "https://images.unsplash.com/photo-1610563167394-f5e3c8bf9689?q=80&w=1974&auto=format&fit=crop",
    hiringStatus: false,
    description: "Luxurious salon experience with a focus on scalp health and beautiful styles."
  }
];

// Helper function to transform profile data from Supabase to SalonData format
export const transformProfileToSalon = (profile: any): SalonData => {
  return {
    id: profile.id || Math.random().toString(),
    name: profile.name || profile.business_name || 'Unknown Salon',
    location: profile.location || 'Location not specified',
    image: profile.image || '/placeholder.svg',
    specialties: profile.specialties || [],
    rating: 4.5, // Default rating
    reviews: 0, // Default reviews count
    hiringStatus: profile.hiring_status || false,
    description: profile.description || profile.business_description || '',
    website: profile.website || '#',
    phone: profile.phone || '',
    email: profile.email || '',
  };
};
