
import { Form } from '@/components/ui/form';
import { useAuth } from '@/components/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useProfileForm } from '@/hooks/useProfileForm';
import ProfileBasicInfo from './ProfileBasicInfo';
import ProfileContactInfo from './ProfileContactInfo';
import ProfileUserType from './ProfileUserType';
import ProfileFormSubmit from './ProfileFormSubmit';
import { ProfileFormValues } from '@/types/profile';

const ProfileForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const handleSuccess = (data: ProfileFormValues) => {
    // Redirect based on user type
    if (data.userType === 'salon') {
      navigate('/salons');
    } else if (data.userType === 'braider') {
      navigate('/braiders');
    } else {
      navigate('/');
    }
  };
  
  const { form, isLoading, onSubmit } = useProfileForm(user, handleSuccess);

  if (!user) {
    return (
      <div className="text-center p-8">
        <p>Please sign in to edit your profile.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 dark:bg-salon-dark/80 backdrop-blur-lg rounded-xl p-6 shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-display mb-6 text-salon-dark dark:text-white">Your Profile</h2>
      
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-6">
          <ProfileBasicInfo form={form} />
          <ProfileContactInfo form={form} />
          <ProfileUserType form={form} />
          <ProfileFormSubmit isLoading={isLoading} />
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
