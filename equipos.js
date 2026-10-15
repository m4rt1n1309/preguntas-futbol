// Preguntas por equipo: los 30 clubes de la Primera División (Liga Profesional 2026).
// Cada equipo tiene 4 categorías con 5 casillas, de x100 (fácil) a x500 (difícil).
// Cada casilla es una lista de preguntas: en cada partida se sortea una (y no se repite en la revancha).
// Como en preguntas.js, la primera opción de "o" es SIEMPRE la correcta.
// "colores" se usa para el escudito del tablero.
const CATS_EQUIPO = [
  { clave: "historia", nombre: "Historia", corto: "Histo-ria", icono: "📜" },
  { clave: "idolos", nombre: "Ídolos y DT", corto: "Ído-los", icono: "⭐" },
  { clave: "logros", nombre: "Títulos y logros", corto: "Títu-los", icono: "🏆" },
  { clave: "cancha", nombre: "Cancha e hinchada", corto: "Can-cha", icono: "🏟️" },
];

const EQUIPOS = [
  {
    id: "aldosivi", nombre: "Aldosivi", corto: "Aldosivi", colores: ["#0a7a3a", "#f5d10a"],
    historia: [
      [
        { p: "¿De qué ciudad es Aldosivi?", o: ["Mar del Plata", "Bahía Blanca", "Necochea", "Tandil"] },
        { p: "¿En qué provincia está Aldosivi?", o: ["Buenos Aires", "Córdoba", "Santa Fe", "Chubut"] },
      ],
      [
        { p: "¿Cómo le dicen a Aldosivi?", o: ["El Tiburón", "El Lobo", "El Halcón", "El Tatengue"] },
        { p: "¿En qué año jugó Aldosivi su primer torneo de Primera División?", o: ["2015", "2019", "2008", "1999"] },
      ],
      [
        { p: "¿Con qué club juega el clásico marplatense?", o: ["Alvarado", "Kimberley", "Olimpo", "Quilmes"] },
        { p: "En 2015, su primer año en Primera, ¿en qué cancha le ganó Aldosivi a Boca?", o: ["En La Bombonera", "En el Minella", "En el Kempes", "En el Monumental"] },
      ],
      [
        { p: "¿Quiénes fundaron Aldosivi?", o: ["Empleados de la empresa que construía el puerto", "Alumnos de un colegio", "Pescadores del muelle", "Trabajadores de un frigorífico"] },
        { p: "¿En qué año se fundó Aldosivi?", o: ["1913", "1905", "1930", "1945"] },
      ],
      [
        { p: "¿De dónde viene el nombre «Aldosivi»?", o: ["De sílabas de los apellidos de los dueños de la constructora del puerto", "Del nombre de un barco pesquero", "De un barrio de Mar del Plata", "Del apellido de su primer presidente"] },
        { p: "¿Dónde se reunieron en 1911 los empleados del puerto que dieron origen al club?", o: ["En la confitería El Recreo", "En la estación de tren", "En la Catedral", "En el Club Mar del Plata"] },
      ],
    ],
    idolos: [
      [
        { p: "¿Qué ex volante de Boca y Real Madrid tuvo en Aldosivi su primer trabajo como DT?", o: ["Fernando Gago", "Pablo Aimar", "Juan Román Riquelme", "Fernando Redondo"] },
        { p: "¿Qué delantero uruguayo es el máximo goleador de Aldosivi en Primera?", o: ["Martín Cauteruccio", "Sebastián Abreu", "Santiago Silva", "Cristian Rodríguez"] },
      ],
      [
        { p: "¿Qué DT llevó a Aldosivi al título de la Primera Nacional 2024?", o: ["Andrés Yllana", "Fernando Gago", "Gustavo Álvarez", "Guillermo Hoyos"] },
        { p: "¿Qué goleador, después ídolo de Lanús, jugó en Aldosivi en 2015?", o: ["José Sand", "Lautaro Acosta", "Silvio Romero", "Darío Benedetto"] },
      ],
      [
        { p: "¿En qué año asumió Fernando Gago como DT de Aldosivi?", o: ["2020", "2015", "2012", "2023"] },
        { p: "¿Qué goleador apodado «Tatore» es uno de los grandes ídolos de Aldosivi?", o: ["Salvador Vuoso", "Claudio Riaño", "Martín Cauteruccio", "Federico Andrada"] },
      ],
      [
        { p: "¿Qué arquero fue figura en la final del ascenso de 2024?", o: ["Jorge Carranza", "Nahuel Losada", "Tomás Marchiori", "Manuel Vicentini"] },
        { p: "¿Qué delantero apodado «Manija» fue uno de los goleadores de Aldosivi en Primera?", o: ["Francisco Mústico", "Federico Andrada", "Nicolás Laméndola", "Elías Torres"] },
      ],
      [
        { p: "¿Quién abrió el marcador en la final de 2024 ante San Martín de Tucumán?", o: ["Nicolás Laméndola", "Elías Torres", "Jorge Carranza", "Matías Godoy"] },
        { p: "¿Quién fue el primer presidente de Aldosivi?", o: ["Pedro Seré", "José María Minella", "Guillermo Hoyos", "Andrés Yllana"] },
      ],
    ],
    logros: [
      [
        { p: "¿Qué torneo ganó Aldosivi en 2024 para volver a Primera?", o: ["La Primera Nacional", "La Copa Argentina", "El Torneo Federal A", "La Copa de la Liga"] },
        { p: "¿Cuántas veces ascendió Aldosivi a Primera hasta 2024?", o: ["Tres", "Una", "Dos", "Cinco"] },
      ],
      [
        { p: "¿A quién le ganó la final de la Primera Nacional 2024?", o: ["San Martín de Tucumán", "Deportivo Madryn", "Chacarita", "Gimnasia de Mendoza"] },
        { p: "¿En qué año logró Aldosivi su segundo ascenso a Primera?", o: ["2018", "2015", "2010", "2021"] },
      ],
      [
        { p: "¿Cómo terminó esa final de 2024?", o: ["2-0 para Aldosivi", "1-0 para Aldosivi", "1-1 y ganó por penales", "3-2 para Aldosivi"] },
        { p: "¿Qué torneo ganó Aldosivi en 2005 para subir a la segunda categoría?", o: ["El Torneo Argentino A", "La Primera B Metropolitana", "La Copa Argentina", "El Torneo del Interior"] },
      ],
      [
        { p: "¿En qué estadio se jugó la final de 2024?", o: ["Gigante de Arroyito (Rosario)", "Mario Alberto Kempes (Córdoba)", "José María Minella (Mar del Plata)", "Ciudad de La Plata"] },
        { p: "¿En qué año ascendió Aldosivi al Nacional B?", o: ["2005", "1995", "2012", "1988"] },
      ],
      [
        { p: "¿En qué año logró Aldosivi su primer ascenso a Primera, ganándole 1-0 a Gimnasia de Jujuy?", o: ["2014", "2018", "2008", "1999"] },
        { p: "¿Quién hizo el 2-0 de Aldosivi en la final de 2024?", o: ["Elías Torres", "Nicolás Laméndola", "Jorge Carranza", "Martín Cauteruccio"] },
      ],
    ],
    cancha: [
      [
        { p: "¿Cuáles son los colores de Aldosivi?", o: ["Verde y amarillo", "Rojo y blanco", "Azul y oro", "Negro y blanco"] },
        { p: "¿Qué océano baña la ciudad de Aldosivi?", o: ["El Atlántico", "El Pacífico", "El Índico", "El Antártico"] },
      ],
      [
        { p: "¿En qué estadio hace de local Aldosivi?", o: ["José María Minella", "Mario Alberto Kempes", "Malvinas Argentinas", "Florencio Sola"] },
        { p: "¿Cómo es la camiseta clásica de Aldosivi?", o: ["A rayas verticales verdes y amarillas", "Verde con una banda amarilla", "Amarilla con mangas verdes", "Toda verde"] },
      ],
      [
        { p: "¿Para qué torneo se construyó el estadio José María Minella?", o: ["El Mundial 1978", "La Copa América 1987", "Los Juegos Panamericanos 1995", "El Mundial Sub-20 2001"] },
        { p: "¿Qué evento deportivo internacional se hizo en Mar del Plata en 1995?", o: ["Los Juegos Panamericanos", "La Copa América", "El Mundial Sub-20", "Los Juegos Olímpicos de la Juventud"] },
      ],
      [
        { p: "¿Por qué el símbolo de Aldosivi es un tiburón?", o: ["Por la pesca y el puerto de Mar del Plata", "Por un jugador apodado así", "Por un acuario cerca de la cancha", "Por la camiseta de un sponsor"] },
        { p: "¿Quién le dio a Aldosivi las camisetas verdes y amarillas?", o: ["Una tienda de Mar del Plata", "La empresa del puerto", "La Municipalidad", "Un club de Brasil"] },
      ],
      [
        { p: "¿De qué colores fueron las primeras camisetas de Aldosivi?", o: ["Los de la bandera de Francia", "Blanco y negro", "Celeste y blanco", "Rojo y verde"] },
        { p: "¿De quién es el estadio José María Minella?", o: ["De la Municipalidad", "De Aldosivi", "De Alvarado", "De la AFA"] },
      ],
    ],
  },
  {
    id: "argentinos", nombre: "Argentinos Juniors", corto: "Argentinos", colores: ["#d81e1e", "#ffffff"],
    historia: [
      [
        { p: "¿Cómo le dicen a Argentinos Juniors?", o: ["El Bicho", "El Calamar", "El Pincha", "El Globo"] },
        { p: "¿En qué ciudad juega Argentinos Juniors?", o: ["Ciudad de Buenos Aires", "La Plata", "Avellaneda", "Lanús"] },
      ],
      [
        { p: "¿En qué barrio porteño está Argentinos Juniors?", o: ["La Paternal", "Boedo", "Parque Patricios", "Liniers"] },
        { p: "¿Cómo se completa el apodo de Argentinos: «el Bicho...»?", o: ["Colorado", "Rojo", "Feo", "Verde"] },
      ],
      [
        { p: "¿Cómo se lo conoce por la cantidad de jugadores que formó?", o: ["El Semillero del Mundo", "La Fábrica de Cracks", "La Cantera de América", "El Vivero"] },
        { p: "¿Cuántos títulos de liga ganó Argentinos en los años 80?", o: ["Dos", "Uno", "Cuatro", "Ninguno"] },
      ],
      [
        { p: "¿En qué año se fundó Argentinos Juniors?", o: ["1904", "1910", "1899", "1921"] },
        { p: "¿Qué dos torneos ganó Argentinos en forma consecutiva en 1984 y 1985?", o: ["El Metropolitano y el Nacional", "Dos Libertadores", "Dos Copas Argentina", "El Apertura y el Clausura"] },
      ],
      [
        { p: "¿Cómo se llamaba uno de los dos clubes cuya unión dio origen a Argentinos?", o: ["Mártires de Chicago", "Defensores de Villa Crespo", "Sol de Mayo", "Estrella del Oeste"] },
        { p: "¿Cómo se definió la final de la Libertadores 1985?", o: ["En un tercer partido, por penales", "En el partido de vuelta, por goles", "Por gol de visitante", "En el alargue del partido de ida"] },
      ],
    ],
    idolos: [
      [
        { p: "¿Qué astro debutó en Primera con Argentinos en 1976?", o: ["Diego Maradona", "Mario Kempes", "Daniel Passarella", "Ricardo Bochini"] },
        { p: "¿Qué campeón del mundo 2022 debutó en Primera con Argentinos?", o: ["Alexis Mac Allister", "Enzo Fernández", "Julián Álvarez", "Exequiel Palacios"] },
      ],
      [
        { p: "¿Qué ídolo de Boca hizo las inferiores en Argentinos?", o: ["Juan Román Riquelme", "Martín Palermo", "Carlos Tevez", "Guillermo Barros Schelotto"] },
        { p: "¿Qué volante, figura del Real Madrid en los 90, surgió de Argentinos?", o: ["Fernando Redondo", "Fernando Gago", "Esteban Cambiasso", "Santiago Solari"] },
      ],
      [
        { p: "¿Qué DT llevó a Argentinos al título del Clausura 2010?", o: ["Claudio Borghi", "Néstor Gorosito", "Ricardo Caruso Lombardi", "Gabriel Heinze"] },
        { p: "¿Qué lateral, capitán de la Selección en los 2000, surgió de Argentinos?", o: ["Juan Pablo Sorín", "Javier Zanetti", "Gabriel Heinze", "Roberto Ayala"] },
      ],
      [
        { p: "¿Contra qué equipo debutó Maradona en Primera, en 1976?", o: ["Talleres de Córdoba", "Boca Juniors", "Huracán", "Vélez Sarsfield"] },
        { p: "¿Qué volante central del Argentinos campeón de América fue campeón del mundo en 1986?", o: ["Sergio Batista", "Ricardo Giusti", "Héctor Enrique", "Julio Olarticoechea"] },
      ],
      [
        { p: "¿Qué DT dirigió al Argentinos campeón de la Libertadores 1985?", o: ["José Yudica", "Carlos Bilardo", "Carlos Bianchi", "Alfio Basile"] },
        { p: "¿Qué goleador del Argentinos campeón de 1985 le hizo un gol a Uruguay en el Mundial 86?", o: ["Pedro Pasculli", "Claudio Borghi", "Jorge Valdano", "Jorge Burruchaga"] },
      ],
    ],
    logros: [
      [
        { p: "¿Qué copa internacional ganó Argentinos en 1985?", o: ["La Copa Libertadores", "La Copa Sudamericana", "La Supercopa", "La Copa Conmebol"] },
        { p: "¿Cuántas Copas Libertadores ganó Argentinos?", o: ["Una", "Dos", "Tres", "Ninguna"] },
      ],
      [
        { p: "¿A quién le ganó la final de la Libertadores 1985?", o: ["América de Cali", "Peñarol", "Olimpia", "Cobreloa"] },
        { p: "¿Qué torneo ganó Argentinos en 2016-17 para volver a Primera?", o: ["La B Nacional", "La Copa Argentina", "La Primera B Metropolitana", "El Torneo Federal A"] },
      ],
      [
        { p: "¿Qué torneo local ganó Argentinos en 2010?", o: ["El Clausura 2010", "El Apertura 2008", "El Inicial 2013", "La Copa de la Liga 2021"] },
        { p: "¿Contra quién perdió Argentinos la final de la Copa Argentina 2025?", o: ["Independiente Rivadavia", "River", "Central Córdoba", "Vélez"] },
      ],
      [
        { p: "¿Contra quién jugó Argentinos la final Intercontinental de 1985 en Tokio?", o: ["Juventus", "Milan", "Liverpool", "Real Madrid"] },
        { p: "¿Qué copa ganó Argentinos en 1986 ante Defence Force de Trinidad y Tobago?", o: ["La Copa Interamericana", "La Supercopa", "La Recopa", "La Copa Conmebol"] },
      ],
      [
        { p: "¿Cómo terminó esa final Intercontinental de 1985?", o: ["2-2 y perdió por penales", "Ganó 1-0", "Perdió 3-0", "1-1 y ganó por penales"] },
        { p: "¿Cuántas veces fue Maradona goleador de un torneo de Primera jugando en Argentinos?", o: ["Cinco", "Una", "Tres", "Ninguna"] },
      ],
    ],
    cancha: [
      [
        { p: "¿Cuáles son los colores de Argentinos Juniors?", o: ["Rojo y blanco", "Rojo y negro", "Azul y rojo", "Verde y blanco"] },
        { p: "¿De qué color es la camiseta titular de Argentinos?", o: ["Roja", "Blanca", "Azul", "Verde"] },
      ],
      [
        { p: "¿Cómo se llama el estadio de Argentinos?", o: ["Diego Armando Maradona", "Ricardo Bochini", "Alberto J. Armando", "Tomás A. Ducó"] },
        { p: "¿Qué otro club porteño tiene su cancha cerca, en Villa Crespo?", o: ["Atlanta", "Ferro", "Chacarita", "All Boys"] },
      ],
      [
        { p: "¿Qué es la «Casa de D10S» que tiene Argentinos en La Paternal?", o: ["La casa que el club le dio a Maradona", "El museo de la Libertadores 1985", "La pensión de las inferiores", "La sede social del club"] },
        { p: "¿Con cuántos años debutó Maradona en la Primera de Argentinos?", o: ["15", "17", "18", "14"] },
      ],
      [
        { p: "¿En qué década se inauguró el estadio actual de Argentinos?", o: ["En los 2000", "En los 70", "En los 50", "En los 90"] },
        { p: "¿En qué calle de La Paternal está la «Casa de D10S»?", o: ["Lascano", "Gavilán", "San Blas", "Boyacá"] },
      ],
      [
        { p: "¿Cuál es, aproximadamente, la capacidad del estadio de Argentinos?", o: ["Unos 25.000", "Unos 60.000", "Unos 8.000", "Unos 45.000"] },
        { p: "¿En qué ciudad se jugó el desempate de la final de la Libertadores 1985?", o: ["Asunción", "Buenos Aires", "Cali", "Montevideo"] },
      ],
    ],
  },
  {
    id: "atletico-tucuman", nombre: "Atlético Tucumán", corto: "Atlético Tuc.", colores: ["#6fb7e8", "#ffffff"],
    historia: [
      [
        { p: "¿Cómo le dicen a Atlético Tucumán?", o: ["El Decano", "El Santo", "El Lobo", "El Ferroviario"] },
        { p: "¿En qué ciudad juega Atlético Tucumán?", o: ["San Miguel de Tucumán", "Tafí Viejo", "Concepción", "Yerba Buena"] },
      ],
      [
        { p: "¿Cuál es el clásico rival de Atlético Tucumán?", o: ["San Martín de Tucumán", "Central Córdoba", "Talleres", "Gimnasia de Jujuy"] },
        { p: "¿Cómo se llama el partido entre Atlético y San Martín?", o: ["El clásico tucumano", "El clásico del norte", "El clásico de la Ciudadela", "El superclásico del NOA"] },
      ],
      [
        { p: "¿Por qué le dicen «El Decano»?", o: ["Es el club más antiguo de Tucumán", "Lo fundó un decano universitario", "Fue el primero en ascender a Primera", "Por su primer DT"] },
        { p: "¿Qué logró Atlético en 2017 para el norte argentino?", o: ["Fue el primer equipo de la región en jugar una copa Conmebol", "Fue el primero en salir campeón de Primera", "Ganó la primera Copa Argentina del norte", "Jugó el primer partido nocturno"] },
      ],
      [
        { p: "¿En qué año se fundó Atlético Tucumán?", o: ["1902", "1919", "1925", "1896"] },
        { p: "¿Cómo terminó su debut en la Libertadores, ante El Nacional en Tucumán?", o: ["2-2", "1-0 para Atlético", "0-3", "3-1 para Atlético"] },
      ],
      [
        { p: "¿En qué ciudad jugó en 2017 el famoso partido de Libertadores al que llegó tarde y con camisetas prestadas?", o: ["Quito", "La Paz", "Bogotá", "Lima"] },
        { p: "¿Qué equipo colombiano eliminó Atlético en la fase previa de la Libertadores 2017?", o: ["Junior", "Atlético Nacional", "Millonarios", "Santa Fe"] },
      ],
    ],
    idolos: [
      [
        { p: "¿Qué delantero apodado «Pulguita» es un ídolo del Decano?", o: ["Luis Miguel Rodríguez", "Leandro Díaz", "Javier Toledo", "Ramiro Funes Mori"] },
        { p: "¿Qué delantero usó en Quito la camiseta 9 de Lautaro Martínez, prestada por la Sub-20?", o: ["Fernando Zampedri", "Luis Miguel Rodríguez", "Leandro Díaz", "Javier Toledo"] },
      ],
      [
        { p: "¿Qué arquero, apodado «Laucha», es un emblema del club?", o: ["Cristian Lucchetti", "Nahuel Guzmán", "Sebastián Torrico", "Agustín Marchesín"] },
        { p: "¿Qué DT dirigía a Atlético en el famoso partido de Quito en 2017?", o: ["Pablo Lavallén", "Ricardo Zielinski", "Juan Manuel Azconzábal", "Lucas Pusineri"] },
      ],
      [
        { p: "¿Qué selección le prestó las camisetas para jugar en Quito en 2017?", o: ["La Selección Argentina Sub-20", "La Selección de Ecuador", "La Selección Argentina mayor", "La Selección de Tucumán"] },
        { p: "¿De qué copa fue goleador Luis Miguel Rodríguez en 2017?", o: ["De la Copa Sudamericana", "De la Libertadores", "De la Copa Argentina", "Del torneo local"] },
      ],
      [
        { p: "¿Qué DT apodado «el Ruso» dirigió a Atlético entre 2018 y 2021?", o: ["Ricardo Zielinski", "Gustavo Alfaro", "Eduardo Coudet", "Pablo Lavallén"] },
        { p: "¿Quién es el máximo goleador de la historia de Atlético Tucumán?", o: ["Santiago Michal", "Luis Miguel Rodríguez", "Fernando Zampedri", "Javier Toledo"] },
      ],
      [
        { p: "¿Quién es el segundo máximo goleador de la historia de Atlético, detrás de Santiago Michal?", o: ["Luis Miguel Rodríguez", "Fernando Zampedri", "Cristian Lucchetti", "Guillermo Acosta"] },
        { p: "¿Quién es el jugador con más partidos en la historia de Atlético?", o: ["Guillermo Acosta", "Cristian Lucchetti", "Luis Miguel Rodríguez", "Santiago Michal"] },
      ],
    ],
    logros: [
      [
        { p: "¿En qué año jugó Atlético Tucumán su primera Copa Libertadores?", o: ["2017", "2009", "2020", "1979"] },
        { p: "¿En qué año jugó Atlético su primera Copa Sudamericana?", o: ["2017", "2009", "2021", "2013"] },
      ],
      [
        { p: "¿Qué final jugó Atlético en 2017 contra River?", o: ["La de la Copa Argentina", "La de la Supercopa Argentina", "La de la Copa de la Liga", "La del Trofeo de Campeones"] },
        { p: "¿Hasta qué instancia llegó en la Copa Sudamericana 2017?", o: ["Octavos de final", "La final", "Semifinales", "Primera fase"] },
      ],
      [
        { p: "¿Cómo terminó esa final de Copa Argentina 2017?", o: ["River ganó 2-1", "Atlético ganó 1-0", "River ganó 3-0", "1-1 y ganó River por penales"] },
        { p: "¿Por cuánto le ganó a Junior en Tucumán, en la Libertadores 2017?", o: ["3-1", "1-0", "2-2", "5-0"] },
      ],
      [
        { p: "¿Qué torneo ganó Atlético en la temporada 2008-09 para volver a Primera?", o: ["La Primera B Nacional", "El Torneo Argentino A", "La Primera B Metropolitana", "El Torneo Federal A"] },
        { p: "¿Cómo terminó el partido en Quito ante El Nacional, en 2017?", o: ["1-0 para Atlético", "2-2", "3-0 para El Nacional", "0-0"] },
      ],
      [
        { p: "¿A qué equipo eliminó Atlético en aquel partido de Quito de 2017?", o: ["El Nacional", "Liga de Quito", "Independiente del Valle", "Barcelona de Guayaquil"] },
        { p: "¿En qué ciudad se jugó la final de la Copa Argentina 2017 ante River?", o: ["Mendoza", "Córdoba", "Tucumán", "Rosario"] },
      ],
    ],
    cancha: [
      [
        { p: "Atlético es de la provincia conocida como «el Jardín de la República». ¿Cuál es?", o: ["Tucumán", "Salta", "Mendoza", "Jujuy"] },
        { p: "¿Cómo es la camiseta clásica de Atlético Tucumán?", o: ["A bastones celestes y blancos", "Celeste lisa", "Blanca con una banda celeste", "Celeste con una V blanca"] },
      ],
      [
        { p: "¿Cuáles son los colores de Atlético Tucumán?", o: ["Celeste y blanco", "Rojo y blanco", "Verde y blanco", "Azul y amarillo"] },
        { p: "¿En qué región del país está Atlético Tucumán?", o: ["En el noroeste", "En la Patagonia", "En Cuyo", "En el litoral"] },
      ],
      [
        { p: "¿Cómo se llama el estadio de Atlético Tucumán?", o: ["Monumental José Fierro", "La Ciudadela", "Padre Ernesto Martearena", "Alfredo Terrera"] },
        { p: "¿A qué club tucumano le dicen «el Santo»?", o: ["San Martín", "Atlético", "Central Norte", "Concepción FC"] },
      ],
      [
        { p: "¿Cómo se llama la hinchada de Atlético Tucumán?", o: ["La Inimitable", "La Banda del Parque", "La Pandilla", "Los Pibes"] },
        { p: "¿Quién es el máximo goleador del clásico tucumano?", o: ["Santiago Michal", "Luis Miguel Rodríguez", "Fernando Zampedri", "Leandro Díaz"] },
      ],
      [
        { p: "¿Cómo se llama la cancha de San Martín, el clásico rival?", o: ["La Ciudadela", "El Gigante del Norte", "La Bombonerita", "El Fortín"] },
        { p: "¿Cuántos goles hizo Santiago Michal, el máximo goleador del club?", o: ["209", "98", "150", "312"] },
      ],
    ],
  },
  {
    id: "banfield", nombre: "Banfield", corto: "Banfield", colores: ["#0c7a3e", "#ffffff"],
    historia: [
      [
        { p: "¿Cómo le dicen a Banfield?", o: ["El Taladro", "El Granate", "El Halcón", "El Tiburón"] },
        { p: "¿En qué zona del Gran Buenos Aires está Banfield?", o: ["En la zona sur", "En la zona norte", "En la zona oeste", "En La Plata"] },
      ],
      [
        { p: "¿Cuál es el clásico rival de Banfield?", o: ["Lanús", "Temperley", "Los Andes", "Quilmes"] },
        { p: "¿Cómo se conoce al partido entre Banfield y Lanús?", o: ["El clásico del sur", "El clásico de Avellaneda", "El clásico del oeste", "El superclásico"] },
      ],
      [
        { p: "¿En qué partido del conurbano está Banfield?", o: ["Lomas de Zamora", "Lanús", "Quilmes", "Almirante Brown"] },
        { p: "¿En qué año perdió Banfield el desempate por el título con Racing?", o: ["1951", "1972", "1938", "1966"] },
      ],
      [
        { p: "¿Qué colectividad fundó el club Banfield?", o: ["Inmigrantes británicos", "Inmigrantes italianos", "Inmigrantes españoles", "Inmigrantes alemanes"] },
        { p: "¿En qué año jugó Banfield su primera Copa Libertadores?", o: ["2005", "1995", "2010", "1985"] },
      ],
      [
        { p: "¿En qué año se fundó Banfield?", o: ["1896", "1905", "1911", "1923"] },
        { p: "¿A qué equipo brasileño le ganó Banfield 3-1 en la Libertadores 2009, cortándole el invicto?", o: ["Internacional", "Grêmio", "Santos", "Flamengo"] },
      ],
    ],
    idolos: [
      [
        { p: "¿Qué ídolo del club era conocido como «Garrafa»?", o: ["José Luis Sánchez", "Javier Sanguinetti", "Walter Erviti", "Santiago Silva"] },
        { p: "¿Qué histórico capitán del Inter de Milán jugó en Banfield antes de ir a Italia?", o: ["Javier Zanetti", "Esteban Cambiasso", "Walter Samuel", "Diego Milito"] },
      ],
      [
        { p: "¿Qué crack colombiano, luego goleador del Mundial 2014, jugó en Banfield?", o: ["James Rodríguez", "Radamel Falcao", "Juan Guillermo Cuadrado", "Teófilo Gutiérrez"] },
        { p: "¿Qué delantero, después figura de Boca y del Inter, jugó en Banfield?", o: ["Rodrigo Palacio", "Carlos Tevez", "Martín Palermo", "Mauro Icardi"] },
      ],
      [
        { p: "¿Qué DT llevó a Banfield al título del Apertura 2009?", o: ["Julio César Falcioni", "Jorge Burruchaga", "Carlos Bianchi", "Ricardo Gareca"] },
        { p: "¿Qué arquero, después DT de la Selección de México, se formó en Banfield?", o: ["Ricardo La Volpe", "Hugo Gatti", "Ubaldo Fillol", "Nery Pumpido"] },
      ],
      [
        { p: "¿Qué delantero uruguayo, el «Tanque», fue goleador del Banfield campeón 2009?", o: ["Santiago Silva", "Sebastián Abreu", "Carlos Bueno", "Diego Forlán"] },
        { p: "¿Qué DT llevó a Banfield a la final de la Copa Diego Maradona?", o: ["Javier Sanguinetti", "Julio César Falcioni", "Jorge Burruchaga", "Matías Lequi"] },
      ],
      [
        { p: "¿En qué año falleció Garrafa Sánchez, en un accidente de moto?", o: ["2006", "2001", "2010", "1998"] },
        { p: "¿Qué arquero atajaba en el Banfield campeón de 2009?", o: ["Cristian Lucchetti", "Enrique Bologna", "Facundo Cambeses", "Sebastián Saja"] },
      ],
    ],
    logros: [
      [
        { p: "¿Qué torneo de Primera ganó Banfield en 2009?", o: ["El Apertura 2009", "El Clausura 2009", "La Copa Argentina", "La Copa Sudamericana"] },
        { p: "¿Cuántos títulos de Primera ganó Banfield en el profesionalismo?", o: ["Uno", "Tres", "Cinco", "Ninguno"] },
      ],
      [
        { p: "¿Contra quién perdió la última fecha del Apertura 2009, y aun así salió campeón?", o: ["Boca", "River", "Lanús", "Newell's"] },
        { p: "¿Qué equipo peleaba el Apertura 2009 y lo perdió al caer con San Lorenzo?", o: ["Newell's", "Boca", "Vélez", "Lanús"] },
      ],
      [
        { p: "¿Con qué equipo empató en el primer puesto en 1951 y perdió el desempate?", o: ["Racing", "River", "Boca", "Independiente"] },
        { p: "¿Hasta qué instancia llegó Banfield en la Libertadores 2009?", o: ["Octavos de final", "La final", "Semifinales", "Fase de grupos"] },
      ],
      [
        { p: "¿Qué final le ganó Boca a Banfield por penales en enero de 2021?", o: ["La Copa Diego Maradona", "La Copa de la Liga", "La Supercopa Argentina", "La Copa Argentina"] },
        { p: "¿Cómo terminó el tiempo regular de la final de la Copa Diego Maradona ante Boca?", o: ["1-1", "0-0", "2-2", "Ganó Boca 1-0"] },
      ],
      [
        { p: "¿Hasta qué instancia llegó Banfield en su primera Libertadores (2005)?", o: ["Cuartos de final", "Fase de grupos", "Semifinales", "La final"] },
        { p: "¿Quiénes hicieron los goles del 3-1 a Internacional en 2009?", o: ["James Rodríguez, Battión y Fernández", "Silva, Erviti y Bustamante", "Zanetti, Palacio y La Volpe", "Garrafa Sánchez, Silva y James"] },
      ],
    ],
    cancha: [
      [
        { p: "¿Cuáles son los colores de Banfield?", o: ["Verde y blanco", "Granate y blanco", "Rojo y negro", "Azul y amarillo"] },
        { p: "¿Qué línea de tren pasa por la estación Banfield?", o: ["La Roca", "La Sarmiento", "La Mitre", "La San Martín"] },
      ],
      [
        { p: "¿Cómo es el diseño clásico de la camiseta de Banfield?", o: ["Rayas verticales verdes y blancas", "Verde con banda blanca", "Blanca con una V verde", "Mitad verde y mitad blanca"] },
        { p: "¿Qué otro club del partido de Lomas de Zamora juega en el ascenso?", o: ["Los Andes", "Temperley", "Talleres de Escalada", "Arsenal"] },
      ],
      [
        { p: "¿Cómo se llama el estadio de Banfield?", o: ["Florencio Sola", "Ciudad de Lanús", "Norberto Tomaghello", "Alfredo Beranger"] },
        { p: "¿Entre qué años jugó James Rodríguez en Banfield?", o: ["Entre 2008 y 2010", "Entre 2001 y 2003", "Entre 2012 y 2014", "Entre 2015 y 2017"] },
      ],
      [
        { p: "¿Quién fue Florencio Sola, el que le da nombre al estadio?", o: ["Un presidente del club", "Un goleador histórico", "Un intendente de Lomas", "El primer DT del club"] },
        { p: "¿Qué apodo tiene Javier Zanetti, ex jugador de Banfield?", o: ["Pupi", "Cuchu", "Pato", "Chacho"] },
      ],
      [
        { p: "¿A quién homenajea el nombre Banfield (la ciudad y el club)?", o: ["A Edward Banfield, del Ferrocarril del Sud", "A un general de la Independencia", "Al primer capitán del equipo", "A un pueblo de Inglaterra"] },
        { p: "¿A qué club europeo fue James Rodríguez cuando dejó Banfield?", o: ["Porto", "Mónaco", "Real Madrid", "Benfica"] },
      ],
    ],
  },
  {
    id: "barracas", nombre: "Barracas Central", corto: "Barracas", colores: ["#c8102e", "#ffffff"],
    historia: [
      [
        { p: "¿En qué barrio porteño está Barracas Central?", o: ["Barracas", "Pompeya", "La Boca", "Constitución"] },
        { p: "¿En qué ciudad juega Barracas Central?", o: ["Ciudad de Buenos Aires", "Avellaneda", "Lanús", "La Plata"] },
      ],
      [
        { p: "¿Cuál es el apodo más conocido de Barracas Central?", o: ["El Guapo", "El Bicho", "El Calamar", "El Quemero"] },
        { p: "¿En qué año se fundó Barracas Central?", o: ["1904", "1931", "1950", "1975"] },
      ],
      [
        { p: "¿Qué cargo tenía Claudio «Chiqui» Tapia en Barracas antes de llegar a la AFA?", o: ["Presidente", "Director técnico", "Arquero titular", "Utilero"] },
        { p: "¿Con qué nombre se afilió Barracas a la AFA en 1911?", o: ["Villa Soldati", "Barracas Juniors", "Sportivo Barracas", "Riachuelo"] },
      ],
      [
        { p: "¿En qué década jugó Barracas en Primera durante la era amateur?", o: ["En los años 20", "En los años 50", "En los años 70", "Nunca había jugado"] },
        { p: "¿En qué año adoptó oficialmente el nombre Barracas Central?", o: ["1913", "1904", "1930", "1950"] },
      ],
      [
        { p: "¿Cuántos años tuvo que esperar Barracas para volver a Primera en 2021?", o: ["87 años", "40 años", "12 años", "25 años"] },
        { p: "Según la historia, ¿qué oficio tenía Felipe Cámpora, uno de los fundadores?", o: ["Camionero", "Panadero", "Maestro", "Ferroviario"] },
      ],
    ],
    idolos: [
      [
        { p: "¿Qué cargo ocupa Claudio «Chiqui» Tapia, histórico dirigente de Barracas?", o: ["Presidente de la AFA", "Presidente de la Conmebol", "DT de la Selección", "Presidente de la FIFA"] },
        { p: "¿Qué hijo del Chiqui Tapia fue el 10 del equipo?", o: ["Iván Tapia", "Matías Tapia", "Claudio Tapia", "Rodrigo Tapia"] },
      ],
      [
        { p: "¿Qué apellido comparten el ex presidente, el presidente y el número 10 del club?", o: ["Tapia", "Moyano", "Insúa", "Riquelme"] },
        { p: "¿Qué arquero, que llegó desde Unión en 2024, fue uno de los referentes del equipo?", o: ["Sebastián Moyano", "Nahuel Losada", "Jorge Carranza", "Manuel Vicentini"] },
      ],
      [
        { p: "¿Qué DT, también relator de fútbol, logró el ascenso de 2021?", o: ["Rodolfo De Paoli", "Mariano Closs", "Sebastián Vignolo", "Walter Nelson"] },
        { p: "¿Qué jugador de Barracas, hijo de Rubén Darío Insúa, le hizo un golazo a Boca en 2025?", o: ["Rodrigo Insúa", "Federico Insúa", "Emanuel Insúa", "Iván Tapia"] },
      ],
      [
        { p: "¿Qué ídolo de San Lorenzo como jugador fue DT de Barracas en 2022?", o: ["Rubén Darío Insúa", "Leandro Romagnoli", "Néstor Ortigoza", "Pablo Michelini"] },
        { p: "¿En qué año fue elegido Claudio Tapia presidente de la AFA?", o: ["2017", "2010", "2021", "2005"] },
      ],
      [
        { p: "¿Cómo se llama el presidente de Barracas, hijo del «Chiqui» Tapia?", o: ["Matías Tapia", "Iván Tapia", "Claudio Tapia (h)", "Pablo Tapia"] },
        { p: "¿En qué año jugó Barracas su primer torneo de Primera tras el ascenso de 2021?", o: ["2022", "2021", "2024", "2019"] },
      ],
    ],
    logros: [
      [
        { p: "¿En qué año ascendió Barracas a la Primera División actual?", o: ["2021", "2017", "2023", "2019"] },
        { p: "¿En qué etapa del fútbol argentino había jugado Barracas en Primera antes de 2022?", o: ["En la era amateur", "En los años 90", "En los Nacionales de los 70", "Nunca"] },
      ],
      [
        { p: "¿A quién le ganó la final por el ascenso de 2021?", o: ["Quilmes", "Almirante Brown", "Tigre", "Estudiantes de Caseros"] },
        { p: "¿En qué categoría jugaba Barracas antes de subir a la Primera Nacional?", o: ["La Primera B Metropolitana", "La Primera C", "El Federal A", "La Primera D"] },
      ],
      [
        { p: "¿Cómo se definió aquella final contra Quilmes?", o: ["0-0 y ganó por penales", "Ganó 2-1", "Ganó 1-0 en el alargue", "Ganó 3-0"] },
        { p: "¿Cuál fue el resultado de la tanda de penales en la final con Quilmes de 2021?", o: ["5-4", "3-2", "4-1", "7-6"] },
      ],
      [
        { p: "¿En qué temporada ascendió de la Primera B a la Primera Nacional?", o: ["2018-19", "2010-11", "2014", "2003-04"] },
        { p: "¿Qué título ganó Barracas en 1919?", o: ["La División Intermedia", "La Primera División", "La Copa de Competencia", "La Copa Ibarguren"] },
      ],
      [
        { p: "¿Qué torneo ganó Barracas en 1919, que le dio el ascenso a Primera?", o: ["La División Intermedia", "La Copa de Competencia", "La Primera C", "La Copa Ibarguren"] },
        { p: "¿Desde qué década jugó Barracas en el ascenso hasta volver a Primera?", o: ["Desde los años 30-40", "Desde los años 70", "Desde los años 90", "Desde los 2000"] },
      ],
    ],
    cancha: [
      [
        { p: "¿Cómo se llama el estadio de Barracas Central?", o: ["Claudio «Chiqui» Tapia", "Tomás A. Ducó", "Guillermo Laza", "Alfredo Palacio"] },
        { p: "¿Cuántos espectadores entran, aproximadamente, en la cancha de Barracas?", o: ["Unos 12.000", "Unos 50.000", "Unos 3.000", "Unos 30.000"] },
      ],
      [
        { p: "¿Cuáles son los colores de Barracas Central?", o: ["Rojo y blanco", "Verde y negro", "Azul y amarillo", "Celeste y blanco"] },
        { p: "¿Cómo le dicen al club, por su ubicación en la ciudad?", o: ["El Guapo del Sur", "El Fortín del Oeste", "El Gigante del Norte", "El Señor del Centro"] },
      ],
      [
        { p: "Además de «El Guapo», ¿qué otro apodo tiene Barracas?", o: ["El Camionero", "El Calamar", "El Tiburón", "El Fortín"] },
        { p: "¿Qué gremio está vinculado a uno de los apodos del club?", o: ["El de los camioneros", "El de los bancarios", "El de los docentes", "El de los portuarios"] },
      ],
      [
        { p: "¿En qué estadio se jugó la final del ascenso de 2021?", o: ["El de Racing, en Avellaneda", "La Bombonera", "El Monumental", "El de Vélez"] },
        { p: "¿Qué río marca el límite sur del barrio de Barracas?", o: ["El Riachuelo", "El Río de la Plata", "El arroyo Maldonado", "El río Luján"] },
      ],
      [
        { p: "¿En qué esquina está la cancha de Barracas Central?", o: ["Olavarría y Luna", "Brandsen y Del Valle Iberlucea", "Av. La Plata y Cobo", "Juan B. Justo y Corrientes"] },
        { p: "¿Cómo se llamaba el club cuando se fundó, según la historia de Felipe Cámpora?", o: ["Barracas Central del Sud", "Barracas Juniors", "Sportivo Barracas", "Central Barracas"] },
      ],
    ],
  },
  {
    id: "belgrano", nombre: "Belgrano", corto: "Belgrano", colores: ["#4fa8e0", "#ffffff"],
    historia: [
      [
        { p: "¿Cómo le dicen a Belgrano de Córdoba?", o: ["El Pirata", "La T", "La Gloria", "El Albo"] },
        { p: "¿A qué prócer homenajea el nombre de Belgrano?", o: ["A Manuel Belgrano", "A José de San Martín", "A Mariano Moreno", "A Domingo Sarmiento"] },
      ],
      [
        { p: "¿Cuál es el clásico rival de Belgrano?", o: ["Talleres", "Instituto", "Racing de Córdoba", "Estudiantes de Río Cuarto"] },
        { p: "¿De dónde salen los colores celeste y blanco de Belgrano?", o: ["De la bandera argentina", "De la camiseta de Racing", "Del cielo de Córdoba", "De un club inglés"] },
      ],
      [
        { p: "¿En qué barrio de Córdoba está la cancha de Belgrano?", o: ["Alberdi", "Jardín", "Alta Córdoba", "Nueva Córdoba"] },
        { p: "¿Quién fundó Belgrano en 1905?", o: ["Arturo Orgaz", "Julio César Villagra", "Juan Carlos Olave", "Manuel Belgrano"] },
      ],
      [
        { p: "¿A qué grande mandó Belgrano al descenso en la Promoción de 2011?", o: ["River", "Independiente", "San Lorenzo", "Racing"] },
        { p: "¿Cómo se llama el clásico entre Belgrano y Talleres?", o: ["El clásico cordobés", "El clásico del interior", "El clásico de Alberdi", "El clásico del centro"] },
      ],
      [
        { p: "¿En qué año se fundó Belgrano?", o: ["1905", "1913", "1918", "1931"] },
        { p: "¿De qué grupo de hinchas de 1968 vendría el apodo «Pirata», según la versión más difundida?", o: ["Los Piratas Celestes", "La Barra del Pirata", "Los Corsarios de Alberdi", "Los Bucaneros"] },
      ],
    ],
    idolos: [
      [
        { p: "¿Qué defensor campeón del mundo en 2022 surgió de las inferiores de Belgrano?", o: ["Cristian «Cuti» Romero", "Nicolás Otamendi", "Lisandro Martínez", "Nahuel Molina"] },
        { p: "¿Quién fue Julio César Villagra, que da nombre al estadio?", o: ["Un ídolo que jugó en Belgrano en los 80", "Un presidente del club", "El arquitecto del estadio", "Un intendente de Córdoba"] },
      ],
      [
        { p: "¿Qué arquero es uno de los grandes ídolos de Belgrano?", o: ["Juan Carlos Olave", "Hugo Gatti", "Sebastián Saja", "Nahuel Guzmán"] },
        { p: "¿Qué volante, después figura en Italia, se formó en Belgrano?", o: ["Franco Vázquez", "Paulo Dybala", "Javier Pastore", "Ever Banega"] },
      ],
      [
        { p: "¿Qué DT llevó a Belgrano a ganarle la Promoción a River en 2011?", o: ["Ricardo Zielinski", "Gustavo Costas", "Alfio Basile", "Juan José López"] },
        { p: "¿Qué volante de Belgrano fue después figura del Columbus Crew en la MLS?", o: ["Lucas Zelarrayán", "Franco Vázquez", "Cristian Romero", "Juan Carlos Olave"] },
      ],
      [
        { p: "¿Quién hizo el gol de Belgrano en el Monumental en 2011 y después fue DT del ascenso de 2022?", o: ["Guillermo Farré", "César Mansanelli", "Franco Vázquez", "Lucas Zelarrayán"] },
        { p: "¿Entre qué años jugó Julio César Villagra en Belgrano?", o: ["1982 y 1991", "1960 y 1970", "1995 y 2005", "1975 y 1980"] },
      ],
      [
        { p: "¿Qué goleador, hijo de un famoso goleador de Independiente, es ídolo de Belgrano?", o: ["Luis Fabián Artime", "Diego Bochini", "Martín Pogany", "Sebastián Bertoni"] },
        { p: "¿Desde qué año el Gigante de Alberdi se llama Julio César Villagra?", o: ["1993", "1980", "2011", "1970"] },
      ],
    ],
    logros: [
      [
        { p: "¿Qué torneo ganó Belgrano en 2022 para volver a Primera?", o: ["La Primera Nacional", "La Copa Argentina", "El Torneo Federal A", "La Copa de la Liga"] },
        { p: "¿En qué año ganó Belgrano la Promoción ante River?", o: ["2011", "2007", "2015", "2002"] },
      ],
      [
        { p: "¿Cómo terminó la ida de la Promoción 2011, en Córdoba?", o: ["Belgrano ganó 2-0", "1-1", "River ganó 1-0", "Belgrano ganó 3-1"] },
        { p: "¿Quién dirigía a River en esa Promoción de 2011?", o: ["Juan José López", "Ramón Díaz", "Ángel Cappa", "Matías Almeyda"] },
      ],
      [
        { p: "¿Cómo terminó la vuelta de la Promoción 2011, en el Monumental?", o: ["1-1", "River ganó 2-0", "Belgrano ganó 1-0", "0-0"] },
        { p: "¿Qué título regional ganó Belgrano en 1986?", o: ["El Regional", "La Copa Argentina", "El Nacional", "El Metropolitano"] },
      ],
      [
        { p: "¿Qué liga regional ganó Belgrano muchísimas veces?", o: ["La Liga Cordobesa", "La Liga Rosarina", "La Liga Mendocina", "La Liga Tucumana"] },
        { p: "¿En qué estadio se jugó la vuelta de la Promoción 2011?", o: ["El Monumental", "El Kempes", "El Gigante de Alberdi", "La Bombonera"] },
      ],
      [
        { p: "¿Cuál fue el resultado global de la Promoción 2011 ante River?", o: ["3-1 para Belgrano", "2-1 para Belgrano", "2-2, ganó por ventaja deportiva", "4-1 para Belgrano"] },
        { p: "¿En qué tres años seguidos fue campeón de la Liga Cordobesa con Villagra en el equipo?", o: ["1983, 1984 y 1985", "1970, 1971 y 1972", "1990, 1991 y 1992", "1977, 1978 y 1979"] },
      ],
    ],
    cancha: [
      [
        { p: "¿Cómo le dicen a la cancha de Belgrano?", o: ["El Gigante de Alberdi", "El Coloso del Parque", "La Boutique", "El Monumental de Alta Córdoba"] },
        { p: "¿En qué ciudad juega Belgrano?", o: ["Córdoba", "Rosario", "Mendoza", "Río Cuarto"] },
      ],
      [
        { p: "¿De qué color es la camiseta de Belgrano?", o: ["Celeste", "Azul", "Blanca con rayas rojas", "Verde"] },
        { p: "¿Cuántos espectadores entran, más o menos, en el Gigante de Alberdi?", o: ["Unos 30.000", "Unos 8.000", "Unos 70.000", "Unos 15.000"] },
      ],
      [
        { p: "¿Cuál es el nombre oficial del Gigante de Alberdi?", o: ["Julio César Villagra", "Mario Alberto Kempes", "Juan Domingo Perón", "La Boutique"] },
        { p: "¿Qué tribuna del Gigante de Alberdi se inauguró en 2017?", o: ["La tribuna Tomás Cuellar", "La tribuna Arturo Orgaz", "La tribuna Olave", "La tribuna Villagra"] },
      ],
      [
        { p: "¿Qué otro estadio usa Belgrano para los partidos con más público?", o: ["El Mario Alberto Kempes", "El Juan Domingo Perón", "El Malvinas Argentinas", "El Antonio Candini"] },
        { p: "¿Qué otro club cordobés juega en el barrio Alta Córdoba?", o: ["Instituto", "Talleres", "Racing de Córdoba", "General Paz Juniors"] },
      ],
      [
        { p: "¿Cómo se llama la hinchada de Belgrano?", o: ["Los Piratas Celestes de Alberdi", "La Inimitable", "La Barra del Pirata Negro", "Los Celestes del Norte"] },
        { p: "¿Qué partido ganó Belgrano 2-0 en Córdoba en junio de 2011?", o: ["La ida de la Promoción ante River", "La final de la Copa Argentina", "Un clásico ante Talleres", "Un partido de Libertadores"] },
      ],
    ],
  },
  {
    id: "boca", nombre: "Boca Juniors", corto: "Boca", colores: ["#103f8f", "#f5c518"],
    historia: [
      [
        { p: "¿En qué barrio porteño nació Boca Juniors?", o: ["La Boca", "Barracas", "San Telmo", "Constitución"] },
        { p: "¿Cuál es el clásico rival de Boca?", o: ["River", "Racing", "Independiente", "San Lorenzo"] },
      ],
      [
        { p: "¿Por qué a Boca le dicen «Xeneize»?", o: ["Por los inmigrantes genoveses del barrio", "Por un barco que llegaba al puerto", "Por su primer presidente", "Por el color de la camiseta"] },
        { p: "¿Cómo se llama el partido entre Boca y River?", o: ["El Superclásico", "El clásico de Avellaneda", "El clásico porteño", "El clásico del Río de la Plata"] },
      ],
      [
        { p: "¿De dónde salieron los colores azul y oro de Boca?", o: ["De la bandera de un barco sueco", "De la camiseta de un club inglés", "De la bandera de Génova", "De un sorteo entre los fundadores"] },
        { p: "¿De qué país eran mayormente los inmigrantes que fundaron Boca?", o: ["Italia", "España", "Inglaterra", "Suecia"] },
      ],
      [
        { p: "¿En qué año se fundó Boca Juniors?", o: ["1905", "1901", "1913", "1899"] },
        { p: "¿En qué año descendió Boca?", o: ["Nunca descendió", "1949", "1985", "2002"] },
      ],
      [
        { p: "¿Cuál de estos fue uno de los fundadores de Boca?", o: ["Esteban Baglietto", "Antonio Vespucio Liberti", "Alberto J. Armando", "Pedro Pompilio"] },
        { p: "¿Qué ídolo de Boca fue elegido presidente del club en 2023?", o: ["Juan Román Riquelme", "Martín Palermo", "Carlos Tevez", "Guillermo Barros Schelotto"] },
      ],
    ],
    idolos: [
      [
        { p: "¿Qué ídolo de Boca usaba la 10 y fue campeón de la Libertadores 2000, 2001 y 2007?", o: ["Juan Román Riquelme", "Carlos Tevez", "Diego Maradona", "Fernando Gago"] },
        { p: "¿Qué delantero, apodado «el Apache», fue campeón de la Libertadores 2003 con Boca?", o: ["Carlos Tevez", "Martín Palermo", "Guillermo Barros Schelotto", "Darío Benedetto"] },
      ],
      [
        { p: "¿Quién es el máximo goleador de la historia de Boca?", o: ["Martín Palermo", "Roberto Cherro", "Francisco Varallo", "Carlos Tevez"] },
        { p: "¿Qué crack jugó en Boca en 1981 y entre 1995 y 1997?", o: ["Diego Maradona", "Ricardo Bochini", "Mario Kempes", "Daniel Passarella"] },
      ],
      [
        { p: "¿Qué DT ganó tres Copas Libertadores con Boca?", o: ["Carlos Bianchi", "Juan Carlos Lorenzo", "Alfio Basile", "Miguel Ángel Russo"] },
        { p: "¿Qué arquero colombiano fue figura en la Libertadores 2000 y 2001?", o: ["Óscar Córdoba", "René Higuita", "Faryd Mondragón", "David Ospina"] },
      ],
      [
        { p: "¿Quién es el jugador con más partidos oficiales en Boca?", o: ["Roberto Mouzo", "Hugo Gatti", "Antonio Rattín", "Silvio Marzolini"] },
        { p: "¿Qué DT dirigió a Boca en los años 70, ganando sus primeras dos Libertadores?", o: ["Juan Carlos Lorenzo", "Carlos Bianchi", "Alfio Basile", "Silvio Marzolini"] },
      ],
      [
        { p: "¿Cuántos goles oficiales hizo Martín Palermo en Boca?", o: ["236", "198", "253", "211"] },
        { p: "¿Qué arquero de Boca, apodado «el Loco», jugó la Libertadores de 1977 y 1978?", o: ["Hugo Gatti", "Carlos Navarro Montoya", "Óscar Córdoba", "Roberto Abbondanzieri"] },
      ],
    ],
    logros: [
      [
        { p: "¿Cuántas Copas Libertadores ganó Boca?", o: ["6", "4", "7", "5"] },
        { p: "¿Cuántas Copas Intercontinentales ganó Boca?", o: ["3", "1", "2", "4"] },
      ],
      [
        { p: "¿A quién le ganó Boca la Intercontinental 2000, con dos goles de Palermo?", o: ["Real Madrid", "Milan", "Bayern Múnich", "Manchester United"] },
        { p: "¿Contra quién ganó Boca la Intercontinental de 1977?", o: ["Borussia Mönchengladbach", "Liverpool", "Bayern Múnich", "Nottingham Forest"] },
      ],
      [
        { p: "¿A quién le ganó Boca la Intercontinental 2003 por penales?", o: ["Milan", "Real Madrid", "Porto", "Liverpool"] },
        { p: "¿Contra quién ganó Boca la final de la Libertadores 2000?", o: ["Palmeiras", "Cruz Azul", "Santos", "Grêmio"] },
      ],
      [
        { p: "¿Contra quién ganó Boca su primera Libertadores, en 1977?", o: ["Cruzeiro", "Santos", "Peñarol", "Olimpia"] },
        { p: "¿Contra quién ganó Boca la final de la Libertadores 2001?", o: ["Cruz Azul", "Palmeiras", "Santos", "Olimpia"] },
      ],
      [
        { p: "¿A quién le ganó Boca la final de la Libertadores 2007?", o: ["Grêmio", "Santos", "Cruz Azul", "Palmeiras"] },
        { p: "¿Contra quién ganó Boca la final de la Libertadores 2003?", o: ["Santos", "Grêmio", "Palmeiras", "Cruz Azul"] },
      ],
    ],
    cancha: [
      [
        { p: "¿Cómo le dicen a la cancha de Boca?", o: ["La Bombonera", "El Monumental", "El Cilindro", "El Fortín"] },
        { p: "¿Cuáles son los colores de Boca?", o: ["Azul y oro", "Rojo y blanco", "Azul y rojo", "Celeste y blanco"] },
      ],
      [
        { p: "¿Cómo se la conoce a la hinchada de Boca?", o: ["La 12", "Los Borrachos del Tablón", "La Guardia Imperial", "La Gloriosa Butteler"] },
        { p: "¿Por qué se dice que la Bombonera «late»?", o: ["Porque la estructura vibra con los saltos de la gente", "Por un reloj en la tribuna", "Por un ruido de las cañerías", "Por una canción de la hinchada"] },
      ],
      [
        { p: "¿Cuál es el nombre oficial de la Bombonera?", o: ["Alberto J. Armando", "Antonio Vespucio Liberti", "Juan Domingo Perón", "Pedro Bidegain"] },
        { p: "¿Qué forma tiene la Bombonera por su espacio reducido?", o: ["Tiene un lado casi recto, con palcos", "Es completamente circular", "Es un óvalo con pista de atletismo", "Tiene forma de triángulo"] },
      ],
      [
        { p: "¿En qué año se inauguró la Bombonera?", o: ["1940", "1925", "1958", "1938"] },
        { p: "¿Qué famosa calle turística está cerca de la Bombonera?", o: ["Caminito", "Florida", "Corrientes", "Defensa"] },
      ],
      [
        { p: "¿En qué calle está la Bombonera?", o: ["Brandsen", "Caminito", "Almirante Brown", "Pedro de Mendoza"] },
        { p: "¿Qué arquitecto diseñó la Bombonera?", o: ["José Luis Delpini", "Clorindo Testa", "César Pelli", "Alejandro Bustillo"] },
      ],
    ],
  },
  {
    id: "central-cordoba", nombre: "Central Córdoba (SdE)", corto: "Central Cba.", colores: ["#111111", "#ffffff"],
    historia: [
      [
        { p: "¿De qué provincia es Central Córdoba, el que juega en Primera?", o: ["Santiago del Estero", "Córdoba", "Santa Fe", "Catamarca"] },
        { p: "¿En qué ciudad juega Central Córdoba?", o: ["Santiago del Estero", "La Banda", "Termas de Río Hondo", "Córdoba"] },
      ],
      [
        { p: "¿Cómo le dicen a Central Córdoba?", o: ["El Ferroviario", "El Decano", "El Lobo", "La Lepra"] },
        { p: "¿Por qué el club se llama «Central Córdoba»?", o: ["Por el Ferrocarril Central Córdoba", "Porque lo fundaron cordobeses", "Por una calle de Santiago", "Por un club de Rosario"] },
      ],
      [
        { p: "¿Con qué club juega el clásico santiagueño?", o: ["Mitre", "Güemes", "Quimsa", "Sarmiento de La Banda"] },
        { p: "¿En qué año ascendió Central Córdoba a la Primera actual?", o: ["2019", "2014", "2022", "2010"] },
      ],
      [
        { p: "¿Quiénes fundaron Central Córdoba?", o: ["Trabajadores del ferrocarril", "Alumnos de un colegio", "Inmigrantes británicos", "Empleados de un banco"] },
        { p: "¿Cómo terminó la tanda de penales de la final de 2019 ante Sarmiento?", o: ["5-3", "4-2", "3-1", "7-6"] },
      ],
      [
        { p: "¿En qué año se fundó Central Córdoba?", o: ["1919", "1905", "1936", "1950"] },
        { p: "¿Cuál fue el primer triunfo internacional en la historia de Central Córdoba?", o: ["Ante Flamengo en el Maracaná", "Ante LDU en Quito", "Ante Peñarol en Montevideo", "Ante Bolívar en La Paz"] },
      ],
    ],
    idolos: [
      [
        { p: "¿Qué DT llevó a Central Córdoba a ganar la Copa Argentina 2024?", o: ["Omar De Felippe", "Gustavo Coleoni", "Abel Balbo", "Lucas Pusineri"] },
        { p: "¿A qué gigante brasileño le ganó Central Córdoba 2-1 en el Maracaná?", o: ["Flamengo", "Fluminense", "Vasco da Gama", "Botafogo"] },
      ],
      [
        { p: "¿Quién hizo el gol de la final de la Copa Argentina 2024?", o: ["Matías Godoy", "Lucas Varaldo", "Braian Romero", "Michael Santos"] },
        { p: "¿En qué año le ganó Central Córdoba a Flamengo en el Maracaná?", o: ["2025", "2024", "2019", "2023"] },
      ],
      [
        { p: "Hay otro Central Córdoba en el fútbol argentino. ¿De qué ciudad es?", o: ["Rosario", "Córdoba", "Mendoza", "Tucumán"] },
        { p: "¿Qué récord logró Central Córdoba al ganarle a Flamengo en Brasil?", o: ["Fue el primer argentino en ganarle de visitante por Libertadores en 90 minutos", "Fue el primero en hacerle 5 goles", "Fue el primero en ganarle sin arquero titular", "Ninguno"] },
      ],
      [
        { p: "¿A qué arquero le hizo el gol Matías Godoy en la final de 2024?", o: ["Tomás Marchiori", "Franco Armani", "Nahuel Losada", "Sergio Romero"] },
        { p: "¿Cómo terminó el partido con Flamengo en Santiago del Estero, en 2025?", o: ["1-1", "2-0 para Central", "0-3", "2-2"] },
      ],
      [
        { p: "¿A qué equipo platense eliminó Central Córdoba camino al título de la Copa Argentina 2024?", o: ["Estudiantes", "Gimnasia", "Villa San Carlos", "Cambaceres"] },
        { p: "¿Qué equipo ecuatoriano dejó afuera a Central Córdoba en la Libertadores 2025?", o: ["LDU Quito", "Independiente del Valle", "Barcelona", "Emelec"] },
      ],
    ],
    logros: [
      [
        { p: "¿Qué copa nacional ganó Central Córdoba en 2024?", o: ["La Copa Argentina", "La Copa de la Liga", "La Supercopa Argentina", "El Trofeo de Campeones"] },
        { p: "¿Cuántas Copas Argentina ganó Central Córdoba?", o: ["Una", "Ninguna", "Dos", "Tres"] },
      ],
      [
        { p: "¿A quién le ganó la final de la Copa Argentina 2024?", o: ["Vélez", "River", "Talleres", "Estudiantes"] },
        { p: "¿En qué grupo de la Libertadores 2025 jugó con Flamengo y LDU?", o: ["Grupo C", "Grupo A", "Grupo H", "Grupo F"] },
      ],
      [
        { p: "¿Cómo terminó esa final de 2024?", o: ["1-0 para Central Córdoba", "2-2 y ganó por penales", "3-1 para Central Córdoba", "2-1 para Central Córdoba"] },
        { p: "¿Con cuántos puntos terminó Central Córdoba su grupo de la Libertadores 2025?", o: ["11", "4", "15", "7"] },
      ],
      [
        { p: "¿A qué copa internacional clasificó por primera vez gracias a ese título?", o: ["La Libertadores 2025", "La Sudamericana 2025", "La Recopa 2025", "La Libertadores 2024"] },
        { p: "¿En qué minuto llegó, aproximadamente, el gol de la final de la Copa Argentina 2024?", o: ["En el segundo tiempo, a los 54", "En el primer minuto", "En el alargue", "En el último minuto"] },
      ],
      [
        { p: "¿A quién le ganó por penales la final de 2019 que le dio el ascenso a Primera?", o: ["Sarmiento de Junín", "Platense", "Estudiantes de Río Cuarto", "Atlanta"] },
        { p: "¿Cómo fue el gol de Matías Godoy en la final de 2024?", o: ["Un centro que se cerró y sorprendió al arquero", "Un penal", "Un tiro libre directo", "Una chilena"] },
      ],
    ],
    cancha: [
      [
        { p: "¿Cuáles son los colores de Central Córdoba?", o: ["Negro y blanco", "Rojo y blanco", "Celeste y blanco", "Verde y blanco"] },
        { p: "¿Cuál es el clásico de Central Córdoba en Santiago del Estero?", o: ["Ante Mitre", "Ante Güemes", "Ante Atlético Tucumán", "Ante San Martín"] },
      ],
      [
        { p: "¿Cómo se llama el estadio histórico de Central Córdoba?", o: ["Alfredo Terrera", "Madre de Ciudades", "José Fierro", "La Ciudadela"] },
        { p: "¿Cómo se llamaba antes el estadio Alfredo Terrera?", o: ["Víctor Antonio Aguirre", "Madre de Ciudades", "Ciudad de Santiago", "El Ferroviario"] },
      ],
      [
        { p: "¿Qué estadio de Santiago del Estero usa Central para los partidos grandes?", o: ["El Único Madre de Ciudades", "El Kempes", "El Malvinas Argentinas", "El Bicentenario"] },
        { p: "¿En qué estadio jugó Central el empate con Flamengo de 2025?", o: ["El Madre de Ciudades", "El Alfredo Terrera", "El Kempes", "El José Fierro"] },
      ],
      [
        { p: "¿En qué estadio se jugó la final de la Copa Argentina 2024?", o: ["El 15 de Abril, de Unión (Santa Fe)", "El Kempes (Córdoba)", "El Madre de Ciudades", "El Gigante de Arroyito"] },
        { p: "¿Qué final de un torneo de Primera de 2025 se jugó en el Madre de Ciudades?", o: ["Las del Apertura y el Clausura", "La de la Copa Argentina", "La de la Libertadores", "Ninguna"] },
      ],
      [
        { p: "¿En qué año se inauguró el estadio Alfredo Terrera?", o: ["1946", "1978", "1921", "2003"] },
        { p: "¿Qué jugador de Central Córdoba convirtió de penal en el 2-1 a Flamengo en el Maracaná?", o: ["Heredia", "Florentín", "Godoy", "Varaldo"] },
      ],
    ],
  },
  {
    id: "defensa", nombre: "Defensa y Justicia", corto: "Defensa", colores: ["#0c7a3e", "#f5d10a"],
    historia: [
      [
        { p: "¿Cómo le dicen a Defensa y Justicia?", o: ["El Halcón", "El Taladro", "El Tiburón", "El Tatengue"] },
        { p: "¿De qué colores era Defensa y Justicia antes del verde y amarillo?", o: ["Azul y blanco", "Rojo y negro", "Celeste y blanco", "Todo blanco"] },
      ],
      [
        { p: "¿De qué localidad del conurbano es Defensa y Justicia?", o: ["Florencio Varela", "Quilmes", "Berazategui", "Lomas de Zamora"] },
        { p: "¿De dónde viene el apodo «Halcón»?", o: ["De la línea de colectivos 148 «El Halcón»", "De un ave del escudo original", "De un jugador histórico", "De un barrio de Varela"] },
      ],
      [
        { p: "¿En qué año ascendió Defensa por primera vez a Primera División?", o: ["2014", "2002", "1995", "2019"] },
        { p: "¿En qué categoría debutó Defensa y Justicia en la AFA, en 1978?", o: ["La Primera D", "La Primera B", "La Primera C", "La B Nacional"] },
      ],
      [
        { p: "¿En qué torneo fue subcampeón, detrás de Racing, con Sebastián Beccacece?", o: ["La Superliga 2018-19", "El Clausura 2012", "La Copa de la Liga 2021", "El Apertura 2009"] },
        { p: "¿Qué torneo ganó en 2013-14 para subir a Primera por primera vez?", o: ["La B Nacional", "La Primera B Metropolitana", "La Copa Argentina", "El Federal A"] },
      ],
      [
        { p: "¿En qué año se fundó Defensa y Justicia?", o: ["1935", "1910", "1958", "1972"] },
        { p: "¿En qué año cambió los colores al verde y amarillo?", o: ["1980", "1935", "1999", "2014"] },
      ],
    ],
    idolos: [
      [
        { p: "¿Qué DT llevó a Defensa al título de la Copa Sudamericana?", o: ["Hernán Crespo", "Sebastián Beccacece", "Ariel Holan", "Diego Cocca"] },
        { p: "¿Cómo le decían a Hernán Crespo, DT campeón con Defensa, cuando era jugador?", o: ["Valdanito", "El Kun", "El Príncipe", "El Pipa"] },
      ],
      [
        { p: "¿Qué campeón del mundo 2022 jugó a préstamo en Defensa en 2020-21?", o: ["Enzo Fernández", "Alexis Mac Allister", "Julián Álvarez", "Thiago Almada"] },
        { p: "¿Qué DT llevó a Defensa a su primera copa internacional (Sudamericana 2017)?", o: ["Sebastián Beccacece", "Ariel Holan", "Hernán Crespo", "Diego Cocca"] },
      ],
      [
        { p: "¿Qué DT dirigió a Defensa en 2015-16 y luego fue campeón de la Sudamericana con Independiente?", o: ["Ariel Holan", "Sebastián Beccacece", "Gabriel Milito", "Hernán Crespo"] },
        { p: "¿A qué gigante brasileño eliminó Defensa en la Copa Sudamericana 2017?", o: ["São Paulo", "Flamengo", "Corinthians", "Palmeiras"] },
      ],
      [
        { p: "¿Qué DT, ex ayudante de Sampaoli, dirigió al Defensa subcampeón de la Superliga 2018-19?", o: ["Sebastián Beccacece", "Jorge Almirón", "Diego Cocca", "Juan Pablo Vojvoda"] },
        { p: "¿Quién diseñó el escudo de Defensa y Justicia?", o: ["El arquitecto Francisco Bazzano", "Un hincha anónimo", "El presidente de la línea 148", "Un dibujante de Clarín"] },
      ],
      [
        { p: "¿Qué arquero atajaba en el Defensa campeón de la Sudamericana?", o: ["Ezequiel Unsain", "Nahuel Losada", "Gastón Gómez", "Jorge Carranza"] },
        { p: "¿Contra quién debutó Defensa en la AFA, en marzo de 1978?", o: ["Cañuelas", "Ferrocarril Midland", "Argentino de Merlo", "Atlas"] },
      ],
    ],
    logros: [
      [
        { p: "¿Qué copa internacional ganó Defensa y Justicia?", o: ["La Copa Sudamericana", "La Copa Libertadores", "La Supercopa", "La Copa Conmebol"] },
        { p: "¿En qué año ganó Defensa la Copa Sudamericana?", o: ["2021 (edición 2020)", "2017", "2023", "2015"] },
      ],
      [
        { p: "¿A qué equipo le ganó la final de la Sudamericana 2020?", o: ["Lanús", "Vélez", "Coquimbo Unido", "Independiente"] },
        { p: "¿En qué año ganó Defensa la Recopa Sudamericana?", o: ["2021", "2018", "2023", "2020"] },
      ],
      [
        { p: "¿Cómo terminó esa final contra Lanús?", o: ["3-0 para Defensa", "1-0 para Defensa", "2-2 y ganó por penales", "2-1 para Defensa"] },
        { p: "¿Qué ascenso logró Defensa en 1985?", o: ["A la Primera B", "A Primera División", "A la B Nacional", "Al Federal A"] },
      ],
      [
        { p: "¿A qué equipo le ganó la Recopa Sudamericana 2021?", o: ["Palmeiras", "Flamengo", "River", "Santos"] },
        { p: "¿Cómo llegó Defensa a la B Nacional en 1986?", o: ["Ganó un torneo reclasificatorio", "Ganó la Primera B", "Por invitación", "Compró la plaza"] },
      ],
      [
        { p: "¿Cómo se definió esa Recopa 2021?", o: ["Por penales", "Por goles de visitante", "Ganó los dos partidos", "En un partido único en Florencio Varela"] },
        { p: "¿En qué año fue aprobada la afiliación de Defensa a la AFA?", o: ["1977", "1935", "1960", "1990"] },
      ],
    ],
    cancha: [
      [
        { p: "¿Cuáles son los colores de Defensa y Justicia?", o: ["Verde y amarillo", "Verde y blanco", "Rojo y negro", "Azul y blanco"] },
        { p: "¿En qué partido del conurbano juega Defensa y Justicia?", o: ["Florencio Varela", "Quilmes", "Berazategui", "Almirante Brown"] },
      ],
      [
        { p: "¿Cómo se llama el estadio de Defensa y Justicia?", o: ["Norberto «Tito» Tomaghello", "Florencio Sola", "Ciudad de Lanús", "Centenario"] },
        { p: "¿En qué calle de Varela jugaban los pibes que fundaron el club?", o: ["Mitre", "San Martín", "Belgrano", "Rivadavia"] },
      ],
      [
        { p: "¿En qué estadio se jugó la final de la Sudamericana 2020?", o: ["El Mario Alberto Kempes (Córdoba)", "El Maracaná", "El Monumental", "El Centenario de Montevideo"] },
        { p: "¿En qué año jugó Defensa y Justicia su primer torneo de Primera División?", o: ["2014-15", "2002-03", "1995-96", "2019-20"] },
      ],
      [
        { p: "¿En qué año se jugó, por la pandemia, la final de la Sudamericana 2020?", o: ["2021", "2020", "2022", "2019"] },
        { p: "¿Qué otros deportes y actividades tenía el club en sus primeros años?", o: ["Básquet, bochas y bailes", "Rugby y hockey", "Remo y natación", "Boxeo y esgrima"] },
      ],
      [
        { p: "¿Contra quién perdió Defensa la final de la Copa Argentina 2023?", o: ["Estudiantes de La Plata", "River", "Talleres", "Patronato"] },
        { p: "¿De dónde viene el nombre «Defensa y Justicia»?", o: ["Nadie lo sabe con certeza", "De un diario", "De una ley", "De un regimiento"] },
      ],
    ],
  },
  {
    id: "riestra", nombre: "Deportivo Riestra", corto: "Riestra", colores: ["#111111", "#ffffff"],
    historia: [
      [
        { p: "¿Cómo le dicen a Deportivo Riestra?", o: ["El Malevo", "El Guapo", "El Bicho", "El Calamar"] },
        { p: "¿En qué ciudad juega Deportivo Riestra?", o: ["Ciudad de Buenos Aires", "Avellaneda", "Lanús", "Morón"] },
      ],
      [
        { p: "¿En qué barrio porteño se fundó Riestra?", o: ["Nueva Pompeya", "Barracas", "Mataderos", "Floresta"] },
        { p: "¿Cómo se completa el apodo: «Los Malevos de...»?", o: ["Pompeya", "Barracas", "Soldati", "Flores"] },
      ],
      [
        { p: "¿En qué año logró Riestra su primer ascenso a Primera División?", o: ["2023", "2019", "2021", "2015"] },
        { p: "¿Cómo se llamaba Riestra cuando se fundó?", o: ["Asociación de Fomento Barrio Colón", "Sportivo Pompeya", "Club Riestra Juniors", "Defensores de Soldati"] },
      ],
      [
        { p: "¿Cuántas temporadas jugó Riestra en la Primera C?", o: ["42", "10", "25", "5"] },
        { p: "¿Cuántos socios tenía Riestra, aproximadamente, según la AFA en 2025?", o: ["Menos de 1.000", "Unos 20.000", "Unos 50.000", "Más de 100.000"] },
      ],
      [
        { p: "¿En qué año se fundó Deportivo Riestra?", o: ["1931", "1905", "1955", "1912"] },
        { p: "¿Qué tiene de particular la camiseta de Riestra?", o: ["No tiene marca deportiva, es genérica", "Es dorada", "Tiene el nombre de los socios", "Es de lana"] },
      ],
    ],
    idolos: [
      [
        { p: "¿Qué streamer famoso jugó un partido oficial de Primera con Riestra en 2024?", o: ["Spreen", "Coscu", "Davoo Xeneize", "La Cobra"] },
        { p: "¿Qué empresario vinculado a la bebida Speed está detrás del proyecto de Riestra?", o: ["Víctor Stinfale", "Marcelo Tinelli", "Daniel Angelici", "Christian Bragarnik"] },
      ],
      [
        { p: "¿Qué ex delantero, apodado «el Ogro», dirigió a Riestra en el ascenso?", o: ["Cristian Fabbiani", "Mauro Zárate", "Ezequiel Lavezzi", "Gonzalo Bergessio"] },
        { p: "¿Qué leyenda del fútbol tuvo un vínculo con Riestra a través de Stinfale?", o: ["Diego Maradona", "Lionel Messi", "Carlos Tevez", "Juan Román Riquelme"] },
      ],
      [
        { p: "¿Quién hizo el gol del ascenso de Riestra en 2023?", o: ["Gustavo Fernández", "Milton Céliz", "Jonathan Herrera", "Cristian Fabbiani"] },
        { p: "¿Cuánto tiempo jugó Spreen en su partido con Riestra?", o: ["Alrededor de un minuto", "Los 90 minutos", "Un tiempo entero", "No llegó a entrar"] },
      ],
      [
        { p: "¿Contra qué equipo jugó Spreen su partido con Riestra?", o: ["Vélez", "Boca", "River", "Barracas Central"] },
        { p: "¿A qué equipo eliminó Riestra por penales en la Copa Argentina 2025?", o: ["San Telmo", "Atlanta", "Chacarita", "Defensores de Belgrano"] },
      ],
      [
        { p: "¿Cuántas temporadas jugó Riestra en la Primera D?", o: ["26", "8", "40", "3"] },
        { p: "¿Quién hizo de penal el primer gol de Racing en el 3-0 a Riestra por la Copa Argentina 2025?", o: ["Duván Vergara", "Adrián Martínez", "Facundo Mura", "Santiago Solari"] },
      ],
    ],
    logros: [
      [
        { p: "¿A quién le ganó Riestra la final por el ascenso de 2023?", o: ["Deportivo Maipú", "Quilmes", "Almirante Brown", "Chacarita"] },
        { p: "¿A qué grande le ganó Riestra 2-0 en el Monumental, en el Clausura 2025?", o: ["River", "Boca", "Racing", "Independiente"] },
      ],
      [
        { p: "¿Cómo terminó esa final contra Deportivo Maipú?", o: ["1-0 para Riestra", "2-2 y ganó por penales", "3-1 para Riestra", "2-0 para Riestra"] },
        { p: "¿Hasta qué instancia llegó Riestra en la Copa Argentina 2025, su mejor campaña?", o: ["Octavos de final", "La final", "Semifinales", "32avos"] },
      ],
      [
        { p: "¿En qué ciudad se jugó la final del ascenso de 2023?", o: ["Córdoba", "Mendoza", "Rosario", "La Plata"] },
        { p: "¿Quién eliminó a Riestra de la Copa Argentina 2025?", o: ["Racing", "Boca", "Independiente Rivadavia", "Argentinos"] },
      ],
      [
        { p: "¿Cuál de estos equipos eliminó Riestra en el reducido de 2023?", o: ["Quilmes", "Aldosivi", "Gimnasia de Mendoza", "Chacarita"] },
        { p: "¿Quién eliminó a Riestra en los octavos del Apertura 2025?", o: ["Huracán", "Platense", "Boca", "Vélez"] },
      ],
      [
        { p: "¿En qué año jugó Riestra su primer torneo de Primera División?", o: ["2024", "2023", "2022", "2025"] },
        { p: "¿Qué récord logró Riestra en 2025 jugando en su cancha?", o: ["Su invicto de local más largo", "Su mayor goleada de la historia", "Su primer gol de tiro libre", "Su primer triunfo en Primera"] },
      ],
    ],
    cancha: [
      [
        { p: "¿Cuáles son los colores de Riestra?", o: ["Negro y blanco", "Rojo y blanco", "Verde y amarillo", "Azul y blanco"] },
        { p: "¿Cuántas personas entran en el estadio Guillermo Laza?", o: ["Unas 3.000", "Unas 30.000", "Unas 15.000", "Unas 60.000"] },
      ],
      [
        { p: "¿Cómo se llama el estadio de Riestra?", o: ["Guillermo Laza", "Claudio Tapia", "Tomás A. Ducó", "Alfredo Beranger"] },
        { p: "¿Qué bebida tiene una relación muy fuerte con el club?", o: ["Speed", "Coca-Cola", "Quilmes", "Gatorade"] },
      ],
      [
        { p: "¿Qué marca de bebida energizante identifica a Riestra?", o: ["Speed", "Red Bull", "Monster", "Gatorade"] },
        { p: "¿En qué zona del sur porteño está la cancha de Riestra?", o: ["En el Bajo Flores / Villa Soldati", "En Palermo", "En Belgrano", "En Recoleta"] },
      ],
      [
        { p: "¿En qué barrio está hoy la cancha de Riestra?", o: ["Villa Soldati", "Nueva Pompeya", "Parque Patricios", "Villa Lugano"] },
        { p: "¿En qué estadio jugó Riestra la Copa Argentina ante Racing?", o: ["En el de Lanús", "En el Guillermo Laza", "En el Cilindro", "En el Monumental"] },
      ],
      [
        { p: "¿Cuál es, aproximadamente, la capacidad de la cancha de Riestra?", o: ["Unos 3.000", "Unos 15.000", "Unos 30.000", "Unos 50.000"] },
        { p: "¿Qué tienen muchos jugadores de Riestra, según las crónicas de 2025?", o: ["Trabajos fuera del fútbol", "Pasaporte europeo", "Más de 35 años", "Experiencia en la Selección"] },
      ],
    ],
  },
  {
    id: "estudiantes", nombre: "Estudiantes de La Plata", corto: "Estudiantes", colores: ["#d81e1e", "#ffffff"],
    historia: [
      [
        { p: "¿Cómo le dicen a Estudiantes de La Plata?", o: ["El Pincha", "El Lobo", "El Tripero", "El Bicho"] },
        { p: "¿En qué ciudad juega Estudiantes?", o: ["La Plata", "Quilmes", "Berisso", "Ensenada"] },
      ],
      [
        { p: "¿Cuál es el clásico rival de Estudiantes?", o: ["Gimnasia de La Plata", "Banfield", "Quilmes", "Cambaceres"] },
        { p: "¿Cómo se llama el partido entre Estudiantes y Gimnasia?", o: ["El clásico platense", "El clásico del sur", "El superclásico", "El clásico de las diagonales"] },
      ],
      [
        { p: "¿Quiénes fundaron Estudiantes en 1905?", o: ["Socios que se fueron de Gimnasia", "Alumnos de la Universidad de La Plata", "Inmigrantes ingleses", "Trabajadores del puerto"] },
        { p: "¿Cuántas Libertadores seguidas ganó Estudiantes entre 1968 y 1970?", o: ["3", "2", "4", "5"] },
      ],
      [
        { p: "¿En qué año se fundó Estudiantes de La Plata?", o: ["1905", "1887", "1912", "1898"] },
        { p: "Según la historia, ¿de dónde viene el apodo «Pincharratas»?", o: ["De un socio que trabajaba en el mercado y pinchaba ratas", "De un arquero muy flaco", "De una plaga en la vieja cancha", "De un dibujo animado"] },
      ],
      [
        { p: "¿Qué torneo ganó Estudiantes en 1967, siendo el primer campeón profesional fuera de los «cinco grandes»?", o: ["El Metropolitano", "El Nacional", "La Copa Libertadores", "La Copa Argentina"] },
        { p: "¿Contra quién perdió Estudiantes la final de la Libertadores 1971?", o: ["Nacional de Uruguay", "Peñarol", "Palmeiras", "Universitario"] },
      ],
    ],
    idolos: [
      [
        { p: "¿Qué ídolo, apodado «la Brujita», fue campeón de la Libertadores 2009 y después presidente del club?", o: ["Juan Sebastián Verón", "Mariano Andújar", "Leandro Benítez", "José Sosa"] },
        { p: "¿Qué DT campeón del mundo en 1986 fue jugador de Estudiantes?", o: ["Carlos Bilardo", "César Luis Menotti", "Alfio Basile", "Marcelo Bielsa"] },
      ],
      [
        { p: "¿Cómo le decían a Juan Ramón Verón, el padre, ídolo de los 60?", o: ["La Bruja", "El Brujo", "El Mago", "El Pincha"] },
        { p: "¿Qué DT de la Libertadores 2009 llevó a la Selección a la final del Mundial 2014?", o: ["Alejandro Sabella", "Gerardo Martino", "Jorge Sampaoli", "Diego Maradona"] },
      ],
      [
        { p: "¿Qué DT armó el Estudiantes tricampeón de América (1968-1970)?", o: ["Osvaldo Zubeldía", "Carlos Bilardo", "Alejandro Sabella", "Juan Carlos Lorenzo"] },
        { p: "¿Qué DT, después ídolo del Atlético de Madrid, ganó el Apertura 2006 con Estudiantes?", o: ["Diego Simeone", "Gabriel Heinze", "Mauricio Pochettino", "Marcelo Gallardo"] },
      ],
      [
        { p: "¿Qué DT llevó a Estudiantes a ganar la Libertadores 2009?", o: ["Alejandro Sabella", "Diego Simeone", "Leonardo Astrada", "Gabriel Milito"] },
        { p: "¿Quién empató sobre el final la final del Clausura 2025 ante Racing?", o: ["Guido Carrillo", "Edwuin Cetré", "José Sosa", "Mauro Boselli"] },
      ],
      [
        { p: "¿Qué DT ganó con Estudiantes la Copa de la Liga 2024 y el Clausura 2025?", o: ["Eduardo Domínguez", "Ricardo Zielinski", "Pablo Quatrocchi", "Abel Balbo"] },
        { p: "¿Quién hizo el gol de Estudiantes en la ida de la Intercontinental 1968?", o: ["Marcos Conigliaro", "Juan Ramón Verón", "Carlos Bilardo", "Juan Miguel Echecopar"] },
      ],
    ],
    logros: [
      [
        { p: "¿Cuántas Copas Libertadores ganó Estudiantes?", o: ["4", "2", "3", "6"] },
        { p: "¿Cuántas Copas Intercontinentales ganó Estudiantes?", o: ["1", "2", "3", "Ninguna"] },
      ],
      [
        { p: "¿A qué club le ganó Estudiantes la Intercontinental de 1968?", o: ["Manchester United", "Milan", "Real Madrid", "Ajax"] },
        { p: "¿Qué copa ganó Estudiantes en 2023 ante Defensa y Justicia?", o: ["La Copa Argentina", "La Copa de la Liga", "La Sudamericana", "La Supercopa"] },
      ],
      [
        { p: "¿A quién le ganó la final de la Libertadores 2009?", o: ["Cruzeiro", "Grêmio", "Nacional", "Santos"] },
        { p: "¿A quién le ganó Estudiantes la final de la Copa de la Liga 2024?", o: ["Vélez", "Boca", "Talleres", "Huracán"] },
      ],
      [
        { p: "¿Contra quién jugó el desempate que le dio el Apertura 2006?", o: ["Boca", "River", "Lanús", "Vélez"] },
        { p: "¿En qué estadio ganó Estudiantes la final de la Libertadores 2009?", o: ["El Mineirão (Belo Horizonte)", "El Maracaná", "La Bombonera", "El Centenario"] },
      ],
      [
        { p: "¿A quién le ganó por penales la final del Clausura 2025?", o: ["Racing", "Boca", "Rosario Central", "Gimnasia"] },
        { p: "¿A quién le ganó Estudiantes el Trofeo de Campeones 2025?", o: ["Platense", "Rosario Central", "Racing", "Independiente Rivadavia"] },
      ],
    ],
    cancha: [
      [
        { p: "¿Cuáles son los colores de Estudiantes?", o: ["Rojo y blanco", "Azul y blanco", "Rojo y negro", "Verde y blanco"] },
        { p: "¿Cómo es la camiseta clásica de Estudiantes?", o: ["A rayas verticales rojas y blancas", "Roja lisa", "Blanca con una banda roja", "Mitad roja y mitad blanca"] },
      ],
      [
        { p: "¿Cómo se llama el estadio de Estudiantes?", o: ["Jorge Luis Hirschi", "Juan Carmelo Zerillo", "Ciudad de La Plata", "Florencio Sola"] },
        { p: "¿Cómo se llama hoy el Estadio Único de La Plata?", o: ["Diego Armando Maradona", "Juan Sebastián Verón", "Ciudad de La Plata", "Carlos Bilardo"] },
      ],
      [
        { p: "¿Por qué al estadio de Estudiantes le dicen «UNO»?", o: ["Porque está en la calle 1", "Porque fue el primero de La Plata", "Por el número de su capitán", "Por un sponsor"] },
        { p: "¿Dónde se jugó la ida de la Intercontinental 1968 ante el Manchester United?", o: ["En la Bombonera", "En el estadio de Estudiantes", "En el Monumental", "En el Cilindro"] },
      ],
      [
        { p: "¿Dónde hizo de local Estudiantes mientras reconstruía su estadio?", o: ["En el Estadio Único de La Plata", "En la cancha de Gimnasia", "En la de Quilmes", "En la de Lanús"] },
        { p: "¿Cuántos espectadores entran, aproximadamente, en el estadio UNO?", o: ["Unos 30.000", "Unos 60.000", "Unos 10.000", "Unos 80.000"] },
      ],
      [
        { p: "¿En qué año se reinauguró el estadio de Estudiantes?", o: ["2019", "2006", "2012", "2023"] },
        { p: "¿Dónde tiene Estudiantes su famoso predio de entrenamiento («country»)?", o: ["En City Bell", "En Berisso", "En Ensenada", "En Magdalena"] },
      ],
    ],
  },
  {
    id: "estudiantes-rc", nombre: "Estudiantes de Río Cuarto", corto: "Estudiantes RC", colores: ["#6fb7e8", "#ffffff"],
    historia: [
      [
        { p: "¿De qué ciudad de Córdoba es Estudiantes, el recién ascendido?", o: ["Río Cuarto", "Villa María", "San Francisco", "Villa Carlos Paz"] },
        { p: "¿De qué provincia es Estudiantes de Río Cuarto?", o: ["Córdoba", "San Luis", "Santa Fe", "La Pampa"] },
      ],
      [
        { p: "¿Cuál es uno de los apodos de Estudiantes de Río Cuarto?", o: ["El León", "El Pincha", "El Tiburón", "El Halcón"] },
        { p: "¿Qué apodo tiene Estudiantes de Río Cuarto por su color?", o: ["Celeste", "Pincha", "Lobo", "Granate"] },
      ],
      [
        { p: "¿Quiénes fundaron el club?", o: ["Alumnos del Colegio Nacional de Río Cuarto", "Trabajadores del ferrocarril", "Socios de un club de Córdoba capital", "Inmigrantes británicos"] },
        { p: "¿En qué años jugó Estudiantes de Río Cuarto los viejos Nacionales?", o: ["1984 y 1985", "1970 y 1971", "1967 y 1968", "1979 y 1980"] },
      ],
      [
        { p: "¿En qué año se fundó Estudiantes de Río Cuarto?", o: ["1912", "1905", "1931", "1950"] },
        { p: "¿Qué torneo ganó en 2019 para subir por primera vez a la segunda categoría?", o: ["El Torneo Federal A", "El Argentino A", "La Primera B Metropolitana", "La Copa Argentina"] },
      ],
      [
        { p: "Antes de 2026, ¿en qué torneo había jugado por última vez en Primera?", o: ["El Nacional 1985", "El Metropolitano 1977", "El Apertura 1999", "Nunca había jugado"] },
        { p: "¿A quién le ganó la final del Federal A de 2019?", o: ["Sarmiento de Resistencia", "Sarmiento de Junín", "Chaco For Ever", "Gimnasia de Mendoza"] },
      ],
    ],
    idolos: [
      [
        { p: "¿Qué DT logró el ascenso de 2025?", o: ["Iván Delfino", "Andrés Yllana", "Cristian Fabbiani", "Alfredo Berti"] },
        { p: "¿Qué ex crack de River, Valencia y la Selección es el gran referente de Estudiantes de Río Cuarto?", o: ["Pablo Aimar", "Ariel Ortega", "Pablo Zabaleta", "Javier Saviola"] },
      ],
      [
        { p: "¿Qué delantero hizo el gol de Estudiantes en la final por el ascenso de enero de 2021?", o: ["Bruno Sepúlveda", "Claudio Pombo", "Alex Arce", "Matías Godoy"] },
        { p: "¿Qué hermano de Pablo Aimar también es un referente del club?", o: ["Andrés Aimar", "Diego Aimar", "Santiago Aimar", "Martín Aimar"] },
      ],
      [
        { p: "¿Qué arquero de Sarmiento le atajó el penal decisivo a Estudiantes en aquella final de 2021?", o: ["Manuel Vicentini", "Jorge Carranza", "Ezequiel Unsain", "Gastón Gómez"] },
        { p: "¿Quién hizo el gol del ascenso en Puerto Madryn, en 2025?", o: ["Agustín Morales", "Bruno Sepúlveda", "Luis Silba", "Tomás González"] },
      ],
      [
        { p: "¿Quién eliminó a Estudiantes de Río Cuarto en el reducido de 2023?", o: ["Deportivo Maipú", "Deportivo Riestra", "Quilmes", "Almirante Brown"] },
        { p: "¿Qué DT llevó a Estudiantes a ganar el Federal A 2019?", o: ["Marcelo Vázquez", "Iván Delfino", "Pablo Aimar", "Gustavo Coleoni"] },
      ],
      [
        { p: "¿En qué estadio se jugó la final de 2021 ante Sarmiento?", o: ["El de Unión, en Santa Fe", "El Kempes, en Córdoba", "El de Lanús", "El Malvinas Argentinas"] },
        { p: "¿Quiénes hicieron los goles de la final del Federal A 2019?", o: ["Javier Ferreira e Ibrahim Hesar", "Pablo y Andrés Aimar", "Agustín Morales y Tomás González", "Bruno Sepúlveda y Claudio Pombo"] },
      ],
    ],
    logros: [
      [
        { p: "¿En qué año ascendió Estudiantes de Río Cuarto a la Liga Profesional?", o: ["2025", "2021", "2023", "2019"] },
        { p: "¿En qué año logró Estudiantes de Río Cuarto subir a la Primera Nacional por primera vez?", o: ["2019", "2010", "1985", "2025"] },
      ],
      [
        { p: "¿A quién le ganó la final del reducido de 2025?", o: ["Deportivo Madryn", "Gimnasia de Mendoza", "Chacarita", "San Martín de Tucumán"] },
        { p: "Además de la final con Sarmiento, ¿con quién perdió por penales otra definición por el ascenso en 2021?", o: ["Platense", "Tigre", "Barracas Central", "Quilmes"] },
      ],
      [
        { p: "¿Cómo terminó la ida de esa final, en Río Cuarto?", o: ["2-0 para Estudiantes", "1-1", "1-0 para Estudiantes", "3-2 para Estudiantes"] },
        { p: "¿En qué puesto de su zona terminó Estudiantes la Primera Nacional 2025?", o: ["Segundo", "Primero", "Quinto", "Octavo"] },
      ],
      [
        { p: "¿Cómo terminó la vuelta, en Puerto Madryn?", o: ["1-1", "Ganó Madryn 1-0", "0-0", "Ganó Estudiantes 2-1"] },
        { p: "¿Cuántos Regionales seguidos ganó Estudiantes entre 1983 y 1985?", o: ["Tres", "Uno", "Dos", "Cinco"] },
      ],
      [
        { p: "¿Contra quién perdió por penales la final por el ascenso de enero de 2021?", o: ["Sarmiento de Junín", "Platense", "Tigre", "Barracas Central"] },
        { p: "¿Con qué resultado global ascendió Estudiantes a Primera en 2025?", o: ["3-1", "2-1", "4-2", "1-0"] },
      ],
    ],
    cancha: [
      [
        { p: "¿Cuáles son los colores de Estudiantes de Río Cuarto?", o: ["Celeste y blanco", "Rojo y blanco", "Verde y blanco", "Negro y blanco"] },
        { p: "¿En qué ciudad está el estadio Antonio Candini?", o: ["Río Cuarto", "Villa María", "Córdoba", "San Luis"] },
      ],
      [
        { p: "¿Cómo se llama el estadio de Estudiantes de Río Cuarto?", o: ["Antonio Candini", "Julio César Villagra", "Juan Domingo Perón", "La Boutique"] },
        { p: "¿Qué otro nombre tiene el estadio Antonio Candini?", o: ["Ciudad de Río Cuarto", "El Gigante del Sur", "La Bombonerita", "El Imperio"] },
      ],
      [
        { p: "¿Qué apodo de la ciudad de Río Cuarto aparece en el sobrenombre del club?", o: ["El Imperio del Sur", "La Docta", "La Perla del Sur", "La Capital del Sol"] },
        { p: "¿En qué fecha ascendió Estudiantes de Río Cuarto a Primera?", o: ["El 30 de noviembre de 2025", "El 11 de octubre de 2025", "El 13 de diciembre de 2025", "El 1 de junio de 2025"] },
      ],
      [
        { p: "Con su ascenso, ¿qué número de equipo cordobés en la Primera 2026 es Estudiantes?", o: ["El cuarto", "El segundo", "El sexto", "El tercero"] },
        { p: "¿En qué estadio se jugó la vuelta de la final del ascenso de 2025?", o: ["El Abel Sastre (Puerto Madryn)", "El Antonio Candini", "El Kempes", "El de Platense"] },
      ],
      [
        { p: "¿Cuál es, aproximadamente, la capacidad de su estadio?", o: ["Unos 12.000", "Unos 40.000", "Unos 3.000", "Unos 57.000"] },
        { p: "¿Cuántos años pasaron entre su última participación en Primera y el regreso de 2026?", o: ["Unos 40", "Unos 10", "Unos 25", "Unos 60"] },
      ],
    ],
  },
  {
    id: "gimnasia", nombre: "Gimnasia y Esgrima La Plata", corto: "Gimnasia", colores: ["#0d2b6b", "#ffffff"],
    historia: [
      [
        { p: "¿Cómo le dicen a Gimnasia y Esgrima La Plata?", o: ["El Lobo", "El Pincha", "El Granate", "El Taladro"] },
        { p: "¿En qué ciudad juega Gimnasia y Esgrima?", o: ["La Plata", "Berisso", "Quilmes", "Ensenada"] },
      ],
      [
        { p: "¿Cuál es el clásico rival de Gimnasia?", o: ["Estudiantes de La Plata", "Quilmes", "Banfield", "Defensores de Cambaceres"] },
        { p: "¿Por qué el club se llama «Gimnasia y Esgrima»?", o: ["Porque nació como un club de esos deportes", "Por un club de Francia", "Por el nombre de una calle", "Por sus dos fundadores"] },
      ],
      [
        { p: "¿En qué año se fundó Gimnasia y Esgrima La Plata?", o: ["1887", "1905", "1910", "1899"] },
        { p: "¿Qué récord de antigüedad reivindica Gimnasia?", o: ["Ser el club de fútbol más antiguo de América en actividad", "Ser el estadio más viejo del país", "Tener el escudo más antiguo", "Ser el primer club en tener socias"] },
      ],
      [
        { p: "¿De dónde viene el apodo «Triperos»?", o: ["De los trabajadores de los frigoríficos de la zona", "De un plato típico de La Plata", "De un jugador histórico", "De la forma del estadio"] },
        { p: "¿Qué celebraba la Copa Centenario de 1993 que ganó Gimnasia?", o: ["Los 100 años de la AFA", "Los 100 años de La Plata", "Los 100 años de Gimnasia", "Los 100 años del fútbol argentino profesional"] },
      ],
      [
        { p: "En 1905, un grupo de socios se fue de Gimnasia y fundó otro club. ¿Cuál?", o: ["Estudiantes de La Plata", "Cambaceres", "Quilmes", "Villa San Carlos"] },
        { p: "¿En qué año descendió Gimnasia en la Promoción ante San Martín de San Juan?", o: ["2011", "2005", "1999", "2019"] },
      ],
    ],
    idolos: [
      [
        { p: "¿Qué leyenda del fútbol mundial fue DT de Gimnasia entre 2019 y 2020?", o: ["Diego Maradona", "Carlos Bilardo", "Mario Kempes", "Daniel Passarella"] },
        { p: "¿Qué DT de Gimnasia falleció en noviembre de 2020?", o: ["Diego Maradona", "Carlos Bilardo", "Alejandro Sabella", "Carlos Griguol"] },
      ],
      [
        { p: "¿Qué DT, apodado «el Viejo», es el más recordado de la historia del Lobo?", o: ["Carlos Timoteo Griguol", "Alfio Basile", "Carlos Bianchi", "Héctor Veira"] },
        { p: "¿Qué goleador, después histórico en el Mónaco, surgió de Gimnasia?", o: ["Delio Onnis", "Mario Kempes", "Jorge Valdano", "Ramón Díaz"] },
      ],
      [
        { p: "¿Qué ex jugador fue DT de Gimnasia en varias etapas y es un ídolo tripero?", o: ["Pedro Troglio", "Gustavo Alfaro", "Leonardo Madelón", "Mario Sciacqua"] },
        { p: "¿En qué año asumió Maradona como DT de Gimnasia?", o: ["2019", "2016", "2010", "2021"] },
      ],
      [
        { p: "¿Qué hermanos mellizos, después ídolos de Boca, surgieron de Gimnasia?", o: ["Guillermo y Gustavo Barros Schelotto", "Diego y Gabriel Milito", "Ramón y Emiliano Díaz", "Francisco y Ángel Insúa"] },
        { p: "¿Qué DT llevó a Gimnasia al subcampeonato del Clausura 2005?", o: ["Pedro Troglio", "Carlos Griguol", "Diego Maradona", "Leonardo Madelón"] },
      ],
      [
        { p: "¿Qué goleador de los 90, apodado «el Pampa», es un ídolo del Lobo?", o: ["Roberto Sosa", "Hernán Crespo", "Martín Palermo", "Sergio Martínez"] },
        { p: "¿Cuál de los mellizos Barros Schelotto fue después DT de Boca y de Paraguay?", o: ["Guillermo", "Gustavo", "Los dos juntos", "Ninguno"] },
      ],
    ],
    logros: [
      [
        { p: "¿En qué año ganó Gimnasia su único título de liga?", o: ["1929", "1995", "1967", "2005"] },
        { p: "¿Cuántos títulos de liga ganó Gimnasia en su historia?", o: ["Uno", "Tres", "Cinco", "Ninguno"] },
      ],
      [
        { p: "¿Qué copa oficial ganó Gimnasia en 1993?", o: ["La Copa Centenario", "La Copa Argentina", "La Supercopa", "La Copa Conmebol"] },
        { p: "¿En qué torneo de 2005 fue subcampeón Gimnasia?", o: ["El Clausura 2005", "El Apertura 2005", "La Copa Argentina", "La Sudamericana"] },
      ],
      [
        { p: "¿En qué torneo de 1995 fue subcampeón, tras perder la última fecha con Independiente?", o: ["El Clausura 1995", "El Apertura 1995", "La Copa Centenario", "El Nacional 1995"] },
        { p: "¿Qué final jugó Gimnasia en 2018?", o: ["La de la Copa Argentina", "La de la Sudamericana", "La de la Superliga", "La de la Supercopa"] },
      ],
      [
        { p: "¿Qué equipo salió campeón de ese Clausura 1995 que perdió Gimnasia?", o: ["San Lorenzo", "Vélez", "River", "Independiente"] },
        { p: "¿Contra quién perdió Gimnasia la final de la Copa Argentina 2018?", o: ["Rosario Central", "River", "Boca", "Estudiantes"] },
      ],
      [
        { p: "¿A quién le ganó Gimnasia la final de la Copa Centenario 1993?", o: ["River", "Boca", "Racing", "Estudiantes"] },
        { p: "¿Cómo se definió esa final de Copa Argentina 2018?", o: ["Por penales", "En el alargue", "Ganó Central 3-0", "Ganó Central 2-1"] },
      ],
    ],
    cancha: [
      [
        { p: "¿Cuáles son los colores de Gimnasia?", o: ["Azul y blanco", "Rojo y blanco", "Verde y blanco", "Negro y blanco"] },
        { p: "¿De qué color es la franja de la camiseta de Gimnasia?", o: ["Azul", "Roja", "Negra", "Verde"] },
      ],
      [
        { p: "¿Cómo le dicen a la cancha de Gimnasia, por el parque donde está?", o: ["El Bosque", "La Fortaleza", "El Fortín", "El Palacio"] },
        { p: "¿Qué estadio grande de La Plata comparten Gimnasia y Estudiantes para partidos especiales?", o: ["El Estadio Único", "El Monumental", "El Kempes", "El Cilindro"] },
      ],
      [
        { p: "¿Cuál es el nombre oficial de la cancha de Gimnasia?", o: ["Juan Carmelo Zerillo", "Jorge Luis Hirschi", "Ciudad de La Plata", "Pedro Bidegain"] },
        { p: "¿En qué parque platense está la cancha de Gimnasia?", o: ["El Paseo del Bosque", "El Parque Saavedra", "El Parque Castelli", "La Plaza Moreno"] },
      ],
      [
        { p: "¿Cómo es la camiseta clásica de Gimnasia?", o: ["Blanca con una franja horizontal azul", "Azul con una banda diagonal blanca", "A rayas verticales azules y blancas", "Toda azul"] },
        { p: "¿Quién fue Juan Carmelo Zerillo, que da nombre al estadio?", o: ["Un presidente del club", "Un goleador de 1929", "Un intendente de La Plata", "El primer DT"] },
      ],
      [
        { p: "¿Cómo se llama la hinchada de Gimnasia?", o: ["La Banda de Fierro 22", "La Inimitable", "La 12", "La Pandilla"] },
        { p: "¿Cómo se llama hoy el Estadio Único de La Plata?", o: ["Diego Armando Maradona", "Juan Carmelo Zerillo", "Ciudad de La Plata", "Carlos Griguol"] },
      ],
    ],
  },
  {
    id: "gimnasia-mza", nombre: "Gimnasia y Esgrima de Mendoza", corto: "Gimnasia (M)", colores: ["#111111", "#ffffff"],
    historia: [
      [
        { p: "¿De qué provincia es el Gimnasia que ascendió en 2025?", o: ["Mendoza", "Jujuy", "Entre Ríos", "San Juan"] },
        { p: "¿Qué color acompaña al blanco en la camiseta de Gimnasia de Mendoza?", o: ["Negro", "Azul", "Rojo", "Verde"] },
      ],
      [
        { p: "¿Cuál es el clásico rival de Gimnasia de Mendoza?", o: ["Independiente Rivadavia", "Godoy Cruz", "San Martín de San Juan", "Huracán Las Heras"] },
        { p: "¿Cuántas veces jugó Gimnasia de Mendoza los viejos torneos Nacionales?", o: ["9", "1", "20", "3"] },
      ],
      [
        { p: "¿En qué año se fundó Gimnasia y Esgrima de Mendoza?", o: ["1908", "1887", "1921", "1935"] },
        { p: "¿A qué grande le ganó Gimnasia de Mendoza 5-1 en 1978?", o: ["Boca", "River", "Racing", "San Lorenzo"] },
      ],
      [
        { p: "¿Cómo nació el club de fútbol?", o: ["Al separarse la sección fútbol de un club de 1890", "Por la fusión de dos clubes de barrio", "Lo fundaron trabajadores del ferrocarril", "Lo fundaron alumnos de un colegio"] },
        { p: "¿A quién le ganó la final del Federal A en 2014?", o: ["Talleres de Córdoba", "Belgrano", "Estudiantes de Río Cuarto", "Defensores de Belgrano"] },
      ],
      [
        { p: "¿En qué año jugó Gimnasia de Mendoza su primer torneo Nacional?", o: ["1970", "1985", "1955", "1931"] },
        { p: "¿Cuál fue la peor derrota de Gimnasia de Mendoza en Primera?", o: ["0-5 ante San Lorenzo (1970)", "0-7 ante River (1984)", "1-6 ante Boca (1978)", "0-4 ante Racing (1981)"] },
      ],
    ],
    idolos: [
      [
        { p: "¿Qué gran ídolo del club le da nombre a su estadio?", o: ["Víctor Antonio Legrotaglie", "Bautista Gargantini", "Alfredo Terrera", "Florencio Sola"] },
        { p: "¿Qué DT asumió en Gimnasia de Mendoza en marzo de 2026?", o: ["Darío Franco", "Diego Pozo", "Iván Delfino", "Alfredo Berti"] },
      ],
      [
        { p: "¿Cómo le dicen a Gimnasia de Mendoza, por el lema latino del club?", o: ["Mens Sana", "Corpore Sano", "El Gladiador", "La Lepra"] },
        { p: "¿Qué delantero es el goleador de Gimnasia de Mendoza en la Primera 2026?", o: ["Agustín Módica", "Alex Arce", "Fernando Zampedri", "Matías Godoy"] },
      ],
      [
        { p: "¿Cuál de estos apodos es de Gimnasia de Mendoza?", o: ["El Lobo mendocino", "La Lepra", "El Tomba", "El Azul del Parque"] },
        { p: "¿Quién es el máximo goleador histórico del club?", o: ["Pablo Palacios Alvarenga", "Víctor Legrotaglie", "Agustín Módica", "Mario Marchetti"] },
      ],
      [
        { p: "En la tanda de penales de la final de 2025, ¿cuántos convirtió Deportivo Madryn?", o: ["Ninguno", "Uno", "Dos", "Cuatro"] },
        { p: "¿Quién es el jugador con más partidos en la historia del club?", o: ["Mario Marchetti", "Víctor Legrotaglie", "Diego Mondino", "Pablo Palacios Alvarenga"] },
      ],
      [
        { p: "¿Qué otro apodo tiene el club por sus colores?", o: ["Blanquinegro", "Albiceleste", "Tricolor", "Verdinegro"] },
        { p: "¿En qué año debutó Víctor Legrotaglie en Gimnasia?", o: ["1953", "1970", "1940", "1965"] },
      ],
    ],
    logros: [
      [
        { p: "¿Qué torneo ganó Gimnasia de Mendoza en 2025 para subir a Primera?", o: ["La Primera Nacional", "El Torneo Federal A", "La Copa Argentina", "La Primera B Metropolitana"] },
        { p: "¿Cuántos títulos de Primera Nacional tiene Gimnasia de Mendoza?", o: ["Uno", "Tres", "Dos", "Ninguno"] },
      ],
      [
        { p: "¿A quién le ganó la final de la Primera Nacional 2025?", o: ["Deportivo Madryn", "Estudiantes de Río Cuarto", "Chacarita", "Atlanta"] },
        { p: "¿En qué temporada volvió a ganar el Federal A para subir a la B Nacional?", o: ["2017-18", "2009-10", "2021", "2004-05"] },
      ],
      [
        { p: "¿Cómo se definió esa final?", o: ["1-1 y 3-0 en los penales", "Ganó 2-0", "Ganó 1-0 en el alargue", "2-2 y 5-4 en los penales"] },
        { p: "¿A quién le ganó las finales del Federal A 2017-18?", o: ["Defensores de Belgrano de Villa Ramallo", "Talleres", "Chaco For Ever", "Deportivo Madryn"] },
      ],
      [
        { p: "¿En qué estadio se jugó la final de 2025?", o: ["El de Platense", "El Malvinas Argentinas", "El Kempes", "El de Huracán"] },
        { p: "¿Hasta qué instancia llegó en el Nacional 1984, su mejor campaña?", o: ["Octavos de final", "La final", "Semifinales", "Primera fase"] },
      ],
      [
        { p: "¿Cuántos puntos sacó Gimnasia para terminar primero en su zona de la Primera Nacional 2025?", o: ["60", "48", "75", "52"] },
        { p: "¿Cuántos títulos de la Liga Mendocina ganó, aproximadamente?", o: ["20", "2", "50", "8"] },
      ],
    ],
    cancha: [
      [
        { p: "¿Cuáles son los colores de Gimnasia de Mendoza?", o: ["Blanco y negro", "Azul y blanco", "Rojo y blanco", "Verde y blanco"] },
        { p: "¿En qué ciudad juega Gimnasia y Esgrima de Mendoza?", o: ["Mendoza", "San Rafael", "San Juan", "San Luis"] },
      ],
      [
        { p: "¿Cómo se llama el estadio de Gimnasia de Mendoza?", o: ["Víctor Antonio Legrotaglie", "Bautista Gargantini", "Malvinas Argentinas", "Feliciano Gambarte"] },
        { p: "¿Qué estadio de Mendoza fue sede del Mundial 1978?", o: ["El Malvinas Argentinas", "El Víctor Legrotaglie", "El Bautista Gargantini", "El Feliciano Gambarte"] },
      ],
      [
        { p: "¿Cuál es el estadio más grande de Mendoza?", o: ["El Malvinas Argentinas", "El Víctor Legrotaglie", "El Bautista Gargantini", "El Feliciano Gambarte"] },
        { p: "¿Cuántos espectadores entran hoy en el Víctor Legrotaglie?", o: ["Unos 11.500", "Unos 40.000", "Unos 3.000", "Unos 60.000"] },
      ],
      [
        { p: "¿A cuántos espectadores quiere ampliar el club su estadio?", o: ["33.000", "60.000", "15.000", "80.000"] },
        { p: "¿Qué clásico volvió a jugarse en Primera en 2026 gracias al ascenso?", o: ["El clásico mendocino ante Independiente Rivadavia", "El clásico cuyano ante San Martín de San Juan", "El clásico ante Godoy Cruz", "Ninguno"] },
      ],
      [
        { p: "Antes de 2026, ¿en qué año había jugado Gimnasia de Mendoza por última vez en Primera?", o: ["1984", "1999", "1970", "2008"] },
        { p: "¿Hasta qué año jugó Legrotaglie en Gimnasia de Mendoza?", o: ["1973", "1960", "1985", "1955"] },
      ],
    ],
  },
  {
    id: "huracan", nombre: "Huracán", corto: "Huracán", colores: ["#ffffff", "#d81e1e"],
    historia: [
      [
        { p: "¿Cómo le dicen a Huracán?", o: ["El Globo", "El Ciclón", "El Fortín", "El Calamar"] },
        { p: "¿Cómo les dicen a los hinchas de Huracán?", o: ["Quemeros", "Cuervos", "Calamares", "Bichos"] },
      ],
      [
        { p: "¿En qué barrio porteño está Huracán?", o: ["Parque Patricios", "Boedo", "Pompeya", "Barracas"] },
        { p: "¿En qué año se fundó Huracán?", o: ["1908", "1901", "1920", "1935"] },
      ],
      [
        { p: "¿Cuál es el clásico rival de Huracán?", o: ["San Lorenzo", "Vélez", "Boca", "Ferro"] },
        { p: "¿Cuántos títulos de Primera ganó Huracán en la era amateur?", o: ["4", "1", "8", "Ninguno"] },
      ],
      [
        { p: "¿Qué hay en el escudo de Huracán?", o: ["Un globo aerostático", "Un ciclón", "Un avión", "Un rayo"] },
        { p: "¿Cómo terminó la final del Clausura 2009 entre Huracán y Vélez?", o: ["1-0 para Vélez", "2-2", "1-0 para Huracán", "3-1 para Vélez"] },
      ],
      [
        { p: "¿De qué famoso aviador era el globo «Huracán» que inspiró al club?", o: ["Jorge Newbery", "Benjamín Matienzo", "Jorge Chávez", "Antoine de Saint-Exupéry"] },
        { p: "¿Quién hizo el gol de Vélez en aquella final de 2009?", o: ["Maximiliano Moralez", "Joaquín Larrivey", "Hernán López", "Rolando Zárate"] },
      ],
    ],
    idolos: [
      [
        { p: "¿Qué DT, después campeón del mundo con la Selección, armó el Huracán campeón de 1973?", o: ["César Luis Menotti", "Carlos Bilardo", "Alfio Basile", "Ángel Cappa"] },
        { p: "¿Qué volante, después figura del PSG, brilló en el Huracán de 2009?", o: ["Javier Pastore", "Ever Banega", "Ángel Di María", "Giovani Lo Celso"] },
      ],
      [
        { p: "¿Qué wing del Huracán del 73, campeón del mundo en 1978, era apodado «el Loco»?", o: ["René Houseman", "Daniel Bertoni", "Oscar Ortiz", "Leopoldo Luque"] },
        { p: "¿Qué volante del Huracán del 73, apodado «Miguelito», fue figura de aquel equipo?", o: ["Miguel Ángel Brindisi", "Miguel Ángel Russo", "Miguel Ángel López", "Miguel Ángel Santoro"] },
      ],
      [
        { p: "¿Qué mediocampista, ídolo del Globo, fue figura del equipo de 1973?", o: ["Carlos Babington", "Ricardo Bochini", "Norberto Alonso", "Ricardo Villa"] },
        { p: "¿Qué otro joven brilló junto a Pastore en el Huracán de Cappa?", o: ["Matías De Federico", "Lucas Biglia", "Ever Banega", "Ricardo Centurión"] },
      ],
      [
        { p: "¿Qué DT dirigió al recordado Huracán de 2009 que jugaba muy bien?", o: ["Ángel Cappa", "Frank Kudelka", "Gustavo Alfaro", "Néstor Apuzzo"] },
        { p: "¿Qué arquero de Huracán sufrió la polémica falta en el gol de Vélez en 2009?", o: ["Gastón Monzón", "Marcos Díaz", "Sebastián Saja", "Leandro Requena"] },
      ],
      [
        { p: "¿Qué DT dirigió a Huracán en la final del Apertura 2025?", o: ["Frank Kudelka", "Diego Martínez", "Antonio Mohamed", "Ángel Cappa"] },
        { p: "¿Qué DT llevó a Huracán a ganar la Copa Argentina 2014?", o: ["Néstor Apuzzo", "Eduardo Domínguez", "Frank Kudelka", "Ángel Cappa"] },
      ],
    ],
    logros: [
      [
        { p: "¿En qué año fue Huracán campeón con el recordado equipo de Menotti?", o: ["1973", "1986", "1968", "1978"] },
        { p: "¿Cuántos títulos de Primera ganó Huracán en el profesionalismo?", o: ["Uno", "Cuatro", "Ninguno", "Tres"] },
      ],
      [
        { p: "¿Contra quién perdió Huracán la final del Clausura 2009?", o: ["Vélez", "Lanús", "Banfield", "Boca"] },
        { p: "¿A quién le ganó Huracán la final de la Copa Argentina 2014?", o: ["Rosario Central", "River", "Boca", "Talleres"] },
      ],
      [
        { p: "¿Qué copa nacional ganó Huracán en 2014?", o: ["La Copa Argentina", "La Copa de la Liga", "El Trofeo de Campeones", "La Copa Centenario"] },
        { p: "¿En qué año jugó Huracán la final de la Copa Sudamericana?", o: ["2015", "2009", "2019", "2023"] },
      ],
      [
        { p: "¿A quién le ganó Huracán la Supercopa Argentina 2014?", o: ["River", "Boca", "Racing", "San Lorenzo"] },
        { p: "¿Contra quién perdió Huracán la final del Apertura 2025?", o: ["Platense", "Estudiantes", "Rosario Central", "Boca"] },
      ],
      [
        { p: "¿Contra quién perdió Huracán la final de la Copa Sudamericana 2015?", o: ["Independiente Santa Fe", "Atlético Nacional", "River", "Chapecoense"] },
        { p: "¿Cómo terminó esa final del Apertura 2025?", o: ["1-0 para Platense", "2-2 y perdió por penales", "3-1 para Platense", "2-1 para Platense"] },
      ],
    ],
    cancha: [
      [
        { p: "¿Cuáles son los colores de Huracán?", o: ["Blanco y rojo", "Azul y rojo", "Rojo y negro", "Blanco y azul"] },
        { p: "¿De qué color es la camiseta titular de Huracán?", o: ["Blanca", "Roja", "Azul", "Negra"] },
      ],
      [
        { p: "¿Cómo se llama el estadio de Huracán?", o: ["Tomás Adolfo Ducó", "Pedro Bidegain", "José Amalfitani", "Diego Armando Maradona"] },
        { p: "¿Cómo se llama la hinchada de Huracán?", o: ["La Banda de la Quema", "La Gloriosa Butteler", "La 12", "La Pandilla"] },
      ],
      [
        { p: "¿Cómo le dicen al estadio de Huracán?", o: ["El Palacio", "El Nuevo Gasómetro", "El Fortín", "El Cilindro"] },
        { p: "¿Quién fue Tomás Adolfo Ducó, que da nombre al estadio?", o: ["Un presidente del club", "Un goleador de los años 20", "El arquitecto del estadio", "Un aviador"] },
      ],
      [
        { p: "¿Por qué a los hinchas de Huracán les dicen «quemeros»?", o: ["Por la antigua quema de basura del barrio", "Por un incendio en la vieja cancha", "Por los colores de la camiseta", "Por un jugador apodado así"] },
        { p: "¿Sobre qué avenida está el estadio de Huracán?", o: ["Amancio Alcorta", "La Plata", "Caseros", "Rivadavia"] },
      ],
      [
        { p: "¿En qué año se inauguró el estadio Tomás A. Ducó?", o: ["1949", "1925", "1967", "1978"] },
        { p: "¿En qué provincia jugó Huracán la final del Apertura 2025?", o: ["Santiago del Estero", "Córdoba", "Mendoza", "San Juan"] },
      ],
    ],
  },
  {
    id: "independiente", nombre: "Independiente", corto: "Independiente", colores: ["#d81e1e", "#ffffff"],
    historia: [
      [
        { p: "¿Cómo le dicen a Independiente?", o: ["El Rojo", "La Academia", "El Granate", "El Ciclón"] },
        { p: "Además de «el Rojo», ¿cómo se les dice a los de Independiente?", o: ["Los Diablos Rojos", "Los Millonarios", "Los Cuervos", "Los Granates"] },
      ],
      [
        { p: "¿Cuál es el clásico rival de Independiente?", o: ["Racing", "Lanús", "Arsenal", "Banfield"] },
        { p: "¿Cómo se llama el partido entre Independiente y Racing?", o: ["El clásico de Avellaneda", "El clásico del sur", "El superclásico", "El clásico del oeste"] },
      ],
      [
        { p: "¿Por qué a Independiente le dicen «el Rey de Copas»?", o: ["Es el club con más Libertadores", "Ganó más ligas que nadie", "Ganó 10 Copas Argentina", "Por el nombre de su estadio"] },
        { p: "¿Quiénes fundaron Independiente?", o: ["Empleados de la tienda «A la Ciudad de Londres»", "Trabajadores del ferrocarril", "Alumnos de un colegio inglés", "Socios que se fueron de Racing"] },
      ],
      [
        { p: "¿En qué año se fundó Independiente?", o: ["1905", "1903", "1910", "1899"] },
        { p: "¿En qué año descendió Independiente por primera vez?", o: ["2013", "1999", "2006", "Nunca descendió"] },
      ],
      [
        { p: "¿De qué club inglés tomó Independiente el color rojo?", o: ["Nottingham Forest", "Liverpool", "Arsenal", "Manchester United"] },
        { p: "¿A quién le ganó el desempate que le dio la vuelta a Primera en 2014?", o: ["Huracán", "Banfield", "Instituto", "Talleres"] },
      ],
    ],
    idolos: [
      [
        { p: "¿Qué ídolo, apodado «el Bocha», jugó toda su carrera en Independiente?", o: ["Ricardo Bochini", "Daniel Bertoni", "Jorge Burruchaga", "Ricardo Pavoni"] },
        { p: "¿Qué autor del gol decisivo en la final del Mundial 86 jugó en Independiente?", o: ["Jorge Burruchaga", "Jorge Valdano", "José Luis Brown", "Diego Maradona"] },
      ],
      [
        { p: "¿Qué delantero campeón del mundo 2022 debutó en Independiente con 15 años?", o: ["Sergio Agüero", "Lautaro Martínez", "Julián Álvarez", "Ángel Di María"] },
        { p: "¿Qué defensor uruguayo, apodado «el Chivo», es ídolo del Rojo?", o: ["Ricardo Pavoni", "Diego Lugano", "Obdulio Varela", "Paolo Montero"] },
      ],
      [
        { p: "¿Quién es el máximo goleador de la historia de Independiente?", o: ["Arsenio Erico", "Ricardo Bochini", "Vicente de la Mata", "Luis Artime"] },
        { p: "¿Qué jugador de Independiente hizo un gol en la final del Mundial 1978?", o: ["Daniel Bertoni", "Mario Kempes", "Leopoldo Luque", "Ricardo Bochini"] },
      ],
      [
        { p: "¿Qué DT llevó a Independiente a ganar la Copa Sudamericana 2017?", o: ["Ariel Holan", "Gabriel Milito", "Antonio Mohamed", "Julio Falcioni"] },
        { p: "¿Quién hizo el gol de la Intercontinental 1984 ante el Liverpool?", o: ["José Percudani", "Ricardo Bochini", "Jorge Burruchaga", "Claudio Marangoni"] },
      ],
      [
        { p: "¿Qué DT dirigió al Independiente campeón de la Libertadores y la Intercontinental de 1984?", o: ["José Omar Pastoriza", "Jorge Solari", "Miguel Ángel López", "Humberto Maschio"] },
        { p: "¿Quién hizo el gol de Independiente en el Maracaná, en la final de la Sudamericana 2017?", o: ["Maximiliano Meza", "Ezequiel Barco", "Emmanuel Gigliotti", "Nicolás Domingo"] },
      ],
    ],
    logros: [
      [
        { p: "¿Cuántas Copas Libertadores ganó Independiente?", o: ["7", "5", "6", "4"] },
        { p: "¿Cuántas Copas Sudamericanas ganó Independiente?", o: ["2", "1", "3", "Ninguna"] },
      ],
      [
        { p: "¿Cuántas Libertadores seguidas ganó entre 1972 y 1975?", o: ["4", "2", "3", "5"] },
        { p: "¿Cuántas Copas Intercontinentales ganó Independiente?", o: ["2", "1", "3", "4"] },
      ],
      [
        { p: "¿A quién le ganó Independiente la Intercontinental de 1984?", o: ["Liverpool", "Juventus", "Hamburgo", "Aston Villa"] },
        { p: "¿A quién le ganó Independiente la Intercontinental de 1973?", o: ["Juventus", "Ajax", "Bayern Múnich", "Liverpool"] },
      ],
      [
        { p: "¿A quién le ganó la final de la Copa Sudamericana 2017, en el Maracaná?", o: ["Flamengo", "Fluminense", "Vasco da Gama", "Botafogo"] },
        { p: "¿Qué copa ganó Independiente en Japón en 2018?", o: ["La Copa Suruga Bank", "La Copa Intercontinental", "El Mundial de Clubes", "La Copa Kirin"] },
      ],
      [
        { p: "¿A quién le ganó la final de la Copa Sudamericana 2010?", o: ["Goiás", "LDU Quito", "Chivas", "Palmeiras"] },
        { p: "¿En qué año ganó Independiente su primera Copa Libertadores?", o: ["1964", "1972", "1959", "1975"] },
      ],
    ],
    cancha: [
      [
        { p: "¿De qué color es la camiseta de Independiente?", o: ["Roja", "Celeste y blanca", "Granate", "Blanca con banda roja"] },
        { p: "¿En qué ciudad juega Independiente?", o: ["Avellaneda", "Lanús", "Quilmes", "Ciudad de Buenos Aires"] },
      ],
      [
        { p: "¿Cómo se llama el estadio de Independiente?", o: ["Libertadores de América", "Presidente Perón", "Ciudad de Avellaneda", "El Cilindro"] },
        { p: "¿Cuántos espectadores entran, aproximadamente, en el Libertadores de América?", o: ["Unos 45.000", "Unos 10.000", "Unos 80.000", "Unos 25.000"] },
      ],
      [
        { p: "¿Cómo le decían al viejo estadio de Independiente?", o: ["La Doble Visera", "El Cilindro", "La Fortaleza", "El Gasómetro"] },
        { p: "¿En qué año se inauguró el nuevo estadio Libertadores de América?", o: ["2009", "1995", "2018", "1978"] },
      ],
      [
        { p: "¿A qué distancia, más o menos, están las canchas de Independiente y Racing?", o: ["Unos 300 metros", "Unos 3 kilómetros", "Unos 10 kilómetros", "Unos 1.500 metros"] },
        { p: "¿Cómo se llama el estadio de Racing, el vecino de Independiente?", o: ["Presidente Perón", "Florencio Sola", "Ciudad de Lanús", "Libertadores de América"] },
      ],
      [
        { p: "¿En qué año se inauguró la Doble Visera, primer estadio de cemento de Sudamérica?", o: ["1928", "1950", "1913", "1945"] },
        { p: "¿Qué nombre se le agregó al estadio en homenaje a su máximo ídolo?", o: ["Ricardo Enrique Bochini", "Arsenio Erico", "Sergio Agüero", "Daniel Bertoni"] },
      ],
    ],
  },
  {
    id: "rivadavia", nombre: "Independiente Rivadavia", corto: "Ind. Rivadavia", colores: ["#0d47a1", "#ffffff"],
    historia: [
      [
        { p: "¿De qué provincia es Independiente Rivadavia?", o: ["Mendoza", "San Juan", "San Luis", "La Rioja"] },
        { p: "¿Con qué nombre se fundó el club en 1913?", o: ["Club Atlético Independiente", "Sportivo Rivadavia", "Club Mendoza", "Atlético del Parque"] },
      ],
      [
        { p: "¿Cómo le dicen a Independiente Rivadavia?", o: ["La Lepra", "El Lobo", "El Tomba", "El Rojo"] },
        { p: "¿En qué año ascendió Independiente Rivadavia a Primera?", o: ["2023", "2019", "2010", "2025"] },
      ],
      [
        { p: "¿Cuál es el clásico rival de Independiente Rivadavia?", o: ["Gimnasia de Mendoza", "Godoy Cruz", "San Martín de San Juan", "Talleres"] },
        { p: "¿Qué gobernador cedió en 1923 los terrenos del estadio?", o: ["José Néstor Lencinas", "Emilio Civit", "Carlos Washington Lencinas", "Bautista Gargantini"] },
      ],
      [
        { p: "¿De la unión de qué dos clubes nació, en 1919?", o: ["Independiente y Sportivo Rivadavia", "Independiente y Atlético Mendoza", "Rivadavia y Gimnasia", "Sportivo Mendoza e Independiente"] },
        { p: "Según una versión, ¿en homenaje a qué selección eligieron la camiseta azul?", o: ["Italia", "Francia", "Uruguay", "Escocia"] },
      ],
      [
        { p: "¿Cuál es la fecha oficial de fundación del club?", o: ["1913", "1902", "1925", "1944"] },
        { p: "¿Cuántas veces fue presidente Bautista Gargantini?", o: ["5", "1", "2", "10"] },
      ],
    ],
    idolos: [
      [
        { p: "¿Qué dirigente impulsó la fusión de 1919 y le da nombre al estadio?", o: ["Bautista Gargantini", "Víctor Legrotaglie", "Feliciano Gambarte", "Florencio Sola"] },
        { p: "¿Qué legendario «10» rosarino, admirado por Maradona, jugó en Independiente Rivadavia?", o: ["Tomás «Trinche» Carlovich", "Ricardo Bochini", "Norberto Alonso", "Mario Zanabria"] },
      ],
      [
        { p: "¿Qué DT ganó la Copa Argentina 2025 con la Lepra?", o: ["Alfredo Berti", "Iván Delfino", "Omar De Felippe", "Andrés Yllana"] },
        { p: "¿Quién es considerado el máximo ídolo de Independiente Rivadavia?", o: ["Hugo «Gringo» Mémoli", "Víctor Legrotaglie", "Sebastián Villa", "Alex Arce"] },
      ],
      [
        { p: "¿Qué capitán convirtió el penal que le dio la Copa Argentina 2025?", o: ["Sebastián Villa", "Alex Arce", "Matías Fernández", "Alan Lescano"] },
        { p: "¿Qué hizo el «Gringo» Mémoli en un partido de 1975?", o: ["Jugó de arquero y atajó un penal", "Hizo cinco goles", "Dirigió el partido", "Jugó lesionado los 90 minutos"] },
      ],
      [
        { p: "¿Qué delantero paraguayo hizo un gol en la final de la Copa Argentina 2025?", o: ["Alex Arce", "Óscar Cardozo", "Derlis González", "Antonio Sanabria"] },
        { p: "¿Quién es el máximo goleador histórico del club?", o: ["Roberto «Arbolito» López", "Hugo Mémoli", "Alex Arce", "Antonio Vergara"] },
      ],
      [
        { p: "¿Quién hizo el otro gol de la Lepra en la final de 2025?", o: ["Matías Fernández", "Sebastián Villa", "Erik Godoy", "Alan Lescano"] },
        { p: "¿Qué jugador, apodado «Lobo», fue clave en el ascenso a la B Nacional?", o: ["Claudio Cordone", "Luis Cortez", "Antonio Vergara", "Hugo Mémoli"] },
      ],
    ],
    logros: [
      [
        { p: "¿Qué copa nacional ganó Independiente Rivadavia en 2025?", o: ["La Copa Argentina", "La Copa de la Liga", "La Supercopa Argentina", "El Trofeo de Campeones"] },
        { p: "¿En qué estadio se jugó la final del ascenso de 2023?", o: ["El Mario Alberto Kempes", "El Malvinas Argentinas", "El Bautista Gargantini", "El Monumental"] },
      ],
      [
        { p: "¿A quién le ganó la final de la Copa Argentina 2025?", o: ["Argentinos Juniors", "River", "Belgrano", "Vélez"] },
        { p: "¿Qué copa internacional juega en 2026 gracias a la Copa Argentina?", o: ["La Libertadores", "La Sudamericana", "La Recopa", "La Supercopa"] },
      ],
      [
        { p: "¿Cómo se definió esa final?", o: ["2-2 y 5-3 en los penales", "Ganó 1-0", "1-1 y 4-2 en los penales", "Ganó 3-2"] },
        { p: "¿A qué grande eliminó Independiente Rivadavia en la Copa Argentina 2025 antes de la final?", o: ["River", "Boca", "Racing", "Independiente"] },
      ],
      [
        { p: "¿A quién le ganó la final por el ascenso de 2023?", o: ["Almirante Brown", "Deportivo Riestra", "Deportivo Maipú", "Chacarita"] },
        { p: "¿En qué Nacional fue figura el «Gringo» Mémoli?", o: ["El de 1982", "El de 1970", "El de 1985", "El de 1967"] },
      ],
      [
        { p: "¿Qué récord tiene en la Liga Mendocina de Fútbol?", o: ["Es el club con más títulos", "Nunca la ganó", "Es el club más nuevo", "Ganó solo una vez"] },
        { p: "¿En qué año volvió a ganar la Liga Mendocina después de 15 años sin títulos?", o: ["1960", "1975", "1945", "1990"] },
      ],
    ],
    cancha: [
      [
        { p: "¿De qué color es la camiseta de Independiente Rivadavia?", o: ["Azul", "Roja", "Verde", "Blanca y negra"] },
        { p: "¿En qué ciudad juega Independiente Rivadavia?", o: ["Mendoza", "San Juan", "San Rafael", "San Luis"] },
      ],
      [
        { p: "¿Cómo se llama el estadio de Independiente Rivadavia?", o: ["Bautista Gargantini", "Malvinas Argentinas", "Víctor Legrotaglie", "Feliciano Gambarte"] },
        { p: "¿Qué apodo tuvo el estadio Bautista Gargantini?", o: ["La Catedral", "El Palacio", "La Fortaleza", "El Coloso"] },
      ],
      [
        { p: "¿En qué parque de Mendoza está el estadio?", o: ["El Parque General San Martín", "El Parque Sarmiento", "El Parque Independencia", "El Parque Cívico"] },
        { p: "¿Cuántos espectadores entran, aproximadamente, en el Gargantini?", o: ["Unos 24.000", "Unos 5.000", "Unos 60.000", "Unos 45.000"] },
      ],
      [
        { p: "¿Qué otro apodo tiene el club por el lugar donde está su cancha?", o: ["El Azul del Parque", "El Fortín", "El Globo", "El Gigante"] },
        { p: "¿Contra quién juega Independiente Rivadavia el clásico mendocino en Primera?", o: ["Gimnasia y Esgrima de Mendoza", "Godoy Cruz", "San Martín de San Juan", "Huracán Las Heras"] },
      ],
      [
        { p: "¿En qué año se inauguró el estadio Bautista Gargantini?", o: ["1925", "1978", "1950", "2001"] },
        { p: "¿En qué estadio se jugó la final de la Copa Argentina 2025?", o: ["El de Instituto, en Córdoba", "El Malvinas Argentinas", "El Gargantini", "El Kempes"] },
      ],
    ],
  },
  {
    id: "instituto", nombre: "Instituto", corto: "Instituto", colores: ["#d81e1e", "#ffffff"],
    historia: [
      [
        { p: "¿Cómo le dicen a Instituto de Córdoba?", o: ["La Gloria", "El Pirata", "La T", "La Academia"] },
        { p: "¿En qué ciudad juega Instituto?", o: ["Córdoba", "Río Cuarto", "Villa María", "Rosario"] },
      ],
      [
        { p: "¿En qué barrio de Córdoba está Instituto?", o: ["Alta Córdoba", "Alberdi", "Barrio Jardín", "General Paz"] },
        { p: "¿Quiénes fundaron Instituto en 1918?", o: ["Empleados del ferrocarril", "Alumnos de un instituto", "Inmigrantes ingleses", "Obreros de una fábrica"] },
      ],
      [
        { p: "¿Cuál es el nombre completo de Instituto?", o: ["Instituto Atlético Central Córdoba", "Instituto Atlético Córdoba", "Instituto Sportivo Alberdi", "Instituto Nacional de Fútbol"] },
        { p: "¿De dónde viene el apodo «La Gloria»?", o: ["De cuatro títulos seguidos de la Liga Cordobesa (1925-28)", "De un himno", "De una canción de cancha", "De un ascenso milagroso"] },
      ],
      [
        { p: "¿En qué año se fundó Instituto?", o: ["1918", "1905", "1931", "1913"] },
        { p: "¿Hasta qué año solo podían ser socios los ferroviarios?", o: ["1924", "1950", "1918", "1973"] },
      ],
      [
        { p: "¿A quién le ganó la final por el ascenso de 2022?", o: ["Estudiantes de Buenos Aires", "Almirante Brown", "Quilmes", "Deportivo Maipú"] },
        { p: "¿Qué club inspiró los colores rojo y blanco de Instituto?", o: ["Alumni de Villa María", "River Plate", "Estudiantes de La Plata", "Independiente"] },
      ],
    ],
    idolos: [
      [
        { p: "¿Qué goleador del Mundial 1978 empezó su carrera en Instituto?", o: ["Mario Kempes", "Leopoldo Luque", "Daniel Bertoni", "René Houseman"] },
        { p: "¿Cómo le dicen a Paulo Dybala, surgido de Instituto?", o: ["La Joya", "El Kun", "La Pulga", "El Fideo"] },
      ],
      [
        { p: "¿Qué crack, campeón del mundo en 2022, surgió de Instituto?", o: ["Paulo Dybala", "Julián Álvarez", "Exequiel Palacios", "Thiago Almada"] },
        { p: "¿A qué club italiano se fue Dybala desde Instituto?", o: ["Palermo", "Juventus", "Roma", "Napoli"] },
      ],
      [
        { p: "¿Qué campeón del mundo en 1978, después ídolo del Tottenham, surgió de Instituto?", o: ["Osvaldo Ardiles", "Ricardo Villa", "Américo Gallego", "Alberto Tarantini"] },
        { p: "¿A qué club se fue Mario Kempes desde Instituto?", o: ["Rosario Central", "Valencia", "River", "Talleres"] },
      ],
      [
        { p: "¿Qué delantero, después goleador en Alemania, surgió de Instituto?", o: ["Diego Klimowicz", "Ramón Díaz", "Gabriel Batistuta", "Hernán Crespo"] },
        { p: "¿Qué dirigente propuso la camiseta a rayas rojas y blancas?", o: ["Guillermo Dundas", "Juan Domingo Perón", "Mario Kempes", "Osvaldo Ardiles"] },
      ],
      [
        { p: "¿Quién hizo el gol que le dio el ascenso a Instituto en 2022?", o: ["Fernando Alarcón", "Juan Cruz Randazzo", "Santiago Rodríguez", "Gabriel Graciani"] },
        { p: "¿En qué año se inauguró el estadio de Alta Córdoba?", o: ["1951", "1978", "1925", "1999"] },
      ],
    ],
    logros: [
      [
        { p: "¿En qué año volvió Instituto a Primera División?", o: ["2022", "2019", "2015", "2024"] },
        { p: "¿En qué categoría jugaba Instituto antes del ascenso de 2022?", o: ["La Primera Nacional", "El Federal A", "La Primera B", "La Primera C"] },
      ],
      [
        { p: "¿Cómo terminó la ida de la final 2022, en Caseros?", o: ["0-0", "Ganó Instituto 2-0", "Ganó Estudiantes 1-0", "2-2"] },
        { p: "¿Cuántos títulos seguidos de la Liga Cordobesa ganó entre 1925 y 1928?", o: ["4", "2", "6", "1"] },
      ],
      [
        { p: "¿Cómo terminó la vuelta de esa final, en Alta Córdoba?", o: ["1-1", "Ganó Instituto 2-0", "Ganó Instituto 3-1", "0-0"] },
        { p: "¿Contra qué club se inauguró el estadio de Instituto en 1951?", o: ["Racing Club", "Boca", "Belgrano", "Talleres"] },
      ],
      [
        { p: "¿Por qué le alcanzaba el empate a Instituto en esa final?", o: ["Por ventaja deportiva en la fase regular", "Por gol de visitante", "Porque tenía menos tarjetas", "Por sorteo"] },
        { p: "¿Quién abrió el marcador para Estudiantes en la vuelta de la final 2022?", o: ["Juan Cruz Randazzo", "Fernando Alarcón", "Santiago Rodríguez", "Gabriel Graciani"] },
      ],
      [
        { p: "¿Cuántos puntos sacó Instituto en la fase regular de la Primera Nacional 2022?", o: ["68", "57", "75", "49"] },
        { p: "¿Cuántos puntos hizo Estudiantes de Buenos Aires en la fase regular 2022?", o: ["57", "68", "45", "71"] },
      ],
    ],
    cancha: [
      [
        { p: "¿Cuáles son los colores de Instituto?", o: ["Rojo y blanco", "Celeste y blanco", "Azul y blanco", "Verde y blanco"] },
        { p: "¿Cómo es la camiseta clásica de Instituto?", o: ["A rayas verticales rojas y blancas", "Roja lisa", "Blanca con banda roja", "Mitad roja y mitad blanca"] },
      ],
      [
        { p: "¿Cómo se llama el estadio de Instituto?", o: ["Juan Domingo Perón", "Mario Alberto Kempes", "Julio César Villagra", "Antonio Candini"] },
        { p: "¿Qué club cordobés juega en el barrio Alberdi?", o: ["Belgrano", "Instituto", "Talleres", "Racing de Córdoba"] },
      ],
      [
        { p: "¿Cómo le dicen también a la cancha de Instituto?", o: ["El Monumental de Alta Córdoba", "El Gigante de Alberdi", "La Boutique", "El Coloso del Parque"] },
        { p: "¿A qué presidente argentino homenajea el nombre del estadio?", o: ["Juan Domingo Perón", "Hipólito Yrigoyen", "Arturo Illia", "Raúl Alfonsín"] },
      ],
      [
        { p: "¿Qué final de 2025 se jugó en la cancha de Instituto?", o: ["La de la Copa Argentina", "La del Clausura", "La de la Libertadores", "La del Trofeo de Campeones"] },
        { p: "¿De qué ciudad es Alumni, el club que inspiró los colores?", o: ["Villa María", "Río Cuarto", "Rosario", "Bell Ville"] },
      ],
      [
        { p: "¿Qué final por el ascenso de 2023 se jugó en la cancha de Instituto?", o: ["Deportivo Riestra - Deportivo Maipú", "Independiente Rivadavia - Almirante Brown", "Aldosivi - San Martín de Tucumán", "Barracas - Quilmes"] },
        { p: "¿En qué localidad se jugó la ida de la final del ascenso 2022?", o: ["Caseros", "Córdoba", "Avellaneda", "Lanús"] },
      ],
    ],
  },
  {
    id: "lanus", nombre: "Lanús", corto: "Lanús", colores: ["#7a1f2b", "#ffffff"],
    historia: [
      [
        { p: "¿Cómo le dicen a Lanús?", o: ["El Granate", "El Taladro", "El Rojo", "El Calamar"] },
        { p: "¿En qué zona del Gran Buenos Aires está Lanús?", o: ["En la zona sur", "En la zona norte", "En la zona oeste", "En La Plata"] },
      ],
      [
        { p: "¿Cuál es el clásico rival de Lanús?", o: ["Banfield", "Independiente", "Arsenal", "Talleres de Escalada"] },
        { p: "¿Cuántas finales de Copa Libertadores jugó Lanús?", o: ["Una", "Ninguna", "Tres", "Cinco"] },
      ],
      [
        { p: "¿Cuál fue el primer título de Lanús en Primera División?", o: ["El Apertura 2007", "El Clausura 1995", "El Torneo 2016", "El Metropolitano 1977"] },
        { p: "¿En qué año ganó Lanús la Copa Conmebol?", o: ["1996", "2001", "1992", "2007"] },
      ],
      [
        { p: "¿En qué año se fundó Lanús?", o: ["1915", "1896", "1905", "1932"] },
        { p: "¿A quién le ganó Lanús la final de la Copa Conmebol 1996?", o: ["Independiente Santa Fe", "Atlético Mineiro", "Peñarol", "Rosario Central"] },
      ],
      [
        { p: "¿Contra quién perdió Lanús la final de la Libertadores 2017?", o: ["Grêmio", "River", "Palmeiras", "Atlético Mineiro"] },
        { p: "¿Cuántas finales de Copa Sudamericana jugó Lanús hasta 2025?", o: ["Tres", "Una", "Dos", "Cinco"] },
      ],
    ],
    idolos: [
      [
        { p: "¿Quién es el máximo goleador de la historia de Lanús?", o: ["José Sand", "Lautaro Acosta", "Sebastián Leto", "Silvio Romero"] },
        { p: "¿Qué ídolo moderno de Lanús es apodado «Laucha»?", o: ["Lautaro Acosta", "José Sand", "Diego Valeri", "Marcelo Bustamante"] },
      ],
      [
        { p: "¿Qué DT llevó a Lanús al título del Torneo 2016?", o: ["Jorge Almirón", "Guillermo Barros Schelotto", "Ramón Cabrero", "Luis Zubeldía"] },
        { p: "¿Qué arquero de Lanús (2013-2016) pasó después al América de México y la Selección?", o: ["Agustín Marchesín", "Fernando Monetti", "Nahuel Losada", "Esteban Andrada"] },
      ],
      [
        { p: "¿Qué DT llevó a Lanús a su primer título, en 2007?", o: ["Ramón Cabrero", "Miguel Ángel Russo", "Héctor Cúper", "Néstor Gorosito"] },
        { p: "¿Qué DT, después finalista de Champions con Valencia, ganó la Conmebol 1996 con Lanús?", o: ["Héctor Cúper", "Ramón Cabrero", "Miguel Ángel Russo", "Carlos Bianchi"] },
      ],
      [
        { p: "¿Qué DT ganó con Lanús la Copa Sudamericana 2013?", o: ["Guillermo Barros Schelotto", "Jorge Almirón", "Gabriel Schurrer", "Luis Zubeldía"] },
        { p: "¿Qué DT dirigía a Lanús en la final de la Libertadores 2017?", o: ["Jorge Almirón", "Guillermo Barros Schelotto", "Luis Zubeldía", "Ezequiel Carboni"] },
      ],
      [
        { p: "¿Qué arquero atajó tres penales en la final de la Sudamericana 2025?", o: ["Nahuel Losada", "Agustín Marchesín", "Fernando Monetti", "Esteban Andrada"] },
        { p: "¿Qué volante del Lanús de 2007 fue después ídolo del Portland Timbers?", o: ["Diego Valeri", "Sebastián Blanco", "Lautaro Acosta", "Andrés Romero"] },
      ],
    ],
    logros: [
      [
        { p: "¿Cuántas Copas Sudamericanas ganó Lanús?", o: ["2", "1", "3", "Ninguna"] },
        { p: "¿Cuántas Copas Conmebol ganó Lanús?", o: ["Una", "Dos", "Ninguna", "Tres"] },
      ],
      [
        { p: "¿A quién le ganó Lanús la final de la Sudamericana 2013?", o: ["Ponte Preta", "São Paulo", "Atlético Nacional", "Goiás"] },
        { p: "¿Qué torneo de Primera ganó Lanús en 2016?", o: ["El Torneo de Transición 2016", "La Copa Argentina", "El Clausura 2016", "La Copa de la Liga"] },
      ],
      [
        { p: "¿A quién le ganó Lanús la final de la Sudamericana 2025?", o: ["Atlético Mineiro", "Fluminense", "Cruzeiro", "Corinthians"] },
        { p: "¿Contra quién perdió Lanús la final de la Copa Sudamericana 2020?", o: ["Defensa y Justicia", "Vélez", "Independiente del Valle", "Athletico Paranaense"] },
      ],
      [
        { p: "¿Por cuánto le ganó Lanús a San Lorenzo la final del Torneo 2016?", o: ["4-0", "1-0", "2-1", "3-2"] },
        { p: "¿Cuál fue el resultado global de la final de la Libertadores 2017?", o: ["3-1 para Grêmio", "2-1 para Lanús", "1-1 y penales", "4-0 para Grêmio"] },
      ],
      [
        { p: "¿A quién eliminó Lanús en semifinales de la Libertadores 2017, remontando con un 4-2?", o: ["River", "Boca", "San Lorenzo", "Racing"] },
        { p: "¿Cómo terminó la tanda de penales de la final de la Sudamericana 2025?", o: ["5-4 para Lanús", "4-2 para Lanús", "3-1 para Lanús", "7-6 para Lanús"] },
      ],
    ],
    cancha: [
      [
        { p: "¿Cuál es el color de la camiseta de Lanús?", o: ["Granate", "Bordó y azul", "Rojo y negro", "Verde y blanco"] },
        { p: "¿En qué partido bonaerense juega Lanús?", o: ["Lanús", "Avellaneda", "Lomas de Zamora", "Quilmes"] },
      ],
      [
        { p: "¿Cómo le dicen a la cancha de Lanús?", o: ["La Fortaleza", "El Fortín", "El Bosque", "El Palacio"] },
        { p: "¿Cuántos espectadores entran, aproximadamente, en La Fortaleza?", o: ["Unos 45.000", "Unos 10.000", "Unos 80.000", "Unos 20.000"] },
      ],
      [
        { p: "¿Cuál es el nombre oficial del estadio de Lanús?", o: ["Ciudad de Lanús - Néstor Díaz Pérez", "Florencio Sola", "Presidente Perón", "Libertadores de América"] },
        { p: "¿Quién fue Néstor Díaz Pérez, que da nombre al estadio?", o: ["Un presidente del club", "Un goleador histórico", "Un intendente de Lanús", "El primer DT"] },
      ],
      [
        { p: "¿En qué ciudad se jugó la final de la Sudamericana 2025?", o: ["Asunción", "Montevideo", "Lima", "Belo Horizonte"] },
        { p: "¿En qué ciudad se jugó la final de la Sudamericana 2020 que perdió Lanús?", o: ["Córdoba", "Asunción", "Buenos Aires", "Montevideo"] },
      ],
      [
        { p: "¿Qué DT dirigía a Lanús en la Sudamericana 2025?", o: ["Mauricio Pellegrino", "Ricardo Zielinski", "Frank Kudelka", "Jorge Almirón"] },
        { p: "¿En qué estadio de Asunción ganó Lanús la Sudamericana 2025?", o: ["Defensores del Chaco", "La Nueva Olla", "Estadio Manuel Ferreira", "Estadio Ueno La Huerta"] },
      ],
    ],
  },
  {
    id: "newells", nombre: "Newell's Old Boys", corto: "Newell's", colores: ["#d81e1e", "#111111"],
    historia: [
      [
        { p: "¿Cómo le dicen a Newell's Old Boys?", o: ["La Lepra", "El Canalla", "El Rojo", "El Pirata"] },
        { p: "¿En qué ciudad juega Newell's?", o: ["Rosario", "Santa Fe", "Córdoba", "Paraná"] },
      ],
      [
        { p: "¿Cuál es el clásico rival de Newell's?", o: ["Rosario Central", "Unión", "Colón", "Talleres"] },
        { p: "¿Qué significa «Old Boys» en el nombre del club?", o: ["Ex alumnos", "Viejos amigos", "Chicos grandes", "Veteranos"] },
      ],
      [
        { p: "¿A quién homenajea el nombre del club?", o: ["A Isaac Newell, un maestro inglés", "A un jugador inglés", "A un barco que llegó a Rosario", "A un ingeniero del ferrocarril"] },
        { p: "¿Cómo se llama el partido entre Newell's y Central?", o: ["El clásico rosarino", "El clásico santafesino", "El clásico del litoral", "El superclásico"] },
      ],
      [
        { p: "¿En qué año se fundó Newell's Old Boys?", o: ["1903", "1889", "1912", "1921"] },
        { p: "¿Qué colegio fundó Isaac Newell en Rosario?", o: ["El Colegio Comercial Anglicano Argentino", "El Colegio Nacional", "El Colegio San José", "La Escuela Normal"] },
      ],
      [
        { p: "Según la historia, ¿por qué a los de Newell's les dicen «leprosos»?", o: ["Aceptaron jugar un partido a beneficio de enfermos de lepra", "Por una epidemia en el barrio", "Por el color de la camiseta", "Por un hospital cerca de la cancha"] },
        { p: "¿Quién fundó Newell's en 1903, junto a ex alumnos del colegio?", o: ["Claudio Newell, hijo de Isaac", "Isaac Newell", "Marcelo Bielsa", "Un maestro escocés"] },
      ],
    ],
    idolos: [
      [
        { p: "¿Qué crack, campeón del mundo en 2022, jugó de chico en Newell's?", o: ["Lionel Messi", "Ángel Di María", "Rodrigo De Paul", "Emiliano Martínez"] },
        { p: "¿Cómo se llamaba el equipo infantil de Messi en Newell's?", o: ["La Máquina del 87", "Los Leprositos", "La Escuelita", "Los Pibes del Parque"] },
      ],
      [
        { p: "¿Qué DT histórico, apodado «el Loco», le da nombre al estadio?", o: ["Marcelo Bielsa", "Gerardo Martino", "José Yudica", "Jorge Griffa"] },
        { p: "¿Qué ídolo de Newell's hizo un golazo de volea a México en el Mundial 2006?", o: ["Maxi Rodríguez", "Lionel Messi", "Gabriel Heinze", "Hernán Crespo"] },
      ],
      [
        { p: "¿Qué goleador histórico de la Selección surgió de Newell's?", o: ["Gabriel Batistuta", "Hernán Crespo", "Gonzalo Higuaín", "Martín Palermo"] },
        { p: "¿Qué delantero fue goleador del Newell's campeón de 2013?", o: ["Ignacio Scocco", "Maxi Rodríguez", "Lucas Bernardi", "David Trezeguet"] },
      ],
      [
        { p: "¿Qué DT llevó a Newell's al título del Final 2013?", o: ["Gerardo «Tata» Martino", "Marcelo Bielsa", "Alfredo Berti", "Diego Osella"] },
        { p: "¿Qué DT, ex Tottenham y PSG, surgió como jugador de Newell's?", o: ["Mauricio Pochettino", "Gerardo Martino", "Eduardo Berizzo", "Marcelo Bielsa"] },
      ],
      [
        { p: "¿Quién hizo el gol del título de 1974, en la cancha de Central?", o: ["Mario Zanabria", "Armando Capurro", "Marcelo Bielsa", "Juan Carlos Montes"] },
        { p: "¿Qué arquero fue figura del Newell's de Bielsa?", o: ["Norberto Scoponi", "Sergio Goycochea", "Nery Pumpido", "Germán Burgos"] },
      ],
    ],
    logros: [
      [
        { p: "¿Cuál fue el último título de liga de Newell's?", o: ["El Final 2013", "El Apertura 2004", "El Clausura 1992", "El Clausura 2009"] },
        { p: "¿Cuántos títulos de liga ganó Newell's?", o: ["6", "2", "10", "4"] },
      ],
      [
        { p: "¿En qué año ganó Newell's su primer título de Primera, el Metropolitano?", o: ["1974", "1988", "1965", "1991"] },
        { p: "¿Qué DT llevó a Newell's al título 1987-88?", o: ["José Yudica", "Marcelo Bielsa", "Gerardo Martino", "Jorge Griffa"] },
      ],
      [
        { p: "¿Qué DT ganó con Newell's el torneo 1990-91 y el Clausura 1992?", o: ["Marcelo Bielsa", "José Yudica", "Gerardo Martino", "Héctor Veira"] },
        { p: "¿Qué torneo ganó Newell's en 2004?", o: ["El Apertura 2004", "El Clausura 2004", "La Copa Argentina", "La Sudamericana"] },
      ],
      [
        { p: "¿Contra quién perdió Newell's la final de la Libertadores 1992?", o: ["São Paulo", "Nacional", "Cruzeiro", "Peñarol"] },
        { p: "¿Qué DT llevó a Newell's al Apertura 2004?", o: ["Américo Gallego", "Gerardo Martino", "Héctor Veira", "Ricardo Caruso Lombardi"] },
      ],
      [
        { p: "¿Contra quién perdió Newell's la final de la Libertadores 1988?", o: ["Nacional de Uruguay", "Peñarol", "América de Cali", "Olimpia"] },
        { p: "¿Contra quién perdió Newell's la semifinal de la Libertadores 2013?", o: ["Atlético Mineiro", "Olimpia", "Boca", "Grêmio"] },
      ],
    ],
    cancha: [
      [
        { p: "¿Cuáles son los colores de Newell's?", o: ["Rojo y negro", "Azul y amarillo", "Rojo y blanco", "Negro y blanco"] },
        { p: "¿Cómo es la camiseta clásica de Newell's?", o: ["Mitad roja y mitad negra", "A rayas rojas y negras", "Toda roja", "Negra con banda roja"] },
      ],
      [
        { p: "¿Cómo se llama el estadio de Newell's?", o: ["Marcelo Bielsa", "Gigante de Arroyito", "Jorge Newbery", "Lisandro de la Torre"] },
        { p: "¿Cómo le dicen a la cancha de Central, el clásico rival?", o: ["El Gigante de Arroyito", "El Coloso del Parque", "La Fortaleza", "El Fortín"] },
      ],
      [
        { p: "¿Cómo le dicen al estadio de Newell's?", o: ["El Coloso del Parque", "El Gigante", "La Fortaleza", "El Bosque"] },
        { p: "¿Qué otro club rosarino ganó la Copa Conmebol 1995?", o: ["Rosario Central", "Argentino de Rosario", "Central Córdoba de Rosario", "Tiro Federal"] },
      ],
      [
        { p: "¿En qué parque de Rosario está el estadio de Newell's?", o: ["Parque de la Independencia", "Parque España", "Parque Urquiza", "Parque Alem"] },
        { p: "¿Cuántos espectadores entran, aproximadamente, en el Coloso del Parque?", o: ["Unos 42.000", "Unos 15.000", "Unos 80.000", "Unos 25.000"] },
      ],
      [
        { p: "¿En qué año el estadio pasó a llamarse Marcelo Bielsa?", o: ["2009", "1992", "2001", "2016"] },
        { p: "¿Contra quién definió Newell's por penales el título 1990-91?", o: ["Boca", "River", "Vélez", "Rosario Central"] },
      ],
    ],
  },
  {
    id: "platense", nombre: "Platense", corto: "Platense", colores: ["#6b3e1f", "#ffffff"],
    historia: [
      [
        { p: "¿Cómo le dicen a Platense?", o: ["El Calamar", "El Tiburón", "El Matador", "El Bicho"] },
        { p: "¿En qué partido bonaerense está la cancha de Platense?", o: ["Vicente López", "San Isidro", "Tigre", "San Martín"] },
      ],
      [
        { p: "¿Cuál es el clásico rival de Platense?", o: ["Tigre", "Chacarita", "Atlanta", "Argentinos Juniors"] },
        { p: "¿En qué año ascendió Platense a Primera, antes de ser campeón en 2025?", o: ["2021", "2015", "2005", "2023"] },
      ],
      [
        { p: "Su estadio está en Vicente López, pero ¿con qué barrio porteño se identifica a Platense?", o: ["Saavedra", "Belgrano", "Núñez", "Villa Urquiza"] },
        { p: "¿Dónde jugó Platense de local entre 1917 y 1971?", o: ["En Manuela Pedraza y Crámer", "En Vicente López", "En la cancha de River", "En Palermo"] },
      ],
      [
        { p: "¿En qué año se fundó Platense?", o: ["1905", "1918", "1930", "1899"] },
        { p: "¿En qué año inauguró Platense su estadio de Vicente López?", o: ["1979", "1951", "1995", "2005"] },
      ],
      [
        { p: "¿De dónde viene el apodo «Calamar»?", o: ["Un periodista comparó al equipo con un calamar en su tinta", "Del escudo original", "De un restaurante cerca de la cancha", "Del apodo de su fundador"] },
        { p: "¿Por qué el periodista comparó a Platense con un calamar?", o: ["Su cancha junto al río se inundaba cuando llovía", "Sus jugadores eran muy altos", "Usaba camiseta negra", "Ganaba siempre de noche"] },
      ],
    ],
    idolos: [
      [
        { p: "¿Quién hizo el gol de Platense en la final del Apertura 2025?", o: ["Guido Mainero", "Vicente Taborda", "Ignacio Schor", "Ronaldo Martínez"] },
        { p: "¿Quién es el máximo goleador de la historia de Platense?", o: ["Daniel Vega", "Guido Mainero", "Vicente Sayago", "Julio Cozzi"] },
      ],
      [
        { p: "¿Qué dupla técnica llevó a Platense al título del Apertura 2025?", o: ["Favio Orsi y Sergio Gómez", "Guillermo y Gustavo Barros Schelotto", "Ariel Holan y Sergio Gómez", "Orsi y Kudelka"] },
        { p: "¿Qué arquero es el máximo emblema de Platense y da nombre a una tribuna?", o: ["Julio Cozzi", "Hugo Gatti", "Amadeo Carrizo", "Nery Pumpido"] },
      ],
      [
        { p: "¿De qué manera hizo Mainero el gol de la final de 2025?", o: ["De volea, dentro del área", "De tiro libre", "De penal", "De cabeza tras un córner"] },
        { p: "¿Quién es el jugador con más partidos en la historia de Platense?", o: ["Enrique Topini", "Daniel Vega", "Julio Cozzi", "Ernesto Ulrich"] },
      ],
      [
        { p: "¿A qué grande eliminó Platense por penales en el Monumental, camino al título de 2025?", o: ["River", "Boca", "Racing", "Independiente"] },
        { p: "¿A qué goleador superó Daniel Vega como máximo artillero calamar?", o: ["Vicente Sayago", "Bernabé Ferreyra", "Ángel Labruna", "Enrique Topini"] },
      ],
      [
        { p: "¿Qué árbitro dirigió la final del Apertura 2025?", o: ["Facundo Tello", "Darío Herrera", "Yael Falcón Pérez", "Nicolás Ramírez"] },
        { p: "¿Cuántos goles hizo Daniel Vega en Platense?", o: ["86", "45", "150", "212"] },
      ],
    ],
    logros: [
      [
        { p: "¿Qué torneo ganó Platense en 2025, su primer título en Primera?", o: ["El Torneo Apertura", "La Copa Argentina", "El Torneo Clausura", "La Copa de la Liga"] },
        { p: "¿Cuántos títulos de Primera tiene Platense?", o: ["Uno", "Tres", "Ninguno", "Dos"] },
      ],
      [
        { p: "¿A quién le ganó la final del Apertura 2025?", o: ["Huracán", "San Lorenzo", "Estudiantes", "Rosario Central"] },
        { p: "¿De qué torneo fue subcampeón Platense en 2023?", o: ["La Copa de la Liga", "La Copa Argentina", "La Sudamericana", "La Superliga"] },
      ],
      [
        { p: "¿Cómo terminó esa final?", o: ["1-0 para Platense", "2-2 y ganó por penales", "3-1 para Platense", "2-1 para Platense"] },
        { p: "¿Contra quién perdió Platense la final de la Copa de la Liga 2023?", o: ["Rosario Central", "River", "Boca", "Vélez"] },
      ],
      [
        { p: "¿A qué copa clasificó Platense gracias a ese título?", o: ["A la Libertadores 2026", "A la Sudamericana 2025", "A la Recopa 2026", "A la Libertadores 2025"] },
        { p: "¿Qué torneo ganó Platense en la temporada 2005-06?", o: ["La Primera B Metropolitana", "La B Nacional", "La Copa Argentina", "La Primera C"] },
      ],
      [
        { p: "¿Contra quién jugó Platense el Trofeo de Campeones 2025?", o: ["Estudiantes de La Plata", "Rosario Central", "Racing", "Independiente Rivadavia"] },
        { p: "¿En qué año volvió a descender Platense y perdió su vieja cancha?", o: ["1971", "1955", "1999", "1986"] },
      ],
    ],
    cancha: [
      [
        { p: "¿Cuáles son los colores de Platense?", o: ["Marrón y blanco", "Verde y blanco", "Azul y rojo", "Negro y blanco"] },
        { p: "¿Qué animal es el símbolo de Platense?", o: ["El calamar", "El tiburón", "El pulpo", "El delfín"] },
      ],
      [
        { p: "¿Cómo se llama el estadio de Platense?", o: ["Ciudad de Vicente López", "José Dellagiovanna", "Ciudad de Lanús", "Tomás A. Ducó"] },
        { p: "¿En qué barrio porteño estaba la vieja cancha de Platense?", o: ["Saavedra", "Palermo", "Belgrano", "Villa Crespo"] },
      ],
      [
        { p: "¿En qué localidad del partido de Vicente López está la cancha de Platense?", o: ["Florida", "Olivos", "Munro", "La Lucila"] },
        { p: "¿Qué periodista le puso el apodo «Calamar» a Platense?", o: ["Antonio Palacio Zino", "Dante Panzeri", "Borocotó", "Víctor Hugo Morales"] },
      ],
      [
        { p: "¿Dónde se jugó la final del Apertura 2025?", o: ["En el Madre de Ciudades (Santiago del Estero)", "En el Kempes (Córdoba)", "En La Plata", "En San Nicolás"] },
        { p: "¿Cuándo compró Platense los terrenos de su cancha de Vicente López?", o: ["Unos 30 años antes de inaugurarla", "El mismo año", "En 2010", "En 1905"] },
      ],
      [
        { p: "¿Cuál es, aproximadamente, la capacidad del estadio de Platense?", o: ["Unos 28.000", "Unos 8.000", "Unos 55.000", "Unos 15.000"] },
        { p: "¿Qué tribuna del estadio de Platense lleva el nombre de Julio Cozzi?", o: ["La visitante", "La local", "La platea", "Ninguna"] },
      ],
    ],
  },
  {
    id: "racing", nombre: "Racing Club", corto: "Racing", colores: ["#6fb7e8", "#ffffff"],
    historia: [
      [
        { p: "¿Cómo le dicen a Racing Club?", o: ["La Academia", "El Rojo", "El Ciclón", "El Fortín"] },
        { p: "¿Cómo se llama el partido entre Racing e Independiente?", o: ["El clásico de Avellaneda", "El superclásico", "El clásico del sur", "El clásico del oeste"] },
      ],
      [
        { p: "¿En qué ciudad está Racing?", o: ["Avellaneda", "Lanús", "Quilmes", "Banfield"] },
        { p: "¿Por qué a Racing le dicen «la Academia»?", o: ["Por el gran juego de sus equipos de la era amateur", "Por una escuela cercana", "Por su primer presidente", "Por un sponsor"] },
      ],
      [
        { p: "¿Cuál es el clásico rival de Racing?", o: ["Independiente", "Lanús", "San Lorenzo", "Banfield"] },
        { p: "¿Cuántos títulos amateur seguidos ganó Racing entre 1913 y 1919?", o: ["7", "3", "5", "10"] },
      ],
      [
        { p: "¿En qué año se fundó Racing?", o: ["1903", "1905", "1910", "1899"] },
        { p: "¿En qué año fue el famoso descenso de Racing a la B?", o: ["1983", "1999", "2001", "1967"] },
      ],
      [
        { p: "¿Qué logró Racing en 1967 por primera vez para un club argentino?", o: ["Ganar la Copa Intercontinental", "Ganar la Libertadores", "Jugar en Europa", "Ganar 10 torneos seguidos"] },
        { p: "¿En qué año fue Racing declarado en quiebra por la Justicia?", o: ["1999", "1983", "2001", "1975"] },
      ],
    ],
    idolos: [
      [
        { p: "¿Qué goleador, apodado «el Príncipe», volvió de Europa y fue campeón con Racing en 2014?", o: ["Diego Milito", "Lisandro López", "Lautaro Martínez", "Gustavo Bou"] },
        { p: "¿Qué delantero, campeón del mundo 2022, surgió de Racing?", o: ["Lautaro Martínez", "Julián Álvarez", "Ángel Di María", "Paulo Dybala"] },
      ],
      [
        { p: "¿Qué DT, ídolo como jugador, ganó la Sudamericana 2024 con Racing?", o: ["Gustavo Costas", "Diego Milito", "Fernando Gago", "Sebastián Beccacece"] },
        { p: "¿Qué ídolo de Racing, apodado «Licha», fue campeón en 2019?", o: ["Lisandro López", "Lisandro Martínez", "Lisandro Magallán", "Leandro Paredes"] },
      ],
      [
        { p: "¿Qué DT llevó a Racing al título de 2001, después de 35 años?", o: ["Reinaldo «Mostaza» Merlo", "Alfio Basile", "Diego Cocca", "Juan José Pizzuti"] },
        { p: "¿Qué DT llevó a Racing al título de la Superliga 2018-19?", o: ["Eduardo Coudet", "Diego Cocca", "Gustavo Costas", "Fernando Gago"] },
      ],
      [
        { p: "¿Qué DT armó «el Equipo de José», campeón del mundo en 1967?", o: ["Juan José Pizzuti", "Osvaldo Zubeldía", "Alfio Basile", "José Yudica"] },
        { p: "¿Qué DT llevó a Racing al título de 2014?", o: ["Diego Cocca", "Eduardo Coudet", "Reinaldo Merlo", "Facundo Sava"] },
      ],
      [
        { p: "¿Quién hizo el gol de Racing en el desempate de la Intercontinental 1967 contra el Celtic?", o: ["Juan Carlos Cárdenas", "Humberto Maschio", "Roberto Perfumo", "Alfio Basile"] },
        { p: "¿Qué defensor del Equipo de José, apodado «el Mariscal», es un ídolo?", o: ["Roberto Perfumo", "Alfio Basile", "Oscar Martín", "Rubén Díaz"] },
      ],
    ],
    logros: [
      [
        { p: "¿Qué torneo ganó Racing en 2001, cortando una racha de 35 años sin títulos?", o: ["El Apertura 2001", "El Clausura 2001", "La Copa Argentina", "La Copa Mercosur"] },
        { p: "¿Cuántas Copas Libertadores ganó Racing?", o: ["1", "2", "3", "Ninguna"] },
      ],
      [
        { p: "¿En qué año ganó Racing su única Copa Libertadores?", o: ["1967", "1988", "1972", "2001"] },
        { p: "¿Qué torneo ganó Racing en 2014?", o: ["El Transición 2014", "La Copa Argentina", "La Sudamericana", "El Apertura 2014"] },
      ],
      [
        { p: "¿A quién le ganó Racing la final de la Copa Sudamericana 2024?", o: ["Cruzeiro", "Atlético Mineiro", "Fluminense", "Botafogo"] },
        { p: "¿Qué torneo ganó Racing en 2019?", o: ["La Superliga 2018-19", "La Copa de la Liga", "La Copa Argentina", "La Libertadores"] },
      ],
      [
        { p: "¿A quién le ganó la Recopa Sudamericana 2025?", o: ["Botafogo", "Flamengo", "Fortaleza", "Palmeiras"] },
        { p: "¿Qué copa ganó Racing en 1988?", o: ["La Supercopa Sudamericana", "La Libertadores", "La Recopa", "La Copa Conmebol"] },
      ],
      [
        { p: "¿Contra qué club escocés ganó Racing la Intercontinental 1967?", o: ["Celtic", "Rangers", "Aberdeen", "Hearts"] },
        { p: "¿Contra quién perdió Racing la final del Clausura 2025?", o: ["Estudiantes", "Platense", "Boca", "Rosario Central"] },
      ],
    ],
    cancha: [
      [
        { p: "¿Cuáles son los colores de Racing?", o: ["Celeste y blanco", "Rojo y blanco", "Azul y blanco", "Verde y blanco"] },
        { p: "¿En qué ciudad juega Racing?", o: ["Avellaneda", "Lanús", "Quilmes", "Ciudad de Buenos Aires"] },
      ],
      [
        { p: "¿Cómo le dicen a la cancha de Racing?", o: ["El Cilindro", "La Doble Visera", "El Palacio", "La Fortaleza"] },
        { p: "¿Por qué a la cancha de Racing le dicen «el Cilindro»?", o: ["Por su forma redonda", "Por un tanque de agua", "Por un sponsor", "Por su techo"] },
      ],
      [
        { p: "¿Cuál es el nombre oficial de la cancha de Racing?", o: ["Presidente Perón", "Libertadores de América", "Juan Domingo Perón de Alta Córdoba", "Eva Perón"] },
        { p: "¿En qué año se inauguró el Cilindro?", o: ["1950", "1928", "1978", "1965"] },
      ],
      [
        { p: "¿Cómo se llama la hinchada de Racing?", o: ["La Guardia Imperial", "La Banda del Parque", "La Gloriosa Butteler", "Los Borrachos del Tablón"] },
        { p: "¿Cómo terminó la final de la Sudamericana 2024 ante Cruzeiro?", o: ["3-1 para Racing", "1-0 para Racing", "2-2 y ganó por penales", "2-1 para Racing"] },
      ],
      [
        { p: "¿En qué ciudad se jugó la final de la Sudamericana 2024?", o: ["Asunción", "Montevideo", "Buenos Aires", "Lima"] },
        { p: "¿Cómo terminó la Recopa 2025 contra Botafogo, en el global?", o: ["4-0 para Racing", "2-1 para Racing", "3-3 y ganó por penales", "1-0 para Racing"] },
      ],
    ],
  },
  {
    id: "river", nombre: "River Plate", corto: "River", colores: ["#ffffff", "#d81e1e"],
    historia: [
      [
        { p: "¿Cómo le dicen a River Plate?", o: ["El Millonario", "El Xeneize", "El Ciclón", "El Fortín"] },
        { p: "¿Cuál es el clásico rival de River?", o: ["Boca", "Racing", "San Lorenzo", "Independiente"] },
      ],
      [
        { p: "¿En qué barrio está hoy el estadio de River?", o: ["Núñez", "Palermo", "Saavedra", "Colegiales"] },
        { p: "¿Por qué le dicen «Millonario» a River?", o: ["Por las grandes compras de jugadores de los años 30", "Por la cantidad de socios", "Por un premio de lotería", "Por su estadio"] },
      ],
      [
        { p: "¿En qué barrio se fundó River?", o: ["La Boca", "Núñez", "Palermo", "Recoleta"] },
        { p: "¿En qué año descendió River a la B Nacional?", o: ["2011", "2001", "1985", "Nunca descendió"] },
      ],
      [
        { p: "¿En qué año se fundó River Plate?", o: ["1901", "1905", "1899", "1910"] },
        { p: "¿Qué goleador compró River a Tigre en 1932, en una venta récord?", o: ["Bernabé Ferreyra", "Ángel Labruna", "Adolfo Pedernera", "José Manuel Moreno"] },
      ],
      [
        { p: "Según la historia, ¿de dónde salió el nombre «River Plate»?", o: ["De un cartel en cajones del puerto", "De un club inglés", "De un barco de guerra", "Del nombre de una calle"] },
        { p: "¿Qué torneo ganó River en 2011-12 para volver a Primera?", o: ["La B Nacional", "La Copa Argentina", "La Primera B", "La Sudamericana"] },
      ],
    ],
    idolos: [
      [
        { p: "¿Qué DT ganó dos Libertadores con River, en 2015 y 2018?", o: ["Marcelo Gallardo", "Ramón Díaz", "Héctor Veira", "Daniel Passarella"] },
        { p: "¿Qué delantero campeón del mundo 2022, apodado «la Araña», jugó en River?", o: ["Julián Álvarez", "Lautaro Martínez", "Paulo Dybala", "Alejandro Garnacho"] },
      ],
      [
        { p: "¿Quién es el máximo goleador de la historia de River?", o: ["Ángel Labruna", "Enzo Francescoli", "Bernabé Ferreyra", "Oscar Más"] },
        { p: "¿Qué arquero, ídolo de River, atajó en el Mundial 2022?", o: ["Franco Armani", "Emiliano Martínez", "Gerónimo Rulli", "Juan Musso"] },
      ],
      [
        { p: "¿Qué uruguayo, apodado «el Príncipe», es uno de los máximos ídolos de River?", o: ["Enzo Francescoli", "Rubén Paz", "Diego Forlán", "Antonio Alzamendi"] },
        { p: "¿Qué jugadores formaban «La Máquina»?", o: ["Muñoz, Moreno, Pedernera, Labruna y Loustau", "Kempes, Luque, Houseman, Bertoni y Ortiz", "Francescoli, Ortega, Crespo, Salas y Gallardo", "Alonso, Alzamendi, Funes, Ruggeri y Gallego"] },
      ],
      [
        { p: "¿Qué arquero, apodado «Tarzán», es una leyenda de River?", o: ["Amadeo Carrizo", "Ubaldo Fillol", "Germán Burgos", "Franco Armani"] },
        { p: "¿Qué capitán de River levantó la Copa del Mundo en 1978?", o: ["Daniel Passarella", "Ubaldo Fillol", "Norberto Alonso", "Leopoldo Luque"] },
      ],
      [
        { p: "¿Qué DT llevó a River a ganar la Libertadores 1996?", o: ["Ramón Díaz", "Héctor Veira", "Américo Gallego", "Daniel Passarella"] },
        { p: "¿Quién hizo el tercer gol de River, con el arco vacío, en la final de Madrid 2018?", o: ["Gonzalo «Pity» Martínez", "Juan Fernando Quintero", "Lucas Pratto", "Rafael Santos Borré"] },
      ],
    ],
    logros: [
      [
        { p: "¿Dónde se jugó la final de la Libertadores 2018 que River le ganó a Boca?", o: ["En Madrid", "En el Monumental", "En la Bombonera", "En Miami"] },
        { p: "¿Contra quién ganó River la final de la Libertadores 2015?", o: ["Tigres", "Atlético Nacional", "Independiente del Valle", "Grêmio"] },
      ],
      [
        { p: "¿Cuántas Copas Libertadores ganó River?", o: ["4", "2", "6", "3"] },
        { p: "¿Contra quién ganó River la final de la Libertadores 1996?", o: ["América de Cali", "Cruzeiro", "Peñarol", "Nacional"] },
      ],
      [
        { p: "¿A quién le ganó River la Intercontinental de 1986?", o: ["Steaua de Bucarest", "Juventus", "Porto", "Milan"] },
        { p: "¿Cuántas Intercontinentales ganó River?", o: ["1", "2", "3", "Ninguna"] },
      ],
      [
        { p: "¿Cómo se conoce al famoso equipo de River de los años 40?", o: ["La Máquina", "Los Carasucias", "El Ballet", "Los Matadores"] },
        { p: "¿Contra quién ganó River la Copa Sudamericana 2014?", o: ["Atlético Nacional", "Boca", "Estudiantes", "São Paulo"] },
      ],
      [
        { p: "¿A quién le ganó River la final de su primera Libertadores, en 1986?", o: ["América de Cali", "Peñarol", "Cobreloa", "Olimpia"] },
        { p: "¿Contra quién perdió River la final del Mundial de Clubes 2015?", o: ["Barcelona", "Real Madrid", "Bayern Múnich", "Liverpool"] },
      ],
    ],
    cancha: [
      [
        { p: "¿Cómo le dicen al estadio de River?", o: ["El Monumental", "La Bombonera", "El Gigante", "El Cilindro"] },
        { p: "¿Cuáles son los colores de River?", o: ["Blanco con banda roja", "Azul y oro", "Rojo y negro", "Celeste y blanco"] },
      ],
      [
        { p: "¿Cuál es el nombre oficial del Monumental?", o: ["Antonio Vespucio Liberti", "Alberto J. Armando", "José Amalfitani", "Pedro Bidegain"] },
        { p: "¿Qué ídolo de River de los 70 y 80 era apodado «el Beto»?", o: ["Norberto Alonso", "Daniel Passarella", "Alberto Tarantini", "Roberto Perfumo"] },
      ],
      [
        { p: "¿Qué final del mundo se jugó en el Monumental?", o: ["La del Mundial 1978", "La del Mundial 1986", "La del Mundial 1930", "La del Mundial 2014"] },
        { p: "¿Qué forma tiene la camiseta de River?", o: ["Blanca con una banda roja cruzada", "A rayas rojas y blancas", "Roja con vivos blancos", "Blanca con una V roja"] },
      ],
      [
        { p: "¿Cómo se llama la hinchada de River?", o: ["Los Borrachos del Tablón", "La 12", "La Guardia Imperial", "La Butteler"] },
        { p: "¿Cuántas personas entran, aproximadamente, en el Monumental después de la remodelación?", o: ["Unas 85.000", "Unas 50.000", "Unas 120.000", "Unas 30.000"] },
      ],
      [
        { p: "¿En qué año se inauguró el Monumental?", o: ["1938", "1940", "1923", "1951"] },
        { p: "¿Qué otro partido de un Mundial se jugó en el Monumental además de la final de 1978?", o: ["El partido inaugural de 1978", "La final de 1986", "La semifinal de 2014", "Ninguno"] },
      ],
    ],
  },
  {
    id: "central", nombre: "Rosario Central", corto: "Central", colores: ["#0d47a1", "#f5d10a"],
    historia: [
      [
        { p: "¿Cómo le dicen a Rosario Central?", o: ["El Canalla", "La Lepra", "El Pirata", "El Tatengue"] },
        { p: "¿En qué ciudad juega Rosario Central?", o: ["Rosario", "Santa Fe", "Córdoba", "Paraná"] },
      ],
      [
        { p: "¿Cuál es el clásico rival de Rosario Central?", o: ["Newell's", "Colón", "Unión", "Belgrano"] },
        { p: "¿De qué ferrocarril eran los trabajadores que fundaron Central?", o: ["El Ferrocarril Central Argentino", "El Ferrocarril Sud", "El Ferrocarril Oeste", "El Ferrocarril Andino"] },
      ],
      [
        { p: "¿Quiénes fundaron Rosario Central?", o: ["Trabajadores del ferrocarril", "Alumnos de un colegio inglés", "Inmigrantes italianos", "Obreros del puerto"] },
        { p: "¿Cómo se llama el partido entre Central y Newell's?", o: ["El clásico rosarino", "El clásico del litoral", "El clásico santafesino", "El superclásico del interior"] },
      ],
      [
        { p: "¿En qué año se fundó Rosario Central?", o: ["1889", "1903", "1910", "1895"] },
        { p: "¿Qué día se fundó Rosario Central?", o: ["El 24 de diciembre de 1889", "El 25 de mayo de 1905", "El 9 de julio de 1910", "El 1 de enero de 1900"] },
      ],
      [
        { p: "Según la historia, ¿por qué a los de Central les dicen «canallas»?", o: ["Se negaron a jugar un partido a beneficio de enfermos de lepra", "Por una pelea en un clásico", "Por un jugador apodado así", "Por un diario rosarino"] },
        { p: "¿Qué nombre tenía el club cuando lo fundaron?", o: ["Central Argentine Railway Athletic Club", "Rosario Football Club", "Club Atlético del Ferrocarril", "Rosario Athletic"] },
      ],
    ],
    idolos: [
      [
        { p: "¿Qué campeón del mundo 2022 volvió a Central en 2025?", o: ["Ángel Di María", "Lionel Messi", "Nicolás Otamendi", "Rodrigo De Paul"] },
        { p: "¿Qué rosarino, campeón del mundo 2022, hizo un gol en la final del Mundial?", o: ["Ángel Di María", "Lionel Messi", "Julián Álvarez", "Enzo Fernández"] },
      ],
      [
        { p: "¿Qué goleador del Mundial 1978 es ídolo de Central?", o: ["Mario Kempes", "Leopoldo Luque", "Daniel Bertoni", "René Houseman"] },
        { p: "¿Qué DT, ídolo de Central, ganó la Copa de la Liga 2023 y falleció en 2025?", o: ["Miguel Ángel Russo", "Ángel Tulio Zof", "Carlos Griguol", "Edgardo Bauza"] },
      ],
      [
        { p: "¿Qué delantero, ídolo reciente, es uno de los máximos goleadores de la historia de Central?", o: ["Marco Ruben", "Germán Herrera", "Emiliano Vecchio", "Gonzalo Castellani"] },
        { p: "¿Qué DT ganó con Central la Copa Conmebol 1995 y es el más ganador del club?", o: ["Ángel Tulio Zof", "Miguel Ángel Russo", "Edgardo Bauza", "Carlos Timoteo Griguol"] },
      ],
      [
        { p: "¿Qué DT dirigía a Central en 2025, cuando fue proclamado campeón de Liga?", o: ["Ariel Holan", "Miguel Ángel Russo", "Paulo Ferrari", "Cristian González"] },
        { p: "¿Qué defensor del Central campeón 1986-87 fue después DT de la Selección?", o: ["Edgardo Bauza", "Jorge Sampaoli", "Gerardo Martino", "Alejandro Sabella"] },
      ],
      [
        { p: "¿Quién hizo la famosa «palomita» a Newell's en la semifinal de 1971?", o: ["Aldo Pedro Poy", "Mario Kempes", "Carlos Aimar", "Roberto Gramajo"] },
        { p: "¿Qué volante, apodado «el Negro» Palma, es ídolo de Central de los 80?", o: ["Omar Palma", "Carlos Aimar", "Ariel Cozzoni", "Edgardo Bauza"] },
      ],
    ],
    logros: [
      [
        { p: "¿Qué copa internacional ganó Rosario Central en 1995?", o: ["La Copa Conmebol", "La Copa Libertadores", "La Supercopa", "La Copa Mercosur"] },
        { p: "¿Qué tienen en común 1971, 1973 y 1980 para Central?", o: ["Ganó el Nacional", "Descendió", "Ganó la Libertadores", "Ganó el clásico"] },
      ],
      [
        { p: "¿Qué título ganó Central en 2023 con Miguel Ángel Russo?", o: ["La Copa de la Liga", "La Copa Argentina", "El Torneo Apertura", "La Supercopa Argentina"] },
        { p: "¿Qué título ganó Central en 1986-87?", o: ["El campeonato de Primera", "La Copa Argentina", "La Libertadores", "La Supercopa"] },
      ],
      [
        { p: "¿Por qué fue proclamado campeón de Liga en 2025?", o: ["Por terminar primero en la tabla anual", "Por ganar el Clausura", "Por ganar la Copa Argentina", "Por ganar un desempate"] },
        { p: "¿Qué título ganó Central en 2018?", o: ["La Copa Argentina", "La Superliga", "La Sudamericana", "La Copa de la Liga"] },
      ],
      [
        { p: "¿A quién le ganó la final de la Copa Conmebol 1995, remontando un 0-4?", o: ["Atlético Mineiro", "Peñarol", "América de Cali", "Corinthians"] },
        { p: "¿A quién le ganó Central la final de la Copa Argentina 2018?", o: ["Gimnasia de La Plata", "Boca", "River", "Belgrano"] },
      ],
      [
        { p: "¿Qué torneo ganó Central en 1971, 1973 y 1980?", o: ["El Nacional", "El Metropolitano", "La Copa Argentina", "La Copa de Competencia"] },
        { p: "¿Qué tuvo de especial el título de 1986-87 de Central?", o: ["Lo ganó recién ascendido", "Lo ganó invicto", "Lo ganó con 10 jugadores", "Lo definió en Europa"] },
      ],
    ],
    cancha: [
      [
        { p: "¿Cuáles son los colores de Rosario Central?", o: ["Azul y amarillo", "Rojo y negro", "Azul y blanco", "Celeste y blanco"] },
        { p: "¿En qué barrio de Rosario está la cancha de Central?", o: ["Arroyito", "Fisherton", "Echesortu", "Pichincha"] },
      ],
      [
        { p: "¿Cómo le dicen a la cancha de Central?", o: ["El Gigante de Arroyito", "El Coloso del Parque", "El Cilindro", "El Palacio"] },
        { p: "¿Cuál es el nombre de la hinchada de Central?", o: ["Los Guerreros", "La Banda del Parque", "La Pandilla", "La 12"] },
      ],
      [
        { p: "¿Cuál es el nombre oficial del Gigante de Arroyito?", o: ["Dr. Lisandro de la Torre", "Marcelo Bielsa", "Jorge Newbery", "15 de Abril"] },
        { p: "¿Qué río está muy cerca del Gigante de Arroyito?", o: ["El Paraná", "El Uruguay", "El Salado", "El Carcarañá"] },
      ],
      [
        { p: "¿De qué Mundial fue sede el Gigante de Arroyito?", o: ["Del Mundial 1978", "Del Mundial 1930", "Del Mundial Sub-20 2001", "De ninguno"] },
        { p: "¿Quién fue Lisandro de la Torre, que da nombre al estadio?", o: ["Un político santafesino", "Un fundador del club", "Un goleador", "Un intendente de Rosario"] },
      ],
      [
        { p: "¿Contra quién ganó Central la final de la Copa de la Liga 2023?", o: ["Platense", "River", "Godoy Cruz", "Talleres"] },
        { p: "¿Cuántos espectadores entran, aproximadamente, en el Gigante de Arroyito?", o: ["Unos 41.000", "Unos 15.000", "Unos 80.000", "Unos 25.000"] },
      ],
    ],
  },
  {
    id: "san-lorenzo", nombre: "San Lorenzo", corto: "San Lorenzo", colores: ["#0d2b6b", "#c8102e"],
    historia: [
      [
        { p: "¿Cómo le dicen a San Lorenzo?", o: ["El Ciclón", "El Globo", "El Fortín", "El Bicho"] },
        { p: "¿Cuál es el clásico rival de San Lorenzo?", o: ["Huracán", "Vélez", "Boca", "Independiente"] },
      ],
      [
        { p: "¿En qué barrio porteño nació San Lorenzo?", o: ["Boedo", "Parque Patricios", "Flores", "Almagro"] },
        { p: "¿Cómo les dicen también a los de San Lorenzo, por su apodo de pájaro?", o: ["Cuervos", "Halcones", "Gaviotas", "Loros"] },
      ],
      [
        { p: "¿Qué sacerdote ayudó a fundar el club y le dio nombre?", o: ["El padre Lorenzo Massa", "El padre Carlos Mugica", "El padre Mario Pantaleo", "El cura Brochero"] },
        { p: "¿Qué supermercado se construyó donde estaba el Viejo Gasómetro?", o: ["Un Carrefour", "Un Coto", "Un Jumbo", "Un Disco"] },
      ],
      [
        { p: "¿En qué año se fundó San Lorenzo?", o: ["1908", "1901", "1913", "1920"] },
        { p: "¿En qué año se jugó el último partido en el Viejo Gasómetro?", o: ["1979", "1993", "1965", "1985"] },
      ],
      [
        { p: "¿Sobre qué avenida estaba el Viejo Gasómetro?", o: ["Av. La Plata", "Av. Boedo", "Av. Directorio", "Av. Rivadavia"] },
        { p: "¿Qué ley de 2012 permitió a San Lorenzo recuperar sus terrenos de Boedo?", o: ["La Ley de Restitución Histórica", "La Ley del Deporte", "La Ley de Clubes de Barrio", "La Ley Massa"] },
      ],
    ],
    idolos: [
      [
        { p: "¿Qué Papa argentino era socio e hincha de San Lorenzo?", o: ["Francisco", "Juan Pablo II", "Benedicto XVI", "León XIV"] },
        { p: "¿Qué ídolo de San Lorenzo, apodado «el Pipi», jugó en el club en varias etapas?", o: ["Leandro Romagnoli", "Néstor Ortigoza", "Pablo Michelini", "Alberto Acosta"] },
      ],
      [
        { p: "¿Quién convirtió el penal en la final de la Libertadores 2014?", o: ["Néstor Ortigoza", "Ángel Correa", "Leandro Romagnoli", "Martín Cauteruccio"] },
        { p: "¿Qué delantero, campeón de la Libertadores 2014, después jugó en el Atlético de Madrid?", o: ["Ángel Correa", "Martín Cauteruccio", "Mauro Matos", "Gonzalo Verón"] },
      ],
      [
        { p: "¿Qué DT ganó la Libertadores 2014 con San Lorenzo?", o: ["Edgardo Bauza", "Ramón Díaz", "Pablo Guede", "Diego Aguirre"] },
        { p: "¿Qué goleador de San Lorenzo, apodado «el Beto», fue figura en los 90?", o: ["Alberto Acosta", "José Sanfilippo", "Rinaldo Martino", "Héctor Scotta"] },
      ],
      [
        { p: "¿Quién es el máximo goleador de la historia de San Lorenzo?", o: ["José Sanfilippo", "Rinaldo Martino", "Héctor Scotta", "Alberto Acosta"] },
        { p: "¿Qué goleador hizo 60 goles en un año en 1975?", o: ["Héctor Scotta", "José Sanfilippo", "Alberto Acosta", "Rodolfo Fischer"] },
      ],
      [
        { p: "¿Qué DT, apodado «el Bambino», fue campeón del Clausura 1995?", o: ["Héctor Veira", "Alfio Basile", "Oscar Ruggeri", "Carlos Bianchi"] },
        { p: "¿Quién atajaba en el San Lorenzo campeón de la Libertadores 2014?", o: ["Sebastián Torrico", "Agustín Marchesín", "Augusto Batalla", "Nahuel Losada"] },
      ],
    ],
    logros: [
      [
        { p: "¿En qué año ganó San Lorenzo la Copa Libertadores?", o: ["2014", "2008", "2001", "1995"] },
        { p: "¿Cuántas Libertadores ganó San Lorenzo?", o: ["1", "2", "3", "Ninguna"] },
      ],
      [
        { p: "¿A quién le ganó la final de la Libertadores 2014?", o: ["Nacional de Paraguay", "Olimpia", "Atlético Nacional", "Grêmio"] },
        { p: "¿Contra quién perdió la final del Mundial de Clubes 2014?", o: ["Real Madrid", "Barcelona", "Bayern Múnich", "Chelsea"] },
      ],
      [
        { p: "¿Cómo se conoce al San Lorenzo campeón invicto del Metropolitano 1968?", o: ["Los Matadores", "La Máquina", "Los Carasucias", "El Ballet"] },
        { p: "¿Qué título ganó San Lorenzo en 1972 dos veces?", o: ["El Metropolitano y el Nacional", "La Libertadores y la Intercontinental", "Dos Copas Argentina", "Dos Supercopas"] },
      ],
      [
        { p: "¿Qué copa internacional ganó San Lorenzo en 2001?", o: ["La Copa Mercosur", "La Supercopa", "La Recopa", "La Copa Conmebol"] },
        { p: "¿En qué año descendió San Lorenzo?", o: ["1981", "1999", "2011", "Nunca descendió"] },
      ],
      [
        { p: "¿A quién le ganó San Lorenzo la final de la Copa Sudamericana 2002?", o: ["Atlético Nacional", "River", "Boca", "Universidad Católica"] },
        { p: "¿Qué torneo ganó San Lorenzo en 2013?", o: ["El Inicial 2013", "La Copa Argentina", "El Final 2013", "La Sudamericana"] },
      ],
    ],
    cancha: [
      [
        { p: "¿Cuáles son los colores de San Lorenzo?", o: ["Azul y rojo", "Blanco y rojo", "Rojo y negro", "Azul y amarillo"] },
        { p: "¿Cómo le dicen al viejo estadio de San Lorenzo?", o: ["El Viejo Gasómetro", "La Doble Visera", "El Fortín", "El Cilindro"] },
      ],
      [
        { p: "¿Cómo le dicen al estadio actual de San Lorenzo?", o: ["El Nuevo Gasómetro", "El Palacio", "El Fortín", "La Fortaleza"] },
        { p: "¿Quién fue Pedro Bidegain, que da nombre al estadio?", o: ["Un presidente del club", "Un goleador", "Un cura", "Un intendente"] },
      ],
      [
        { p: "¿Cuál es el nombre oficial del Nuevo Gasómetro?", o: ["Pedro Bidegain", "Tomás A. Ducó", "José Amalfitani", "Lorenzo Massa"] },
        { p: "¿Cómo se llama la hinchada de San Lorenzo?", o: ["La Gloriosa Butteler", "La Banda de la Quema", "La 12", "Los Borrachos del Tablón"] },
      ],
      [
        { p: "¿En qué zona de la Ciudad está el Nuevo Gasómetro?", o: ["Bajo Flores", "Boedo", "Parque Patricios", "Villa Lugano"] },
        { p: "¿Durante qué gobierno se perdió el Viejo Gasómetro?", o: ["La dictadura militar", "El gobierno de Alfonsín", "El de Perón", "El de Menem"] },
      ],
      [
        { p: "¿En qué año se inauguró el Nuevo Gasómetro?", o: ["1993", "1979", "2005", "1985"] },
        { p: "¿En qué año se inauguró el Viejo Gasómetro?", o: ["1916", "1940", "1903", "1958"] },
      ],
    ],
  },
  {
    id: "sarmiento", nombre: "Sarmiento de Junín", corto: "Sarmiento", colores: ["#0c7a3e", "#ffffff"],
    historia: [
      [
        { p: "¿De qué ciudad es Sarmiento?", o: ["Junín", "Pergamino", "Chivilcoy", "Olavarría"] },
        { p: "¿En qué provincia está Junín, la ciudad de Sarmiento?", o: ["Buenos Aires", "Córdoba", "Santa Fe", "La Pampa"] },
      ],
      [
        { p: "¿Cómo le dicen a Sarmiento?", o: ["El Verde", "El Granate", "El Halcón", "El Tiburón"] },
        { p: "¿En qué años jugó Sarmiento en Primera en su primera etapa?", o: ["1981 y 1982", "1970 y 1971", "1990 y 1991", "1960 y 1961"] },
      ],
      [
        { p: "¿A quién homenajea el nombre del club?", o: ["A Domingo Faustino Sarmiento", "A un fundador del club", "A una calle de Junín", "A un general de la Independencia"] },
        { p: "¿En qué año volvió Sarmiento a Primera con la reestructuración de 2014?", o: ["2014 (para jugar en 2015)", "2010", "2018", "2005"] },
      ],
      [
        { p: "¿En qué año se fundó Sarmiento?", o: ["1911", "1898", "1925", "1940"] },
        { p: "¿Con qué equipo perdió por penales la final del segundo ascenso en 2019?", o: ["Central Córdoba", "Arsenal", "Platense", "Atlanta"] },
      ],
      [
        { p: "¿En qué año logró Sarmiento su primer ascenso a Primera?", o: ["1980", "2014", "1965", "1999"] },
        { p: "¿Cuál fue la mayor derrota de Sarmiento ante River?", o: ["0-7 en 2022", "0-5 en 1981", "1-6 en 2015", "0-4 en 2023"] },
      ],
    ],
    idolos: [
      [
        { p: "¿Qué arquero y capitán atajó el penal decisivo en la final del ascenso de 2021?", o: ["Manuel Vicentini", "Jorge Carranza", "Ezequiel Unsain", "Sebastián Moyano"] },
        { p: "¿Qué capitán campeón del mundo en 1978 debutó como profesional en Sarmiento?", o: ["Daniel Passarella", "Ubaldo Fillol", "Mario Kempes", "Américo Gallego"] },
      ],
      [
        { p: "¿Quién hizo el gol de Sarmiento en esa final de 2021?", o: ["Claudio Pombo", "Bruno Sepúlveda", "Jonathan Torres", "Gabriel Hauche"] },
        { p: "¿Qué DT, ex técnico de Perú y de Vélez, tuvo su despegue como jugador en Sarmiento?", o: ["Ricardo Gareca", "Gustavo Alfaro", "Ricardo Zielinski", "Jorge Almirón"] },
      ],
      [
        { p: "¿Qué ex goleador, luego DT, dirigía a Sarmiento a comienzos de 2026?", o: ["Facundo Sava", "Iván Delfino", "Alfredo Berti", "Andrés Yllana"] },
        { p: "¿Qué goleador, campeón de la Libertadores 1986 con River, debutó en Sarmiento?", o: ["Juan Gilberto Funes", "Enzo Francescoli", "Antonio Alzamendi", "Ramón Díaz"] },
      ],
      [
        { p: "¿Qué otro apodo, por su antigüedad, tiene Sarmiento?", o: ["El Decano", "El Matador", "La Lepra", "El Fortín"] },
        { p: "¿Quién es el máximo goleador histórico de Sarmiento?", o: ["Ernesto Pelli", "Raúl «Toti» Iglesias", "Horacio Barrionuevo", "Juan Gilberto Funes"] },
      ],
      [
        { p: "¿Cuántas finales por el ascenso había perdido Sarmiento antes de ganar la de 2021?", o: ["Tres", "Ninguna", "Una", "Seis"] },
        { p: "¿Qué goleador del ascenso de 1980, apodado «Toti», es ídolo de Sarmiento?", o: ["Raúl Iglesias", "Horacio Barrionuevo", "Ernesto Pelli", "Oscar Más"] },
      ],
    ],
    logros: [
      [
        { p: "¿En qué año ascendió Sarmiento a la Primera actual?", o: ["2021", "2017", "2023", "2014"] },
        { p: "¿Qué torneo ganó Sarmiento en 1980 para subir a Primera?", o: ["La Primera B", "La Copa Argentina", "El Nacional", "El Federal A"] },
      ],
      [
        { p: "¿A quién le ganó la final por el ascenso de 2021?", o: ["Estudiantes de Río Cuarto", "Platense", "Tigre", "Barracas Central"] },
        { p: "¿Qué ídolo de Racing hizo un golazo para Sarmiento en 2022?", o: ["Lisandro López", "Diego Milito", "Gustavo Bou", "Lautaro Martínez"] },
      ],
      [
        { p: "¿Cómo se definió esa final?", o: ["1-1 y 4-3 en los penales", "Ganó 2-0", "0-0 y 5-4 en los penales", "Ganó 1-0 en el alargue"] },
        { p: "¿Qué goleador de River jugó en Sarmiento en 1982?", o: ["Oscar «Pinino» Más", "Norberto Alonso", "Ramón Díaz", "Leopoldo Luque"] },
      ],
      [
        { p: "¿Qué número de ascenso a Primera fue el de 2021 para Sarmiento?", o: ["El tercero", "El primero", "El segundo", "El quinto"] },
        { p: "¿En qué temporadas jugó Sarmiento en Primera tras el ascenso de 2014?", o: ["2015, 2016 y 2016-17", "Solo 2015", "Desde 2015 hasta hoy sin cortes", "2018 y 2019"] },
      ],
      [
        { p: "¿Qué título ganó Sarmiento por primera vez con ese ascenso de 2021?", o: ["La Primera Nacional", "La Copa Argentina", "La Primera B Metropolitana", "El Federal A"] },
        { p: "¿Cuántos goles hizo Ernesto Pelli, máximo goleador de Sarmiento?", o: ["128", "50", "200", "88"] },
      ],
    ],
    cancha: [
      [
        { p: "¿Cuáles son los colores de Sarmiento?", o: ["Verde y blanco", "Rojo y blanco", "Azul y amarillo", "Negro y blanco"] },
        { p: "¿A quién homenajea el nombre del estadio de Sarmiento?", o: ["A Eva Perón", "A Domingo Sarmiento", "A Juan Perón", "A un fundador del club"] },
      ],
      [
        { p: "¿Cómo se llama el estadio de Sarmiento?", o: ["Eva Perón", "Presidente Perón", "Florencio Sola", "Ciudad de Junín"] },
        { p: "¿De dónde salió el dinero para construir el estadio Eva Perón?", o: ["De un subsidio del Estado", "De la venta de un jugador", "De una rifa", "De un préstamo de la AFA"] },
      ],
      [
        { p: "¿En qué año se inauguró el estadio Eva Perón?", o: ["1951", "1978", "1930", "2000"] },
        { p: "¿Qué ídolo de Sarmiento, apodado «Taqueta», falleció en 2026?", o: ["Horacio Barrionuevo", "Raúl Iglesias", "Ernesto Pelli", "Daniel Passarella"] },
      ],
      [
        { p: "¿Cuál es, aproximadamente, la capacidad del estadio de Sarmiento?", o: ["Unos 22.000", "Unos 5.000", "Unos 50.000", "Unos 70.000"] },
        { p: "¿En qué zona de la provincia de Buenos Aires está Junín?", o: ["En el noroeste", "En la costa atlántica", "En el sur", "En el conurbano"] },
      ],
      [
        { p: "¿En qué estadio se jugó la final del ascenso de 2021?", o: ["El de Unión, en Santa Fe", "El Kempes", "El de Lanús", "El Eva Perón"] },
        { p: "¿Cuántos goles hizo «Taqueta» Barrionuevo en Sarmiento, aproximadamente?", o: ["88", "20", "150", "300"] },
      ],
    ],
  },
  {
    id: "talleres", nombre: "Talleres", corto: "Talleres", colores: ["#0d2b6b", "#ffffff"],
    historia: [
      [
        { p: "¿Cómo le dicen a Talleres de Córdoba?", o: ["La T", "El Pirata", "La Gloria", "El Ferroviario"] },
        { p: "¿En qué ciudad juega Talleres?", o: ["Córdoba", "Rosario", "Mendoza", "Río Cuarto"] },
      ],
      [
        { p: "¿Cuál es el clásico rival de Talleres?", o: ["Belgrano", "Instituto", "Racing de Córdoba", "Estudiantes de Río Cuarto"] },
        { p: "¿Cómo le dicen también a Talleres?", o: ["El Matador", "El Pirata", "La Gloria", "El Lobo"] },
      ],
      [
        { p: "¿De dónde viene el nombre «Talleres»?", o: ["De los talleres del ferrocarril", "De una fábrica de autos", "De un taller de costura", "De una escuela técnica"] },
        { p: "¿Cómo se llama el clásico entre Talleres y Belgrano?", o: ["El clásico cordobés", "El clásico del interior", "El clásico de la Docta", "El superclásico cordobés"] },
      ],
      [
        { p: "¿En qué año se fundó Talleres?", o: ["1913", "1905", "1918", "1925"] },
        { p: "¿Qué es «La Boutique»?", o: ["La cancha propia de Talleres", "Un shopping de Córdoba", "La sede social de Belgrano", "Un museo"] },
      ],
      [
        { p: "En la final del Nacional 1977, ¿con cuántos jugadores empató Independiente en Córdoba?", o: ["8", "10", "9", "7"] },
        { p: "¿Quién vino a jugar a Talleres con su padre, Atilio, de niño?", o: ["Daniel Willington", "Mario Kempes", "Luis Galván", "Javier Pastore"] },
      ],
    ],
    idolos: [
      [
        { p: "¿Qué volante, después figura en el PSG, debutó en Talleres?", o: ["Javier Pastore", "Paulo Dybala", "Ángel Di María", "Giovani Lo Celso"] },
        { p: "¿Quién es el máximo goleador histórico de Talleres?", o: ["Miguel «la Wanora» Romero", "Daniel Willington", "Javier Pastore", "Luis Galván"] },
      ],
      [
        { p: "¿Qué defensor de Talleres fue titular en la Argentina campeona del mundo en 1978?", o: ["Luis Galván", "Daniel Passarella", "Alberto Tarantini", "Jorge Olguín"] },
        { p: "¿Qué gol de Willington fue elegido el mejor de la historia de Talleres?", o: ["Un tiro libre a Belgrano", "Una chilena a Boca", "Un gol olímpico a River", "Un gol de mitad de cancha a Instituto"] },
      ],
      [
        { p: "¿Qué gran mediocampista de los 70 es uno de los máximos ídolos de Talleres?", o: ["Daniel Willington", "Ricardo Bochini", "Norberto Alonso", "Carlos Babington"] },
        { p: "¿Qué tribuna del Kempes lleva el nombre de Willington?", o: ["La norte", "La sur", "La platea", "Ninguna"] },
      ],
      [
        { p: "¿Qué DT llevó a Talleres a ganar la Copa Conmebol 1999?", o: ["Ricardo Gareca", "Alexander Medina", "Frank Kudelka", "Juan Pablo Vojvoda"] },
        { p: "¿Con qué club fue Willington campeón del Nacional 1968?", o: ["Vélez", "Talleres", "River", "Huracán"] },
      ],
      [
        { p: "Además de Galván, ¿qué jugadores de Talleres estaban en el plantel campeón de 1978?", o: ["José Daniel Valencia y Miguel Oviedo", "Mario Kempes y Osvaldo Ardiles", "René Houseman y Leopoldo Luque", "Ubaldo Fillol y Héctor Baley"] },
        { p: "¿Quién dijo que Willington era «el mejor jugador del mundo» tras un partido en 1969?", o: ["Pelé", "Di Stéfano", "Cruyff", "Beckenbauer"] },
      ],
    ],
    logros: [
      [
        { p: "¿Qué copa internacional ganó Talleres en 1999?", o: ["La Copa Conmebol", "La Copa Sudamericana", "La Copa Libertadores", "La Copa Mercosur"] },
        { p: "¿Cuántas copas internacionales ganó Talleres?", o: ["Una", "Dos", "Ninguna", "Tres"] },
      ],
      [
        { p: "¿A qué club brasileño le ganó la final de la Copa Conmebol 1999?", o: ["CSA", "Vasco da Gama", "Atlético Mineiro", "São Paulo"] },
        { p: "¿En qué año jugó Talleres la final del Nacional ante Independiente?", o: ["1977", "1985", "1969", "1999"] },
      ],
      [
        { p: "¿Contra quién perdió Talleres la final del Nacional 1977?", o: ["Independiente", "River", "Boca", "Estudiantes"] },
        { p: "¿Quién hizo el gol del empate de Independiente en aquella final de 1977?", o: ["Ricardo Bochini", "Daniel Bertoni", "Ricardo Pavoni", "Jorge Burruchaga"] },
      ],
      [
        { p: "¿Detrás de qué equipo fue subcampeón de la Liga Profesional 2024?", o: ["Vélez", "River", "Huracán", "Racing"] },
        { p: "¿Qué ganó Talleres en 1998 con Gareca?", o: ["El ascenso a Primera (B Nacional)", "La Copa Argentina", "La Libertadores", "El Apertura"] },
      ],
      [
        { p: "¿Contra quién perdió Talleres la final de la Copa Argentina 2022?", o: ["Patronato", "Boca", "River", "Defensa y Justicia"] },
        { p: "¿Cuántos títulos locales ganó Willington con Talleres?", o: ["17", "1", "5", "40"] },
      ],
    ],
    cancha: [
      [
        { p: "¿Cuáles son los colores de Talleres?", o: ["Azul y blanco", "Celeste y blanco", "Rojo y blanco", "Verde y blanco"] },
        { p: "¿Qué estadio cordobés lleva el nombre del goleador del Mundial 78?", o: ["El Mario Alberto Kempes", "El Gigante de Alberdi", "La Boutique", "El Juan Domingo Perón"] },
      ],
      [
        { p: "¿En qué estadio juega Talleres la mayoría de sus partidos de local?", o: ["El Mario Alberto Kempes", "El Gigante de Alberdi", "El Juan Domingo Perón", "El Antonio Candini"] },
        { p: "¿Cómo se llamaba el estadio Kempes antes?", o: ["Estadio Chateau Carreras", "Estadio Córdoba Central", "Estadio Olímpico", "Estadio del Bicentenario"] },
      ],
      [
        { p: "¿Cómo le dicen a la cancha propia de Talleres?", o: ["La Boutique", "El Gigante de Alberdi", "El Monumental de Alta Córdoba", "El Bosque"] },
        { p: "¿Para qué torneo se construyó el estadio Kempes?", o: ["El Mundial 1978", "La Copa América 1987", "El Mundial Sub-20 2001", "Los Juegos Panamericanos"] },
      ],
      [
        { p: "¿En qué barrio de Córdoba está la Boutique?", o: ["Barrio Jardín", "Alberdi", "Alta Córdoba", "Barrio General Paz"] },
        { p: "¿Cuál es el nombre oficial de la Boutique?", o: ["Estadio Francisco Cabasés", "Estadio Julio Villagra", "Estadio Ciudad de Córdoba", "Estadio La Fiel"] },
      ],
      [
        { p: "¿Cómo se llama la hinchada de Talleres?", o: ["La Fiel", "La Inimitable", "La Banda del Parque", "Los Piratas"] },
        { p: "¿Qué otro club cordobés hace de local en el Kempes en los partidos grandes?", o: ["Belgrano", "Instituto", "Racing de Córdoba", "Estudiantes de Río Cuarto"] },
      ],
    ],
  },
  {
    id: "tigre", nombre: "Tigre", corto: "Tigre", colores: ["#0d2b6b", "#c8102e"],
    historia: [
      [
        { p: "¿Cómo le dicen a Tigre?", o: ["El Matador", "El Calamar", "El Halcón", "El Tiburón"] },
        { p: "¿En qué provincia está Tigre?", o: ["Buenos Aires", "Entre Ríos", "Santa Fe", "Córdoba"] },
      ],
      [
        { p: "¿Cuál es el clásico rival de Tigre?", o: ["Platense", "Chacarita", "Defensores de Belgrano", "San Fernando"] },
        { p: "¿Qué goleador, después ídolo de River, jugó en Tigre en 1931?", o: ["Bernabé Ferreyra", "Ángel Labruna", "Adolfo Pedernera", "Carlos Peucelle"] },
      ],
      [
        { p: "La cancha de Tigre no está en la ciudad de Tigre. ¿En qué localidad está?", o: ["Victoria", "Don Torcuato", "Pacheco", "Beccar"] },
        { p: "¿Cómo le decían a Bernabé Ferreyra?", o: ["La Fiera", "El Matador", "El Tanque", "El Charro"] },
      ],
      [
        { p: "¿En qué año se fundó Tigre?", o: ["1902", "1915", "1931", "1896"] },
        { p: "¿Quién es el máximo goleador histórico de Tigre?", o: ["Juan Andrés Marvezzi", "Bernabé Ferreyra", "Carlos Luna", "Federico González"] },
      ],
      [
        { p: "¿Qué rareza tuvo el título de Tigre en la Copa de la Superliga 2019?", o: ["Salió campeón ya descendido", "Lo ganó sin perder un partido", "Jugó todo de visitante", "Lo ganó con un arquero de delantero"] },
        { p: "¿Cuál fue la peor derrota de Tigre en Primera, en 1942?", o: ["1-11 ante Boca", "0-7 ante River", "0-9 ante Racing", "1-8 ante Independiente"] },
      ],
    ],
    idolos: [
      [
        { p: "¿Qué DT llevó a Tigre a ganar la Copa de la Superliga 2019?", o: ["Néstor Gorosito", "Diego Cagna", "Ricardo Caruso Lombardi", "Diego Martínez"] },
        { p: "¿Cuántos goles hizo Bernabé Ferreyra en su debut profesional con Tigre?", o: ["4", "1", "2", "6"] },
      ],
      [
        { p: "¿Qué goleador, apodado «el Chino», es ídolo de Tigre?", o: ["Carlos Luna", "Federico Insúa", "Lucas Janson", "Mateo Retegui"] },
        { p: "¿Cuántos goles hizo Juan Andrés Marvezzi en Tigre?", o: ["116", "50", "200", "86"] },
      ],
      [
        { p: "¿Qué DT llevó a Tigre a Primera en 2007 y al subcampeonato del Apertura 2007?", o: ["Diego Cagna", "Néstor Gorosito", "Ricardo Caruso Lombardi", "Gustavo Alfaro"] },
        { p: "¿Qué club le compró Bernabé Ferreyra a Tigre en 1932?", o: ["River", "Boca", "Racing", "Independiente"] },
      ],
      [
        { p: "¿Qué DT dirigía a Tigre en la final de la Copa Sudamericana 2012?", o: ["Néstor Gorosito", "Diego Cagna", "Rodolfo Arruabarrena", "Gustavo Alfaro"] },
        { p: "¿A quién le ganó Tigre 4-0, su mejor triunfo internacional, en la Sudamericana 2012?", o: ["Deportivo Quito", "Millonarios", "Universidad de Chile", "Cerro Porteño"] },
      ],
      [
        { p: "¿Qué político, ex intendente de Tigre, es un conocido hincha del club?", o: ["Sergio Massa", "Mauricio Macri", "Axel Kicillof", "Horacio Rodríguez Larreta"] },
        { p: "¿Cuál fue la mayor goleada de Tigre en Primera, en 1929?", o: ["7-1 a Platense", "8-0 a Chacarita", "6-0 a Boca", "9-2 a Huracán"] },
      ],
    ],
    logros: [
      [
        { p: "¿Qué torneo ganó Tigre en 2019, su primer título de Primera?", o: ["La Copa de la Superliga", "La Superliga", "La Copa Argentina", "La Supercopa Argentina"] },
        { p: "¿Cuántos títulos de Primera tiene Tigre?", o: ["Uno", "Tres", "Ninguno", "Dos"] },
      ],
      [
        { p: "¿A quién le ganó la final de la Copa de la Superliga 2019?", o: ["Boca", "River", "Racing", "Vélez"] },
        { p: "¿Qué copa jugó Tigre en 2020 gracias al título de 2019?", o: ["La Libertadores", "La Sudamericana", "La Recopa", "La Supercopa"] },
      ],
      [
        { p: "¿Cómo terminó esa final contra Boca?", o: ["2-0 para Tigre", "1-0 para Tigre", "1-1 y ganó por penales", "3-1 para Tigre"] },
        { p: "¿De qué torneo fue subcampeón Tigre en 2007?", o: ["El Apertura 2007", "La Copa Argentina", "La Sudamericana", "El Clausura 2007"] },
      ],
      [
        { p: "¿Contra quién jugó Tigre la final de la Copa Sudamericana 2012?", o: ["São Paulo", "Universidad de Chile", "Millonarios", "LDU Quito"] },
        { p: "¿En qué año ascendió Tigre a Primera con Diego Cagna?", o: ["2007", "2001", "2012", "2019"] },
      ],
      [
        { p: "¿Qué pasó en el segundo tiempo de aquella final en Brasil?", o: ["Tigre no salió a jugar tras incidentes en el vestuario", "Se suspendió por lluvia", "Tigre lo dio vuelta", "Se cortó la luz del estadio"] },
        { p: "¿Contra quién perdió Tigre el Trofeo de Campeones 2019?", o: ["Racing", "Boca", "River", "Estudiantes"] },
      ],
    ],
    cancha: [
      [
        { p: "¿Cuáles son los colores de Tigre?", o: ["Azul y rojo", "Rojo y negro", "Verde y blanco", "Marrón y blanco"] },
        { p: "¿Qué partido bonaerense lleva el mismo nombre que el club?", o: ["Tigre", "San Fernando", "Escobar", "San Isidro"] },
      ],
      [
        { p: "¿Cómo se llama el estadio de Tigre?", o: ["José Dellagiovanna", "Ciudad de Vicente López", "Norberto Tomaghello", "Florencio Sola"] },
        { p: "¿Qué gran zona turística de islas está cerca de Tigre?", o: ["El Delta del Paraná", "Los Esteros del Iberá", "La Península Valdés", "Las Cataratas"] },
      ],
      [
        { p: "¿Cómo se conoce al clásico entre Tigre y Platense?", o: ["El clásico de zona norte", "El clásico del oeste", "El clásico del Delta", "El superclásico chico"] },
        { p: "¿Quién fue José Dellagiovanna, que da nombre al estadio?", o: ["Un presidente del club", "Un goleador", "Un intendente de Tigre", "Un arquero"] },
      ],
      [
        { p: "¿A qué partido bonaerense pertenece Victoria, donde está la cancha de Tigre?", o: ["San Fernando", "Tigre", "San Isidro", "Escobar"] },
        { p: "¿Contra quién debutó Bernabé Ferreyra con cuatro goles en 1931?", o: ["Quilmes", "Boca", "Platense", "Huracán"] },
      ],
      [
        { p: "¿Cómo es la camiseta clásica de Tigre?", o: ["Azul con una franja horizontal roja", "A rayas verticales azules y rojas", "Roja con vivos azules", "Azul con una V roja"] },
        { p: "¿Qué municipio, distinto al de Tigre, alberga su cancha?", o: ["San Fernando", "Escobar", "Pilar", "Vicente López"] },
      ],
    ],
  },
  {
    id: "union", nombre: "Unión de Santa Fe", corto: "Unión", colores: ["#d81e1e", "#ffffff"],
    historia: [
      [
        { p: "¿Cómo le dicen a Unión de Santa Fe?", o: ["El Tatengue", "El Sabalero", "El Canalla", "El Decano"] },
        { p: "¿En qué provincia está Unión?", o: ["Santa Fe", "Entre Ríos", "Córdoba", "Buenos Aires"] },
      ],
      [
        { p: "¿De qué ciudad es Unión?", o: ["Santa Fe", "Rosario", "Paraná", "Rafaela"] },
        { p: "¿De qué club se fueron los jóvenes que fundaron Unión en 1907?", o: ["Del Santa Fe Football Club", "De Colón", "De Rosario Central", "De Newell's"] },
      ],
      [
        { p: "¿Cuál es el clásico rival de Unión?", o: ["Colón", "Newell's", "Rosario Central", "Atlético de Rafaela"] },
        { p: "¿En qué año logró Unión su primer ascenso a Primera?", o: ["1966", "1950", "1979", "1989"] },
      ],
      [
        { p: "¿Cómo le dicen a Colón, el clásico rival de Unión?", o: ["El Sabalero", "El Tatengue", "La Crema", "El Lobo"] },
        { p: "¿Qué DT uruguayo dirigió aquel primer ascenso de 1966?", o: ["Washington Etchamendi", "Reynaldo Volken", "Óscar Tabárez", "Juan Carlos Lorenzo"] },
      ],
      [
        { p: "¿En qué año se fundó Unión?", o: ["1907", "1889", "1925", "1913"] },
        { p: "¿Contra quién ganó Unión la final del ascenso de 1989?", o: ["Colón", "Quilmes", "Banfield", "Belgrano"] },
      ],
    ],
    idolos: [
      [
        { p: "¿Qué delantero, goleador en el Mundial 1978, surgió de Unión?", o: ["Leopoldo Luque", "Mario Kempes", "Daniel Bertoni", "Oscar Ortiz"] },
        { p: "¿Quién es el máximo goleador de Unión según el club?", o: ["Fernando «Turco» Alí", "Leopoldo Luque", "Nery Pumpido", "Kily González"] },
      ],
      [
        { p: "¿Qué arquero campeón del mundo en 1986 surgió de Unión?", o: ["Nery Pumpido", "Sergio Goycochea", "Ubaldo Fillol", "Luis Islas"] },
        { p: "¿Qué DT llevó a Unión al subcampeonato del Nacional 1979?", o: ["Reynaldo Volken", "Leonardo Madelón", "Frank Kudelka", "Washington Etchamendi"] },
      ],
      [
        { p: "¿En qué Mundial fue campeón Nery Pumpido?", o: ["México 1986", "Argentina 1978", "Italia 1990", "Alemania 1974"] },
        { p: "¿Qué hizo Fernando «Turco» Alí después del fútbol?", o: ["Fue concejal en Santa Fe", "Fue árbitro", "Fue presidente de la AFA", "Fue periodista"] },
      ],
      [
        { p: "¿A qué club español fue Pumpido después de su paso por River?", o: ["Real Betis", "Sevilla", "Valencia", "Real Madrid"] },
        { p: "¿Quién hizo el primer gol de la historia de Unión, en 1907?", o: ["Belisario Osuna", "Leopoldo Luque", "Fernando Alí", "Nery Pumpido"] },
      ],
      [
        { p: "¿Qué DT dirigió a Unión durante varias temporadas desde su ascenso de 2014?", o: ["Leonardo Madelón", "Frank Kudelka", "Gustavo Munúa", "Cristian González"] },
        { p: "¿Contra qué club fue el primer gol de la historia de Unión?", o: ["Rosario Central", "Colón", "Newell's", "Santa Fe FC"] },
      ],
    ],
    logros: [
      [
        { p: "¿Cuántos títulos de liga de Primera ganó Unión?", o: ["Ninguno", "Uno", "Dos", "Tres"] },
        { p: "¿Cuál es la mejor campaña de Unión en Primera?", o: ["El subcampeonato del Nacional 1979", "El título de 1985", "La Libertadores 1990", "El Apertura 2010"] },
      ],
      [
        { p: "¿Qué final jugó Unión en 1979?", o: ["La del Nacional", "La de la Libertadores", "La de la Copa Argentina", "La del Metropolitano"] },
        { p: "¿A quién le ganó Unión la final del ascenso de 1966?", o: ["Talleres de Remedios de Escalada", "Colón", "Quilmes", "Banfield"] },
      ],
      [
        { p: "¿Contra quién perdió Unión la final del Nacional 1979?", o: ["River", "Boca", "Vélez", "Talleres"] },
        { p: "¿Por cuánto ganó Unión aquella final de 1966?", o: ["3-0", "1-0", "2-1", "4-2"] },
      ],
      [
        { p: "¿En qué año volvió Unión a Primera para quedarse más de una década?", o: ["2014", "2005", "2021", "1999"] },
        { p: "¿En qué año tuvo Unión una gran campaña, previa al subcampeonato?", o: ["1978", "1966", "1989", "1999"] },
      ],
      [
        { p: "¿Qué final del ascenso de enero de 2021 se jugó en la cancha de Unión?", o: ["Sarmiento - Estudiantes de Río Cuarto", "Barracas - Quilmes", "Tigre - Platense", "Riestra - Maipú"] },
        { p: "¿Qué título ganó Colón, el rival de Unión, en 2021?", o: ["La Copa de la Liga", "La Copa Argentina", "La Sudamericana", "La Supercopa"] },
      ],
    ],
    cancha: [
      [
        { p: "¿Cuáles son los colores de Unión?", o: ["Rojo y blanco", "Rojo y negro", "Azul y blanco", "Verde y blanco"] },
        { p: "¿Cómo se llama el clásico entre Unión y Colón?", o: ["El clásico santafesino", "El clásico rosarino", "El clásico del litoral", "El superclásico"] },
      ],
      [
        { p: "¿Cómo es la camiseta clásica de Unión?", o: ["A rayas verticales rojas y blancas", "Roja con una banda blanca", "Blanca con una V roja", "Toda roja"] },
        { p: "¿Cómo se llama el estadio de Colón, el rival?", o: ["Brigadier López", "15 de Abril", "Eva Perón", "Gigante de Arroyito"] },
      ],
      [
        { p: "¿Cómo se llama el estadio de Unión?", o: ["15 de Abril", "Brigadier López", "Eva Perón", "Presidente Perón"] },
        { p: "¿Qué fecha recuerda el nombre del estadio de Unión?", o: ["La fundación del club, en 1907", "Un título", "Un ascenso", "La fundación de Santa Fe"] },
      ],
      [
        { p: "¿Por qué el estadio de Unión se llama «15 de Abril»?", o: ["Es la fecha de fundación del club", "Es el día de un título", "Es la fecha de un clásico histórico", "Es el día de Santa Fe"] },
        { p: "¿Qué final de 2024 tuvo como sede el estadio de Unión?", o: ["Copa Argentina: Central Córdoba - Vélez", "Libertadores: Botafogo - Atlético Mineiro", "Liga Profesional: Vélez - Talleres", "Supercopa: River - Estudiantes"] },
      ],
      [
        { p: "¿Qué final de 2024 se jugó en la cancha de Unión?", o: ["La de la Copa Argentina", "La de la Copa de la Liga", "La de la Sudamericana", "La del Trofeo de Campeones"] },
        { p: "¿Qué famoso puente es símbolo de la ciudad de Unión?", o: ["El Puente Colgante", "El Puente de la Mujer", "El Puente Rosario-Victoria", "El Puente Pueyrredón"] },
      ],
    ],
  },
  {
    id: "velez", nombre: "Vélez Sarsfield", corto: "Vélez", colores: ["#ffffff", "#0d47a1"],
    historia: [
      [
        { p: "¿Cómo le dicen a Vélez Sarsfield?", o: ["El Fortín", "El Globo", "El Ciclón", "El Bicho"] },
        { p: "¿Cuál es el color principal de la camiseta de Vélez?", o: ["Blanco", "Azul", "Rojo", "Verde"] },
      ],
      [
        { p: "¿En qué barrio porteño está Vélez?", o: ["Liniers", "Floresta", "Villa Luro", "Mataderos"] },
        { p: "¿En qué año ganó Vélez su primer título de Primera?", o: ["1968", "1994", "1985", "1979"] },
      ],
      [
        { p: "¿A quién homenajea el nombre Vélez Sarsfield?", o: ["A Dalmacio Vélez Sarsfield, autor del Código Civil", "A un general de la Independencia", "A un jugador irlandés", "A un presidente argentino"] },
        { p: "¿Qué torneo ganó Vélez en 1968, su primer título?", o: ["El Nacional", "El Metropolitano", "La Libertadores", "La Copa Argentina"] },
      ],
      [
        { p: "¿En qué año se fundó Vélez?", o: ["1910", "1901", "1922", "1905"] },
        { p: "¿Qué DT llevó a Vélez al Clausura 1993, su primer título en 25 años?", o: ["Carlos Bianchi", "Ricardo Gareca", "Osvaldo Piazza", "Marcelo Bielsa"] },
      ],
      [
        { p: "Los fundadores se reunieron en una estación de tren que se llamaba Vélez Sarsfield. ¿Cómo se llama hoy?", o: ["Floresta", "Liniers", "Flores", "Villa Luro"] },
        { p: "¿Qué jugador de Vélez fue clave en el título de 1968 y después ídolo de Talleres?", o: ["Daniel Willington", "Carlos Bianchi", "José Luis Chilavert", "Omar Asad"] },
      ],
    ],
    idolos: [
      [
        { p: "¿Qué arquero paraguayo, goleador de tiros libres y penales, es ídolo de Vélez?", o: ["José Luis Chilavert", "Justo Villar", "Antony Silva", "Carlos Gamarra"] },
        { p: "¿Qué goleador, después DT campeón del mundo, es el máximo artillero de Vélez?", o: ["Carlos Bianchi", "Ricardo Gareca", "Omar Asad", "Mauro Zárate"] },
      ],
      [
        { p: "¿Qué DT llevó a Vélez a ganar la Libertadores y la Intercontinental en 1994?", o: ["Carlos Bianchi", "Marcelo Bielsa", "Ricardo Gareca", "Osvaldo Piazza"] },
        { p: "¿Qué arquero paraguayo hizo goles de tiro libre y de penal en Vélez?", o: ["José Luis Chilavert", "Justo Villar", "Roberto Fernández", "Aldo Bobadilla"] },
      ],
      [
        { p: "¿Qué DT ganó varios títulos con Vélez entre 2009 y 2013?", o: ["Ricardo Gareca", "Miguel Russo", "Hugo Tocalli", "Gustavo Quinteros"] },
        { p: "¿Qué delantero de Vélez, apodado «el Turco», fue clave en 1994?", o: ["Omar Asad", "Ricardo Gareca", "Mauro Zárate", "Patricio Camps"] },
      ],
      [
        { p: "¿Quién hizo un gol en la final Intercontinental de 1994 ante el Milan?", o: ["Omar Asad", "José Luis Chilavert", "Roberto Trotta", "Christian Bassedas"] },
        { p: "¿Qué ex goleador de Vélez, apodado «el Tigre», fue DT campeón con el club?", o: ["Ricardo Gareca", "Carlos Bianchi", "Omar Asad", "Raúl Cardozo"] },
      ],
      [
        { p: "¿Qué DT llevó a Vélez al título de la Liga Profesional 2024?", o: ["Gustavo Quinteros", "Sebastián Méndez", "Alexander Medina", "Guillermo Barros Schelotto"] },
        { p: "¿Qué volante hizo el gol del título de Vélez en el Clausura 2009?", o: ["Maximiliano Moralez", "Maximiliano Rodríguez", "Maximiliano Meza", "Maximiliano Romero"] },
      ],
    ],
    logros: [
      [
        { p: "¿En qué año ganó Vélez la Copa Libertadores?", o: ["1994", "2011", "1986", "2000"] },
        { p: "¿Cuántas Copas Libertadores ganó Vélez?", o: ["1", "2", "3", "Ninguna"] },
      ],
      [
        { p: "¿A quién le ganó Vélez la Intercontinental de 1994?", o: ["Milan", "Juventus", "Ajax", "Real Madrid"] },
        { p: "¿A quién le ganó Vélez la final del Clausura 2009?", o: ["Huracán", "Lanús", "Banfield", "Boca"] },
      ],
      [
        { p: "¿A quién le ganó la final de la Libertadores 1994, por penales?", o: ["São Paulo", "Palmeiras", "Cruzeiro", "Peñarol"] },
        { p: "¿Contra quién perdió Vélez la final de la Copa Argentina 2024?", o: ["Central Córdoba", "River", "Talleres", "Independiente Rivadavia"] },
      ],
      [
        { p: "¿Qué torneo ganó Vélez en 2024?", o: ["La Liga Profesional", "La Copa de la Liga", "La Copa Argentina", "La Supercopa Argentina"] },
        { p: "¿Qué copa ganó Vélez en 1997?", o: ["La Recopa Sudamericana", "La Libertadores", "La Sudamericana", "La Copa Conmebol"] },
      ],
      [
        { p: "¿Qué copa internacional ganó Vélez en 1996, ante Cruzeiro?", o: ["La Supercopa Sudamericana", "La Recopa", "La Copa Conmebol", "La Copa Mercosur"] },
        { p: "¿Contra quién perdió Vélez la final de la Copa de la Liga 2024?", o: ["Estudiantes", "River", "Boca", "Talleres"] },
      ],
    ],
    cancha: [
      [
        { p: "¿Cómo es la camiseta clásica de Vélez?", o: ["Blanca con una V azul", "Azul con una franja blanca", "A rayas azules y blancas", "Toda azul"] },
        { p: "¿En qué barrio está el estadio de Vélez?", o: ["Liniers", "Floresta", "Mataderos", "Villa Luro"] },
      ],
      [
        { p: "¿Cómo se llama el estadio de Vélez?", o: ["José Amalfitani", "Pedro Bidegain", "Tomás A. Ducó", "Diego Armando Maradona"] },
        { p: "¿Cómo le dicen al estadio de Vélez?", o: ["El Fortín de Liniers", "El Palacio", "El Cilindro", "La Fortaleza"] },
      ],
      [
        { p: "¿Quién fue José Amalfitani?", o: ["Un histórico presidente del club", "Un goleador de los años 30", "El arquitecto del estadio", "Un intendente porteño"] },
        { p: "¿Qué selección de rugby jugó muchas veces en el estadio de Vélez?", o: ["Los Pumas", "Los All Blacks", "Los Teros", "Los Springboks"] },
      ],
      [
        { p: "¿De qué Mundial fue sede el estadio de Vélez?", o: ["Del Mundial 1978", "Del Mundial 1930", "Del Mundial 1986", "De ninguno"] },
        { p: "¿Cuántos espectadores entran, aproximadamente, en el Amalfitani?", o: ["Unos 45.000", "Unos 15.000", "Unos 80.000", "Unos 25.000"] },
      ],
      [
        { p: "¿Cómo se llama la hinchada de Vélez?", o: ["La Pandilla", "La Guardia Imperial", "La Fiel", "La 12"] },
        { p: "¿En qué estadio ganó Vélez la definición por penales de la Libertadores 1994?", o: ["El Morumbi", "El Maracaná", "El José Amalfitani", "El Pacaembú"] },
      ],
    ],
  },
];
