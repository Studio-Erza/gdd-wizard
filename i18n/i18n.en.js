// i18n/i18n.en.js — English dictionary (FULL)
(function(){
  if (!window.I18N) return;
  I18N.registerLanguage('en', 'English');
  I18N.addDict('en', {
    // App & header
    'app.title': 'GDD Wizard',
    'alt.studioLogo': 'Studio Erza',
    'alt.projectImage': 'Project image',
    'alt.footerLogo': 'Logo',
    'header.title': 'GDD Wizard',
    'header.tagline.short': 'Simple. Fast. Presentable.',
    'header.tagline.long': 'Fill in prompts and export a professional GDD.',

    // Buttons & chrome
    'btn.exportSave': 'Export JSON',
    'btn.importSave': 'Import JSON',
    'btn.reset': 'Reset',
    'btn.print': 'Print/Save PDF',
    'btn.prev': '← Previous',
    'btn.next': 'Next →',
    'btn.add': 'Add',
    'btn.remove': 'Remove',
    'btn.uploadImage': 'Upload Image',
    'btn.clear': 'Clear',
    'btn.invertCover': 'Invert Cover',
    'btn.refreshPreview': 'Refresh Preview',

    // UI & labels
    'aria.progress': 'Wizard progress',
    'lang.selector': 'Language',
    'ui.diagramSize': 'Diagram Size',
    'ui.theme': 'Theme',
    'ui.generatingPreview': 'Generating preview…',
    'ui.camera': 'Add image',
    'ui.minus': '−',
    'ui.plus': '+',
    'ui.arrow.up': '↑',
    'ui.arrow.down': '↓',
    'label.printSize': 'Print size:',
    'theme.light': 'Light',
    'theme.dark':  'Dark',

    // Steps
    'step.template.title': 'Choose a Template',
    'step.template.hint': 'Switch between Basic and Game Jam layouts.',
    'field.templateId.label': 'Template',

    // Jam tips (Markdown → HTML at runtime)
    'ui.jamTips.title': '💡Tips for Remote Jam Teams (Game Jam Template)',
    'ui.jamTips.docCaptain': 'Pick a **Doc Captain** to fill in prompts.',
    'ui.jamTips.discordCall': 'Use a **Discord Call** for speed and team-wide inclusion.',
    'ui.jamTips.pdfExport': 'Make sure every member gets a copy of the final **PDF Export**.',
    'ui.jamTips.milestoneCheckins': 'Use GDD to maintain structure and for **Milestone Check-ins**.',
    'tip.image.dragdrop': 'Tip: drag & drop an image here',

    // Fields (labels)
    'field.project': 'Project',
    'field.author': 'Author',
    'field.theme': 'Theme',
    'field.date': 'Date',
    'field.coverImage': 'Cover Image / Logo',

    'field.genre': 'Genre',
    'field.coreFantasy': 'Core Fantasy',
    'field.toneStyle': 'Tone & Style',
    'field.narrative': 'Narrative / Theme',
    'field.inspirations': 'Inspirations',

    // ——— New Marketing fields
    'field.hook': 'Hook',
    'field.platforms': 'Platforms',
    'field.primaryAudience': 'Primary Audience',
    'field.secondaryAudience': 'Secondary Audience',
    'field.strategy': 'Strategy',

    // Common/editor fields
    'field.exampleSession': 'Example Gameplay Session',
    'field.playerProgression': 'Player Progression',
    'field.rewards': 'Rewards',
    'field.pacing': 'Pacing',
    'field.meaningfulChoices': 'Meaningful Choices',
    'field.consequences': 'Consequences',
    'field.inputs': 'Inputs',
    'field.uxNotes': 'UX Notes',
    'field.engineVersion': 'Engine & Version',
    'field.pluginsTools': 'Plugins / Tools',
    'field.assetSources': 'Art / Audio Sources',
    'field.role': 'Role',
    'field.member': 'Member',
    'field.image': 'Image',
    'field.purpose': 'Purpose',
    'field.playerImpact': 'Player Impact',
    'field.notes': 'Notes',

    // Sections
    'section.projectDetails': 'Project Details',
    'section.section': 'Section',
    'section.items': 'Items',
    'section.groupedNotes': 'Grouped Notes',
    'section.reviewExport': 'Review & Export',
    'section.gameSummary': 'Game Summary',
    'section.marketing': 'Marketing',          // ← replaces Audience & Goals
    'section.coreLoop': 'Core Loop',
    'section.keyFeatures': 'Key Features',
    'section.progressionRewards': 'Progression & Rewards',
    'section.playerChoices': 'Player Choices',
    'section.scopePlanning': 'Scope Planning',
    'section.controlsUX': 'Controls & UX',
    'section.milestones': 'Milestones',
    'section.teamRoles': 'Team & Roles',
    'section.assetsTools': 'Assets & Tools',
    'section.scope.must': 'Must-Have Features',
    'section.scope.nice': 'Nice-To-Have Features',
    'section.scope.future': 'Future Ideas',
    'section.scope.stretch': 'Stretch Goals',
    'section.loopSteps': 'Loop Steps',
    'section.features': 'Features',

    // Template labels
    'tpl.basic.label': 'Basic GDD',
    'tpl.jam.label': 'Game Jam GDD',

    // Export strings
    'export.genre': 'Genre',
    'export.coreFantasy': 'Core Fantasy',
    'export.toneStyle': 'Tone & Style',
    'export.narrative': 'Narrative / Theme',
    'export.inspirations': 'Inspirations',

    // ——— New Marketing export strings
    'export.hook': 'Hook',
    'export.platforms': 'Platforms',
    'export.targetAudience': 'Target Audience',
    'export.primaryAudience': 'Primary:',
    'export.secondaryAudience': 'Secondary:',
    'export.strategy': 'Strategy',

    // Existing export strings
    'export.loopOverview': 'Loop Overview',
    'export.exampleSession': 'Example Gameplay Session',
    'export.untitledFeature': 'Untitled feature',
    'export.purpose': 'Purpose:',
    'export.playerImpact': 'Player Impact:',
    'export.playerProgression': 'Player Progression',
    'export.rewards': 'Rewards',
    'export.pacing': 'Pacing',
    'export.meaningfulChoices': 'Meaningful Choices',
    'export.consequences': 'Consequences',
    'export.inputs': 'Inputs',
    'export.uxNotes': 'UX Notes',
    'export.milestone': 'Milestone',
    'export.engineVersion': 'Engine & Version',
    'export.pluginsTools': 'Plugins / Tools',
    'export.assetSources': 'Art / Audio Sources',
    'export.footer.madeWith': 'Made with GDD Wizard',
    'export.label.author': 'Author:',
    'export.label.date': 'Date:',
    'export.label.theme': 'Theme:',
    'export.default.projectTitle': 'Game Design Doc',
    'export.loopRepeat': 'Repeat',

    // Placeholders — Basic
    'ph.basic.project': 'Type your game title',
    'ph.basic.author': 'Type your name',
    'ph.basic.genre': "Game genre. e.g., '2D platformer'",
    'ph.basic.coreFantasy': "Player fantasy. e.g., 'The player feels like they're riding the wind'",
    'ph.basic.toneStyle': "Mood & Appearance. e.g., 'Calm and bright'",
    'ph.basic.narrative': "Short story. e.g., 'Fixing the sky'",
    'ph.basic.inspirations': "2–3 refs. e.g., 'Celeste'",
    // removed: 'ph.basic.targetAudience' (deprecated with Audience & Goals)
    'ph.basic.exampleSession': "What will a players' session look like? e.g., 'Start at a post, scout a ruin, ping an echo to reveal tiles'",
    'ph.basic.playerProgression': "How players' grow. e.g., 'learning, stats boosts, upgrades'",
    'ph.basic.rewards': "What players' earn. e.g., 'Gold, Skill Points, Items'",
    'ph.basic.pacing': "Game rhythm. e.g., '15-30 minutes per area.'",
    'ph.basic.meaningfulChoices': "Big choices to make. e.g., 'Upgrade for an easier time now, or save it for an easier time later'",
    'ph.basic.consequences': 'What affect will those choices have?',
    'ph.basic.mustHave': 'What is required for the game to function?',
    'ph.basic.niceToHave': 'What will you include if you have extra time?',
    'ph.basic.futureIdeas': 'Features you may add at a later date',

    // ——— New Marketing placeholders
    'ph.hook': 'Your one-line pitch to communicate value',
    'ph.platforms': 'Where will players get it? (e.g., Steam, Itch, console…) ',
    'ph.primaryAudience': 'Main group this game is targeting? (e.g., fans of retro exploration, speedrunners)',
    'ph.secondaryAudience': 'Secondary groups (e.g., streamers, YouTubers, students)',
    'ph.strategy': 'How and where you’ll promote (Discords, subreddits, creators, paid ads)',

    // Placeholders — Jam
    'ph.jam.project': 'Type your game title',
    'ph.jam.theme': 'Official Game Jam Theme',
    'ph.jam.genre': "Game genre. e.g., 'Puzzle Platformer'",
    'ph.jam.coreFantasy': "Player fantasy. e.g., 'The player feels like they're riding the wind'",
    'ph.jam.toneStyle': "Mood & Appearance. e.g., 'Calm and bright'",
    'ph.jam.exampleSession': "What will a players session look like?. e.g., 'Start at a post, scout a ruin, ping an echo to reveal tiles'",
    'ph.jam.scopeMust': 'What must be functional by the end of the jam?',
    'ph.jam.scopeNice': 'What will you add/expand if time remains?',
    'ph.jam.scopeStretch': 'What will you add if you are way ahead of schedule?',
    'ph.jam.controlsInputs': "Controls. e.g., 'WASD to move, Space to jump'",
    'ph.jam.uxNotes': "User Experience. e.g., 'Pause Menu, Audio Sliders, Brightness Control'",
    'ph.jam.engineVersion': "Engine and version. e.g. 'Unreal Engine 5.4'",
    'ph.jam.pluginsTools': "Plugins and Tools. e.g., 'Paper2D for sprites, GDD Wizard for documentation'",
    // fixed closing quote from your original file:
    'ph.jam.assetSources': "Where your art/audio comes from. e.g., 'Freesound for Audio, Art made during Jam'",

    // Placeholders — Dynamic editors
    'ph.loop.label': "Short label. e.g., Step one: 'Scout' Step two: 'Solve'",
    'ph.loop.description': "One line. e.g., 'Look then solve'",
    'ph.features.title': "Feature name. e.g., 'Dash Glide'",
    'ph.features.purpose': "Why it exists. e.g., 'Faster travel'",
    'ph.features.details': "Player impact. e.g., 'Unlocks hidden areas'",
    'ph.milestones.date': 'Target date',
    'ph.milestones.notes': "Goals. e.g., 'Lock in project scope. Prototype movement, and make basic level/stage.'",
    'ph.team.role': "What will this member focus on for the project? e.g., 'Design, Code, etc.'",
    'ph.team.member': 'Member name',

    // Confirmations & errors
    'confirm.reset': 'Reset current template data?',
    'err.json.invalid': 'Invalid JSON.',
    'err.image.load': 'Image load failed',
    'err.file.read': 'File read failed',
    'err.image.type': 'Unsupported image type',

    // NEW: App messages / popups
    'msg.savedToFolder': 'Saved to your chosen folder.',
    'err.fs.exportFailed': 'Could not save to the chosen folder; a download will start instead.',
    'err.fs.importFailed': 'Could not open from the chosen folder; pick a file manually.',
    'msg.imported': 'Imported your JSON data.',
    'msg.reset': 'Template data reset.'
  });
})();
