// i18n/i18n.en.js — English dictionary (FULL)
(function(){
  if (!window.I18N) return;
  I18N.registerLanguage('fr','Français');
  I18N.addDict('fr', {
    // App & header
    'app.title': 'GDD Wizard',
    'alt.studioLogo': 'Studio Erza',
    'alt.projectImage': 'Image du projet',
    'alt.footerLogo': 'Logo',
    'header.title': 'GDD Wizard',
    'header.tagline.short': 'Simple. Rapide. Présentable.',
    'header.tagline.long': 'Remplissez les champs et exportez un GDD professionnel.',

    // Buttons & chrome
    'btn.exportSave': 'Exporter JSON',
    'btn.importSave': 'Importer JSON',
    'btn.reset': 'Réinitialiser',
    'btn.print': 'Exporter PDF',
    'btn.prev': '← Précédent',
    'btn.next': 'Suivant →',
    'btn.add': 'Ajouter',
    'btn.remove': 'Supprimer',
    'btn.uploadImage': 'Téléverser une image',
    'btn.clear': 'Effacer',
    'btn.invertCover': 'Inverser la couverture',
    'btn.refreshPreview': 'Rafraîchir l’aperçu',

    // UI & labels
    'aria.progress': 'Progression de l’assistant',
    'lang.selector': 'Langue',
    'ui.diagramSize': 'Taille du schéma',
    'ui.theme': 'Thème',
    'ui.generatingPreview': 'Génération de l’aperçu…',
    'ui.camera': 'Ajouter une image',
    'ui.minus': '−',
    'ui.plus': '+',
    'ui.arrow.up': '↑',
    'ui.arrow.down': '↓',
    'label.printSize': 'Taille d’impression :',
    'theme.light': 'Clair',
    'theme.dark': 'Sombre',

    // Steps
    'step.template.title': 'Choisir un modèle',
    'step.template.hint': 'Basculez entre les modèles “GDD de base” et “GDD Game Jam”.',
    'field.templateId.label': 'Modèle',

    // Jam tips (Markdown → HTML at runtime)
    'ui.jamTips.title': '💡 Conseils pour équipes à distance (modèle Game Jam)',
    'ui.jamTips.docCaptain': 'Désignez un **capitaine de doc** pour remplir les champs.',
    'ui.jamTips.discordCall': 'Utilisez un **appel Discord** pour aller vite et inclure tout le monde.',
    'ui.jamTips.pdfExport': 'Partagez une **exportation PDF** finale avec chaque membre.',
    'ui.jamTips.milestoneCheckins': 'Utilisez le GDD pour garder la structure et les **revues de jalons**.',
    'tip.image.dragdrop': 'Astuce : glissez-déposez une image ici',

    // Fields (labels)
    'field.project': 'Projet',
    'field.author': 'Auteur',
    'field.theme': 'Thème',
    'field.date': 'Date',
    'field.coverImage': 'Image de couverture / Logo',

    'field.genre': 'Genre',
    'field.coreFantasy': 'Fantaisie centrale',
    'field.toneStyle': 'Ton et Style',
    'field.narrative': 'Narration / Thème',
    'field.inspirations': 'Inspirations',

    // ——— New Marketing fields
    'field.hook': 'Accroche',
    'field.platforms': 'Plateformes',
    'field.primaryAudience': 'Public principal',
    'field.secondaryAudience': 'Public secondaire',
    'field.strategy': 'Stratégie',

    // Common/editor fields
    'field.exampleSession': 'Session de jeu exemple',
    'field.playerProgression': 'Progression du joueur',
    'field.rewards': 'Récompenses',
    'field.pacing': 'Rythme',
    'field.meaningfulChoices': 'Choix significatifs',
    'field.consequences': 'Conséquences',
    'field.inputs': 'Commandes',
    'field.uxNotes': 'Notes UX',
    'field.engineVersion': 'Moteur & Version',
    'field.pluginsTools': 'Plugins / Outils',
    'field.assetSources': 'Sources d’art / audio',
    'field.role': 'Rôle',
    'field.member': 'Membre',
    'field.image': 'Image',
    'field.purpose': 'Objectif',
    'field.playerImpact': 'Impact sur le joueur',
    'field.notes': 'Notes',

    // Sections
    'section.projectDetails': 'Détails du projet',
    'section.section': 'Section',
    'section.items': 'Éléments',
    'section.groupedNotes': 'Notes groupées',
    'section.reviewExport': 'Aperçu & Export',
    'section.gameSummary': 'Résumé du jeu',
    'section.marketing': 'Marketing',          // ← replaces Audience & Goals
    'section.coreLoop': 'Boucle de jeu',
    'section.keyFeatures': 'Mécaniques clés',
    'section.progressionRewards': 'Progression & Récompenses',
    'section.playerChoices': 'Choix du joueur',
    'section.scopePlanning': 'Planification du scope',
    'section.controlsUX': 'Contrôles & UX',
    'section.milestones': 'Jalons',
    'section.teamRoles': 'Équipe & Rôles',
    'section.assetsTools': 'Ressources & Outils',
    'section.scope.must': 'Fonctionnalités indispensables',
    'section.scope.nice': 'Fonctionnalités optionnelles',
    'section.scope.future': 'Idées futures',
    'section.scope.stretch': 'Objectifs ambitieux',
    'section.loopSteps': 'Étapes de la boucle',
    'section.features': 'Mécaniques',

    // Template labels
    'tpl.basic.label': 'GDD de base',
    'tpl.jam.label': 'GDD de Game Jam',

    // Export strings
    'export.genre': 'Genre',
    'export.coreFantasy': 'Fantaisie centrale',
    'export.toneStyle': 'Ton et Style',
    'export.narrative': 'Narration / Thème',
    'export.inspirations': 'Inspirations',

    // ——— New Marketing export strings
    'export.hook': 'Accroche',
    'export.platforms': 'Plateformes',
    'export.targetAudience': 'Public cible',
    'export.primaryAudience': 'Principal:',
    'export.secondaryAudience': 'Secondaire:',
    'export.strategy': 'Stratégie',

    // Existing export strings
    'export.loopOverview': 'Aperçu de la boucle',
    'export.exampleSession': 'Session de jeu exemple',
    'export.untitledFeature': 'Mécanique sans titre',
    'export.purpose': 'Objectif:',
    'export.playerImpact': 'Impact sur le joueur:',
    'export.playerProgression': 'Progression du joueur',
    'export.rewards': 'Récompenses',
    'export.pacing': 'Rythme',
    'export.meaningfulChoices': 'Choix significatifs',
    'export.consequences': 'Conséquences',
    'export.inputs': 'Entrées',
    'export.uxNotes': 'Notes UX',
    'export.milestone': 'Jalon',
    'export.engineVersion': 'Moteur & Version',
    'export.pluginsTools': 'Plugins / Outils',
    'export.assetSources': 'Sources d’art / audio',
    'export.footer.madeWith': 'Créé avec GDD Wizard',
    'export.label.author': 'Auteur :',
    'export.label.date': 'Date :',
    'export.label.theme': 'Thème :',
    'export.default.projectTitle': 'Document de conception de jeu',
    'export.loopRepeat': 'Répéter',

    // Placeholders — Basic
    'ph.basic.project': 'Saisissez le titre de votre jeu',
    'ph.basic.author': 'Saisissez votre nom',
    'ph.basic.genre': 'Genre du jeu. ex. : \'plateformer 2D\'',
    'ph.basic.coreFantasy': 'Promesse au joueur. ex. : \'Se sentir porté par le vent\'',
    'ph.basic.toneStyle': 'Ambiance & apparence. ex. : \'Calme et lumineuse\'',
    'ph.basic.narrative': 'Pitch narratif. ex. : \'Réparer le ciel\'',
    'ph.basic.inspirations': '2–3 références. ex. : \'Celeste\'',
    // removed: 'ph.basic.targetAudience' (deprecated with Audience & Goals)
    'ph.basic.exampleSession': 'À quoi ressemble une session ? ex. : \'Démarrer à un poteau, explorer une ruine, révéler des tuiles\'',
    'ph.basic.playerProgression': 'Comment le joueur progresse. ex. : \'apprentissage, stats, améliorations\'',
    'ph.basic.rewards': 'Ce que le joueur gagne. ex. : \'Or, Points de compétence, Objets\'',
    'ph.basic.pacing': 'Rythme du jeu. ex. : \'15–30 min par zone\'',
    'ph.basic.meaningfulChoices': 'Grands choix. ex. : \'Améliorer maintenant ou économiser pour plus tard\'',
    'ph.basic.consequences': 'Quelles en seront les conséquences ?',
    'ph.basic.mustHave': 'Indispensables au fonctionnement du jeu',
    'ph.basic.niceToHave': 'À ajouter si vous avez du temps',
    'ph.basic.futureIdeas': 'Idées pour plus tard',

    // ——— New Marketing placeholders
    'ph.hook': 'Votre phrase d’accroche en une ligne',
    'ph.platforms': 'Où les joueurs pourront-ils l’obtenir ? (ex. : Steam, Itch, console…)',
    'ph.primaryAudience': 'Public principal visé ? (ex. : fans d’exploration rétro, speedrunners)',
    'ph.secondaryAudience': 'Groupes secondaires (ex. : streamers, YouTubers, étudiants)',
    'ph.strategy': 'Comment et où vous ferez la promotion (Discords, subreddits, créateurs, publicités payantes)',

    // Placeholders — Jam
    'ph.jam.project': 'Saisissez le titre de votre jeu',
    'ph.jam.theme': 'Thème officiel de la Jam',
    'ph.jam.genre': 'Genre du jeu. ex. : \'Plateformer de réflexion\'',
    'ph.jam.coreFantasy': 'Promesse au joueur. ex. : \'Se sentir porté par le vent\'',
    'ph.jam.toneStyle': 'Ton & Style. ex. : \'Calme et lumineux\'',
    'ph.jam.exampleSession': 'Exemple de session. ex. : \'Démarrer à un poteau, explorer une ruine, révéler des tuiles\'',
    'ph.jam.scopeMust': 'Doit absolument fonctionner à la fin',
    'ph.jam.scopeNice': 'À ajouter si du temps reste',
    'ph.jam.scopeStretch': 'À ajouter si vous êtes en avance',
    'ph.jam.controlsInputs': 'Contrôles. ex. : \'ZQSD pour bouger, Espace pour sauter\'',
    'ph.jam.uxNotes': 'Expérience utilisateur. ex. : \'Menu pause, curseurs audio, luminosité\'',
    'ph.jam.engineVersion': 'Moteur et version. ex. : \'Unreal Engine 5.4\'',
    'ph.jam.pluginsTools': 'Plugins et Outils. ex. : \'Paper2D pour les sprites, GDD Wizard pour la doc\'',
    // fixed closing quote from your original file:
    'ph.jam.assetSources': 'Sources art/audio. ex. : \'Freesound pour l’audio, art créé durant la Jam\'',

    // Placeholders — Dynamic editors
    'ph.loop.label': 'Libellé court. ex. : Étape 1 : \'Explorer\' ; Étape 2 : \'Résoudre\'',
    'ph.loop.description': 'Une ligne. ex. : \'Observer puis résoudre\'',
    'ph.features.title': 'Nom de la mécanique. ex. : \'dash / glissement\'',
    'ph.features.purpose': 'Pourquoi elle existe. ex. : \'Déplacement plus rapide\'',
    'ph.features.details': 'Impact joueur. ex. : \'Débloque des zones cachées\'',
    'ph.milestones.date': 'Date cible',
    'ph.milestones.notes': 'Objectifs. ex. : \'Verrouiller la portée. Prototyper le mouvement. Niveau de base.\'',
    'ph.team.role': 'Rôle principal. ex. : \'Game design, Code, etc.\'',
    'ph.team.member': 'Nom du membre',

    // Confirmations & errors
    'confirm.reset': 'Réinitialiser les données du modèle actuel ?',
    'err.json.invalid': 'JSON non valide.',
    'err.image.load': 'Échec du chargement de l’image',
    'err.file.read': 'Échec de lecture du fichier',
    'err.image.type': 'Type d’image non pris en charge',

    // NEW: App messages / popups
    'msg.savedToFolder': 'Enregistré dans le dossier de GDD Wizard',
    'err.fs.exportFailed': 'Impossible d’enregistrer le fichier.',
    'err.fs.importFailed': 'Impossible d’ouvrir le fichier.',
    'msg.imported': 'Projet importé avec succès.',
    'msg.reset': 'Le projet a été réinitialisé.'
  });
})();
