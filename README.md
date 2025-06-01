# 🍪 LGPD Consent

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![LGPD](https://img.shields.io/badge/LGPD-Compliant-brightgreen.svg)
![JavaScript](https://img.shields.io/badge/javascript-vanilla-yellow.svg)

Sistema completo de gerenciamento de cookies em conformidade com a **LGPD** (Lei Geral de Proteção de Dados - Lei N° 13.709/18). Desenvolvido pela [9level](https://9level.com.br).

## 🎯 Características

- ✅ **100% em conformidade com LGPD**
- ✅ **Interface totalmente em português**
- ✅ **Fácil implementação** (apenas 3 arquivos)
- ✅ **Sem dependências** (Vanilla JS)
- ✅ **Responsivo** e acessível
- ✅ **Debug integrado** com comandos no console
- ✅ **Carregamento condicional** de scripts
- ✅ **Suporte a localStorage** (funciona em file://)
- ✅ **Personalizável** via CSS e configurações

## 🚀 Demo

[Ver demonstração ao vivo](https://9level.github.io/lgpd-consent/demo/)

![LGPD Consent Demo](https://via.placeholder.com/800x400/1a1a2e/4a7c7e?text=LGPD+Consent+Demo)

## 📦 Instalação

### Opção 1: Download direto

1. Baixe os arquivos necessários:
   - [cookieconsent.css](https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.css)
   - [cookieconsent.umd.js](https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.umd.js)
   - [lgpd-consent.js](./src/lgpd-consent.js)

2. Adicione ao seu projeto:
```
lgpd-consent/
├── css/
│   └── cookieconsent.css
├── js/
│   └──cookieconsent.umd.js
│   
└── index.html
```

### Opção 2: CDN

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.css">

<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.umd.js"></script>
<script src="https://cdn.jsdelivr.net/gh/9level/lgpd-consent@1.0.0/dist/lgpd-consent.min.js"></script>
```

### Opção 3: NPM (em breve)

```bash
npm install @9level/lgpd-consent
```

## 🔧 Uso Básico

1. **Adicione os arquivos antes do `</body>`:**

```html
<!-- CSS -->
<link rel="stylesheet" href="css/cookieconsent.css">

<!-- JavaScript -->
<script src="js/cookieconsent.umd.js"></script>
```

2. **Configure seus IDs de serviços:**

```javascript
// No início do lgpd-consent.js
const LGPD_CONFIG = {
    googleAnalyticsId: 'G-XXXXXXXXXX',  // Seu ID
    facebookPixelId: '1234567890',      // Seu ID
    cookieName: 'lgpd_cookie_consent',
    debug: false // true para desenvolvimento
};
```

3. **Adicione links de preferências (opcional):**

```html
<a href="#" data-cc="show-preferencesModal">Configurações de Cookies</a>
```

## 📋 Configuração Avançada

### Scripts Condicionais

Carregue scripts apenas quando o usuário consentir:

```html
<!-- Google Analytics -->
<script type="text/plain" data-category="analytics">
    gtag('config', 'G-XXXXXXXXXX');
    console.log('Analytics ativado!');
</script>

<!-- Facebook Pixel -->
<script type="text/plain" data-category="marketing">
    fbq('track', 'Purchase', {value: 100, currency: 'BRL'});
    console.log('Marketing ativado!');
</script>
```

### Personalização de Textos

Edite a seção `translations` no arquivo `lgpd-consent.js`:

```javascript
translations: {
    pt: {
        consentModal: {
            title: '🍪 Nós usamos cookies!',
            description: 'Seu texto personalizado...',
            acceptAllBtn: 'Aceitar todos',
            acceptNecessaryBtn: 'Apenas necessários',
            showPreferencesBtn: 'Gerenciar preferências'
        }
    }
}
```

### Estilos Personalizados

```css
/* Banner principal */
#cc-main .cm {
    font-family: 'Sua Fonte', sans-serif;
    background: #1a1a2e;
}

/* Botões */
#cc-main .cm__btn {
    background-color: #4a7c7e;
    border-radius: 25px;
}

/* Modal de preferências */
#cc-main .pm {
    max-width: 800px;
}
```

## 🐛 Debug

Use os comandos no console do navegador:

```javascript
// Ver status completo
lgpdDebug.dump()

// Resetar preferências
lgpdDebug.reset()

// Mostrar banner
lgpdDebug.show()

// Abrir preferências
lgpdDebug.preferences()

// Aceitar categorias
lgpdDebug.accept('all')        // Aceita todos
lgpdDebug.accept('analytics')   // Aceita só analytics
lgpdDebug.accept('marketing')   // Aceita só marketing
```

### Exemplo de saída do dump():
```
🍪 LGPD Cookie Dump
Status: ✅ Válido
Preferências: {acceptType: "all", acceptedCategories: ["necessary", "analytics", "marketing"]}
Analytics: ✅ Aceito
Marketing: ✅ Aceito
```

## 📚 API JavaScript

```javascript
// Verificar se categoria foi aceita
if (CookieConsent.acceptedCategory('analytics')) {
    // Código que depende de analytics
}

// Aceitar programaticamente
CookieConsent.acceptCategory('all');

// Mostrar banner/preferências
CookieConsent.show();
CookieConsent.showPreferences();

// Obter preferências do usuário
const prefs = CookieConsent.getUserPreferences();

// Verificar consentimento válido
const hasConsent = CookieConsent.validConsent();
```

## 🎨 Layouts Disponíveis

### Banner (consent modal)
- `cloud` (padrão) - Design moderno arredondado
- `box` - Design retangular clássico
- `bar` - Barra no topo/bottom

### Posições
- `bottom center` (padrão)
- `bottom left`
- `bottom right`
- `top`
- `middle`

### Exemplo de configuração:
```javascript
gui_options: {
    consent_modal: {
        layout: 'cloud',
        position: 'bottom center',
        transition: 'slide'
    }
}
```

## 📱 Compatibilidade

- ✅ Chrome 60+
- ✅ Firefox 60+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Opera 50+
- ✅ Chrome Mobile
- ✅ Safari Mobile

## 🤝 Contribuindo

1. Faça um Fork do projeto
2. Crie sua Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Agradecimentos

- [CookieConsent](https://github.com/orestbida/cookieconsent) - Biblioteca base
- [9level](https://9level.com.br) - Desenvolvimento e manutenção
- Comunidade open source

## 📞 Suporte

- 📧 Email: suporte@9level.com.br
- 🐛 Issues: [GitHub Issues](https://github.com/9level/lgpd-consent/issues)
- 📖 Docs: [Wiki](https://github.com/9level/lgpd-consent/wiki)

## 🚀 Roadmap

- [ ] Instalação via NPM
- [ ] Suporte a múltiplos idiomas
- [ ] Dashboard de analytics
- [ ] Integração com WordPress
- [ ] Integração com React/Vue/Angular
- [ ] Modo de auditoria LGPD
- [ ] Gerador de política de privacidade

---

Feito com ❤️ pela [9level](https://9level.com.br) para a comunidade brasileira 🇧🇷
