
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import VerificationForm from "./VerificationForm";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Mail, Facebook, Mail as MailIcon, Instagram } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Provider } from "@supabase/supabase-js";

interface SignUpFormProps {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  onSuccess: () => void;
  onError: (error: string) => void;
}

const SignUpForm = ({ isLoading, setIsLoading, onSuccess, onError }: SignUpFormProps) => {
  const { t } = useLanguage();
  const [needsVerification, setNeedsVerification] = useState(false);
  const [contact, setContact] = useState("");

  // Email schema
  const emailSchema = z.object({
    email: z.string().email(t("invalidEmail") || "Invalid email address"),
    password: z.string().min(6, t("passwordMinLength") || "Password must be at least 6 characters"),
  });

  // Create form based on email method only
  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "", password: "" },
  });

  const handleSignUp = async (data: z.infer<typeof emailSchema>) => {
    setIsLoading(true);
    try {
      const { data: emailData, error: emailError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: window.location.origin,
        }
      });

      if (emailError) throw emailError;
      
      setContact(data.email);
      setNeedsVerification(true);
    } catch (error: any) {
      console.error("Sign up error:", error);
      onError(error.message || t("signUpError") || "Error during sign up");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: Provider) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth`,
        },
      });

      if (error) throw error;
      // No need to call onSuccess here as the user will be redirected to the provider's auth page
    } catch (error: any) {
      console.error(`Sign up with ${provider} error:`, error);
      onError(error.message || t("signUpError") || `Error signing up with ${provider}`);
      setIsLoading(false);
    }
  };

  const handleVerificationSuccess = () => {
    onSuccess();
    setNeedsVerification(false);
  };

  // Show verification form if needed
  if (needsVerification) {
    return (
      <VerificationForm
        method="email"
        contact={contact}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        onSuccess={handleVerificationSuccess}
        onError={onError}
      />
    );
  }

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSignUp)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("email")}</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="your.name@example.com" 
                    {...field} 
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("password")}</FormLabel>
                <FormControl>
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    {...field} 
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("loading")}
              </>
            ) : (
              t("signUp")
            )}
          </Button>
        </form>
      </Form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-2 text-xs text-muted-foreground">
            {t("orContinueWith")}
          </span>
        </div>
      </div>

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
    </div>
  );
};

export default SignUpForm;
