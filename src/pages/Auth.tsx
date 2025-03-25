
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const onAuthSuccess = () => {
    setIsLoading(false);
    toast({
      title: t("authSuccess"),
      description: t("authSuccessDesc"),
    });
    navigate("/");
  };

  const onAuthError = (error: string) => {
    setIsLoading(false);
    toast({
      variant: "destructive",
      title: t("authError"),
      description: error,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4 bg-muted/30">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-salon-primary">
              {t("welcomeBack")}
            </CardTitle>
            <CardDescription className="text-center">
              {t("authDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">{t("login")}</TabsTrigger>
                <TabsTrigger value="signup">{t("signUp")}</TabsTrigger>
              </TabsList>
              <TabsContent value="signin">
                <SignInForm 
                  isLoading={isLoading} 
                  setIsLoading={setIsLoading} 
                  onSuccess={onAuthSuccess} 
                  onError={onAuthError} 
                />
              </TabsContent>
              <TabsContent value="signup">
                <SignUpForm 
                  isLoading={isLoading} 
                  setIsLoading={setIsLoading} 
                  onSuccess={onAuthSuccess} 
                  onError={onAuthError} 
                />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center text-sm text-muted-foreground">
            {t("privacyNotice")}
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
