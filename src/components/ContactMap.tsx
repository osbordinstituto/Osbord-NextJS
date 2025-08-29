
import React from 'react';

const ContactMap = () => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-lg">
      <h3 className="text-xl font-bold text-[#16394a] mb-4">Nuestra Ubicación</h3>
      <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31425.72883648229!2d-64.18085!3d10.453959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2a7f7e5f7e1f1f%3A0x1f1f1f1f1f1f1f1f!2sCuman%C3%A1%2C%20Sucre%2C%20Venezuela!5e0!3m2!1ses!2sus!4v1635000000000!5m2!1ses!2sus"
          width="100%"
          height="100%"
          className="rounded-lg border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa de Instituto Osbord - Cumaná, Sucre, Venezuela"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactMap;
