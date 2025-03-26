
import React from 'react';
import { Form } from '@/components/ui/form';
import ProfileImageUpload from './ProfileImageUpload';
import SpecialtiesList from './SpecialtiesList';
import SubmitButton from './SubmitButton';
import BraiderStatusField from './form-sections/BraiderStatusField';
import BraiderBasicFields from './form-sections/BraiderBasicFields';
import { useBraiderProfileForm } from './form-sections/useBraiderProfileForm';

const BraiderProfileForm = () => {
  const { 
    form, 
    isLoading, 
    specialties, 
    setSpecialties, 
    profileImage, 
    setProfileImage, 
    onSubmit 
  } = useBraiderProfileForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ProfileImageUpload 
          profileImage={profileImage} 
          onImageChange={setProfileImage}
          inputId="imageUpload"
        />
        
        <BraiderBasicFields control={form.control} />
        
        <BraiderStatusField control={form.control} />
        
        <div className="space-y-2">
          <FormLabel>Specialties</FormLabel>
          <SpecialtiesList
            specialties={specialties}
            onSpecialtiesChange={setSpecialties}
          />
        </div>
        
        <SubmitButton isLoading={isLoading}>Save Braider Profile</SubmitButton>
      </form>
    </Form>
  );
};

export default BraiderProfileForm;

// Add this import for FormLabel
import { FormLabel } from '@/components/ui/form';
