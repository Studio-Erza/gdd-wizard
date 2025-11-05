// i18n/i18n.en.js — English dictionary (FULL)
(function(){
  if (!window.I18N) return;
  I18N.registerLanguage('cs','Čeština');
  I18N.addDict('cs', {
    // App & header
    'app.title': 'GDD Wizard',
    'alt.studioLogo': 'Studio Erza',
    'alt.projectImage': 'Obrázek projektu',
    'alt.footerLogo': 'Logo',
    'header.title': 'GDD Wizard',
    'header.tagline.short': 'Jednoduché. Rychlé. Prezentovatelné.',
    'header.tagline.long': 'Vyplň pole a exportuj profesionální GDD.',

    // Buttons & chrome
    'btn.exportSave': 'Exportovat JSON',
    'btn.importSave': 'Importovat JSON',
    'btn.reset': 'Resetovat',
    'btn.print': 'Tisk / Uložit PDF',
    'btn.prev': '← Zpět',
    'btn.next': 'Další →',
    'btn.add': 'Přidat',
    'btn.remove': 'Odebrat',
    'btn.uploadImage': 'Nahrát obrázek',
    'btn.clear': 'Vymazat',
    'btn.invertCover': 'Invertovat obal',
    'btn.refreshPreview': 'Obnovit náhled',

    // UI & labels
    'aria.progress': 'Postup průvodce',
    'lang.selector': 'Jazyk',
    'ui.diagramSize': 'Velikost diagramu',
    'ui.theme': 'Téma',
    'ui.generatingPreview': 'Generuje se náhled…',
    'ui.camera': 'Přidat obrázek',
    'ui.minus': '−',
    'ui.plus': '+',
    'ui.arrow.up': '↑',
    'ui.arrow.down': '↓',
    'label.printSize': 'Velikost tisku:',
    'theme.light': 'Světlé',
    'theme.dark': 'Tmavé',

    // Steps
    'step.template.title': 'Vyber šablonu',
    'step.template.hint': 'Přepínej mezi základní a Game Jam verzí.',
    'field.templateId.label': 'Šablona',

    // Jam tips (Markdown → HTML at runtime)
    'ui.jamTips.title': '💡Tipy pro Game Jam týmy',
    'ui.jamTips.docCaptain': 'Určete **Doc Captain**a, který bude vyplňovat údaje.',
    'ui.jamTips.discordCall': 'Použijte **Discord Call** pro rychlou komunikaci a zapojení týmu.',
    'ui.jamTips.pdfExport': 'Zajistěte, aby každý měl kopii finálního **PDF exportu**.',
    'ui.jamTips.milestoneCheckins': 'Používejte GDD pro strukturu a **kontroly milníků**.',
    'tip.image.dragdrop': 'Tip: přetáhni obrázek sem',

    // Fields (labels)
    'field.project': 'Projekt',
    'field.author': 'Autor',
    'field.theme': 'Téma',
    'field.date': 'Datum',
    'field.coverImage': 'Obrázek / Logo projektu',

    'field.genre': 'Žánr',
    'field.coreFantasy': 'Jádro fantazie',
    'field.toneStyle': 'Tón a styl',
    'field.narrative': 'Příběh / Téma',
    'field.inspirations': 'Inspirace',

    // ——— New Marketing fields
    'field.hook': 'Hook',
    'field.platforms': 'Platformy',
    'field.primaryAudience': 'Hlavní publikum',
    'field.secondaryAudience': 'Druhotné publikum',
    'field.strategy': 'Strategie',

    // Common/editor fields
    'field.exampleSession': 'Ukázková herní seance',
    'field.playerProgression': 'Progrese hráče',
    'field.rewards': 'Odměny',
    'field.pacing': 'Tempo',
    'field.meaningfulChoices': 'Smysluplné volby',
    'field.consequences': 'Důsledky',
    'field.inputs': 'Ovládání',
    'field.uxNotes': 'UX poznámky',
    'field.engineVersion': 'Engine a verze',
    'field.pluginsTools': 'Pluginy / Nástroje',
    'field.assetSources': 'Zdroje assetů / audia',
    'field.role': 'Role',
    'field.member': 'Člen',
    'field.image': 'Obrázek',
    'field.purpose': 'Účel',
    'field.playerImpact': 'Dopad na hráče',
    'field.notes': 'Poznámky',

    // Sections
    'section.projectDetails': 'Detaily projektu',
    'section.section': 'Sekce',
    'section.items': 'Položky',
    'section.groupedNotes': 'Seskupené poznámky',
    'section.reviewExport': 'Kontrola a export',
    'section.gameSummary': 'Shrnutí hry',
    'section.marketing': 'Marketing',          // ← replaces Audience & Goals
    'section.coreLoop': 'Core Loop',
    'section.keyFeatures': 'Klíčové mechaniky',
    'section.progressionRewards': 'Progrese a odměny',
    'section.playerChoices': 'Volby hráče',
    'section.scopePlanning': 'Plánování rozsahu',
    'section.controlsUX': 'Ovládání a UX',
    'section.milestones': 'Milníky',
    'section.teamRoles': 'Tým a role',
    'section.assetsTools': 'Assety a nástroje',
    'section.scope.must': 'Nutné prvky',
    'section.scope.nice': 'Volitelné prvky',
    'section.scope.future': 'Budoucí nápady',
    'section.scope.stretch': 'Stretch cíle',
    'section.loopSteps': 'Kroky loopu',
    'section.features': 'Funkce',

    // Template labels
    'tpl.basic.label': 'Základní GDD',
    'tpl.jam.label': 'Game Jam GDD',

    // Export strings
    'export.genre': 'Žánr',
    'export.coreFantasy': 'Jádro fantazie',
    'export.toneStyle': 'Tón a styl',
    'export.narrative': 'Příběh / Téma',
    'export.inspirations': 'Inspirace',

    // ——— New Marketing export strings
    'export.hook': 'Hook',
    'export.platforms': 'Platformy',
    'export.targetAudience': 'Cílové publikum',
    'export.primaryAudience': 'Hlavní:',
    'export.secondaryAudience': 'Druhotné:',
    'export.strategy': 'Strategie',

    // Existing export strings
    'export.loopOverview': 'Přehled loopu',
    'export.exampleSession': 'Ukázková seance',
    'export.untitledFeature': 'Nepojmenovaná funkce',
    'export.purpose': 'Účel:',
    'export.playerImpact': 'Dopad na hráče:',
    'export.playerProgression': 'Progrese hráče',
    'export.rewards': 'Odměny',
    'export.pacing': 'Tempo',
    'export.meaningfulChoices': 'Smysluplné volby',
    'export.consequences': 'Důsledky',
    'export.inputs': 'Ovládání',
    'export.uxNotes': 'UX poznámky',
    'export.milestone': 'Milník',
    'export.engineVersion': 'Engine a verze',
    'export.pluginsTools': 'Pluginy / Nástroje',
    'export.assetSources': 'Zdroje assetů / audia',
    'export.footer.madeWith': 'Vytvořeno pomocí GDD Wizard',
    'export.label.author': 'Autor:',
    'export.label.date': 'Datum:',
    'export.label.theme': 'Téma:',
    'export.default.projectTitle': 'Dokument návrhu hry',
    'export.loopRepeat': 'Opakovat',

    // Placeholders — Basic
    'ph.basic.project': 'Zadej název hry',
    'ph.basic.author': 'Zadej své jméno',
    'ph.basic.genre': 'Žánr hry, např. \'2D platformer\'',
    'ph.basic.coreFantasy': 'Hráčova fantazie, např. \'Pocit z létání na větru\'',
    'ph.basic.toneStyle': 'Nálada a styl, např. \'Klidná a světlá\'',
    'ph.basic.narrative': 'Krátký příběh, např. \'Opravit oblohu\'',
    'ph.basic.inspirations': '2–3 inspirace, např. \'Celeste\'',
    // removed: 'ph.basic.targetAudience' (deprecated with Audience & Goals)
    'ph.basic.exampleSession': 'Jak vypadá seance hráče? např. \'Začátek u bodu, průzkum ruiny, aktivace echa\'',
    'ph.basic.playerProgression': 'Jak hráč roste? např. \'učení, upgrady, staty\'',
    'ph.basic.rewards': 'Co hráč získá? např. \'Zlato, XP, itemy\'',
    'ph.basic.pacing': 'Tempo hry, např. \'15–30 minut na oblast\'',
    'ph.basic.meaningfulChoices': 'Důležité volby, např. \'Upgradovat teď nebo později\'',
    'ph.basic.consequences': 'Jaké budou důsledky těchto voleb?',
    'ph.basic.mustHave': 'Co je nutné pro fungování hry?',
    'ph.basic.niceToHave': 'Co přidáš, pokud zbude čas?',
    'ph.basic.futureIdeas': 'Nápady do budoucna',

    // ——— New Marketing placeholders
    'ph.hook': 'Tvůj pitch v jedné větě',
    'ph.platforms': 'Kde hra vyjde? (např. Steam, Itch, konzole…)',
    'ph.primaryAudience': 'Na koho hlavně cílíš? (např. fanoušci retro her, speedrunneři)',
    'ph.secondaryAudience': 'Vedlejší skupiny (např. streameři, YouTubeři, studenti)',
    'ph.strategy': 'Jak a kde budeš hru propagovat (Discordy, subreddity, influenceři, placené reklamy)',

    // Placeholders — Jam
    'ph.jam.project': 'Zadej název hry',
    'ph.jam.theme': 'Oficiální téma Game Jamu',
    'ph.jam.genre': 'Žánr, např. \'Puzzle platformer\'',
    'ph.jam.coreFantasy': 'Hráčova fantazie, např. \'Pocit z létání na větru\'',
    'ph.jam.toneStyle': 'Nálada a styl, např. \'Klidná a světlá\'',
    'ph.jam.exampleSession': 'Jak bude vypadat seance hráče? např. \'Začátek u bodu, průzkum ruiny, aktivace echa\'',
    'ph.jam.scopeMust': 'Co musí být funkční do konce jamu?',
    'ph.jam.scopeNice': 'Co přidáš, pokud zbude čas?',
    'ph.jam.scopeStretch': 'Co přidáš, pokud budeš napřed?',
    'ph.jam.controlsInputs': 'Ovládání. např. \'WASD pro pohyb, Mezerník pro skok\'',
    'ph.jam.uxNotes': 'UX poznámky. např. \'Menu pauzy, hlasitost, jas\'',
    'ph.jam.engineVersion': 'Engine a verze, např. \'Unreal Engine 5.4\'',
    'ph.jam.pluginsTools': 'Pluginy a nástroje, např. \'Paper2D pro sprity, GDD Wizard pro dokumentaci\'',
    // fixed closing quote from your original file:
    'ph.jam.assetSources': 'Zdroje assetů / audia, např. \'Freesound, vlastní tvorba během jamu\'',

    // Placeholders — Dynamic editors
    'ph.loop.label': 'Krátký název kroku, např. \'Prozkoumat\', \'Vyřešit\'',
    'ph.loop.description': 'Popis kroku v jedné větě',
    'ph.features.title': 'Název mechaniky, např. \'Dash Glide\'',
    'ph.features.purpose': 'Proč existuje, např. \'Rychlejší pohyb\'',
    'ph.features.details': 'Jaký má dopad, např. \'Odemkne skryté oblasti\'',
    'ph.milestones.date': 'Cílové datum',
    'ph.milestones.notes': 'Cíle. např. \'Stanovit rozsah, prototyp pohybu, vytvořit první level\'',
    'ph.team.role': 'Role v projektu, např. \'Design, kódování, grafika\'',
    'ph.team.member': 'Jméno člena týmu',

    // Confirmations & errors
    'confirm.reset': 'Resetovat aktuální data šablony?',
    'err.json.invalid': 'Neplatný JSON.',
    'err.image.load': 'Načtení obrázku selhalo.',
    'err.file.read': 'Čtení souboru selhalo.',
    'err.image.type': 'Nepodporovaný typ obrázku.',

    // NEW: App messages / popups
    'msg.savedToFolder': 'Uloženo do složky GDD Wizard',
    'err.fs.exportFailed': 'Soubor se nepodařilo uložit.',
    'err.fs.importFailed': 'Soubor se nepodařilo otevřít.',
    'msg.imported': 'Projekt byl úspěšně importován.',
    'msg.reset': 'Projekt byl resetován.'
  });
})();
