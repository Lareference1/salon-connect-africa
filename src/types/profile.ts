
import { z } from 'zod';

export const profileSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  bio: z.string().max(300, 'Bio must be less than 300 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  preferredContact: z.enum(['email', 'phone']),
  userType: z.enum(['salon', 'braider', 'customer']).default('customer'),
  
  // Business information (for salons and braiders)
  businessName: z.string().optional(),
  location: z.string().optional(),
  specialties: z.string().optional(),
  hiringStatus: z.string().optional(), // "true" or "false" as string
  experience: z.string().optional(), // years of experience as string
  businessDescription: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
