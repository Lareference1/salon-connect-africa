
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="mb-4 flex items-center text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t("back")}
        </Button>

        <div className="max-w-4xl mx-auto bg-white dark:bg-salon-dark rounded-lg shadow-md p-6 md:p-8">
          <h1 className="text-3xl font-bold text-salon-primary mb-6">{t("termsOfService")}</h1>
          
          <div className="space-y-6 text-foreground">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing or using SalonConnect Africa's platform, you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our services.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">2. Description of Services</h2>
              <p className="text-muted-foreground">
                SalonConnect Africa provides a platform connecting African hair salons with qualified braiders in the 
                United States. Our services include profile creation, search functionality, messaging, and booking tools.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">3. User Registration and Accounts</h2>
              <p className="text-muted-foreground mb-3">By creating an account, you agree to:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your information</li>
                <li>Keep your password secure and confidential</li>
                <li>Be solely responsible for all activity under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">4. User Conduct</h2>
              <p className="text-muted-foreground mb-3">Users of our platform must not:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Post false, misleading, or deceptive content</li>
                <li>Engage in harassment, discrimination, or harmful behavior</li>
                <li>Attempt to interfere with the proper functioning of the platform</li>
                <li>Use the platform for any illegal or unauthorized purpose</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">5. Intellectual Property</h2>
              <p className="text-muted-foreground">
                All content, features, and functionality of our platform, including but not limited to text, graphics, 
                logos, and software, are owned by SalonConnect Africa and are protected by copyright, trademark, and 
                other intellectual property laws.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">6. User Content</h2>
              <p className="text-muted-foreground">
                By submitting content to our platform, you grant us a non-exclusive, royalty-free, perpetual, 
                and worldwide license to use, modify, publicly display, reproduce, and distribute such content 
                for the purpose of providing our services.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">7. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                SalonConnect Africa shall not be liable for any indirect, incidental, special, consequential, or 
                punitive damages resulting from your access to or use of, or inability to access or use, our services.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">8. Disclaimer of Warranties</h2>
              <p className="text-muted-foreground">
                Our services are provided "as is" and "as available" without warranties of any kind, whether express 
                or implied. We do not guarantee that our services will be uninterrupted, secure, or error-free.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">9. Termination</h2>
              <p className="text-muted-foreground">
                We reserve the right to terminate or suspend your account and access to our services at our sole 
                discretion, without notice, for conduct that we believe violates these Terms of Service or is 
                harmful to other users, us, or third parties.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">10. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We may revise these Terms of Service at any time by updating this page. By continuing to use our 
                platform after any changes become effective, you agree to the revised terms.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">11. Governing Law</h2>
              <p className="text-muted-foreground">
                These Terms of Service shall be governed by and construed in accordance with the laws of the 
                United States, without regard to its conflict of law provisions.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">12. Contact Information</h2>
              <p className="text-muted-foreground">
                For questions about these Terms of Service, please contact us at:
                <br />
                <a href="mailto:info@salonconnect.africa" className="text-salon-primary hover:underline">
                  info@salonconnect.africa
                </a>
              </p>
            </section>
            
            <div className="border-t border-border pt-4 text-sm text-muted-foreground">
              <p>Last Updated: June 2023</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
