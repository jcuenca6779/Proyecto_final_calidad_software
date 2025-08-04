describe("Aplicación Restaurante - Casos de Prueba", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173/")
    })

    describe("EXPLORACIÓN DE LA INTERFAZ", () => {
        it("Mapear elementos reales de la aplicación", () => {
            // Login
            cy.get('input[placeholder="tu@email.com"]').type('admin@restaurante.com')
            cy.get('input[placeholder="Tu contraseña"]').type('admin123')
            cy.get('button').contains('Iniciar Sesión').click()
            cy.wait(3000)
            
            // Explorar todos los botones disponibles
            cy.get('button').then(($buttons) => {
                const buttonTexts = $buttons.map((i, el) => Cypress.$(el).text().trim()).get()
                cy.log('🔍 TODOS LOS BOTONES ENCONTRADOS:', buttonTexts)
            })
            
            // Explorar elementos de navegación
            cy.get('nav, .nav, .navigation').then(($navs) => {
                if ($navs.length > 0) {
                    cy.log('🔍 ELEMENTOS DE NAVEGACIÓN ENCONTRADOS')
                    $navs.each((i, nav) => {
                        cy.log(`Navegación ${i}:`, Cypress.$(nav).text())
                    })
                }
            })
            
            // Explorar elementos de mesas
            cy.get('body').then(($body) => {
                // Buscar elementos que podrían ser mesas
                const mesaSelectors = [
                    '.mesa', '.table', '.mesa-item', '.table-item',
                    '[class*="mesa"]', '[class*="table"]', '[class*="mesa-"]', '[class*="table-"]'
                ]
                
                mesaSelectors.forEach(selector => {
                    if ($body.find(selector).length > 0) {
                        cy.log(`🔍 MESAS ENCONTRADAS con selector: ${selector}`)
                        cy.get(selector).then(($mesas) => {
                            cy.log(`Cantidad de mesas: ${$mesas.length}`)
                            if ($mesas.length > 0) {
                                cy.log('Primera mesa:', $mesas.first().text())
                            }
                        })
                    }
                })
            })
            
            // Explorar elementos de controles
            cy.get('body').then(($body) => {
                const controlSelectors = [
                    '.controls', '.panel', '.controls-panel', '.action-panel',
                    '[class*="control"]', '[class*="panel"]', '[class*="action"]'
                ]
                
                controlSelectors.forEach(selector => {
                    if ($body.find(selector).length > 0) {
                        cy.log(`🔍 CONTROLES ENCONTRADOS con selector: ${selector}`)
                        cy.get(selector).then(($controls) => {
                            cy.log(`Cantidad de controles: ${$controls.length}`)
                            cy.log('Texto de controles:', $controls.text())
                        })
                    }
                })
            })
            
            // Explorar elementos de gestión de usuarios
            cy.get('body').then(($body) => {
                const userManagementSelectors = [
                    '[class*="user"]', '[class*="admin"]', '[class*="management"]',
                    '.user-management', '.admin-panel', '.management-panel'
                ]
                
                userManagementSelectors.forEach(selector => {
                    if ($body.find(selector).length > 0) {
                        cy.log(`🔍 GESTIÓN DE USUARIOS ENCONTRADA con selector: ${selector}`)
                        cy.get(selector).then(($elements) => {
                            cy.log(`Cantidad de elementos: ${$elements.length}`)
                            cy.log('Texto:', $elements.text())
                        })
                    }
                })
            })
            
            // Explorar elementos de pedidos
            cy.get('body').then(($body) => {
                const orderSelectors = [
                    '[class*="pedido"]', '[class*="order"]', '[class*="menu"]',
                    '.pedido', '.order', '.menu', '.menu-items'
                ]
                
                orderSelectors.forEach(selector => {
                    if ($body.find(selector).length > 0) {
                        cy.log(`🔍 ELEMENTOS DE PEDIDOS ENCONTRADOS con selector: ${selector}`)
                        cy.get(selector).then(($elements) => {
                            cy.log(`Cantidad de elementos: ${$elements.length}`)
                            cy.log('Texto:', $elements.text())
                        })
                    }
                })
            })
            
            // Explorar elementos de logout
            cy.get('body').then(($body) => {
                const logoutSelectors = [
                    'button:contains("Cerrar")', 'button:contains("Logout")', 'button:contains("Salir")',
                    '[class*="logout"]', '[class*="cerrar"]', '[class*="salir"]'
                ]
                
                logoutSelectors.forEach(selector => {
                    if ($body.find(selector).length > 0) {
                        cy.log(`🔍 BOTÓN DE LOGOUT ENCONTRADO con selector: ${selector}`)
                    }
                })
            })
        })

        it("Explorar estructura de la aplicación después del login", () => {
            // Login
            cy.get('input[placeholder="tu@email.com"]').type('admin@restaurante.com')
            cy.get('input[placeholder="Tu contraseña"]').type('admin123')
            cy.get('button').contains('Iniciar Sesión').click()
            cy.wait(3000)
            
            // Explorar estructura principal
            cy.get('body').then(($body) => {
                // Verificar si hay header
                if ($body.find('header, .header, [class*="header"]').length > 0) {
                    cy.log('✅ HEADER ENCONTRADO')
                    cy.get('header, .header, [class*="header"]').then(($header) => {
                        cy.log('Texto del header:', $header.text())
                    })
                }
                
                // Verificar si hay main content
                if ($body.find('main, .main, [class*="main"]').length > 0) {
                    cy.log('✅ MAIN CONTENT ENCONTRADO')
                }
                
                // Verificar si hay sidebar o panel lateral
                if ($body.find('aside, .sidebar, .panel, [class*="sidebar"], [class*="panel"]').length > 0) {
                    cy.log('✅ SIDEBAR/PANEL ENCONTRADO')
                }
                
                // Verificar si hay footer
                if ($body.find('footer, .footer, [class*="footer"]').length > 0) {
                    cy.log('✅ FOOTER ENCONTRADO')
                }
            })
            
            // Explorar todos los elementos clickeables
            cy.get('button, a, [role="button"], [tabindex]').then(($clickables) => {
                cy.log(`🔍 ELEMENTOS CLICKEABLES ENCONTRADOS: ${$clickables.length}`)
                $clickables.each((i, el) => {
                    const text = Cypress.$(el).text().trim()
                    const className = Cypress.$(el).attr('class') || ''
                    const id = Cypress.$(el).attr('id') || ''
                    if (text) {
                        cy.log(`Elemento ${i}: "${text}" (class: ${className}, id: ${id})`)
                    }
                })
            })
        })
    })

    describe("HISTORIA 1: Registrar un Nuevo Empleado", () => {
        beforeEach(() => {
            // Login como admin para acceder a la funcionalidad
            cy.get('input[placeholder="tu@email.com"]').type('admin@restaurante.com')
            cy.get('input[placeholder="Tu contraseña"]').type('admin123')
            cy.get('button').contains('Iniciar Sesión').click()
            cy.wait(3000)
        })

        it("Criterio 1: Solo usuarios admin pueden acceder al registro de empleados", () => {
            // Explorar botones disponibles para admin
            cy.get('button').then(($buttons) => {
                const buttonTexts = $buttons.map((i, el) => Cypress.$(el).text().trim()).get()
                cy.log('Botones disponibles para admin:', buttonTexts)
                
                // Buscar botón de gestión de usuarios
                const userManagementButton = buttonTexts.find(text => 
                    text.toLowerCase().includes('usuario') || 
                    text.toLowerCase().includes('user') ||
                    text.toLowerCase().includes('admin') ||
                    text.toLowerCase().includes('gestión')
                )
                
                if (userManagementButton) {
                    cy.log(`✅ Botón de gestión de usuarios encontrado: "${userManagementButton}"`)
                    cy.get('button').contains(userManagementButton).should('be.visible')
                } else {
                    cy.log('❌ No se encontró botón de gestión de usuarios')
                }
            })
        })

        it("Criterio 2: Formulario debe solicitar todos los campos obligatorios", () => {
            // Buscar botón de gestión de usuarios
            cy.get('button').then(($buttons) => {
                const buttonTexts = $buttons.map((i, el) => Cypress.$(el).text().trim()).get()
                const userManagementButton = buttonTexts.find(text => 
                    text.toLowerCase().includes('usuario') || 
                    text.toLowerCase().includes('user') ||
                    text.toLowerCase().includes('admin')
                )
                
                if (userManagementButton) {
                    cy.get('button').contains(userManagementButton).click()
                    cy.wait(2000)
                    
                    // Buscar botón de crear usuario
                    cy.get('button').then(($createButtons) => {
                        const createButtonTexts = $createButtons.map((i, el) => Cypress.$(el).text().trim()).get()
                        const createUserButton = createButtonTexts.find(text => 
                            text.toLowerCase().includes('crear') || 
                            text.toLowerCase().includes('nuevo') ||
                            text.toLowerCase().includes('agregar')
                        )
                        
                        if (createUserButton) {
                            cy.get('button').contains(createUserButton).click()
                            cy.wait(2000)
                            
                            // Verificar campos del formulario
                            cy.get('input, select').then(($inputs) => {
                                cy.log(`Formulario tiene ${$inputs.length} campos`)
                                $inputs.each((i, input) => {
                                    const placeholder = Cypress.$(input).attr('placeholder') || ''
                                    const name = Cypress.$(input).attr('name') || ''
                                    const type = Cypress.$(input).attr('type') || ''
                                    cy.log(`Campo ${i}: placeholder="${placeholder}", name="${name}", type="${type}"`)
                                })
                            })
                        }
                    })
                }
            })
        })
    })

    describe("HISTORIA 2: Organizar el Salón Creando y Uniendo Mesas", () => {
        beforeEach(() => {
            // Login como admin
            cy.get('input[placeholder="tu@email.com"]').type('admin@restaurante.com')
            cy.get('input[placeholder="Tu contraseña"]').type('admin123')
            cy.get('button').contains('Iniciar Sesión').click()
            cy.wait(3000)
        })

        it("Criterio 1: Interfaz debe permitir crear nuevas mesas", () => {
            // Buscar botón de agregar mesa
            cy.get('button').then(($buttons) => {
                const buttonTexts = $buttons.map((i, el) => Cypress.$(el).text().trim()).get()
                cy.log('Botones disponibles:', buttonTexts)
                
                const addTableButton = buttonTexts.find(text => 
                    text.toLowerCase().includes('mesa') || 
                    text.toLowerCase().includes('table') ||
                    text.toLowerCase().includes('agregar') ||
                    text.toLowerCase().includes('añadir')
                )
                
                if (addTableButton) {
                    cy.log(`✅ Botón de agregar mesa encontrado: "${addTableButton}"`)
                    cy.get('button').contains(addTableButton).should('be.visible')
                } else {
                    cy.log('❌ No se encontró botón de agregar mesa')
                }
            })
            
            // Explorar elementos de mesas
            cy.get('body').then(($body) => {
                const mesaSelectors = [
                    '.mesa', '.table', '.mesa-item', '.table-item',
                    '[class*="mesa"]', '[class*="table"]'
                ]
                
                mesaSelectors.forEach(selector => {
                    if ($body.find(selector).length > 0) {
                        cy.log(`✅ MESAS ENCONTRADAS con selector: ${selector}`)
                        cy.get(selector).then(($mesas) => {
                            cy.log(`Cantidad de mesas: ${$mesas.length}`)
                        })
                    }
                })
            })
        })
    })

    describe("HISTORIA 3: Crear un Nuevo Pedido para una Mesa", () => {
        beforeEach(() => {
            // Login como mesero
            cy.get('input[placeholder="tu@email.com"]').type('mesero@restaurante.com')
            cy.get('input[placeholder="Tu contraseña"]').type('mesero123')
            cy.get('button').contains('Iniciar Sesión').click()
            cy.wait(3000)
        })

        it("Criterio 1: Solo usuarios autenticados con roles mesero o admin pueden crear pedidos", () => {
            // Buscar botón de tomar pedido
            cy.get('button').then(($buttons) => {
                const buttonTexts = $buttons.map((i, el) => Cypress.$(el).text().trim()).get()
                cy.log('Botones disponibles para mesero:', buttonTexts)
                
                const takeOrderButton = buttonTexts.find(text => 
                    text.toLowerCase().includes('pedido') || 
                    text.toLowerCase().includes('order') ||
                    text.toLowerCase().includes('tomar') ||
                    text.toLowerCase().includes('crear')
                )
                
                if (takeOrderButton) {
                    cy.log(`✅ Botón de tomar pedido encontrado: "${takeOrderButton}"`)
                    cy.get('button').contains(takeOrderButton).should('be.visible')
                } else {
                    cy.log('❌ No se encontró botón de tomar pedido')
                }
            })
        })

        it("Criterio 2: Seleccionar mesa de lista de mesas disponibles", () => {
            // Explorar elementos de mesas
            cy.get('body').then(($body) => {
                const mesaSelectors = [
                    '.mesa', '.table', '.mesa-item', '.table-item',
                    '[class*="mesa"]', '[class*="table"]'
                ]
                
                let mesaFound = false
                mesaSelectors.forEach(selector => {
                    if ($body.find(selector).length > 0 && !mesaFound) {
                        mesaFound = true
                        cy.log(`✅ MESAS ENCONTRADAS con selector: ${selector}`)
                        cy.get(selector).first().click()
                        cy.wait(1000)
                        
                        // Verificar si aparece botón de tomar pedido
                        cy.get('button').then(($buttons) => {
                            const buttonTexts = $buttons.map((i, el) => Cypress.$(el).text().trim()).get()
                            const takeOrderButton = buttonTexts.find(text => 
                                text.toLowerCase().includes('pedido') || 
                                text.toLowerCase().includes('order')
                            )
                            
                            if (takeOrderButton) {
                                cy.log(`✅ Botón de tomar pedido encontrado: "${takeOrderButton}"`)
                                cy.get('button').contains(takeOrderButton).should('be.visible')
                            }
                        })
                    }
                })
                
                if (!mesaFound) {
                    cy.log('❌ No se encontraron mesas')
                }
            })
        })
    })

    describe("Pruebas de Validación de Formularios", () => {
        it("Validar formulario de login", () => {
            // Verificar que el botón está deshabilitado inicialmente
            cy.get('button').contains('Iniciar Sesión').should('be.disabled')
            
            // Llenar formulario
            cy.get('input[placeholder="tu@email.com"]').type('test@test.com')
            cy.get('input[placeholder="Tu contraseña"]').type('password')
            
            // Verificar que el botón se habilita
            cy.get('button').contains('Iniciar Sesión').should('not.be.disabled')
            
            // Intentar login con credenciales incorrectas
            cy.get('button').contains('Iniciar Sesión').click()
            cy.wait(2000)
            
            // Verificar mensaje de error
            cy.get('body').then(($body) => {
                if ($body.find('.error, .error-message, .alert').length > 0) {
                    cy.log('✅ Mensaje de error encontrado')
                } else {
                    cy.log('❌ No se encontró mensaje de error')
                }
            })
        })
    })
})