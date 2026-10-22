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
  {
    consejo: 'Lo que sientes importa, aunque no encuentres las palabras para explicarlo.',
    cita: 'Tus emociones merecen un espacio seguro.',
  },
  {
    consejo: 'Descansar también es una manera de avanzar y recuperar energía.',
    cita: 'Cuidarte no es perder el tiempo.',
  },
  {
    consejo: 'Escribe lo que estás sintiendo si hablar todavía parece difícil.',
    cita: 'A veces escribir abre el camino para hablar.',
  },
  {
    consejo: 'Busca a una persona de confianza y cuéntale cómo te encuentras.',
    cita: 'No tienes que llevar tus preocupaciones a solas.',
  },
  {
    consejo: 'Concéntrate en el siguiente paso posible, no en resolverlo todo hoy.',
    cita: 'Un paso pequeño también es progreso.',
  },
  {
    consejo: 'Aléjate un momento de las pantallas y presta atención a tu respiración.',
    cita: 'Regresar al presente puede darte un poco de calma.',
  },
  {
    consejo: 'Comer, dormir y moverte con regularidad puede apoyar tu bienestar.',
    cita: 'El cuidado diario también cuenta.',
  },
  {
    consejo: 'Decir que no cuando algo te hace daño es una forma válida de protegerte.',
    cita: 'Poner límites también es autocuidado.',
  },
  {
    consejo: 'No compares tu proceso con el de otras personas.',
    cita: 'Cada persona avanza a su propio ritmo.',
  },
  {
    consejo: 'Si hoy no puedes con todo, elige una tarea sencilla y empieza por ahí.',
    cita: 'Hacer lo posible es suficiente por ahora.',
  },
  {
    consejo: 'Permítete sentir tristeza, enojo o miedo sin tratarte mal por ello.',
    cita: 'Sentir no te hace débil.',
  },
  {
    consejo: 'Una conversación sincera puede ser el comienzo de un cambio importante.',
    cita: 'Compartir lo que pasa puede aliviar el peso.',
  },
  {
    consejo: 'Si una preocupación se repite, anótala y busca apoyo para entenderla.',
    cita: 'Ponerle nombre a lo que ocurre puede ayudar.',
  },
  {
    consejo: 'Celebra las pequeñas decisiones que tomas para estar mejor.',
    cita: 'Tu esfuerzo merece reconocimiento.',
  },
  {
    consejo: 'Cuando te sientas saturado, detente y busca un lugar tranquilo.',
    cita: 'La calma también puede construirse poco a poco.',
  },
  {
    consejo: 'Pedir orientación profesional puede ayudarte a encontrar nuevas herramientas.',
    cita: 'Buscar apoyo es una decisión valiente.',
  },
  {
    consejo: 'Recuerda que una situación difícil puede cambiar, aunque ahora parezca permanente.',
    cita: 'Este momento no define toda tu historia.',
  },
  {
    consejo: 'Agradece a quien te escucha y también permite que te acompañen.',
    cita: 'Dejarse cuidar también es una forma de confianza.',
  },
  {
    consejo: 'Si algo te supera, cuéntaselo hoy a una persona adulta de confianza.',
    cita: 'Hablar a tiempo puede abrir nuevas opciones.',
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
