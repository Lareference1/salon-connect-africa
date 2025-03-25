
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import VerificationForm from "./VerificationForm";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Mail, Phone, Facebook, Mail as MailIcon, Instagram } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface SignInFormProps {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  onSuccess: () => void;
  onError: (error: string) => void;
}

const SignInForm = ({ isLoading, setIsLoading, onSuccess, onError }: SignInFormProps) => {
  const { t } = useLanguage();
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [needsVerification, setNeedsVerification] = useState(false);
  const [contact, setContact] = useState("");
  
  // Email schema
  const emailSchema = z.object({
    email: z.string().email(t("invalidEmail") || "Invalid email address"),
    password: z.string().min(1, t("passwordRequired") || "Password is required"),
  });

  // Phone schema
  const phoneSchema = z.object({
    phone: z.string().min(10, t("invalidPhone") || "Invalid phone number"),
    password: z.string().min(1, t("passwordRequired") || "Password is required"),
  });

  // Create form based on selected method
  const form = useForm<z.infer<typeof emailSchema> | z.infer<typeof phoneSchema>>({
    resolver: zodResolver(method === "email" ? emailSchema : phoneSchema),
    defaultValues: method === "email" 
      ? { email: "", password: "" } 
      : { phone: "", password: "" },
  });

  const handleSignIn = async (data: z.infer<typeof emailSchema> | z.infer<typeof phoneSchema>) => {
    setIsLoading(true);
    try {
      if (method === "email") {
        const { data: emailData, error: emailError } = await supabase.auth.signInWithPassword({
          email: (data as z.infer<typeof emailSchema>).email,
          password: (data as z.infer<typeof emailSchema>).password,
        });

        if (emailError) throw emailError;
        onSuccess();
      } else {
        // Format phone number to E.164 format
        const phoneNumber = (data as z.infer<typeof phoneSchema>).phone;
        const formattedPhone = phoneNumber.startsWith("+") ? phoneNumber : `+1${phoneNumber}`;
        
        const { data: phoneData, error: phoneError } = await supabase.auth.signInWithPassword({
          phone: formattedPhone,
          password: (data as z.infer<typeof phoneSchema>).password,
        });

        if (phoneError) {
          // If error is about verification, show verification form
          if (phoneError.message.includes("verification")) {
            setContact(formattedPhone);
            setNeedsVerification(true);
            setIsLoading(false);
            return;
          }
          throw phoneError;
        }
        
        onSuccess();
      }
    } catch (error: any) {
      console.error("Sign in error:", error);
      onError(error.message || t("signInError") || "Error during sign in");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'facebook' | 'google' | 'instagram') => {
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
      console.error(`Sign in with ${provider} error:`, error);
      onError(error.message || t("socialSignInError") || `Error signing in with ${provider}`);
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
        method={method}
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
      <Tabs 
        value={method} 
        onValueChange={(value) => setMethod(value as "email" | "phone")}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            {t("email")}
          </TabsTrigger>
          <TabsTrigger value="phone" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            {t("phone")}
          </TabsTrigger>
        </TabsList>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSignIn)} className="space-y-4">
            <TabsContent value="email" className="space-y-4">
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
            </TabsContent>
            
            <TabsContent value="phone" className="space-y-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("phone")}</FormLabel>
                    <FormControl>
                      <Input 
                        type="tel" 
                        placeholder="+12345678900" 
                        {...field} 
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
            
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
                t("login")
              )}
            </Button>
          </form>
        </Form>
      </Tabs>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-2 text-xs text-muted-foreground">
            {t("orContinueWith") || "Or continue with"}
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
          onClick={() => handleSocialLogin('instagram')}
          disabled={isLoading}
        >
          <Instagram className="h-4 w-4" />
          <span className="sr-only md:not-sr-only md:text-xs">Instagram</span>
        </Button>
      </div>
    </div>
  );
};

export default SignInForm;
