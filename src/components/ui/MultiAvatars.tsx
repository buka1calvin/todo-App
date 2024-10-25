import React from 'react';

type Avatar = {
  src: string;
  alt: string;
};

interface MultiAvatarProps {
  avatars: Avatar[] ;
  maxAvatars?: number | undefined;
}

const MultiAvatar: React.FC<MultiAvatarProps> = ({ avatars, maxAvatars = 4 }) => {
  const surplus = avatars.length - maxAvatars;

  return (
    <div className="flex -space-x-2">
      {avatars.slice(0, maxAvatars).map((avatar, index) => (
        <img
          key={index}
          src={avatar.src}
          alt={avatar.alt}
          className="w-7 h-7 rounded-full border border-purple-500 object-cover bg-gray-200"
        />
      ))}
      {surplus > 0 && (
        <div className="w-7 h-7 flex items-center justify-center rounded-full border border-white bg-gray-400 text-white text-xs">
          +{surplus}
        </div>
      )}
    </div>
  );
};

export default MultiAvatar;
