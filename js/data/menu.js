/* ==========================================================================
   DATOS DE LA CARTA — js/data/menu.js
   --------------------------------------------------------------------------
   Fuente única de verdad del menú. Para agregar, quitar o cambiar un plato
   alcanza con editar este archivo: la grilla de la web se re-renderiza sola.

   FORMATO DE CADA PLATO
   --------------------------------------------------------------------------
   {
     nombre:      "Nombre del plato"     (string, obligatorio)
     descripcion: "Texto corto"          (string, opcional)
     precio:      890                    (número, pesos uruguayos)
     imagen:      "faina.jpg"            (archivo dentro de assets/img/)
     destacado:   true                   (opcional, lo marca en la carta)
   }

   La categoría se toma automáticamente de la clave del grupo, así que no
   hace falta escribirla en cada plato.

   NOTA: nombres, descripciones y precios REALES del menú oficial
   `otro_menu25.pdf` (2025), sujetos a confirmar su vigencia con el local.
   Las fotos son las definitivas del prototipo: 8 reales del local ya presentes
   en assets/img/ y 5 de Wikimedia Commons (faina.jpg, lengua-vinagreta.jpg,
   cheese-burger.jpg, limonada-casa.jpg, gin-tonic.jpg; ver créditos y URLs en
   docs/FOTOS-CARTA.md). Las stock son CC BY-SA salvo Cheeseburger.jpg, que es
   de dominio público; acreditadas en el pie de `carta.html` (`footer-credits`).
   ========================================================================== */

window.MENU = {
  /* ---------------------------------------------------------------------
     ENTRADAS
     --------------------------------------------------------------------- */
  entradas: {
    label: "Entradas",
    fotoGrupo: "empanada-de-carne-a-cuchillo.jpg",
    items: [
      {
        nombre: "Empanada de carne a cuchillo",
        descripcion: "Con salsa criolla.",
        precio: 160,
        imagen: "empanada-de-carne-a-cuchillo.jpg",
        destacado: true,
      },
      {
        nombre: "Fainá con cebolla al tannat y queso Colonia",
        descripcion: "",
        precio: 220,
        imagen: "faina.jpg",
      },
      {
        nombre: "Tortilla de papa con alioli",
        descripcion: "",
        precio: 370,
        imagen: "tortilla-con-alioli.jpg",
      },
      {
        nombre: "Lengua a la vinagreta",
        descripcion: "Fresca, tierna, con el sabor casero que nos caracteriza.",
        precio: 370,
        imagen: "lengua-vinagreta.jpg",
        destacado: true,
      },
    ],
  },

  /* ---------------------------------------------------------------------
     PARRILLADA
     --------------------------------------------------------------------- */
  parrilla: {
    label: "Parrillada",
    fotoGrupo: "redisenio/cabecera-parrillada.webp",
    items: [
      {
        nombre: "Ojo de bife",
        descripcion: "400 g. Como lo preferís, jugoso o a punto.",
        precio: 890,
        imagen: "caption_11.jpg",
        destacado: true,
      },
      {
        nombre: "Entraña fina",
        descripcion: "400 g.",
        precio: 790,
        imagen: "7.jpg",
      },
      {
        nombre: "Entrecot",
        descripcion: "400 g.",
        precio: 890,
        imagen: "asad.jpg",
      },
      {
        nombre: "Asado de tira",
        descripcion: "500 g.",
        precio: 640,
        imagen: "2.jpg",
      },
      {
        nombre: "Mollejas",
        descripcion: "400 g, a la parrilla.",
        precio: 590,
        imagen: "mollejas-con-cremoso.jpg",
      },
    ],
  },

  /* ---------------------------------------------------------------------
     ESPECIALES
     --------------------------------------------------------------------- */
  especiales: {
    label: "Especiales",
    fotoGrupo: "caption_4.jpg",
    items: [
      {
        nombre: "Raviolones de ossobuco braseado",
        descripcion: "Con salsa pomodoro, olivas y parmesano.",
        precio: 790,
        imagen: "caption_4.jpg",
      },
      {
        nombre: "Cheese-Burger",
        descripcion: "Pan casero, triple cheddar y pepinos encurtidos.",
        precio: 790,
        imagen: "cheese-burger.jpg",
        destacado: true,
      },
    ],
  },

  /* ---------------------------------------------------------------------
     BEBIDAS
     --------------------------------------------------------------------- */
  bebidas: {
    label: "Bebidas",
    fotoGrupo: "gin-tonic.jpg",
    items: [
      {
        nombre: "Limonada de la casa",
        descripcion: "Clásica, de menta y jengibre o maracuyada.",
        precio: 250,
        imagen: "limonada-casa.jpg",
      },
      {
        nombre: "Gin tonic",
        descripcion: "El ritual empieza antes del primer brindis.",
        precio: 350,
        imagen: "gin-tonic.jpg",
        destacado: true,
      },
    ],
  },
};
