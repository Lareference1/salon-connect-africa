
import { useNavigate } from 'react-router-dom';
import { Form } from '@/components/ui/form';
import PersonalInfoSection from './form-sections/PersonalInfoSection';
import ContactInfoSection from './form-sections/ContactInfoSection';
import SubmitButton from './SubmitButton';
import { useProfileForm } from './form-sections/useProfileForm';

const PersonalProfileForm = () => {
  const navigate = useNavigate();
  const { 
    form, 
    isLoading, 
    profileImage, 
    setProfileImage, 
    onSubmit 
  } = useProfileForm(() => navigate('/settings'));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <PersonalInfoSection 
          control={form.control} 
          profileImage={profileImage} 
          onImageChange={setProfileImage} 
        />
        
        <ContactInfoSection control={form.control} />
        
        <SubmitButton isLoading={isLoading}>Save Profile</SubmitButton>
      </form>
    </Form>
  );
};

export default PersonalProfileForm;
