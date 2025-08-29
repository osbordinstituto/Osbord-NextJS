import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos y Condiciones - Osbord Instituto',
  description: 'Términos y condiciones de uso de los servicios educativos del Instituto Osbord.',
};

export default function Terminos() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-[#1e5563] mb-8">Términos y Condiciones</h1>
          
          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-gray-600 text-lg">
              Última actualización: Enero 2025
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-[#1e5563] mb-4">1. Aceptación de los Términos</h2>
              <p className="text-gray-700 leading-relaxed">
                Al acceder y utilizar los servicios del Instituto Osbord, usted acepta estar sujeto a estos términos y condiciones. 
                Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestros servicios.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1e5563] mb-4">2. Descripción del Servicio</h2>
              <p className="text-gray-700 leading-relaxed">
                El Instituto Osbord es una institución educativa ubicada en Cumaná, Venezuela, que ofrece cursos de formación 
                profesional en diversas áreas como Tecnología, Medicina, Humanidades, Negocios, Arte e Idiomas.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1e5563] mb-4">3. Inscripción y Acceso</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Los estudiantes deben proporcionar información veraz y actualizada durante el proceso de inscripción.</li>
                <li>El Instituto se reserva el derecho de rechazar inscripciones sin previo aviso.</li>
                <li>Los estudiantes son responsables de mantener la confidencialidad de sus credenciales de acceso.</li>
                <li>Se requiere cumplir con los prerrequisitos específicos de cada curso.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1e5563] mb-4">4. Pagos y Reembolsos</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Los pagos deben realizarse según las modalidades establecidas por el Instituto.</li>
                <li>Los reembolsos están sujetos a las políticas específicas de cada programa.</li>
                <li>El Instituto se reserva el derecho de modificar los precios con previo aviso.</li>
                <li>Los pagos atrasados pueden resultar en la suspensión temporal del acceso a los cursos.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1e5563] mb-4">5. Conducta del Estudiante</h2>
              <p className="text-gray-700 leading-relaxed">
                Los estudiantes deben mantener un comportamiento respetuoso hacia instructores y compañeros. 
                Se prohíbe el plagio, la distribución no autorizada de material del curso, y cualquier actividad 
                que pueda interferir con el proceso educativo.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1e5563] mb-4">6. Propiedad Intelectual</h2>
              <p className="text-gray-700 leading-relaxed">
                Todo el contenido educativo, materiales, y recursos proporcionados por el Instituto Osbord 
                están protegidos por derechos de autor y son propiedad exclusiva del Instituto o sus licenciantes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1e5563] mb-4">7. Certificación</h2>
              <p className="text-gray-700 leading-relaxed">
                Los certificados se otorgan únicamente a estudiantes que completen satisfactoriamente todos 
                los requisitos del curso, incluyendo evaluaciones y proyectos finales según corresponda.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1e5563] mb-4">8. Limitación de Responsabilidad</h2>
              <p className="text-gray-700 leading-relaxed">
                El Instituto Osbord no será responsable por daños indirectos, incidentales o consecuentes 
                que puedan surgir del uso de nuestros servicios educativos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1e5563] mb-4">9. Modificaciones</h2>
              <p className="text-gray-700 leading-relaxed">
                El Instituto se reserva el derecho de modificar estos términos en cualquier momento. 
                Los cambios serán notificados a través de nuestros canales oficiales.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1e5563] mb-4">10. Contacto</h2>
              <p className="text-gray-700 leading-relaxed">
                Para consultas sobre estos términos, contacte con nosotros en:
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
