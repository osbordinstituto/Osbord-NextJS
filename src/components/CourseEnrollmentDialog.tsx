
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface CourseEnrollmentDialogProps {
  courseName: string;
  children: React.ReactNode;
}

const CourseEnrollmentDialog: React.FC<CourseEnrollmentDialogProps> = ({ courseName, children }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Sending enrollment data:', { ...formData, courseName, type: 'enrollment' });
      
      const { data, error } = await supabase.functions.invoke('send-enrollment-email', {
        body: {
          ...formData,
          courseName,
          type: 'enrollment'
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      console.log('Email sent successfully:', data);
      
      toast({
        title: "¡Inscripción enviada!",
        description: "Nos pondremos en contacto contigo pronto.",
      });
      
      setFormData({ name: '', email: '', phone: '' });
      setIsOpen(false);
    } catch (error) {
      console.error('Error sending enrollment:', error);
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu inscripción. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            Inscríbete a {courseName}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4" onClick={(e) => e.stopPropagation()}>
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Tu nombre completo"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="tu@email.com"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Número de teléfono</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              required
              placeholder="+58 424 0000000"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-[#1e5563] hover:bg-[#1e5563]/90"
            disabled={isSubmitting}
            onClick={(e) => e.stopPropagation()}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                Enviar inscripción
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CourseEnrollmentDialog;
