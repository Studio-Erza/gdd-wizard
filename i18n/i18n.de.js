// i18n/i18n.en.js — English dictionary (FULL)
(function(){
  if (!window.I18N) return;
  I18N.registerLanguage('de','Deutsch');
  I18N.addDict('de', {
    // App & header
    'app.title': 'GDD Wizard',
    'alt.studioLogo': 'Studio-Logo',
    'alt.projectImage': 'Projektbild',
    'alt.footerLogo': 'Fußzeilen-Logo',
    'header.title': 'GDD Wizard',
    'header.tagline.short': 'Einfach. Schnell. Präsentierbar.',
    'header.tagline.long': 'Eingaben ausfüllen & professionelles GDD exportieren.',

    // Buttons & chrome
    'btn.exportSave': 'Exportieren JSON',
    'btn.importSave': 'Importieren JSON',
    'btn.reset': 'Zurücksetzen',
    'btn.print': 'Exportieren PDF',
    'btn.prev': '← Zurück',
    'btn.next': 'Weiter →',
    'btn.add': 'Hinzufügen',
    'btn.remove': 'Entfernen',
    'btn.uploadImage': 'Bild hochladen',
    'btn.clear': 'Leeren',
    'btn.invertCover': 'Invertieren',
    'btn.refreshPreview': 'Aktualisieren',

    // UI & labels
    'aria.progress': 'Fortschritt',
    'lang.selector': 'Sprache',
    'ui.diagramSize': 'Diagrammgröße',
    'ui.theme': 'Theme',
    'ui.generatingPreview': 'Vorschau wird erstellt…',
    'ui.camera': 'Kamera',
    'ui.minus': '-',
    'ui.plus': '+',
    'ui.arrow.up': '↑',
    'ui.arrow.down': '↓',
    'label.printSize': 'Druckgröße',
    'theme.light': 'Hell',
    'theme.dark': 'Dunkel',

    // Steps
    'step.template.title': 'Vorlage wählen',
    'step.template.hint': 'Wähle eine Vorlage für dein Dokument.',
    'field.templateId.label': 'Vorlage',

    // Jam tips (Markdown → HTML at runtime)
    'ui.jamTips.title': '💡 Jam-Tipps',
    'ui.jamTips.docCaptain': 'Bestimmt einen „Doc Captain“, der alles festhält.',
    'ui.jamTips.discordCall': 'Tretet einem Discord-Call bei, um synchron zu bleiben.',
    'ui.jamTips.pdfExport': 'Exportiert früh eine PDF für die Einreichung.',
    'ui.jamTips.milestoneCheckins': 'Plant Check-ins zu Meilensteinen.',
    'tip.image.dragdrop': 'Bild ziehen oder klicken zum Hochladen',

    // Fields (labels)
    'field.project': 'Projekt',
    'field.author': 'Autor',
    'field.theme': 'Thema',
    'field.date': 'Datum',
    'field.coverImage': 'Titelbild',

    'field.genre': 'Genre',
    'field.coreFantasy': 'Kernfantasie',
    'field.toneStyle': 'Ton & Stil',
    'field.narrative': 'Erzählung',
    'field.inspirations': 'Inspirationen',

    // ——— New Marketing fields
    'field.hook': 'Aufhänger',
    'field.platforms': 'Plattformen',
    'field.primaryAudience': 'Hauptzielgruppe',
    'field.secondaryAudience': 'Nebenzielgruppe',
    'field.strategy': 'Strategie',

    // Common/editor fields
    'field.exampleSession': 'Beispielsitzung',
    'field.playerProgression': 'Spielerfortschritt',
    'field.rewards': 'Belohnungen',
    'field.pacing': 'Tempo',
    'field.meaningfulChoices': 'Bedeutsame Entscheidungen',
    'field.consequences': 'Konsequenzen',
    'field.inputs': 'Eingaben',
    'field.uxNotes': 'UX-Notizen',
    'field.engineVersion': 'Engine-Version',
    'field.pluginsTools': 'Plugins & Tools',
    'field.assetSources': 'Asset-Quellen',
    'field.role': 'Rolle',
    'field.member': 'Mitglied',
    'field.image': 'Bild',
    'field.purpose': 'Zweck',
    'field.playerImpact': 'Spielerwirkung',
    'field.notes': 'Notizen',

    // Sections
    'section.projectDetails': 'Projektdetails',
    'section.section': 'Abschnitt',
    'section.items': 'Elemente',
    'section.groupedNotes': 'Notizen',
    'section.reviewExport': 'Review & Export',
    'section.gameSummary': 'Spiel-Zusammenfassung',
    'section.marketing': 'Marketing',          // ← replaces Audience & Goals
    'section.coreLoop': 'Core Loop',
    'section.keyFeatures': 'Hauptfeatures',
    'section.progressionRewards': 'Fortschritt & Belohnungen',
    'section.playerChoices': 'Spielerentscheidungen',
    'section.scopePlanning': 'Scope-Planung',
    'section.controlsUX': 'Steuerung & UX',
    'section.milestones': 'Meilensteine',
    'section.teamRoles': 'Teamrollen',
    'section.assetsTools': 'Assets & Tools',
    'section.scope.must': 'Muss',
    'section.scope.nice': 'Optional',
    'section.scope.future': 'Zukünftige Ideen',
    'section.scope.stretch': 'Stretch',
    'section.loopSteps': 'Loop-Schritte',
    'section.features': 'Features',

    // Template labels
    'tpl.basic.label': 'Basis GDD',
    'tpl.jam.label': 'Game Jam GDD',

    // Export strings
    'export.genre': 'Genre',
    'export.coreFantasy': 'Kernfantasie',
    'export.toneStyle': 'Ton & Stil',
    'export.narrative': 'Erzählung',
    'export.inspirations': 'Inspirationen',

    // ——— New Marketing export strings
    'export.hook': 'Aufhänger',
    'export.platforms': 'Plattformen',
    'export.targetAudience': 'Zielgruppe',
    'export.primaryAudience': 'Primär:',
    'export.secondaryAudience': 'Sekundär:',
    'export.strategy': 'Strategie',

    // Existing export strings
    'export.loopOverview': 'Loop-Übersicht',
    'export.exampleSession': 'Beispielsitzung',
    'export.untitledFeature': 'Unbenanntes Feature',
    'export.purpose': 'Zweck:',
    'export.playerImpact': 'Spielerwirkung:',
    'export.playerProgression': 'Spielerfortschritt',
    'export.rewards': 'Belohnungen',
    'export.pacing': 'Tempo',
    'export.meaningfulChoices': 'Bedeutsame Entscheidungen',
    'export.consequences': 'Konsequenzen',
    'export.inputs': 'Eingaben',
    'export.uxNotes': 'UX-Notizen',
    'export.milestone': 'Meilenstein',
    'export.engineVersion': 'Engine-Version',
    'export.pluginsTools': 'Plugins & Tools',
    'export.assetSources': 'Asset-Quellen',
    'export.footer.madeWith': 'Erstellt mit GDD Wizard',
    'export.label.author': 'Autor',
    'export.label.date': 'Datum',
    'export.label.theme': 'Thema',
    'export.default.projectTitle': 'Unbenanntes Projekt',
    'export.loopRepeat': 'wiederholen',

    // Placeholders — Basic
    'ph.basic.project': 'Projektname (z.B. Echoes)',
    'ph.basic.author': 'Gib den Autor ein (z.B. Alex)',
    'ph.basic.genre': 'Gib das Genre ein (z.B. Puzzle)',
    'ph.basic.coreFantasy': 'Beschreibe die Kernfantasie (z.B. Weltraumabenteuer)',
    'ph.basic.toneStyle': 'Ton & Stil (z.B. humorvoll)',
    'ph.basic.narrative': 'Kurze Erzählung (z.B. Rettung der Welt)',
    'ph.basic.inspirations': 'Nenne Inspirationen (z.B. Celeste)',
    // removed: 'ph.basic.targetAudience' (deprecated with Audience & Goals)
    'ph.basic.exampleSession': 'Beschreibe eine Spielsitzung (z.B. 10 Min. Level)',
    'ph.basic.playerProgression': 'Spielerfortschritt (z.B. Levelsystem)',
    'ph.basic.rewards': 'Belohnungen (z.B. Skins)',
    'ph.basic.pacing': 'Beschreibe das Tempo (z.B. schnell)',
    'ph.basic.meaningfulChoices': 'Beispiele für Entscheidungen (z.B. Skilltree)',
    'ph.basic.consequences': 'Beschreibe Konsequenzen (z.B. Permadeath)',
    'ph.basic.mustHave': 'Muss enthalten (z.B. Koop)',
    'ph.basic.niceToHave': 'Wäre schön (z.B. Mods)',
    'ph.basic.futureIdeas': 'Spätere Ideen (z.B. DLC)',

    // ——— New Marketing placeholders
    'ph.hook': 'Dein einzeiliger Pitch, der den Wert vermittelt',
    'ph.platforms': 'Wo Spieler das Spiel bekommen? (z. B. Steam, Itch, Konsole…)',
    'ph.primaryAudience': 'Hauptgruppe, auf die das Spiel abzielt (z. B. Retro-Fans, Speedrunner)',
    'ph.secondaryAudience': 'Sekundäre Gruppen (z. B. Streamer, YouTuber, Studierende)',
    'ph.strategy': 'Wie und wo du das Spiel bewerben wirst (Discords, Subreddits, Creator, bezahlte Werbung)',

    // Placeholders — Jam
    'ph.jam.project': 'Projektname (z.B. JamGame)',
    'ph.jam.theme': 'Thema (z.B. Wachstum)',
    'ph.jam.genre': 'Genre (z.B. Platformer)',
    'ph.jam.coreFantasy': 'Kernfantasie (z.B. Überleben)',
    'ph.jam.toneStyle': 'Ton & Stil (z.B. düster)',
    'ph.jam.exampleSession': 'Spielsitzung (z.B. 5 Min. Bosskampf)',
    'ph.jam.scopeMust': 'Muss enthalten (z.B. Basislevel)',
    'ph.jam.scopeNice': 'Optional (z.B. Extra-Charakter)',
    'ph.jam.scopeStretch': 'Stretch-Ziel (z.B. Online-Modus)',
    'ph.jam.controlsInputs': 'Steuerung (z.B. WASD)',
    'ph.jam.uxNotes': 'UX-Notizen (z.B. Controller)',
    'ph.jam.engineVersion': 'Engine-Version (z.B. Unity 2022)',
    'ph.jam.pluginsTools': 'Plugins/Tools (z.B. Reaper)',
    // fixed closing quote from your original file:
    'ph.jam.assetSources': 'Asset-Quellen (z.B. OpenGameArt)',

    // Placeholders — Dynamic editors
    'ph.loop.label': 'Schrittname',
    'ph.loop.description': 'Beschreibe den Schritt',
    'ph.features.title': 'Titel (z.B. Kampfmechanik)',
    'ph.features.purpose': 'Zweck (z.B. Spannung)',
    'ph.features.details': 'Weitere Details (z.B. Leveldesign)',
    'ph.milestones.date': 'Datum (z.B. 12.09.2025)',
    'ph.milestones.notes': 'Notizen zum Meilenstein',
    'ph.team.role': 'Rolle (z.B. Designer)',
    'ph.team.member': 'Mitglied (z.B. Chris)',

    // Confirmations & errors
    'confirm.reset': 'Bist du sicher? Alle Daten gehen verloren.',
    'err.json.invalid': 'Ungültige JSON-Datei.',
    'err.image.load': 'Bild konnte nicht geladen werden.',
    'err.file.read': 'Datei konnte nicht gelesen werden.',
    'err.image.type': 'Ungültiger Bildtyp.',

    // NEW: App messages / popups
    'msg.savedToFolder': 'Im GDD-Wizard-Ordner gespeichert',
    'err.fs.exportFailed': 'Datei konnte nicht gespeichert werden.',
    'err.fs.importFailed': 'Datei konnte nicht geöffnet werden.',
    'msg.imported': 'Projekt erfolgreich importiert.',
    'msg.reset': 'Das Projekt wurde zurückgesetzt.'
  });
})();
