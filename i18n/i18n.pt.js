// i18n/i18n.en.js — English dictionary (FULL)
(function(){
  if (!window.I18N) return;
  I18N.registerLanguage('pt','Português');
  I18N.addDict('pt', {
    // App & header
    'app.title': 'GDD Wizard',
    'alt.studioLogo': 'Studio Erza',
    'alt.projectImage': 'Imagem do projeto',
    'alt.footerLogo': 'Logo',
    'header.title': 'GDD Wizard',
    'header.tagline.short': 'Simples. Rápido. Apresentável.',
    'header.tagline.long': 'Preencha os campos e exporte um GDD profissional.',

    // Buttons & chrome
    'btn.exportSave': 'Exportar JSON',
    'btn.importSave': 'Importar JSON',
    'btn.reset': 'Redefinir',
    'btn.print': 'Exportar PDF',
    'btn.prev': '← Voltar',
    'btn.next': 'Avançar →',
    'btn.add': 'Adicionar',
    'btn.remove': 'Remover',
    'btn.uploadImage': 'Enviar imagem',
    'btn.clear': 'Limpar',
    'btn.invertCover': 'Inverter capa',
    'btn.refreshPreview': 'Atualizar prévia',

    // UI & labels
    'aria.progress': 'Progresso do assistente',
    'lang.selector': 'Idioma',
    'ui.diagramSize': 'Tamanho do diagrama',
    'ui.theme': 'Tema',
    'ui.generatingPreview': 'Gerando prévia…',
    'ui.camera': 'Adicionar imagem',
    'ui.minus': '−',
    'ui.plus': '+',
    'ui.arrow.up': '↑',
    'ui.arrow.down': '↓',
    'label.printSize': 'Tamanho de impressão:',
    'theme.light': 'Claro',
    'theme.dark': 'Escuro',

    // Steps
    'step.template.title': 'Escolha um modelo',
    'step.template.hint': 'Alterne entre Básico e Game Jam.',
    'field.templateId.label': 'Modelo',

    // Jam tips (Markdown → HTML at runtime)
    'ui.jamTips.title': '💡 Dicas para equipes remotas (modelo Game Jam)',
    'ui.jamTips.docCaptain': 'Defina um **Capitão do documento** para preencher os campos.',
    'ui.jamTips.discordCall': 'Use uma **chamada no Discord** para agilidade e inclusão.',
    'ui.jamTips.pdfExport': 'Garanta que todos recebam a **exportação em PDF** final.',
    'ui.jamTips.milestoneCheckins': 'Use o GDD para manter a estrutura e **revisar marcos**.',
    'tip.image.dragdrop': 'Dica: arraste e solte uma imagem aqui',

    // Fields (labels)
    'field.project': 'Projeto',
    'field.author': 'Autor',
    'field.theme': 'Tema',
    'field.date': 'Data',
    'field.coverImage': 'Imagem de capa / Logo',

    'field.genre': 'Gênero',
    'field.coreFantasy': 'Fantasia central',
    'field.toneStyle': 'Tom e estilo',
    'field.narrative': 'Narrativa / Tema',
    'field.inspirations': 'Inspirações',

    // ——— New Marketing fields
    'field.hook': 'Gancho',
    'field.platforms': 'Plataformas',
    'field.primaryAudience': 'Público principal',
    'field.secondaryAudience': 'Público secundário',
    'field.strategy': 'Estratégia',

    // Common/editor fields
    'field.exampleSession': 'Exemplo de sessão de jogo',
    'field.playerProgression': 'Progressão do jogador',
    'field.rewards': 'Recompensas',
    'field.pacing': 'Ritmo',
    'field.meaningfulChoices': 'Escolhas significativas',
    'field.consequences': 'Consequências',
    'field.inputs': 'Controles',
    'field.uxNotes': 'Notas de UX',
    'field.engineVersion': 'Motor e versão',
    'field.pluginsTools': 'Plugins / Ferramentas',
    'field.assetSources': 'Fontes de arte / áudio',
    'field.role': 'Função',
    'field.member': 'Membro',
    'field.image': 'Imagem',
    'field.purpose': 'Propósito',
    'field.playerImpact': 'Impacto no jogador',
    'field.notes': 'Notas',

    // Sections
    'section.projectDetails': 'Detalhes do projeto',
    'section.section': 'Seção',
    'section.items': 'Itens',
    'section.groupedNotes': 'Notas agrupadas',
    'section.reviewExport': 'Revisar e exportar',
    'section.gameSummary': 'Resumo do jogo',
    'section.marketing': 'Marketing',          // ← replaces Audience & Goals
    'section.coreLoop': 'Loop principal',
    'section.keyFeatures': 'Mecânicas‑chave',
    'section.progressionRewards': 'Progressão e recompensas',
    'section.playerChoices': 'Escolhas do jogador',
    'section.scopePlanning': 'Planejamento do escopo',
    'section.controlsUX': 'Controles e UX',
    'section.milestones': 'Marcos',
    'section.teamRoles': 'Equipe e funções',
    'section.assetsTools': 'Recursos e ferramentas',
    'section.scope.must': 'Funcionalidades essenciais',
    'section.scope.nice': 'Funcionalidades opcionais',
    'section.scope.future': 'Ideias futuras',
    'section.scope.stretch': 'Metas ambiciosas',
    'section.loopSteps': 'Passos do loop',
    'section.features': 'Mecânicas',

    // Template labels
    'tpl.basic.label': 'GDD básico',
    'tpl.jam.label': 'GDD de Game Jam',

    // Export strings
    'export.genre': 'Gênero',
    'export.coreFantasy': 'Fantasia central',
    'export.toneStyle': 'Tom e estilo',
    'export.narrative': 'Narrativa / Tema',
    'export.inspirations': 'Inspirações',

    // ——— New Marketing export strings
    'export.hook': 'Gancho',
    'export.platforms': 'Plataformas',
    'export.targetAudience': 'Público-alvo',
    'export.primaryAudience': 'Principal:',
    'export.secondaryAudience': 'Secundário:',
    'export.strategy': 'Estratégia',

    // Existing export strings
    'export.loopOverview': 'Visão geral do loop',
    'export.exampleSession': 'Exemplo de sessão de jogo',
    'export.untitledFeature': 'Mecânica sem título',
    'export.purpose': 'Propósito:',
    'export.playerImpact': 'Impacto no jogador:',
    'export.playerProgression': 'Progressão do jogador',
    'export.rewards': 'Recompensas',
    'export.pacing': 'Ritmo',
    'export.meaningfulChoices': 'Escolhas significativas',
    'export.consequences': 'Consequências',
    'export.inputs': 'Controles',
    'export.uxNotes': 'Notas de UX',
    'export.milestone': 'Marco',
    'export.engineVersion': 'Motor e versão',
    'export.pluginsTools': 'Plugins / Ferramentas',
    'export.assetSources': 'Fontes de arte / áudio',
    'export.footer.madeWith': 'Feito com GDD Wizard',
    'export.label.author': 'Autor:',
    'export.label.date': 'Data:',
    'export.label.theme': 'Tema:',
    'export.default.projectTitle': 'Documento de design de jogo',
    'export.loopRepeat': 'Repetir',

    // Placeholders — Basic
    'ph.basic.project': 'Digite o título do jogo',
    'ph.basic.author': 'Digite seu nome',
    'ph.basic.genre': 'Gênero do jogo. ex.: \'plataforma 2D\'',
    'ph.basic.coreFantasy': 'Fantasia do jogador. ex.: \'Sentir que está voando no vento\'',
    'ph.basic.toneStyle': 'Clima e visual. ex.: \'Calmo e brilhante\'',
    'ph.basic.narrative': 'História curta. ex.: \'Consertar o céu\'',
    'ph.basic.inspirations': '2–3 refs. ex.: \'Celeste\'',
    // removed: 'ph.basic.targetAudience' (deprecated with Audience & Goals)
    'ph.basic.exampleSession': 'Como é a sessão? ex.: \'Comece num poste, explore uma ruína, use um eco\'',
    'ph.basic.playerProgression': 'Como o jogador evolui. ex.: \'aprendizado, bônus de atributos, upgrades\'',
    'ph.basic.rewards': 'O que o jogador ganha. ex.: \'Ouro, Pontos de Habilidade, Itens\'',
    'ph.basic.pacing': 'Ritmo de jogo. ex.: \'15–30 min por área\'',
    'ph.basic.meaningfulChoices': 'Grandes escolhas. ex.: \'Melhorar agora ou guardar para depois\'',
    'ph.basic.consequences': 'Quais serão as consequências?',
    'ph.basic.mustHave': 'O que é essencial para funcionar?',
    'ph.basic.niceToHave': 'O que entra se sobrar tempo?',
    'ph.basic.futureIdeas': 'Ideias para o futuro',

    // ——— New Marketing placeholders
    'ph.hook': 'Sua frase de apresentação em uma linha',
    'ph.platforms': 'Onde os jogadores poderão obtê-lo? (ex.: Steam, Itch, console…)',
    'ph.primaryAudience': 'Principal grupo que o jogo busca alcançar (ex.: fãs de exploração retrô, speedrunners)',
    'ph.secondaryAudience': 'Grupos secundários (ex.: streamers, YouTubers, estudantes)',
    'ph.strategy': 'Como e onde você vai divulgar (Discords, subreddits, criadores, anúncios pagos)',

    // Placeholders — Jam
    'ph.jam.project': 'Digite o título do jogo',
    'ph.jam.theme': 'Tema oficial da Jam',
    'ph.jam.genre': 'Gênero do jogo. ex.: \'Plataforma de quebra-cabeça\'',
    'ph.jam.coreFantasy': 'Fantasia do jogador. ex.: \'Sentir que está voando no vento\'',
    'ph.jam.toneStyle': 'Tom e estilo. ex.: \'Calmo e brilhante\'',
    'ph.jam.exampleSession': 'Exemplo de sessão. ex.: \'Comece num poste, explore uma ruína, use um eco\'',
    'ph.jam.scopeMust': 'O que deve estar funcional no final?',
    'ph.jam.scopeNice': 'O que adicionar se sobrar tempo?',
    'ph.jam.scopeStretch': 'O que adicionar se estiver adiantado?',
    'ph.jam.controlsInputs': 'Controles. ex.: \'WASD para mover, Espaço para pular\'',
    'ph.jam.uxNotes': 'Experiência do usuário. ex.: \'Menu de pausa, sliders de áudio, brilho\'',
    'ph.jam.engineVersion': 'Motor e versão. ex.: \'Unreal Engine 5.4\'',
    'ph.jam.pluginsTools.item': 'Nome do plugin ou ferramenta',
	'ph.jam.assetSources.item': 'Fonte de arte ou áudio',


    // Placeholders — Dynamic editors
    'ph.loop.label': 'Rótulo curto. ex.: Passo 1: \'Explorar\'; Passo 2: \'Resolver\'',
    'ph.loop.description': 'Uma linha. ex.: \'Olhar e depois resolver\'',
    'ph.features.title': 'Nome da mecânica. ex.: \'Dash/planar\'',
    'ph.features.purpose': 'Para que serve. ex.: \'Locomoção mais rápida\'',
    'ph.features.details': 'Impacto no jogador. ex.: \'Desbloqueia áreas ocultas\'',
    'ph.milestones.date': 'Data-alvo',
    'ph.milestones.notes': 'Metas. ex.: \'Fechar escopo; prototipar movimento; nível básico.\'',
    'ph.team.role': 'Foco principal. ex.: \'Game design, Programação etc.\'',
    'ph.team.member': 'Nome do membro',

    // Confirmations & errors
    'confirm.reset': 'Redefinir os dados do modelo atual?',
    'err.json.invalid': 'JSON inválido.',
    'err.image.load': 'Falha ao carregar a imagem',
    'err.file.read': 'Falha na leitura do arquivo',
    'err.image.type': 'Tipo de imagem não compatível',

    // NEW: App messages / popups
    'msg.savedToFolder': 'Salvo na pasta do GDD Wizard',
    'err.fs.exportFailed': 'Não foi possível salvar o arquivo.',
    'err.fs.importFailed': 'Não foi possível abrir o arquivo.',
    'msg.imported': 'Projeto importado com sucesso.',
    'msg.reset': 'O projeto foi redefinido.'
  });
})();


// --- Removed keys from previous pt ---
// ph.jam.pluginsTools
// ph.jam.assetSources