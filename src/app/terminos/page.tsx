import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
    title: "Términos del Servicio – VOLTAJE Charge",
    description: "Términos del Servicio de la aplicación VOLTAJE Charge y de las estaciones de alquiler de power banks de Voltaje Plus C.A.",
};

const H2 = ({ children }: { children: ReactNode }) => (
    <h2 className="text-xl md:text-2xl font-bold text-white mt-12 mb-4">{children}</h2>
);

const P = ({ children }: { children: ReactNode }) => (
    <p className="text-gray-300 leading-relaxed mb-4">{children}</p>
);

const TARIFAS = [
    ["Depósito de garantía", "El monto vigente de cada estación, que se muestra en la app y en la pantalla de la estación antes de confirmar el alquiler"],
    ["Tiempo gratuito", "El indicado en la app para cada estación"],
    ["Tarifa de uso", "La tarifa por tiempo vigente, que se muestra en la app antes de confirmar el alquiler"],
    ["Tope diario", "El cobro por día no supera el tope indicado en la app"],
];

export default function TerminosPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#00E676] selection:text-black">
            <Navbar />
            <article className="container mx-auto px-6 pt-32 pb-20 max-w-3xl">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                    Términos del Servicio – <span className="text-[#00E676]">VOLTAJE Charge</span>
                </h1>
                <p className="text-sm text-gray-500 mb-8">Última actualización: 4 de noviembre de 2026</p>

                <H2>1. Quiénes somos y aceptación</H2>
                <P>Estos Términos regulan el uso de la aplicación VOLTAJE Charge y de las estaciones de alquiler de power banks de Voltaje Plus C.A., RIF J-50783345-3, con domicilio fiscal en Av. Sucre de Los Dos Caminos, Edif. B, piso 8, apto. 803, Conjunto Residencial Yutaje, Caracas, Miranda, zona postal 1071, Venezuela.</P>
                <P>Al registrarte o alquilar un power bank aceptas estos Términos. Si no estás de acuerdo, no uses el servicio.</P>
                <P>El servicio está dirigido a personas mayores de 18 años, o menores con autorización de su representante.</P>

                <H2>2. Cómo funciona el servicio</H2>
                <P>VOLTAJE alquila power banks con cables integrados (Micro USB, Tipo C y Lightning) desde estaciones ubicadas en comercios aliados.</P>
                <P>1) Descarga la app y regístrate. 2) Escanea el código QR de la estación. 3) Paga el depósito de garantía y valida el alquiler. 4) Retira el power bank y úsalo. 5) Devuélvelo en cualquier estación VOLTAJE.</P>
                <P>La disponibilidad de estaciones y power banks puede variar según la ubicación y el horario del comercio aliado.</P>

                <H2>3. Registro y cuenta</H2>
                <P>Para alquilar necesitas una cuenta con un número de teléfono o correo válido. Eres responsable de la veracidad de tus datos y de todo alquiler hecho desde tu cuenta.</P>
                <P>VOLTAJE puede suspender o bloquear cuentas con datos falsos, uso fraudulento, power banks no devueltos o deudas pendientes.</P>

                <H2>4. Depósito de garantía, tarifas y pagos</H2>
                <P>Antes de retirar un power bank debes tener en tu saldo el depósito de garantía que indique la app o la estación. El depósito es reembolsable y no es el precio del alquiler.</P>
                <div className="overflow-x-auto mb-6 rounded-xl border border-white/10">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white/5">
                            <tr>
                                <th className="px-4 py-3 font-bold text-[#00E676]">Concepto</th>
                                <th className="px-4 py-3 font-bold text-[#00E676]">Condición</th>
                            </tr>
                        </thead>
                        <tbody>
                            {TARIFAS.map(([concepto, condicion]) => (
                                <tr key={concepto} className="border-t border-white/10">
                                    <td className="px-4 py-3 font-semibold text-white align-top whitespace-nowrap">{concepto}</td>
                                    <td className="px-4 py-3 text-gray-300">{condicion}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <P>La tarifa se descuenta de tu saldo al devolver el power bank. Todos los montos se expresan en bolívares. Las tarifas y el depósito pueden variar por estación o en el tiempo; el monto que aplica es el que la app muestra antes de que confirmes, y un cambio nunca afecta un alquiler ya iniciado. VOLTAJE emite la factura correspondiente conforme a la normativa del SENIAT.</P>
                <P>Los pagos y recargas se hacen por los medios habilitados en la app. VOLTAJE no se hace responsable por pagos hechos por canales no autorizados.</P>

                <H2>5. Devolución y power bank no devuelto</H2>
                <P>Puedes devolver el power bank en cualquier estación VOLTAJE. El alquiler termina cuando la estación registra la devolución; confírmalo en la app.</P>
                <P>Al devolverlo, guarda los cables en sus ranuras. Si la estación está llena o fuera de servicio, usa otra o contacta a soporte.</P>
                <P>Si no devuelves el power bank dentro del plazo máximo que indica la app, se considera no devuelto: VOLTAJE retendrá el depósito de garantía como pago del equipo y podrá bloquear la cuenta.</P>

                <H2>6. Reembolsos y pedidos revocados</H2>
                <P>El saldo del depósito que no se use queda en tu cuenta. Puedes pedir su reembolso desde la app o por WhatsApp de soporte; se procesa por el mismo medio de pago, en el plazo que indique la app.</P>
                <P>Si el power bank no sale de la estación, el sistema revoca el pedido automáticamente, no cobra la tarifa y devuelve el monto a tu saldo. Puedes volver a alquilar en otra ranura u otra estación.</P>
                <P>Para reclamos por cobros te pedimos escribir a soporte lo antes posible, idealmente dentro de los 30 días siguientes al alquiler, para poder revisar el registro de la estación. Esto no limita los derechos que te otorga la ley ni tu derecho a acudir a la SUNDDE.</P>

                <H2>7. Uso correcto, daños y responsabilidad</H2>
                <P>Durante el alquiler eres responsable del power bank. No lo abras, mojes, golpees ni lo expongas a calor extremo, y no arranques sus cables.</P>
                <P>Si lo devuelves dañado por mal uso, VOLTAJE podrá descontar el costo de reparación o reposición del depósito.</P>
                <P>Salvo dolo o culpa de VOLTAJE, o falla del propio power bank, VOLTAJE no responde por pérdida de datos, daños a tus equipos por cables o cargadores ajenos, ni por fallas causadas por mal uso. Si un power bank presenta una falla, deja de usarlo y repórtalo a soporte.</P>

                <H2>8. Datos personales, cambios, ley aplicable y contacto</H2>
                <P><strong className="text-white">Datos personales.</strong> Usamos tu teléfono, correo e historial de alquileres solo para prestar el servicio, cobrar, dar soporte y prevenir fraudes. No vendemos tus datos. Conforme al artículo 28 de la Constitución, puedes pedir acceso, corrección o eliminación de tus datos, y eliminar tu cuenta desde la app o escribiendo a soporte.</P>
                <P><strong className="text-white">Cambios.</strong> Podemos actualizar estos Términos. Publicaremos la versión vigente en la app y en voltajeplus.com con su fecha. Si el cambio es importante, te lo avisaremos en la app y te pediremos aceptarlo antes de tu siguiente alquiler.</P>
                <P><strong className="text-white">Ley aplicable.</strong> Estos Términos se rigen por las leyes de la República Bolivariana de Venezuela. Cualquier disputa se someterá a los tribunales de Caracas.</P>
                <P>
                    <strong className="text-white">Contacto y soporte:</strong> WhatsApp soporte técnico{' '}
                    <a href="https://wa.me/584163750325" target="_blank" rel="noopener noreferrer" className="text-[#00E676] hover:underline">0416-375-0325</a>
                    {' · '}Correo{' '}
                    <a href="mailto:voltajevzla@gmail.com" className="text-[#00E676] hover:underline">voltajevzla@gmail.com</a>
                    {' · '}Web{' '}
                    <a href="https://voltajeplus.com" className="text-[#00E676] hover:underline">voltajeplus.com</a>
                </P>
            </article>
            <Footer />
        </main>
    );
}
