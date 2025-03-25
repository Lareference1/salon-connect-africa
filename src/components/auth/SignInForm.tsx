
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import VerificationForm from "./VerificationForm";
import { Separator } from "@/components/ui/separator";
import EmailSignInForm from "./EmailSignInForm";
import SocialLoginButtons from "./SocialLoginButtons";

interface SignInFormProps {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  onSuccess: () => void;
  onError: (error: string) => void;
}

const SignInForm = ({ isLoading, setIsLoading, onSuccess, onError }: SignInFormProps) => {
  const { t } = useLanguage();
  const [needsVerification, setNeedsVerification] = useState(false);
  const [contact, setContact] = useState("");

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
      <EmailSignInForm 
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        onSuccess={onSuccess}
        onError={onError}
      />

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

      <SocialLoginButtons 
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        onError={onError}
      />
    </div>
  );
};

export default SignInForm;
