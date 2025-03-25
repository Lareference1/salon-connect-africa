
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Provider } from "@supabase/supabase-js";
import { Mail as MailIcon, Facebook, Instagram } from "lucide-react";

interface SocialLoginButtonsProps {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  onError: (error: string) => void;
}

const SocialLoginButtons = ({ isLoading, setIsLoading, onError }: SocialLoginButtonsProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleSocialLogin = async (provider: Provider) => {
    setIsLoading(true);
    try {
      console.log(`Attempting to sign in with ${provider}`);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth`,
        },
      });

      if (error) {
        console.error(`${provider} sign-in error:`, error);
        
        // Handle known OAuth errors
        if (error.message.includes("unsupported_provider")) {
          toast({
            title: t("unsupportedProvider") || "Unsupported Provider",
            description: t("providerNotConfigured") || `${provider} login is not configured. Please try another method.`,
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        
        throw error;
      }
      
      // No need to call onSuccess here as the user will be redirected to the provider's auth page
      console.log(`${provider} auth initiated:`, data);
    } catch (error: any) {
      console.error(`Sign in with ${provider} error:`, error);
      let errorMessage = error.message || t("signInError") || `Error signing in with ${provider}`;
      
      if (errorMessage.includes("Failed to fetch")) {
        errorMessage = t("connectionError") || "Connection error. Please check your internet connection.";
      }
      
      onError(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-2">
      <Button 
        type="button" 
        variant="outline"
        className="flex items-center justify-center gap-2"
        onClick={() => handleSocialLogin('google')}
        disabled={isLoading}
      >
        <MailIcon className="h-4 w-4" />
        <span className="sr-only md:not-sr-only md:text-xs">Google</span>
      </Button>
      
      <Button 
        type="button" 
        variant="outline"
        className="flex items-center justify-center gap-2"
        onClick={() => handleSocialLogin('facebook')}
        disabled={isLoading}
      >
        <Facebook className="h-4 w-4" />
        <span className="sr-only md:not-sr-only md:text-xs">Facebook</span>
      </Button>
      
      <Button 
        type="button" 
        variant="outline"
        className="flex items-center justify-center gap-2"
        onClick={() => handleSocialLogin('azure')}
        disabled={isLoading}
      >
        <Instagram className="h-4 w-4" />
        <span className="sr-only md:not-sr-only md:text-xs">Instagram</span>
      </Button>
    </div>
  );
};

export default SocialLoginButtons;
