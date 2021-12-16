import { Box } from '@chakra-ui/react';
import { Image } from 'cloudinary-react';

const Avatar = ({ publicId, size = 'small' }) => {
  const cloudName = process.env.REACT_APP_CLOUD_NAME;

  const sizes = {
    small: '36',
    medium: '64',
    large: '96',
  };

  return (
    <Box borderRadius='50%' overflow='hidden'>
      <Image
        cloudName={cloudName}
        publicId={publicId}
        width={sizes[size]}
        height={sizes[size]}
      />
    </Box>
  );
};

export default Avatar;
