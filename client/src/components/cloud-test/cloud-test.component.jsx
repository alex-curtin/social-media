import { Image } from 'cloudinary-react';

// for testing Cloudinary
const CloudTest = () => {
  const cloudName = process.env.REACT_APP_CLOUD_NAME;

  return (
    <div>
      <Image
        cloudName={cloudName}
        publicId='social_media/default_avatar_a42zjl'
      />
    </div>
  );
};

export default CloudTest;
