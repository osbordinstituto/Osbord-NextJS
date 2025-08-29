
import React from 'react';
import ContactInfo from './ContactInfo';
import ContactMap from './ContactMap';
import ContactForm from './ContactForm';

const ContactSection = () => {
  return (
    <section id="contacto" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info and Map */}
          <div>
            <ContactInfo />
            <ContactMap />
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
