import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface HeaderLogoProps {
  onNavigate: (path: string) => void;
}

const HeaderLogo: React.FC<HeaderLogoProps> = ({ onNavigate }) => {
  return (
    <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('/')}>
      <Image 
        src="/lovable-uploads/99405c30-c5bc-4e02-a9cb-c61088161c76.png" 
        alt="Instituto Osbord - Educación superior de calidad" 
        width={32}
        height={32}
        className="h-8 w-auto"
        priority
      />
      <span className="text-xl font-bold text-[#16394a]">Instituto Osbord</span>
    </div>
  );
};

export default HeaderLogo;
