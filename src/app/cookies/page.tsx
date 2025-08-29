import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Cookies - Osbord Instituto',
  description: 'Información sobre el uso de cookies en el sitio web del Instituto Osbord.',
};

export default function Cookies() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-[#1e5563] mb-8">Política de Cookies</h1>
          
          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-gray-600 text-lg">
              Última actualización: Enero 2025
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-[#1e5563] mb-4">¿Qué son las Cookies?</h2>
              <p className="text-gray-700 leading-relaxed">
                Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita nuestro sitio web. 
                Nos ayudan a mejorar su experiencia, recordar sus preferencias y analizar cómo utiliza nuestros servicios.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1e5563] mb-4">Tipos de Cookies que Utilizamos</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-[#1e5563] mb-2">Cookies Esenciales</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Son necesarias para el funcionamiento básico del sitio web. Incluyen cookies de autenticación, 
                    seguridad y preferencias básicas del usuario. Estas cookies no pueden ser desactivadas.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#1e5563] mb-2">Cookies de Rendimiento</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Recopilan información sobre cómo los visitantes utilizan nuestro sitio web, como qué páginas 
                    visitan más frecuentemente y si reciben mensajes de error. Nos ayudan a mejorar el rendimiento del sitio.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#1e5563] mb-2">Cookies de Funcionalidad</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Permiten que el sitio web recuerde las elecciones que hace (como su idioma preferido) 
                    y proporcionan características mejoradas y más personales.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#1e5563] mb-2">Cookies de Marketing</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Se utilizan para entregar anuncios más relevantes para usted y sus intereses. 
                    También se utilizan para limitar el número de veces que ve un anuncio.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1e5563] mb-4">Cookies Específicas que Utilizamos</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold">Cookie</th>
                      <th className="px-4 py-2 text-left font-semibold">Propósito</th>
                      <th className="px-4 py-2 text-left font-semibold">Duración</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-4 py-2">session_id</td>
                      <td className="px-4 py-2">Mantener la sesión del usuario autenticado</td>
                      <td className="px-4 py-2">Sesión</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-2">preferences</td>
                      <td className="px-4 py-2">Recordar configuraciones del usuario</td>
                      <td className="px-4 py-2">1 año</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-2">analytics</td>
                      <td className="px-4 py-2">Análisis de uso del sitio web</td>
                      <td className="px-4 py-2">2 años</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1e5563] mb-4">Cookies de Terceros</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                También utilizamos servicios de terceros que pueden establecer cookies:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Google Analytics:</strong> Para analizar el tráfico del sitio web</li>
                <li><strong>Redes Sociales:</strong> Para integrar contenido de redes sociales</li>
                <li><strong>Procesadores de Pago:</strong> Para procesar transacciones de manera segura</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1e5563] mb-4">Gestión de Cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Usted puede controlar y gestionar las cookies de varias maneras:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Configuración del Navegador:</strong> La mayoría de navegadores permiten controlar las cookies a través de la configuración</li>
                <li><strong>Herramientas del Sitio:</strong> Utilizamos un banner de cookies donde puede gestionar sus preferencias</li>
                <li><strong>Eliminación:</strong> Puede eliminar las cookies existentes a través de la configuración de su navegador</li>
                <li><strong>Desactivación:</strong> Puede desactivar las cookies no esenciales, aunque esto puede afectar la funcionalidad del sitio</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1e5563] mb-4">Configuración por Navegador</h2>
              <div className="space-y-3">
                <p className="text-gray-700"><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies y otros datos de sitios</p>
                <p className="text-gray-700"><strong>Firefox:</strong> Opciones → Privacidad y seguridad → Cookies y datos del sitio</p>
                <p className="text-gray-700"><strong>Safari:</strong> Preferencias → Privacidad → Cookies y datos de sitios web</p>
                <p className="text-gray-700"><strong>Edge:</strong> Configuración → Cookies y permisos del sitio</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1e5563] mb-4">Consecuencias de Deshabilitar Cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Si deshabilita las cookies, algunas funciones del sitio pueden no funcionar correctamente:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>No podrá mantener su sesión iniciada</li>
                <li>Sus preferencias no se recordarán</li>
                <li>La experiencia del sitio puede ser menos personalizada</li>
                <li>Algunas características interactivas pueden no funcionar</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1e5563] mb-4">Actualizaciones de esta Política</h2>
              <p className="text-gray-700 leading-relaxed">
                Podemos actualizar esta política de cookies ocasionalmente para reflejar cambios en nuestras 
                prácticas o por otros motivos operativos, legales o regulatorios.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1e5563] mb-4">Contacto</h2>
              <p className="text-gray-700 leading-relaxed">
                Si tiene preguntas sobre nuestra política de cookies, contáctenos en:
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
