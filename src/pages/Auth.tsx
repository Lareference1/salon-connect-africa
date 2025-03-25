
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/components/auth/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Auth = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("signin");

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Check for tab parameter in URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tabParam = queryParams.get("tab");
    if (tabParam === "signup") {
      setActiveTab("signup");
    }
  }, [location]);

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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-salon-light to-salon-primary/10 dark:from-salon-dark dark:to-salon-primary/5">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)} 
            className="mb-4 flex items-center text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("backToHome")}
          </Button>

          <Card className="w-full backdrop-blur-sm bg-white/90 dark:bg-salon-dark/90 shadow-xl border-0">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center text-salon-primary">
                {activeTab === "signin" ? t("welcomeBack") : t("signUp")}
              </CardTitle>
              <CardDescription className="text-center">
                {t("authDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="signin">{t("login")}</TabsTrigger>
                  <TabsTrigger value="signup">{t("signUp")}</TabsTrigger>
                </TabsList>
                <TabsContent value="signin" className="animate-in fade-in-50">
                  <SignInForm 
                    isLoading={isLoading} 
                    setIsLoading={setIsLoading} 
                    onSuccess={onAuthSuccess} 
                    onError={onAuthError} 
                  />
                </TabsContent>
                <TabsContent value="signup" className="animate-in fade-in-50">
                  <SignUpForm 
                    isLoading={isLoading} 
                    setIsLoading={setIsLoading} 
                    onSuccess={onAuthSuccess} 
                    onError={onAuthError} 
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col justify-center text-sm text-muted-foreground space-y-2">
              <p>{t("privacyNotice")}</p>
              <div className="text-xs flex justify-center space-x-3">
                <Link to="/terms" className="hover:underline hover:text-salon-primary transition-colors">
                  {t("termsOfService")}
                </Link>
                <span>•</span>
                <Link to="/privacy" className="hover:underline hover:text-salon-primary transition-colors">
                  {t("privacyPolicy")}
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
