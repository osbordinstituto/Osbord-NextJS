
import React from 'react';
import { MapPin, Mail, Clock } from 'lucide-react';

const ContactInfo = () => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
      <h3 className="text-2xl font-bold text-[#16394a] mb-6">Información de Contacto</h3>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="bg-[#16394a]/10 p-3 rounded-full">
            <MapPin className="h-6 w-6 text-[#16394a]" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Dirección</h4>
            <p className="text-gray-600">Cumaná, Estado Sucre, Venezuela</p>
          </div>
        </div>
        
        
        
        <div className="flex items-center space-x-4">
          <div className="bg-[#16394a]/10 p-3 rounded-full">
            <Mail className="h-6 w-6 text-[#16394a]" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Email</h4>
            <p className="text-gray-600">osbordinstituto@gmail.com</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="bg-[#16394a]/10 p-3 rounded-full">
            <Clock className="h-6 w-6 text-[#16394a]" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Horario de Atención</h4>
            <p className="text-gray-600">Lunes a Viernes: 8:00 AM - 6:00 PM</p>
            <p className="text-gray-600">Sábados: 9:00 AM - 2:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
