
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Lock, Mail, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface AdminLoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { signIn } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Verificar que sea el email del admin
    if (email !== 'osbordinstituto@gmail.com') {
      toast({
        title: "Acceso denegado",
        description: "No tienes permisos para acceder al panel administrativo.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const result = await signIn(email, password);

      if (result.error) {
        toast({
          title: "Error de autenticación",
          description: "Email o contraseña incorrectos.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "¡Acceso concedido!",
          description: "Bienvenido al panel administrativo.",
        });
        onClose();
        router.push('/admin');
      }
    } catch {
      toast({
        title: "Error",
        description: "Ocurrió un error inesperado. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center text-[#1e5563]">
            Panel Administrativo
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-email">Correo electrónico</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="admin-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                placeholder="Ingresa tu email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="admin-password">Contraseña</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10"
                placeholder="Ingresa tu contraseña"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#1e5563] hover:bg-[#1e5563]/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verificando...
              </>
            ) : (
              'Iniciar Sesión'
            )}
          </Button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          Acceso restringido solo para administradores
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default AdminLogin;
