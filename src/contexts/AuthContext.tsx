
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, signIn, signUp, signOut, getCurrentUser } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ data: any; error: any; }>;
  signUp: (email: string, password: string) => Promise<{ data: any; error: any; }>;
  signOut: () => Promise<{ error: any; }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { user, error } = await getCurrentUser();
        if (error) {
          console.error('Error fetching user:', error);
        } else {
          setUser(user);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    const result = await signIn(email, password);
    if (result.error) {
      toast({
        title: "Échec de connexion",
        description: result.error.message,
        variant: "destructive",
      });
    }
    return result;
  };

  const handleSignUp = async (email: string, password: string) => {
    const result = await signUp(email, password);
    if (result.error) {
      toast({
        title: "Échec d'inscription",
        description: result.error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Compte créé avec succès",
        description: "Veuillez confirmer votre email pour finaliser l'inscription.",
      });
    }
    return result;
  };

  const handleSignOut = async () => {
    const result = await signOut();
    if (result.error) {
      toast({
        title: "Échec de déconnexion",
        description: result.error.message,
        variant: "destructive",
      });
    }
    return result;
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signIn: handleSignIn,
      signUp: handleSignUp,
      signOut: handleSignOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
