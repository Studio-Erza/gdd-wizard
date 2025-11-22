// i18n/i18n.en.js — English dictionary (FULL)
(function(){
  if (!window.I18N) return;
  I18N.registerLanguage('es','Español');
  I18N.addDict('es', {
    // App & header
    'app.title': 'GDD Wizard',
    'alt.studioLogo': 'Studio Erza',
    'alt.projectImage': 'Imagen del proyecto',
    'alt.footerLogo': 'Logo',
    'header.title': 'GDD Wizard',
    'header.tagline.short': 'Simple. Rápido. Presentable.',
    'header.tagline.long': 'Rellena los campos y exporta un GDD pro.',

    // Buttons & chrome
    'btn.exportSave': 'Exportar JSON',
    'btn.importSave': 'Importar JSON',
    'btn.reset': 'Reiniciar',
    'btn.print': 'Exportar PDF',
    'btn.prev': '← Anterior',
    'btn.next': 'Siguiente →',
    'btn.add': 'Añadir',
    'btn.remove': 'Eliminar',
    'btn.uploadImage': 'Subir imagen',
    'btn.clear': 'Borrar',
    'btn.invertCover': 'Invertir portada',
    'btn.refreshPreview': 'Actualizar vista previa',

    // UI & labels
    'aria.progress': 'Progreso del asistente',
    'lang.selector': 'Idioma',
    'ui.diagramSize': 'Tamaño del diagrama',
    'ui.theme': 'Tema',
    'ui.generatingPreview': 'Generando vista previa…',
    'ui.camera': 'Añadir imagen',
    'ui.minus': '−',
    'ui.plus': '+',
    'ui.arrow.up': '↑',
    'ui.arrow.down': '↓',
    'label.printSize': 'Tamaño de impresión:',
    'theme.light': 'Claro',
    'theme.dark': 'Oscuro',

    // Steps
    'step.template.title': 'Elige una plantilla',
    'step.template.hint': 'Alterna entre Básico y Game Jam.',
    'field.templateId.label': 'Plantilla',

    // Jam tips (Markdown → HTML at runtime)
    'ui.jamTips.title': '💡Consejos para equipos remotos (Game Jam)',
    'ui.jamTips.docCaptain': 'Elige un **Capitán del documento** para completar los campos.',
    'ui.jamTips.discordCall': 'Usa una **llamada de Discord** para rapidez e incluir a todo el equipo.',
    'ui.jamTips.pdfExport': 'Asegura que todos reciban la **exportación PDF** final.',
    'ui.jamTips.milestoneCheckins': 'Usa el GDD para la estructura y **revisiones de hitos**.',
    'tip.image.dragdrop': 'Tip: arrastra y suelta una imagen aquí',

    // Fields (labels)
    'field.project': 'Proyecto',
    'field.author': 'Autor',
    'field.theme': 'Tema',
    'field.date': 'Fecha',
    'field.coverImage': 'Imagen de portada / logo',

    'field.genre': 'Género',
    'field.coreFantasy': 'Fantasía central',
    'field.toneStyle': 'Tono y estilo',
    'field.narrative': 'Narrativa / Tema',
    'field.inspirations': 'Inspiraciones',

    // ——— New Marketing fields
    'field.hook': 'Gancho',
    'field.platforms': 'Plataformas',
    'field.primaryAudience': 'Audiencia principal',
    'field.secondaryAudience': 'Audiencia secundaria',
    'field.strategy': 'Estrategia',

    // Common/editor fields
    'field.exampleSession': 'Ejemplo de sesión de juego',
    'field.playerProgression': 'Progresión del jugador',
    'field.rewards': 'Recompensas',
    'field.pacing': 'Ritmo',
    'field.meaningfulChoices': 'Decisiones clave',
    'field.consequences': 'Consecuencias',
    'field.inputs': 'Controles',
    'field.uxNotes': 'Notas de UX',
    'field.engineVersion': 'Motor y versión',
    'field.pluginsTools': 'Plugins / herramientas',
    'field.assetSources': 'Fuentes de arte / audio',
    'field.role': 'Rol',
    'field.member': 'Miembro',
    'field.image': 'Imagen',
    'field.purpose': 'Propósito',
    'field.playerImpact': 'Impacto en el jugador',
    'field.notes': 'Notas',

    // Sections
    'section.projectDetails': 'Detalles del proyecto',
    'section.section': 'Sección',
    'section.items': 'Elementos',
    'section.groupedNotes': 'Notas agrupadas',
    'section.reviewExport': 'Revisar y exportar',
    'section.gameSummary': 'Resumen del juego',
    'section.marketing': 'Marketing',          // ← replaces Audience & Goals
    'section.coreLoop': 'Bucle principal',
    'section.keyFeatures': 'Mecánicas clave',
    'section.progressionRewards': 'Progresión y recompensas',
    'section.playerChoices': 'Decisiones del jugador',
    'section.scopePlanning': 'Plan de alcance',
    'section.controlsUX': 'Controles y UX',
    'section.milestones': 'Hitos',
    'section.teamRoles': 'Equipo y roles',
    'section.assetsTools': 'Recursos y herramientas',
    'section.scope.must': 'Imprescindibles',
    'section.scope.nice': 'Deseables',
    'section.scope.future': 'Ideas futuras',
    'section.scope.stretch': 'Objetivos ambiciosos',
    'section.loopSteps': 'Pasos del bucle',
    'section.features': 'Mecánicas',

    // Template labels
    'tpl.basic.label': 'GDD básico',
    'tpl.jam.label': 'GDD de Game Jam',

    // Export strings
    'export.genre': 'Género',
    'export.coreFantasy': 'Fantasía central',
    'export.toneStyle': 'Tono y estilo',
    'export.narrative': 'Narrativa / Tema',
    'export.inspirations': 'Inspiraciones',

    // ——— New Marketing export strings
    'export.hook': 'Gancho',
    'export.platforms': 'Plataformas',
    'export.targetAudience': 'Audiencia objetivo',
    'export.primaryAudience': 'Principal:',
    'export.secondaryAudience': 'Secundaria:',
    'export.strategy': 'Estrategia',

    // Existing export strings
    'export.loopOverview': 'Resumen del bucle',
    'export.exampleSession': 'Ejemplo de sesión de juego',
    'export.untitledFeature': 'Función sin título',
    'export.purpose': 'Propósito:',
    'export.playerImpact': 'Impacto en el jugador:',
    'export.playerProgression': 'Progresión del jugador',
    'export.rewards': 'Recompensas',
    'export.pacing': 'Ritmo',
    'export.meaningfulChoices': 'Decisiones clave',
    'export.consequences': 'Consecuencias',
    'export.inputs': 'Controles',
    'export.uxNotes': 'Notas de UX',
    'export.milestone': 'Hito',
    'export.engineVersion': 'Motor y versión',
    'export.pluginsTools': 'Plugins / herramientas',
    'export.assetSources': 'Fuentes de arte / audio',
    'export.footer.madeWith': 'Hecho con GDD Wizard',
    'export.label.author': 'Autor:',
    'export.label.date': 'Fecha:',
    'export.label.theme': 'Tema:',
    'export.default.projectTitle': 'Documento de diseño de juego',
    'export.loopRepeat': 'Repetir',

    // Placeholders — Basic
    'ph.basic.project': 'Escribe el título de tu juego',
    'ph.basic.author': 'Escribe tu nombre',
    'ph.basic.genre': 'Género. p. ej., \'plataformas 2D\'',
    'ph.basic.coreFantasy': 'Fantasía del jugador. p. ej., \'Sentirse como cabalgar el viento\'',
    'ph.basic.toneStyle': 'Ambiente y estilo. p. ej., \'Calmo y brillante\'',
    'ph.basic.narrative': 'Historia corta. p. ej., \'Arreglar el cielo\'',
    'ph.basic.inspirations': '2–3 refs. p. ej., \'Celeste\'',
    // removed: 'ph.basic.targetAudience' (deprecated with Audience & Goals)
    'ph.basic.exampleSession': '¿Cómo será la sesión? p. ej., \'Partir de un poste, explorar una ruina, usar un eco\'',
    'ph.basic.playerProgression': 'Cómo progresa el jugador. p. ej., \'aprendizaje, stats, mejoras\'',
    'ph.basic.rewards': 'Qué gana el jugador. p. ej., \'oro, puntos de habilidad, elementos\'',
    'ph.basic.pacing': 'Ritmo de juego. p. ej., \'15–30 min por área\'',
    'ph.basic.meaningfulChoices': 'Decisiones clave. p. ej., \'Mejorar ahora o guardar para después\'',
    'ph.basic.consequences': '¿Qué consecuencias tendrán?',
    'ph.basic.mustHave': '¿Qué necesita el juego para funcionar?',
    'ph.basic.niceToHave': '¿Qué añadirás si sobra tiempo?',
    'ph.basic.futureIdeas': 'Ideas para más adelante',

    // ——— New Marketing placeholders
    'ph.hook': 'Tu frase de presentación en una línea',
    'ph.platforms': '¿Dónde lo conseguirán los jugadores? (p. ej., Steam, Itch, consola…)',
    'ph.primaryAudience': '¿A quién va dirigido principalmente? (p. ej., fans de exploración retro, speedrunners)',
    'ph.secondaryAudience': 'Grupos secundarios (p. ej., streamers, YouTubers, estudiantes)',
    'ph.strategy': 'Cómo y dónde lo promocionarás (Discords, subreddits, creadores, anuncios pagos)',

    // Placeholders — Jam
    'ph.jam.project': 'Escribe el título de tu juego',
    'ph.jam.theme': 'Tema oficial de la jam',
    'ph.jam.genre': 'Género. p. ej., \'Plataformas de puzles\'',
    'ph.jam.coreFantasy': 'Fantasía del jugador. p. ej., \'Sentirse como cabalgar el viento\'',
    'ph.jam.toneStyle': 'Tono y estilo. p. ej., \'Calmo y brillante\'',
    'ph.jam.exampleSession': 'Ejemplo de sesión. p. ej., \'Partir de un poste, explorar una ruina, usar un eco\'',
    'ph.jam.scopeMust': '¿Qué debe funcionar al final?',
    'ph.jam.scopeNice': '¿Qué añadir si queda tiempo?',
    'ph.jam.scopeStretch': '¿Qué sumar si vas sobrado?',
    'ph.jam.controlsInputs': 'Controles. p. ej., WASD para moverse, Espacio para saltar',
    'ph.jam.uxNotes': 'Notas de UX. p. ej., menú de pausa, audio, brillo',
    'ph.jam.engineVersion': 'Motor y versión. p. ej., Unreal 5.4',
    'ph.jam.pluginsTools.item': 'Nombre del plugin o herramienta',
	'ph.jam.assetSources.item': 'Fuente de arte o audio',


    // Placeholders — Dynamic editors
    'ph.loop.label': 'Etiqueta corta. p. ej., Paso 1: \'Explorar\'; Paso 2: \'Resolver\'',
    'ph.loop.description': 'Una línea. p. ej., \'Mirar y luego resolver\'',
    'ph.features.title': 'Nombre de la mecánica. p. ej., \'Impulso/planeo\'',
    'ph.features.purpose': 'Para qué sirve. p. ej., \'Moverse más rápido\'',
    'ph.features.details': 'Impacto en el jugador. p. ej., \'Desbloquea zonas ocultas\'',
    'ph.milestones.date': 'Fecha objetivo',
    'ph.milestones.notes': 'Objetivos. p. ej., \'Cerrar alcance; prototipar movimiento; nivel básico.\'',
    'ph.team.role': 'Enfoque. p. ej., diseño, programación, etc.',
    'ph.team.member': 'Nombre del miembro',

    // Confirmations & errors
    'confirm.reset': '¿Reiniciar los datos de la plantilla actual?',
    'err.json.invalid': 'JSON no válido.',
    'err.image.load': 'Error al cargar la imagen',
    'err.file.read': 'Error al leer el archivo',
    'err.image.type': 'Tipo de imagen no compatible',

    // NEW: App messages / popups
    'msg.savedToFolder': 'Guardado en la carpeta de GDD Wizard',
    'err.fs.exportFailed': 'No se pudo guardar el archivo.',
    'err.fs.importFailed': 'No se pudo abrir el archivo.',
    'msg.imported': 'Proyecto importado correctamente.',
    'msg.reset': 'El proyecto se ha restablecido.'
  });
})();


// --- Removed keys from previous es ---
// ph.jam.pluginsTools
// ph.jam.assetSources