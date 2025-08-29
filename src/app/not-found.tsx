'use client';

import { useRouter } from "next/navigation";
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <Image
            src="https://images.unsplash.com/photo-1584824486509-112e4181ff6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
            alt="Error 404 - Página no encontrada en Instituto Osbord"
            width={256}
            height={256}
            className="w-64 h-64 mx-auto mb-8 opacity-50"
            loading="lazy"
          />
          <div className="flex items-center justify-center space-x-3 mb-6">
            <span className="text-2xl font-bold text-[#16394a]">Instituto Osbord</span>
          </div>
        </div>
        
        <h1 className="text-6xl font-bold text-[#16394a] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Esta dirección no existe</h2>
        <p className="text-gray-600 mb-8">
          La página que buscas no se encuentra disponible o ha sido movida.
        </p>
        
        <Button 
          onClick={handleGoBack}
          className="bg-[#16394a] hover:bg-[#16394a]/90 text-white"
          size="lg"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </Button>
      </div>
    </div>
  );
}
