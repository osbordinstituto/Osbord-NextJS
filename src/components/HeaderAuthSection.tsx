
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, Settings } from 'lucide-react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import HeaderEnrollmentDialog from './HeaderEnrollmentDialog';

interface HeaderAuthSectionProps {
  user: SupabaseUser | null;
  onSignOut: () => void;
  onAdminClick: () => void;
}

const HeaderAuthSection: React.FC<HeaderAuthSectionProps> = ({
  user,
  onSignOut,
  onAdminClick
}) => {
  const isAdmin = user?.email === 'osbordinstituto@gmail.com';

  return (
    <div className="hidden xl:flex items-center space-x-4">
      {user ? (
        <>
          {isAdmin && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onAdminClick}
              className="text-[#16394a] hover:bg-[#16394a]/10"
            >
              <Settings className="h-4 w-4 mr-2" />
              Panel Admin
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={onSignOut}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Cerrar Sesión
          </Button>
        </>
      ) : (
        <>
          <Button 
            variant="outline" 
            size="sm"
            className="text-[#16394a] border-[#16394a] hover:bg-[#16394a]/10"
            onClick={onAdminClick}
          >
            Directiva
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="text-[#16394a] border-[#16394a] hover:bg-[#16394a]/10"
            onClick={() => window.location.href = 'https://osbordcampus.vercel.app/auth'}
          >
            Campus
          </Button>
          <HeaderEnrollmentDialog />
        </>
      )}
    </div>
  );
};

export default HeaderAuthSection;
