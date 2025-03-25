
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface EmailSignInFormProps {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  onSuccess: () => void;
  onError: (error: string) => void;
}

const EmailSignInForm = ({ isLoading, setIsLoading, onSuccess, onError }: EmailSignInFormProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  // Email schema
  const schema = z.object({
    email: z.string().email(t("invalidEmail") || "Invalid email address"),
    password: z.string().min(1, t("passwordRequired") || "Password is required"),
  });

  // Create form
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const handleSignIn = async (data: z.infer<typeof schema>) => {
    setIsLoading(true);
    try {
      const email = data.email;
      const password = data.password;
      
      console.log(`Attempting to sign in with email: ${email}`);
      const { data: emailData, error: emailError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (emailError) {
        console.error("Email sign-in error:", emailError);
        
        if (emailError.message.includes("Email not confirmed")) {
          toast({
            title: t("emailNotConfirmed") || "Email Not Confirmed",
            description: t("checkYourEmailForVerificationLink") || "Please check your email for a verification link",
            variant: "destructive",
          });
        } else if (emailError.message.includes("Invalid login credentials")) {
          toast({
            title: t("invalidCredentials") || "Invalid Credentials",
            description: t("emailOrPasswordIncorrect") || "Email or password is incorrect. Please try again.",
            variant: "destructive",
          });
        } else {
          throw emailError;
        }
        
        setIsLoading(false);
        return;
      }
      
      console.log("Login successful:", emailData);
      onSuccess();
    } catch (error: any) {
      console.error("Sign in error:", error);
      // Show a more user-friendly error message
      let errorMessage = error.message || t("signInError") || "Error during sign in";
      
      if (errorMessage.includes("Failed to fetch")) {
        errorMessage = t("connectionError") || "Connection error. Please check your internet connection.";
      }
      
      onError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSignIn)} className="space-y-4">
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
            t("login")
          )}
        </Button>
      </form>
    </Form>
  );
};

export default EmailSignInForm;
