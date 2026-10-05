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
     imagen:      "asad.jpg"             (archivo dentro de assets/img/)
     destacado:   true                   (opcional, lo marca en la carta)
   }

   La categoría se toma automáticamente de la clave del grupo, así que no
   hace falta escribirla en cada plato.

   NOTA: nombres, descripciones y precios son de ejemplo.
   Reemplazalos por los reales antes de publicar.
   ========================================================================== */

window.MENU = {
  /* ---------------------------------------------------------------------
     ENTRADAS
     --------------------------------------------------------------------- */
  entradas: {
    label: "Entradas",
    items: [
      {
        nombre: "Empanadas de carne a cuchillo",
        descripcion: "Masa casera, carne cortada a cuchillo y el condimento de la casa.",
        precio: 210,
        imagen: "empanada-de-carne-a-cuchillo.jpg",
        destacado: true,
      },
      {
        nombre: "Chorizo y morcilla con queso",
        descripcion: "Chorizo artesanal con morcilla y queso gratinado.",
        precio: 380,
        imagen: "chorizo-morcilla-queso.jpg",
        destacado: true,
      },
      {
        nombre: "Ensalada de estación",
        descripcion: "Hojas verdes de temporada con aderezo de la casa.",
        precio: 290,
        imagen: "ensalada-de-estacion.jpg",
      },
      {
        nombre: "Tortilla con alioli",
        descripcion: "Tortilla española con alioli de ajo y huevo.",
        precio: 240,
        imagen: "tortilla-con-alioli.jpg",
      },
    ],
  },

  /* ---------------------------------------------------------------------
     PARRILLADA
     --------------------------------------------------------------------- */
  parrilla: {
    label: "Parrillada",
    items: [
      {
        nombre: "La Parrillada El Otro Portón",
        descripcion:
          "Selección de carnes asadas a la parrilla, servidas con guarniciones y pan de la casa.",
        precio: 1450,
        imagen: "asad.jpg",
        destacado: true,
      },
      {
        nombre: "Ojo de bife",
        descripcion: "A punto de fuego, con guarnición a elección.",
        precio: 890,
        imagen: "6.jpg",
        destacado: true,
      },
      {
        nombre: "Bife de chorizo madurado",
        descripcion: "Corte premium con alto grado de marmoreado.",
        precio: 1120,
        imagen: "7.jpg",
      },
    ],
  },

  /* ---------------------------------------------------------------------
     ESPECIALES
     --------------------------------------------------------------------- */
  especiales: {
    label: "Especiales",
    items: [
      {
        nombre: "Calabaza asada con queso y frutos secos",
        descripcion: "Postre de la casa: calabaza asada, queso crema y frutos.",
        precio: 420,
        imagen: "calabaza-asada-con-queso.jpg",
        destacado: true,
      },
      {
        nombre: "El Negro",
        descripcion: "Postre frío de cacao con chocolate amargo.",
        precio: 460,
        imagen: "el-negro-inspirado-en.jpg",
      },
    ],
  },

  /* ---------------------------------------------------------------------
     BEBIDAS
     --------------------------------------------------------------------- */
  bebidas: {
    label: "Bebidas",
    items: [
      {
        nombre: "Limonada de la casa",
        descripcion: "Con menta y jengibre, hecha al momento.",
        precio: 190,
        imagen: "images.jpg",
      },
      {
        nombre: "Vino tinto de la casa",
        descripcion: "Botella de 750 ml, selección de la casa.",
        precio: 1250,
        imagen: "images_1.jpg",
      },
    ],
  },
};