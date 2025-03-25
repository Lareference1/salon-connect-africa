
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
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
          <h1 className="text-3xl font-bold text-salon-primary mb-6">{t("privacyPolicy")}</h1>
          
          <div className="space-y-6 text-foreground">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
              <p className="text-muted-foreground">
                SalonConnect Africa ("we", "our", or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when 
                you visit our website or use our platform services.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
              <p className="text-muted-foreground mb-3">We may collect information about you in various ways, including:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>Personal Data: Name, email address, phone number, professional qualifications</li>
                <li>Profile Information: Photos, service descriptions, rates, business information</li>
                <li>Usage Data: How you interact with our platform, pages visited, features used</li>
                <li>Device Information: IP address, browser type, device type, operating system</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-3">We use the information we collect to:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>Provide, maintain, and improve our platform services</li>
                <li>Process transactions and fulfill bookings</li>
                <li>Send you technical notices, updates, and support messages</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>Detect, prevent, and address fraud or security issues</li>
                <li>Personalize your experience on our platform</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">4. Sharing Your Information</h2>
              <p className="text-muted-foreground mb-3">We may share your information with:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>Service providers who perform services on our behalf</li>
                <li>Professional partners when you choose to connect with them</li>
                <li>Legal authorities when required by law</li>
                <li>Business partners in connection with service offerings</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">5. Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate technical and organizational measures to protect your personal information. 
                However, no method of transmission over the Internet or electronic storage is 100% secure, 
                and we cannot guarantee absolute security.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">6. Your Rights</h2>
              <p className="text-muted-foreground mb-3">Depending on your location, you may have rights to:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>Access personal data we hold about you</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Delete your personal data</li>
                <li>Restrict or object to processing</li>
                <li>Data portability</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">7. Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground">
                We may update our Privacy Policy from time to time. We will notify you of any changes by 
                posting the new Privacy Policy on this page and updating the "Last Updated" date.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">8. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have questions about this Privacy Policy, please contact us at:
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

export default PrivacyPolicy;
