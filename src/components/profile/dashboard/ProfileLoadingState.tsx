
const ProfileLoadingState = () => {
  return (
    <div className="text-center py-8">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-salon-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
      <p className="mt-2 text-muted-foreground">Loading profile information...</p>
    </div>
  );
};

export default ProfileLoadingState;
