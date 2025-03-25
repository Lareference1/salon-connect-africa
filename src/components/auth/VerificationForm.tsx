
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertCircle } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface VerificationFormProps {
  method: "email" | "phone";
  contact: string;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  onSuccess: () => void;
  onError: (error: string) => void;
}

const VerificationForm = ({ 
  method, 
  contact, 
  isLoading, 
  setIsLoading, 
  onSuccess, 
  onError 
}: VerificationFormProps) => {
  const { t } = useLanguage();
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);
  
  const schema = z.object({
    otp: z.string().min(6, t("otpRequired") || "Verification code is required"),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      otp: "",
    },
  });

  const verifyOTP = async (data: z.infer<typeof schema>) => {
    setIsLoading(true);
    try {
      const { data: verifyData, error } = await supabase.auth.verifyOtp({
        [method === "email" ? "email" : "phone"]: contact,
        token: data.otp,
        type: "sms", // Supabase uses 'sms' type for both SMS and email OTP
      });

      if (error) throw error;
      onSuccess();
    } catch (error: any) {
      console.error("Verification error:", error);
      onError(error.message || t("verificationError") || "Error during verification");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (resendDisabled) return;
    
    setIsLoading(true);
    setResendDisabled(true);
    
    try {
      let signInOptions = {};
      
      if (method === "email") {
        signInOptions = { email: contact };
      } else {
        signInOptions = { phone: contact };
      }
      
      const { error } = await supabase.auth.signInWithOtp(signInOptions);
      
      if (error) throw error;
      
      // Start countdown
      let timer = 60;
      setCountdown(timer);
      
      const interval = setInterval(() => {
        timer -= 1;
        setCountdown(timer);
        
        if (timer <= 0) {
          clearInterval(interval);
          setResendDisabled(false);
        }
      }, 1000);
      
    } catch (error: any) {
      console.error("Resend code error:", error);
      onError(error.message || t("resendCodeError") || "Error resending code");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{t("verificationRequired") || "Verification Required"}</AlertTitle>
        <AlertDescription>
          {method === "email" 
            ? (t("verificationEmailSent") || `We've sent a verification code to ${contact}.`) 
            : (t("verificationSmsSent") || `We've sent a verification code to ${contact}.`)}
        </AlertDescription>
      </Alert>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(verifyOTP)} className="space-y-4">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>{t("verificationCode") || "Verification Code"}</FormLabel>
                <FormControl>
                  <InputOTP 
                    maxLength={6}
                    {...field}
                    render={({ slots }) => (
                      <InputOTPGroup>
                        {slots.map((slot, index) => (
                          <InputOTPSlot key={index} {...slot} index={index} />
                        ))}
                      </InputOTPGroup>
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="space-y-2">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("verifying")}
                </>
              ) : (
                t("verify") || "Verify"
              )}
            </Button>
            
            <Button 
              type="button" 
              variant="ghost" 
              className="w-full text-sm" 
              onClick={handleResendCode}
              disabled={resendDisabled || isLoading}
            >
              {resendDisabled 
                ? `${t("resendCodeIn") || "Resend code in"} ${countdown}s` 
                : t("resendCode") || "Resend code"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default VerificationForm;
