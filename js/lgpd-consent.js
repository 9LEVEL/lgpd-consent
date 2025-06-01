/**
 * Sistema LGPD Cookie Consent
 * Conformidade com a Lei N° 13.709/18
 */

(function() {
    'use strict';
    
    // Configurações do sistema
    const LGPD_CONFIG = {
        // IDs dos seus serviços (substitua pelos seus)
        googleAnalyticsId: 'GA_MEASUREMENT_ID',
        facebookPixelId: 'YOUR_PIXEL_ID',
        
        // Nome do cookie
        cookieName: 'lgpd_cookie_consent',
        
        // Modo debug (false em produção)
        debug: false
    };
    
    // Sistema de debug
    window.lgpdDebug = {
        // Comando: lgpdDebug.dump()
        dump: function() {
            console.group('🍪 LGPD Cookie Dump');
            console.log('Status:', CookieConsent.validConsent() ? '✅ Válido' : '❌ Inválido');
            console.log('Preferências:', CookieConsent.getUserPreferences());
            console.log('Cookie Raw:', CookieConsent.getCookie());
            console.log('Analytics:', CookieConsent.acceptedCategory('analytics') ? '✅ Aceito' : '❌ Rejeitado');
            console.log('Marketing:', CookieConsent.acceptedCategory('marketing') ? '✅ Aceito' : '❌ Rejeitado');
            console.log('LocalStorage:', localStorage.getItem(LGPD_CONFIG.cookieName));
            console.log('Document.cookie:', document.cookie);
            console.groupEnd();
            return 'Dump completo no console acima ☝️';
        },
        
        // Comando: lgpdDebug.reset()
        reset: function() {
            if (confirm('Resetar todas as preferências de cookies?')) {
                CookieConsent.reset(true);
                location.reload();
                return 'Resetando...';
            }
            return 'Cancelado';
        },
        
        // Comando: lgpdDebug.show()
        show: function() {
            CookieConsent.show(true);
            return 'Banner exibido';
        },
        
        // Comando: lgpdDebug.preferences()
        preferences: function() {
            CookieConsent.showPreferences();
            return 'Preferências abertas';
        },
        
        // Comando: lgpdDebug.accept(category)
        accept: function(category) {
            CookieConsent.acceptCategory(category || 'all');
            return 'Categoria aceita: ' + (category || 'all');
        }
    };
    
    // Função para carregar Google Analytics
    function loadGoogleAnalytics() {
        if (typeof gtag !== 'undefined') return;
        
        const script = document.createElement('script');
        script.src = 'https://www.googletagmanager.com/gtag/js?id=' + LGPD_CONFIG.googleAnalyticsId;
        script.async = true;
        document.head.appendChild(script);
        
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', LGPD_CONFIG.googleAnalyticsId);
        
        if (LGPD_CONFIG.debug) console.log('📊 Google Analytics carregado');
    }
    
    // Função para carregar Facebook Pixel
    function loadFacebookPixel() {
        if (typeof fbq !== 'undefined') return;
        
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        
        fbq('init', LGPD_CONFIG.facebookPixelId);
        fbq('track', 'PageView');
        
        if (LGPD_CONFIG.debug) console.log('📱 Facebook Pixel carregado');
    }
    
    // Inicialização do sistema
    window.addEventListener('load', function() {
        // Pequeno delay para garantir carregamento
        setTimeout(function() {
            if (typeof CookieConsent === 'undefined') {
                console.error('❌ CookieConsent não carregou! Verifique o caminho do arquivo.');
                return;
            }
            
            // Configuração principal
            CookieConsent.run({
                current_lang: 'pt',
                autoclear_cookies: true,
                page_scripts: true,
                mode: 'opt-in',
                revision: 1,
                
                cookie: {
                    name: LGPD_CONFIG.cookieName,
                    domain: location.hostname,
                    path: '/',
                    sameSite: 'Lax',
                    expiresAfterDays: 365
                },
                
                gui_options: {
                    consent_modal: {
                        layout: 'cloud',
                        position: 'bottom center',
                        transition: 'slide'
                    },
                    settings_modal: {
                        layout: 'box',
                        transition: 'slide'
                    }
                },
                
                // Callbacks
                onChange: function(cookie, changed_preferences) {
                    if (LGPD_CONFIG.debug) {
                        console.log('Preferências alteradas:', changed_preferences);
                    }
                },
                
                onFirstAction: function(user_preferences, cookie) {
                    if (LGPD_CONFIG.debug) {
                        console.log('Primeira ação registrada:', user_preferences);
                    }
                },
                
                onAccept: function(cookie) {
                    // Carrega scripts baseado nas preferências
                    if (CookieConsent.acceptedCategory('analytics')) {
                        loadGoogleAnalytics();
                    }
                    if (CookieConsent.acceptedCategory('marketing')) {
                        loadFacebookPixel();
                    }
                },
                
                // Categorias
                categories: {
                    necessary: {
                        enabled: true,
                        readOnly: true
                    },
                    analytics: {
                        autoClear: {
                            cookies: [
                                {
                                    name: /^_ga/,
                                },
                                {
                                    name: '_gid',
                                }
                            ]
                        }
                    },
                    marketing: {
                        autoClear: {
                            cookies: [
                                {
                                    name: '_fbp',
                                }
                            ]
                        }
                    }
                },
                
                // Textos em português
                language: {
                    default: 'pt',
                    translations: {
                        pt: {
                            consentModal: {
                                title: '🍪 Nós usamos cookies!',
                                description: 'Respeitando a Lei Geral de Proteção de Dados Pessoais (LGPD - Lei N° 13.709/18), este site é transparente e permite você gerenciar suas preferências de aceites de cookies e mais. Clique em "preferências" para acessar nosso Portal de Privacidade.',
                                acceptAllBtn: 'Aceitar todos',
                                acceptNecessaryBtn: 'Apenas necessários',
                                showPreferencesBtn: 'Gerenciar preferências',
                                footer: '<a href="/politica-privacidade">Política de Privacidade</a>'
                            },
                            preferencesModal: {
                                title: 'Central de Preferências de Privacidade',
                                acceptAllBtn: 'Aceitar todos',
                                acceptNecessaryBtn: 'Rejeitar todos',
                                savePreferencesBtn: 'Salvar configurações',
                                closeIconLabel: 'Fechar',
                                serviceCounterLabel: 'Serviço|Serviços',
                                sections: [
                                    {
                                        title: 'Uso de Cookies 📢',
                                        description: 'Utilizamos cookies para garantir as funcionalidades básicas do site e melhorar sua experiência online. Você pode escolher ativar/desativar cada categoria quando quiser. Para mais detalhes sobre cookies e outros dados sensíveis, leia nossa <a href="/politica-privacidade" class="cc-link">Política de Privacidade</a>.'
                                    },
                                    {
                                        title: 'Cookies Estritamente Necessários',
                                        description: 'Estes cookies são essenciais para o funcionamento adequado do site. Sem estes cookies, o site não funcionaria corretamente.',
                                        linkedCategory: 'necessary',
                                        cookieTable: {
                                            headers: {
                                                name: 'Nome',
                                                domain: 'Domínio',
                                                expiration: 'Expiração',
                                                description: 'Descrição'
                                            },
                                            body: [
                                                {
                                                    name: LGPD_CONFIG.cookieName,
                                                    domain: location.hostname,
                                                    expiration: '1 ano',
                                                    description: 'Armazena suas preferências de cookies de acordo com a LGPD'
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        title: 'Cookies de Analytics e Desempenho',
                                        description: 'Estes cookies nos permitem medir e melhorar o desempenho do nosso site. Todas as informações coletadas são anônimas.',
                                        linkedCategory: 'analytics',
                                        cookieTable: {
                                            headers: {
                                                name: 'Nome',
                                                domain: 'Domínio',
                                                expiration: 'Expiração',
                                                description: 'Descrição'
                                            },
                                            body: [
                                                {
                                                    name: '_ga',
                                                    domain: '.google.com',
                                                    expiration: '2 anos',
                                                    description: 'Registra um ID único para gerar dados estatísticos'
                                                },
                                                {
                                                    name: '_gid',
                                                    domain: '.google.com',
                                                    expiration: '24 horas',
                                                    description: 'Armazena informações sobre como os visitantes usam o site'
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        title: 'Cookies de Marketing e Publicidade',
                                        description: 'Estes cookies são usados para tornar as mensagens publicitárias mais relevantes para você e seus interesses.',
                                        linkedCategory: 'marketing',
                                        cookieTable: {
                                            headers: {
                                                name: 'Nome',
                                                domain: 'Domínio',
                                                expiration: 'Expiração',
                                                description: 'Descrição'
                                            },
                                            body: [
                                                {
                                                    name: '_fbp',
                                                    domain: '.facebook.com',
                                                    expiration: '3 meses',
                                                    description: 'Usado pelo Facebook para entregar publicidade personalizada'
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        title: 'Mais informações',
                                        description: 'Para qualquer dúvida sobre nossa política de cookies e suas escolhas, por favor entre em contato através do nosso <a href="/contato" class="cc-link">formulário de contato</a>.'
                                    }
                                ]
                            }
                        }
                    }
                }
            });
            
            // Verifica se já tem preferências aceitas e carrega scripts
            setTimeout(function() {
                if (CookieConsent.acceptedCategory('analytics')) {
                    loadGoogleAnalytics();
                }
                if (CookieConsent.acceptedCategory('marketing')) {
                    loadFacebookPixel();
                }
                
                if (LGPD_CONFIG.debug) {
                    console.log('✅ Sistema LGPD inicializado');
                    console.log('💡 Use lgpdDebug.dump() no console para ver o status');
                }
            }, 1000);
            
        }, 100);
    });
    
    // Adiciona links de preferências em elementos com data-cc
    document.addEventListener('DOMContentLoaded', function() {
        // Links para abrir preferências
        document.querySelectorAll('[data-cc="show-preferencesModal"]').forEach(function(element) {
            element.addEventListener('click', function(e) {
                e.preventDefault();
                CookieConsent.showPreferences();
            });
        });
        
        // Links para abrir banner
        document.querySelectorAll('[data-cc="show-consentModal"]').forEach(function(element) {
            element.addEventListener('click', function(e) {
                e.preventDefault();
                CookieConsent.show(true);
            });
        });
    });
    
})();
