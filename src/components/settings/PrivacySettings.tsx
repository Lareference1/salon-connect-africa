
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const PrivacySettings = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium mb-4">Privacy Settings</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Data Privacy</CardTitle>
          <CardDescription>
            Manage how your personal data is stored and used
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">
            We value your privacy and are committed to protecting your personal information. 
            Your data is stored securely and is only used to provide you with the best experience on our platform.
          </p>
          
          <div className="border-t pt-4">
            <h3 className="font-medium mb-2">Your Rights</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Right to access your personal data</li>
              <li>Right to rectify inaccurate information</li>
              <li>Right to erase your data (right to be forgotten)</li>
              <li>Right to restrict processing of your data</li>
              <li>Right to data portability</li>
            </ul>
          </div>
          
          <div className="border-t pt-4">
            <h3 className="font-medium mb-2">Contact Us</h3>
            <p className="text-sm">
              If you have any questions about your data or would like to exercise any of your rights,
              please contact our data protection officer at privacy@beautyplatform.com
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacySettings;
