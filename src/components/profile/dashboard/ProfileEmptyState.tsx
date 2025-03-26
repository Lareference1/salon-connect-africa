
const ProfileEmptyState = () => {
  return (
    <div className="text-center py-8 space-y-4">
      <p className="text-muted-foreground">No profile information found.</p>
      <a href="/settings" className="text-salon-primary hover:underline">
        Complete your profile settings
      </a>
    </div>
  );
};

export default ProfileEmptyState;
