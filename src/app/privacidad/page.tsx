import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad - Osbord Instituto',
  description: 'Política de privacidad y protección de datos del Instituto Osbord.',
};

export default function Privacidad() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-[#1e5563] mb-8">Política de Privacidad</h1>
          
          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-gray-600 text-lg">
              Última actualización: Enero 2025
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-[#1e5563] mb-4">1. Información que Recopilamos</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                El Instituto Osbord recopila información personal cuando usted se inscribe en nuestros cursos o utiliza nuestros servicios:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Información de contacto (nombre, email, teléfono, dirección)</li>
                <li>Información académica y profesional</li>
                <li>Datos de pago y facturación</li>
                <li>Progreso académico y calificaciones</li>
                <li>Información técnica (dirección IP, tipo de navegador, etc.)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1e5563] mb-4">2. Cómo Utilizamos su Información</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Utilizamos la información recopilada para:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Proporcionar servicios educativos y administrar su cuenta</li>
                <li>Procesar pagos y mantener registros financieros</li>
                <li>Comunicar información importante sobre cursos y cambios en nuestros servicios</li>
                <li>Mejorar nuestros programas educativos y experiencia del usuario</li>
                <li>Cumplir con requisitos legales y reglamentarios</li>
                <li>Enviar comunicaciones promocionales (con su consentimiento)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1e5563] mb-4">3. Compartir Información</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                No vendemos, alquilamos o compartimos su información personal con terceros, excepto en las siguientes circunstancias:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Con proveedores de servicios que nos ayudan a operar nuestros programas</li>
                <li>Cuando sea requerido por ley o por autoridades competentes</li>
                <li>Con su consentimiento explícito</li>
                <li>Para proteger nuestros derechos legales o la seguridad de otros</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1e5563] mb-4">4. Seguridad de Datos</h2>
              <p className="text-gray-700 leading-relaxed">
                Implementamos medidas de seguridad técnicas, administrativas y físicas apropiadas para proteger 
                su información personal contra acceso no autorizado, alteración, divulgación o destrucción. 
                Sin embargo, ningún método de transmisión por internet es 100% seguro.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1e5563] mb-4">5. Retención de Datos</h2>
              <p className="text-gray-700 leading-relaxed">
                Mantenemos su información personal durante el tiempo necesario para cumplir con los propósitos 
                descritos en esta política, o según lo requiera la ley. Los registros académicos se mantienen 
                según las regulaciones educativas aplicables.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1e5563] mb-4">6. Sus Derechos</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Usted tiene derecho a:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Acceder a su información personal que tenemos</li>
                <li>Solicitar correcciones a información inexacta</li>
                <li>Solicitar la eliminación de su información (sujeto a limitaciones legales)</li>
                <li>Optar por no recibir comunicaciones promocionales</li>
                <li>Obtener una copia de su información en formato portable</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1e5563] mb-4">7. Cookies y Tecnologías Similares</h2>
              <p className="text-gray-700 leading-relaxed">
                Utilizamos cookies y tecnologías similares para mejorar su experiencia en nuestro sitio web, 
                analizar el uso del sitio y proporcionar contenido personalizado. Puede gestionar sus preferencias 
                de cookies a través de la configuración de su navegador.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1e5563] mb-4">8. Menores de Edad</h2>
              <p className="text-gray-700 leading-relaxed">
                Nuestros servicios están dirigidos a personas mayores de 18 años. No recopilamos conscientemente 
                información personal de menores de 18 años sin el consentimiento parental apropiado.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1e5563] mb-4">9. Cambios a esta Política</h2>
              <p className="text-gray-700 leading-relaxed">
                Podemos actualizar esta política de privacidad ocasionalmente. Le notificaremos sobre cambios 
                significativos publicando la nueva política en nuestro sitio web y enviando un aviso por email.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1e5563] mb-4">10. Contacto</h2>
              <p className="text-gray-700 leading-relaxed">
                Si tiene preguntas sobre esta política de privacidad o el manejo de su información personal, 
                contáctenos en:
                <br />
                Email: osbordinstituto@gmail.com
                <br />
                Dirección: Cumaná, Estado Sucre, Venezuela
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
