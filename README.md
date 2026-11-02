# BARBER & CO.

Website editorial de uma barbearia **fictícia**, criado para portfólio. HTML5, CSS3 (Grid/Flexbox) e JavaScript ES6+, sem framework, back-end ou dependências de execução.

## Executar localmente

Abra `index.html` no navegador ou, preferencialmente, sirva a pasta:

```bash
python3 -m http.server 8000
```

Acesse http://localhost:8000. Funciona em Linux/Chromebook com Python 3. Para encerrar o servidor, pressione Ctrl+C. Não há instalação nem compilação.

## Arquivos

- `index.html`: conteúdo semântico, SEO, seções e diálogos acessíveis.
- `css/style.css`: identidade visual, responsividade e animações.
- `js/main.js`: configuração, navegação, galeria e contatos.
- `assets/images/`: fotografias locais otimizadas em JPEG progressivo.
- `assets/favicon.svg`: ícone da marca.
- `tests/check_site.py`: verificações estáticas sem dependências.
- `tests/check_pages.py`: teste HTTP dos recursos locais sob `/site-de-exemplo/`.
- `.nojekyll`: publicação direta dos arquivos estáticos no GitHub Pages.

## Personalizar

Edite textos, descrições, endereço e horários em `index.html`. A história, marca, endereço e depoimentos são demonstrativos; substitua por dados autorizados antes de usar comercialmente. Preços são ilustrativos: altere o objeto `CONFIG.prices` no início de `js/main.js`. Atualize também os valores HTML (fallback sem JavaScript) nos elementos `data-price`.

As cores e fontes estão nas variáveis `:root` de `css/style.css`. As fontes DM Sans e Libre Caslon Display são carregadas pelo Google Fonts; sem conexão, há fallback para Arial e Georgia. As fotografias funcionam sem serviços externos.

Para trocar fotografias, substitua os JPEGs em `assets/images/`, mantendo os nomes, ou edite os caminhos no HTML. Atualize `alt`, `width`, `height` e os créditos. Prefira arquivos comprimidos, hero de até 1920px e demais imagens de até 1000px. A galeria usa a imagem do próprio botão; a ordem e a legenda vêm de `data-gallery` e `data-caption`.

### WhatsApp e redes sociais

No `CONFIG` de `js/main.js`, preencha `whatsapp` com o número **comercial autorizado**, em formato internacional, somente dígitos (DDI + DDD + número). Não use número fictício. A validação verifica apenas o formato; confirme a existência do contato. Vazio ou inválido abre um aviso demonstrativo. Quando configurado, abre `wa.me` com o serviço selecionado na mensagem. A reserva depende da confirmação do estabelecimento; o site não registra agendamentos.

Preencha `CONFIG.social.instagram` e `CONFIG.social.facebook` com URLs HTTPS dos perfis autorizados. Campos vazios mostram um aviso, sem abrir perfis inventados. O conteúdo é público: nunca coloque senhas ou tokens nesse arquivo.

### SEO

Altere título, descrição e Open Graph no `<head>`. Após publicar, use a URL absoluta definitiva em `og:image` e adicione `og:url` e uma URL canônica. Enquanto local, o caminho da imagem social é relativo; robôs de redes sociais podem exigir URL absoluta. Não há marcação de avaliações ou estabelecimento real para evitar informações enganosas.

## GitHub Pages

1. Envie os arquivos para um repositório GitHub, mantendo `index.html` na raiz.
2. Em **Settings → Pages**, escolha **Deploy from a branch**.
3. Selecione a branch desejada (normalmente `main`) e a pasta **/ (root)**, depois salve.
4. Aguarde o endereço fornecido pelo GitHub. O endereço esperado é `https://Trustkkj.github.io/site-de-exemplo/`.

O `index.html` está na raiz. Imagens, favicon, CSS e JavaScript usam caminhos relativos, compatíveis com `/site-de-exemplo/`. O arquivo `.nojekyll` desativa o processamento Jekyll; não há etapa de build, servidor de aplicação ou dependências para instalar. O Google Fonts é uma dependência externa opcional, com fontes de fallback locais.

Nenhuma publicação é realizada automaticamente por este projeto. Ainda é necessário enviar os arquivos e ativar o Pages nas configurações do repositório.

## Interações e acessibilidade

Menu mobile com estado expandido e fechamento por Escape, clique externo ou navegação; header fixo; âncoras; galeria com setas, Escape e foco contido pelo `<dialog>` nativo; foco visível; link para pular conteúdo; efeitos que respeitam `prefers-reduced-motion`; imagens inferiores com lazy loading; copyright dinâmico. Navegadores atuais com suporte a `<dialog>` são necessários para os diálogos. Sem JS, os textos, preços e links entre seções continuam disponíveis; galeria e botões dependem de JS.

Não há formulário de envio fictício, banco de dados, autenticação ou sistema real de reservas. Todas as avaliações exibidas são exemplos fictícios identificados na interface.

## Fotografias e licença

As quatro fotografias são **ilustrativas** e não representam funcionários, clientes, serviços realizados ou instalações da BARBER & CO., que é uma **barbearia fictícia**. Os arquivos são locais; o site não depende do Unsplash para exibi-los.

Fontes e licenças verificadas em **02/11/2026**. Cada página original abaixo identifica o fotógrafo e declara a aplicação da **Unsplash License**. Essa licença permite uso comercial e não comercial sem atribuição obrigatória; os créditos são mantidos aqui para documentar a procedência. Não é domínio público. Consulte o [texto da licença](https://unsplash.com/license).

| Arquivo | Fotógrafo | Página original | Arquivo de origem | Licença / uso comercial |
|---|---|---|---|---|
| `assets/images/hero.jpg` | Allef Vinicius | [IvQeAVeJULw — man sitting on barber’s chair](https://unsplash.com/photos/man-sitting-on-barbers-chair-IvQeAVeJULw) | [JPEG](https://images.unsplash.com/photo-1503951914875-452162b0f3f1) | [Unsplash License](https://unsplash.com/license); permitido |
| `assets/images/barbearia.jpg` | Agustin Fernandez | [1Pmp9uxK8X8 — barber trimming hair with straight razor](https://unsplash.com/photos/barber-trimming-hair-with-straight-razor-1Pmp9uxK8X8) | [JPEG](https://images.unsplash.com/photo-1599351431202-1e0f0137899a) | [Unsplash License](https://unsplash.com/license); permitido |
| `assets/images/corte.jpg` | Agustin Fernandez | [Znyjl9pbaUs — yellow and black truck scale model](https://unsplash.com/photos/yellow-and-black-truck-scale-model-Znyjl9pbaUs) | [JPEG](https://images.unsplash.com/photo-1599351431613-18ef1fdd27e1?w=1000&q=85&fm=jpg) | [Unsplash License](https://unsplash.com/license); permitido |
| `assets/images/barba.jpg` | delfina pan | [L5fQhBfTQPs — man in black and gray jacket sitting on barber chair](https://unsplash.com/photos/man-in-black-and-gray-jacket-sitting-on-barber-chair-L5fQhBfTQPs) | [JPEG](https://images.unsplash.com/photo-1605497788116-1f20ad55ea7f?w=1000&q=85&fm=jpg) | [Unsplash License](https://unsplash.com/license); permitido |

O título da página `Znyjl9pbaUs` é o título publicado no Unsplash, apesar de a fotografia mostrar máquinas e acessórios de corte sobre uma bancada.

### Substituições nesta preparação

Somente as duas fotografias com licença comercial não comprovada na auditoria anterior foram substituídas:

- `corte.jpg`: saiu `photo-1621605815971-fbc98d665033`; entrou `photo-1599351431613-18ef1fdd27e1`, de Agustin Fernandez.
- `barba.jpg`: saiu `photo-1622287162716-f311baa1a2b8`; entrou `photo-1605497788116-1f20ad55ea7f`, de delfina pan.

`hero.jpg` e `barbearia.jpg` foram preservadas. Os nomes dos arquivos e os estilos da galeria foram mantidos; as descrições e dimensões HTML foram atualizadas para os novos arquivos.

### Limites e pendências de licenciamento

A licença fotográfica não concede automaticamente direitos sobre pessoas reconhecíveis, marcas, logotipos, tatuagens e outras obras presentes nas imagens. Veja a seção 5 dos [Termos do Unsplash](https://unsplash.com/terms). Não há documentos de autorização desses terceiros no repositório.

- `hero.jpg`: rosto parcial do cliente, tatuagem do profissional e grafismos na capa.
- `barbearia.jpg`: cliente parcialmente reconhecível, tatuagens, inscrição “TRU” na navalha e desenhos na capa.
- `corte.jpg`: sem pessoas visíveis; equipamentos com inscrições e marcas, incluindo o emblema da Wahl.
- `barba.jpg`: pessoas com rostos parcialmente cobertos por máscaras, logotipos na capa e no avental, produtos e fotografia decorativa no espelho.

Essas permissões continuam **não comprovadas** e precisam ser avaliadas conforme o uso, especialmente antes de adaptar o projeto para publicidade de um estabelecimento real. Os avisos de ficção e de fotos ilustrativas não substituem autorizações necessárias.

Favicon e quatro ícones SVG são declarados como criados no código do projeto. A autoria/titularidade e uma licença expressa desses elementos ainda precisam ser documentadas; permanecem com **licença não verificada**. Não foram substituídos porque esta alteração se limita às fotografias sem licença comercial comprovada.

## Verificação

```bash
node --check js/main.js
python3 tests/check_site.py
python3 tests/check_pages.py
```

O teste estático confere IDs duplicados, destinos de âncoras, arquivos locais, descrições e dimensões das imagens estáticas, h1 único, integridade básica dos JPEGs, opção de movimento reduzido e contato inicialmente vazio. Não substitui avaliação visual ou auditoria WCAG.

Revisão manual recomendada: testar 320, 375, 390, 430, 768, 1024 e 1440px; verificar ausência de rolagem horizontal; percorrer todos os controles com Tab; testar menu e Escape; abrir cada foto, navegar com setas e conferir retorno do foco; validar avisos de WhatsApp/redes; simular movimento reduzido e conferir imagens e fontes. Confira também contraste e aparência em Safari, Firefox e Chrome.

### Resultado nesta preparação

Validação estática, sintaxe JavaScript e carregamento HTTP sob `/site-de-exemplo/` passaram nesta preparação. A página e os sete recursos locais retornaram HTTP 200 com conteúdo correto. O teste HTTP verifica HTML, CSS, JavaScript, favicon, quatro fotografias e resolução dos recursos locais. Não substitui testes de teclado, interação e viewport em um navegador; o roteiro manual acima permanece recomendado.
