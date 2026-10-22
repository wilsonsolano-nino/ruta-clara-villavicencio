import { useEffect, useState } from 'react';

const CONSEJOS = [
  {
    consejo: 'Hablar de lo que sientes puede ayudarte a encontrar apoyo.',
    cita: 'Pedir ayuda es una forma de cuidarte.',
  },
  {
    consejo: 'Respira lento, toma agua y date un momento antes de tomar una decisión.',
    cita: 'No tienes que resolverlo todo de una vez.',
  },
  {
    consejo: 'Si alguien te preocupa, escúchalo sin juzgar y acompáñalo a buscar ayuda.',
    cita: 'Acompañar también es estar presente.',
  },
];

interface Props {
  titulo: string;
}

export function ConsejosCarga({ titulo }: Props) {
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    const intervalo = window.setInterval(() => {
      setIndice((actual) => (actual + 1) % CONSEJOS.length);
    }, 5000);

    return () => window.clearInterval(intervalo);
  }, []);

  const contenido = CONSEJOS[indice];

  return (
    <div className="carga-consejo" role="status" aria-live="polite">
      <p className="carga-consejo-titulo">{titulo}</p>
      <p>{contenido.consejo}</p>
      <p className="carga-consejo-cita">"{contenido.cita}"</p>
    </div>
  );
}
