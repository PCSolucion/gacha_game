// Sistema de premios del gachapon - 20 premios con distribución por rareza
const prizes = [
    // 1 mítico (rojo)
    { id: 1, name: "Escarabajo Prismático", rarity: "mythic", probability: 1, color: "#ef4444", emoji: "", image: "https://res.cloudinary.com/pcsolucion/image/upload/v1744331185/prismaticscarab_imbhte.png" },

    // 2 legendarios (naranja)
    { id: 2, name: "6x Lingotes Prismáticos", rarity: "legendary", probability: 2, color: "#f59e0b", emoji: "", image: "https://res.cloudinary.com/pcsolucion/image/upload/v1744331102/ingott53_rm71d4.png" },
    { id: 3, name: "3.000 de Oro", rarity: "legendary", probability: 2, color: "#f59e0b", emoji: "", image: "https://res.cloudinary.com/pcsolucion/image/upload/v1756533278/gempoucht1_d7u0c0.png" },

    // 4 épicos (morado)
    { id: 4, name: "2x Ojos de Gorgona", rarity: "epic", probability: 4, color: "#8b5cf6", emoji: "", image: "https://res.cloudinary.com/pcsolucion/image/upload/v1744329134/codeyet1_ybd5ch.png" },
    { id: 5, name: "Matriz de Arma", rarity: "epic", probability: 4, color: "#8b5cf6", emoji: "", image: "https://res.cloudinary.com/pcsolucion/image/upload/v1742502808/matrix-weapont52_sbssqa.png" },
    { id: 6, name: "Matriz de Armadura", rarity: "epic", probability: 4, color: "#8b5cf6", emoji: "", image: "https://res.cloudinary.com/pcsolucion/image/upload/v1742502808/matrix-armort52_frqffm.png" },
    { id: 7, name: "Matriz de Joyería", rarity: "epic", probability: 4, color: "#8b5cf6", emoji: "", image: "https://res.cloudinary.com/pcsolucion/image/upload/v1742502808/matrix-jewelryt52_nsitaq.png" },

    // 5 raros (azul)
    { id: 8, name: "x15 Piedras de Afilar", rarity: "rare", probability: 7, color: "#3b82f6", emoji: "", image: "https://res.cloudinary.com/pcsolucion/image/upload/v1749534263/honingstonet5_efjw2a.png" },
    { id: 9, name: "20x Suero de Regeneración", rarity: "rare", probability: 7, color: "#3b82f6", emoji: "", image: "https://res.cloudinary.com/pcsolucion/image/upload/v1755581751/restorationserumt5_nukizg.png" },
    { id: 10, name: "4x Bloque Prismático", rarity: "rare", probability: 7, color: "#3b82f6", emoji: "", image: "https://res.cloudinary.com/pcsolucion/image/upload/v1744331124/blockt53_ke5yav.png" },
    { id: 11, name: "4x Tela Prismática", rarity: "rare", probability: 7, color: "#3b82f6", emoji: "", image: "https://res.cloudinary.com/pcsolucion/image/upload/v1744331026/clotht53_iogi15.png" },
    { id: 12, name: "5x Cuero Prismático", rarity: "rare", probability: 7, color: "#3b82f6", emoji: "", image: "https://res.cloudinary.com/pcsolucion/image/upload/v1744331061/leathert53_ci8dur.png" },

    // 6 poco comunes (verde)
    { id: 13, name: "1.250 de Oro", rarity: "uncommon", probability: 12, color: "#10b981", emoji: "", image: "https://res.cloudinary.com/pcsolucion/image/upload/v1756532956/coinpile_q2bwi9.png" },
    { id: 14, name: "25x Amanecer del Desierto", rarity: "uncommon", probability: 12, color: "#10b981", emoji: "", image: "https://res.cloudinary.com/pcsolucion/image/upload/v1745981157/agavedrinkt5_r1whsb.png" },
    { id: 15, name: "500x Plátanos", rarity: "uncommon", probability: 12, color: "#10b981", emoji: "", image: "https://res.cloudinary.com/pcsolucion/image/upload/v1742345024/bananat1_g9dr34.png" },
    { id: 16, name: "2x Escarabajos de Oro", rarity: "uncommon", probability: 12, color: "#10b981", emoji: "", image: "https://res.cloudinary.com/pcsolucion/image/upload/v1745981450/goldenscarab_ujkn8w.png" },
    { id: 17, name: "12x Natillas de Plátano", rarity: "uncommon", probability: 12, color: "#10b981", emoji: "", image: "https://res.cloudinary.com/pcsolucion/image/upload/v1749005289/fooddext51_xfpzqk.png" },
    { id: 18, name: "1.500 de Oro", rarity: "uncommon", probability: 12, color: "#10b981", emoji: "", image: "https://res.cloudinary.com/pcsolucion/image/upload/v1756532956/coinpile_q2bwi9.png" },

    // 2 comunes (gris) + 2 añadidos desde otras rarezas (total 4 comunes ahora)
    { id: 19, name: "6x Piedras de Afilar", rarity: "common", probability: 20, color: "#9ca3af", emoji: "", image: "https://res.cloudinary.com/pcsolucion/image/upload/v1749534263/honingstonet5_efjw2a.png" },
    { id: 20, name: "1.000 de Oro", rarity: "common", probability: 20, color: "#9ca3af", emoji: "", image: "https://res.cloudinary.com/pcsolucion/image/upload/v1756532957/coinbundle_r1cf82.png" }
];

// Variables del juego
let isSpinning = false;
let balls = [];
let currentPrize = null;
let ballPhysics = [];

// Elementos del DOM
const crankHandle = document.getElementById('crankHandle');
const spinButton = document.getElementById('spinButton');
const prizeDisplay = document.getElementById('prizeDisplay');
const prizeRarity = document.getElementById('prizeRarity');
const ballsContainer = document.getElementById('ballsContainer');
const prizesList = document.getElementById('prizesList');
const chuteDoor = document.getElementById('chuteDoor');
const particlesContainer = document.getElementById('particlesContainer');
const gachaponMachine = document.querySelector('.gachapon-machine');

// Ajustes de tamaño: aumentamos un 15% (solicitado)
const BASE_DIAMETER = 58; // valor antiguo
const DIAMETER = Math.round(BASE_DIAMETER * 1.15); // ~67px
const RADIUS = DIAMETER / 2;

// Inicializar el juego
function initGame() {
    console.log('Inicializando juego...');
    createBalls();
    displayPrizesList();
    setupEventListeners();
    startBallPhysics();

    // Debug: verificar que todo esté funcionando
    setTimeout(() => {
        console.log('Verificación final:');
        console.log('- Bolas en array:', balls.length);
        console.log('- Bolas en DOM:', ballsContainer.children.length);
        console.log('- Física configurada:', ballPhysics.length);

        // Verificar que las bolas sean visibles
        balls.forEach((ball, index) => {
            const rect = ball.getBoundingClientRect();
            console.log(`Bola ${index + 1}: posición (${ball.style.left}, ${ball.style.top}), visible: ${rect.width > 0}`);
        });
    }, 1000);
}

// Crear bolas en la máquina - cada bola corresponde a un premio específico
function createBalls() {
    // Limpiar contenedor
    ballsContainer.innerHTML = '';
    balls = [];
    ballPhysics = [];

    console.log('Iniciando creación de 20 bolas (una por cada premio)...');

    const totalBalls = 20;

    // Crear una copia de los premios y barajarla para distribución aleatoria
    const shuffledPrizes = [...prizes];
    for (let i = shuffledPrizes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledPrizes[i], shuffledPrizes[j]] = [shuffledPrizes[j], shuffledPrizes[i]];
    }

    // Dimensiones del contenedor (fallback a los valores de diseño)
    const containerW = ballsContainer.clientWidth || 373;
    const containerH = ballsContainer.clientHeight || 287;

    // Empaquetado simple tipo "stack/hex" para que parezcan apiladas en el fondo
    const hSpacing = DIAMETER * 0.85; // solapamiento horizontal para apilado natural
    const vSpacing = DIAMETER * 0.86; // separación vertical para apilar
    const cols = Math.max(1, Math.floor((containerW + (hSpacing - DIAMETER)) / hSpacing));

    let created = 0;
    let row = 0;

    while (created < totalBalls) {
        // Número de elementos en esta fila (alternamos para hex packing)
        const itemsInRow = cols - (row % 2 === 1 ? 1 : 0);
        const rowWidth = (itemsInRow - 1) * hSpacing + DIAMETER;
        const startX = Math.max(8, Math.round((containerW - rowWidth) / 2)); // margen pequeño
        // y: empezamos desde el fondo del contenedor y ascendemos
        const y = Math.round(containerH - DIAMETER - row * vSpacing);

        for (let i = 0; i < itemsInRow && created < totalBalls; i++) {
            const x = Math.round(startX + i * hSpacing + (row % 2 === 1 ? hSpacing / 2 : 0));

            const ball = document.createElement('div');
            ball.className = 'gachapon-ball';

            // Cada bola corresponde a un premio específico
            const assignedPrize = shuffledPrizes[created];

            // Posición calculada (aseguramos que estén dentro del contenedor)
            ball.style.left = x + 'px';
            ball.style.top = y + 'px';

            // Aplicar clase de rareza
            ball.classList.add(`rarity-${assignedPrize.rarity}`);
            ball.classList.add(`ball-${assignedPrize.id}`);
            ball.dataset.prize = JSON.stringify(assignedPrize);
            ball.dataset.prizeId = assignedPrize.id;

            // Añadir emoji del premio dentro de la bola
            const emojiEl = document.createElement('span');
            emojiEl.className = 'ball-emoji';
            emojiEl.textContent = assignedPrize.emoji || '';
            ball.appendChild(emojiEl);

            // Si el premio tiene imagen, mostrarla centrada dentro de la bola
            if (assignedPrize.image) {
                const imgEl = document.createElement('img');
                imgEl.className = 'ball-image';
                imgEl.src = assignedPrize.image;
                imgEl.alt = assignedPrize.name;
                ball.appendChild(imgEl);
            }

            // Animación de flotación con delay aleatorio (suave)
            ball.style.animationDelay = (Math.random() * 4) + 's';

            // Agregar al contenedor
            ballsContainer.appendChild(ball);
            balls.push(ball);

            // Configurar física de la bola
            ballPhysics.push({
                element: ball,
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 0.6, // velocidades iniciales más suaves
                vy: (Math.random() - 0.5) * 0.6,
                radius: RADIUS,
                prize: assignedPrize
            });

            console.log(`Bola ${created + 1} (ID: ${assignedPrize.id}) - ${assignedPrize.name} creada en posición (${x}, ${y})`);
            created++;
        }

        row++;
        // protección por si algo falla
        if (row > 10 && created < totalBalls) {
            // distribuir el resto de forma lineal en la base
            for (; created < totalBalls; created++) {
                const x = 10 + (created % cols) * hSpacing;
                const yFallback = Math.round(containerH - DIAMETER);
                const ball = document.createElement('div');
                ball.className = 'gachapon-ball';
                const assignedPrize = shuffledPrizes[created];
                ball.style.left = x + 'px';
                ball.style.top = yFallback + 'px';
                ball.classList.add(`rarity-${assignedPrize.rarity}`);
                ball.classList.add(`ball-${assignedPrize.id}`);
                ball.dataset.prize = JSON.stringify(assignedPrize);
                ball.dataset.prizeId = assignedPrize.id;
                const emojiEl = document.createElement('span');
                emojiEl.className = 'ball-emoji';
                emojiEl.textContent = assignedPrize.emoji || '';
                ball.appendChild(emojiEl);
                
                // Si el premio tiene imagen, mostrarla centrada dentro de la bola
                if (assignedPrize.image) {
                    const imgEl = document.createElement('img');
                    imgEl.className = 'ball-image';
                    imgEl.src = assignedPrize.image;
                    imgEl.alt = assignedPrize.name;
                    ball.appendChild(imgEl);
                }

                ballsContainer.appendChild(ball);
                balls.push(ball);
                ballPhysics.push({
                    element: ball,
                    x,
                    y: yFallback,
                    vx: (Math.random() - 0.5) * 0.6,
                    vy: (Math.random() - 0.5) * 0.6,
                    radius: RADIUS,
                    prize: assignedPrize
                });
            }
            break;
        }
    }

    console.log(`Total de bolas creadas: ${balls.length}`);
    console.log('Bolas visibles en el DOM:', ballsContainer.children.length);
}

// Sistema de física simplificado para las bolas
function startBallPhysics() {
    function updatePhysics() {
        const containerW = ballsContainer.clientWidth || 373;
        const containerH = ballsContainer.clientHeight || 287;

        // simple pairwise collision (no precisión total, pero evita solapamientos fuertes)
        for (let i = 0; i < ballPhysics.length; i++) {
            const b = ballPhysics[i];

            // Integración simple
            b.x += b.vx;
            b.y += b.vy;

            // Gravedad suave (hacia abajo)
            b.vy += 0.12;

            // Flotación/turbulencia leve
            b.vx += Math.sin(Date.now() * 0.001 + i) * 0.005;

            // Colisiones con bordes (coherente con top-left de CSS)
            const margin = 6; // margen estético
            const minX = margin;
            const maxX = containerW - (DIAMETER) - margin;
            const minY = margin;
            const maxY = containerH - (DIAMETER) - margin;

            if (b.x < minX) {
                b.x = minX;
                b.vx = Math.abs(b.vx) * 0.8;
            } else if (b.x > maxX) {
                b.x = maxX;
                b.vx = -Math.abs(b.vx) * 0.8;
            }

            if (b.y < minY) {
                b.y = minY;
                b.vy = Math.abs(b.vy) * 0.8;
            } else if (b.y > maxY) {
                b.y = maxY;
                b.vy = -Math.abs(b.vy) * 0.75;
                // rozamiento extra al tocar el fondo
                b.vx *= 0.96;
            }

            // Fricción global
            b.vx *= 0.995;
            b.vy *= 0.995;
        }

        // Colisiones simples bola-bola (separación)
        for (let i = 0; i < ballPhysics.length; i++) {
            for (let j = i + 1; j < ballPhysics.length; j++) {
                const a = ballPhysics[i];
                const b = ballPhysics[j];
                const dx = b.x - a.x;
                const dy = b.y - a.y;
                const dist = Math.sqrt(dx * dx + dy * dy) || 0.0001;
                const minDist = a.radius + b.radius - 2; // pequeño solapamiento permitido
                if (dist < minDist) {
                    const overlap = (minDist - dist) / 2;
                    const nx = dx / dist;
                    const ny = dy / dist;
                    // separar
                    a.x -= nx * overlap;
                    a.y -= ny * overlap;
                    b.x += nx * overlap;
                    b.y += ny * overlap;
                    // intercambio de velocidades (inelástico)
                    const vxTotal = a.vx - b.vx;
                    const vyTotal = a.vy - b.vy;
                    a.vx -= vxTotal * 0.2;
                    a.vy -= vyTotal * 0.2;
                    b.vx += vxTotal * 0.2;
                    b.vy += vyTotal * 0.2;
                }
            }
        }

        // Actualizar posición visual
        ballPhysics.forEach(ball => {
            ball.element.style.left = Math.round(ball.x) + 'px';
            ball.element.style.top = Math.round(ball.y) + 'px';
        });

        requestAnimationFrame(updatePhysics);
    }

    requestAnimationFrame(updatePhysics);
}

// Obtener premio aleatorio basado en probabilidades
function getRandomPrize() {
    const totalProbability = prizes.reduce((sum, prize) => sum + prize.probability, 0);
    let random = Math.random() * totalProbability;

    for (const prize of prizes) {
        random -= prize.probability;
        if (random <= 0) {
            return prize;
        }
    }

    // Fallback al primer premio
    return prizes[0];
}

// Obtener premio aleatorio ponderado dentro de una rareza específica
function getRandomPrizeByRarity(targetRarity) {
    const pool = prizes.filter(p => p.rarity === targetRarity);
    if (pool.length === 0) {
        // fallback: usar distribución global
        return getRandomPrize();
    }
    const total = pool.reduce((sum, p) => sum + p.probability, 0);
    let random = Math.random() * total;
    for (const p of pool) {
        random -= p.probability;
        if (random <= 0) return p;
    }
    return pool[0];
}

// Oscurecer color para gradientes
function darkenColor(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

// Aclarar color para gradientes
function lightenColor(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R : 255) * 0x10000 +
        (G < 255 ? G : 255) * 0x100 +
        (B < 255 ? B : 255)).toString(16).slice(1);
}

// Mostrar lista de premios
function displayPrizesList() {
    prizesList.innerHTML = '';

    // Calcular pesos mostrados por premio según rareza
    const countsByRarity = prizes.reduce((acc, p) => {
        acc[p.rarity] = (acc[p.rarity] || 0) + 1;
        return acc;
    }, {});
    const weights = prizes.map(p => ({
        prize: p,
        weight: (rarityWeights[p.rarity] || 1)
    }));
    const total = weights.reduce((a, w) => a + w.weight, 0);

    // Agrupar premios por rareza
    const groupedPrizes = prizes.reduce((groups, prize) => {
        if (!groups[prize.rarity]) groups[prize.rarity] = [];
        groups[prize.rarity].push(prize);
        return groups;
    }, {});

    // Mostrar por orden de rareza
    const rarityOrder = ['mythic', 'legendary', 'epic', 'rare', 'uncommon', 'common'];

    rarityOrder.forEach(rarity => {
        if (groupedPrizes[rarity]) {
            groupedPrizes[rarity].forEach(prize => {
                const w = weights.find(x => x.prize.id === prize.id);
                const percent = w ? ((w.weight / total) * 100) : 0;
                const prizeItem = document.createElement('div');
                prizeItem.className = `prize-item rarity-${prize.rarity}`;
                prizeItem.dataset.prizeName = prize.name;
                const iconHtml = prize.image
                    ? `<img src="${prize.image}" alt="${prize.name}" style="width:16px;height:16px;vertical-align:middle;margin-right:6px;" />`
                    : `${prize.emoji}`;
                prizeItem.innerHTML = `
                    <div class="prize-name">${iconHtml} ${prize.name}</div>
                    <div class="prize-rarity rarity-${prize.rarity}">${prize.rarity.toUpperCase()}</div>
                    <div class="prize-probability">${percent.toFixed(1)}% probabilidad</div>
                `;
                prizesList.appendChild(prizeItem);
            });
        }
    });
}

// Configurar event listeners
function setupEventListeners() {
    // Event listener para el botón de giro (nuevo)
    if (spinButton) {
        spinButton.addEventListener('click', spinGachapon);
    }

    // Event listener para la manivela (mantener por compatibilidad)
    if (crankHandle) {
        crankHandle.addEventListener('click', spinGachapon);
    }

    // Efecto hover en bolas (re-assign después de crear)
    balls.forEach(ball => {
        ball.addEventListener('mouseenter', () => {
            if (!isSpinning) {
                ball.style.transform = 'scale(1.18)'; // acorde al nuevo tamaño
                ball.style.zIndex = '20';
            }
        });

        ball.addEventListener('mouseleave', () => {
            if (!isSpinning) {
                ball.style.transform = 'scale(1)';
                ball.style.zIndex = '3';
            }
        });
    });
}

// Girar el gachapon
function spinGachapon() {
    if (isSpinning) return;

    isSpinning = true;

    // Deshabilitar botones
    if (crankHandle) {
        crankHandle.style.pointerEvents = 'none';
    }
    if (spinButton) {
        spinButton.disabled = true;
        spinButton.classList.add('spinning');
    }

    // Reproducir sonido de giro
    playCrankSound();

    // Selección ponderada por rareza
    currentPrize = getWeightedPrize();
    const selectedBall = balls.find(b => Number(b.dataset.prizeId) === currentPrize.id) || balls[0];

    console.log(`Premio ponderado: ${currentPrize.name} (ID: ${currentPrize.id}, rareza: ${currentPrize.rarity})`);

    // Efectos visuales
    if (crankHandle) {
        crankHandle.classList.add('crank-spin-360');
    }

    // Animar bolas
    animateBalls();

    // Destacar la bola seleccionada
    setTimeout(() => {
        highlightSelectedBall(selectedBall);
    }, 2000);

    // Mostrar premio después de la animación
    setTimeout(() => {
        showPrize();
        openChuteDoor();
        createParticles();
        resetMachine();
    }, 4000);
}

// Animar bolas durante el giro
function animateBalls() {
    // Crear efecto de turbulencia (ajustada para bolas más grandes)
    const turbulenceIntensity = 14;
    const containerW = ballsContainer.clientWidth || 373;
    const containerH = ballsContainer.clientHeight || 287;

    ballPhysics.forEach((ball, index) => {
        // Aplicar fuerza hacia los bordes del contenedor (dinámico)
        const centerX = containerW / 2;
        const centerY = containerH / 2;
        const dx = ball.x - centerX;
        const dy = ball.y - centerY;

        // Fuerza hacia los bordes basada en la distancia del centro
        const edgeForce = 0.35;
        if (Math.abs(dx) > Math.abs(dy)) {
            ball.vx += dx > 0 ? edgeForce : -edgeForce;
        } else {
            ball.vy += dy > 0 ? edgeForce : -edgeForce;
        }

        // Añadir turbulencia aleatoria
        ball.vx += (Math.random() - 0.5) * turbulenceIntensity;
        ball.vy += (Math.random() - 0.5) * turbulenceIntensity;

        // Efecto de giro
        const orbitalSpeed = 0.7;
        const angle = Math.atan2(dy, dx) + orbitalSpeed;
        const force = 1.8;
        ball.vx += Math.cos(angle) * force;
        ball.vy += Math.sin(angle) * force;
    });

    // Efectos visuales mejorados
    balls.forEach((ball, index) => {
        setTimeout(() => {
            // Remover animación CSS
            ball.style.animation = 'none';

            // Aplicar efectos de giro
            ball.style.transform = 'scale(1.18) rotate(720deg)';
            ball.style.transition = 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            ball.style.filter = 'brightness(1.5) saturate(1.2)';
            ball.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.8)';

            // Efecto de pulso
            let pulseCount = 0;
            const pulseInterval = setInterval(() => {
                pulseCount++;
                ball.style.transform = `scale(${1.18 + Math.sin(pulseCount * 0.5) * 0.15}) rotate(${720 + pulseCount * 10}deg)`;

                if (pulseCount >= 20) {
                    clearInterval(pulseInterval);
                }
            }, 50);

            setTimeout(() => {
                ball.style.transform = 'scale(1) rotate(0deg)';
                ball.style.filter = 'brightness(1) saturate(1)';
                ball.style.boxShadow = '';
                ball.style.animation = 'ballFloat 6s ease-in-out infinite';
            }, 1200);
        }, index * 30);
    });

    // Efecto de partículas durante el giro
    createSpinParticles();
}

// Destacar la bola seleccionada
function highlightSelectedBall(selectedBall) {
    // Remover highlight anterior
    balls.forEach(ball => {
        ball.classList.remove('selected-ball');
        ball.style.boxShadow = '';
        ball.style.transform = 'scale(1)';
    });

    // Aplicar highlight a la bola seleccionada
    selectedBall.classList.add('selected-ball');
    selectedBall.style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 215, 0, 0.4)';
    selectedBall.style.transform = 'scale(1.3)';
    selectedBall.style.zIndex = '100';
    selectedBall.style.transition = 'all 0.5s ease';

    // Efecto de pulso
    let pulseCount = 0;
    const pulseInterval = setInterval(() => {
        pulseCount++;
        const intensity = 0.8 + Math.sin(pulseCount * 0.3) * 0.2;
        selectedBall.style.boxShadow = `0 0 ${30 * intensity}px rgba(255, 215, 0, ${intensity}), 0 0 ${60 * intensity}px rgba(255, 215, 0, ${intensity * 0.5})`;

        if (pulseCount >= 20) {
            clearInterval(pulseInterval);
        }
    }, 100);
}

// Pesos por rareza (mayor peso => más probabilidad)
const rarityWeights = {
    mythic: 1,
    legendary: 2,
    epic: 4,
    rare: 7,
    uncommon: 12,
    common: 20
};

function getWeightedPrize() {
    // Calcular pesos por premio distribuyendo el peso de rareza entre los premios de esa rareza
    const countsByRarity = prizes.reduce((acc, p) => {
        acc[p.rarity] = (acc[p.rarity] || 0) + 1;
        return acc;
    }, {});
    const weights = prizes.map(p => {
        const base = rarityWeights[p.rarity] || 1;
        return base;
    });
    const total = weights.reduce((a, b) => a + b, 0);
    let r = Math.random() * total;
    for (let i = 0; i < prizes.length; i++) {
        r -= weights[i];
        if (r <= 0) return prizes[i];
    }
    return prizes[0];
}

// Crear partículas durante el giro
function createSpinParticles() {
    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '3px';
            particle.style.height = '3px';
            particle.style.background = '#ffd700';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1000';

            // Posición aleatoria alrededor de la cúpula
            const angle = (Math.PI * 2 * i) / particleCount;
            const radius = 150 + Math.random() * 50;
            const x = ballsContainer.offsetWidth / 2 + Math.cos(angle) * radius;
            const y = ballsContainer.offsetHeight / 2 + Math.sin(angle) * radius;

            particle.style.left = x + 'px';
            particle.style.top = y + 'px';

            ballsContainer.appendChild(particle);

            // Animar partícula
            particle.style.animation = 'spinParticle 2s ease-out forwards';

            setTimeout(() => {
                particle.remove();
            }, 2000);
        }, i * 100);
    }
}

// Mostrar premio ganado
function showPrize() {
    // Usar elementos dedicados si existen para no tocar la lista de premios
    const prizeName = document.getElementById('prizeDisplay');
    const prizeRarityElement = document.getElementById('prizeRarity');

    if (prizeName && prizeRarityElement && currentPrize) {
        const icon = currentPrize.image
            ? (() => {
                const img = document.createElement('img');
                img.src = currentPrize.image;
                img.alt = currentPrize.name;
                img.style.width = '22px';
                img.style.height = '22px';
                img.style.verticalAlign = 'middle';
                return img;
            })()
            : null;

        if (icon) {
            prizeName.innerHTML = '';
            prizeName.appendChild(icon);
            prizeName.appendChild(document.createTextNode(` ${currentPrize.name}`));
        } else {
            prizeName.textContent = `${currentPrize.emoji} ${currentPrize.name}`;
        }
        prizeRarityElement.textContent = currentPrize.rarity.toUpperCase();
        prizeRarityElement.className = `prize-rarity rarity-${currentPrize.rarity}`;
    }

    // Remover highlight de premio anterior
    const previousHighlighted = document.querySelector('.prize-item.current-prize');
    if (previousHighlighted) {
        previousHighlighted.classList.remove('current-prize');
    }

    // Resaltar el premio actual en la tabla
    const currentPrizeItem = currentPrize ? document.querySelector(`[data-prize-name="${currentPrize.name}"]`) : null;
    if (currentPrizeItem) {
        currentPrizeItem.classList.add('current-prize');

        // Reproducir sonido cuando se ilumina el premio
        playPrizeHighlightSound();

        // Scroll suave hacia el premio resaltado
        currentPrizeItem.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }

    // Efecto de brillo especial para premios raros
    if (currentPrize && (currentPrize.rarity === 'legendary' || currentPrize.rarity === 'mythic')) {
        const prizeDisplayEl = document.querySelector('.prize-display');
        if (prizeDisplayEl) {
            prizeDisplayEl.classList.add('prize-won');
            setTimeout(() => {
                prizeDisplayEl.classList.remove('prize-won');
            }, 1000);
        }
    }
}

// Abrir puerta de salida
function openChuteDoor() {
    if (chuteDoor) {
        chuteDoor.classList.add('open');

        // Crear efecto de premio cayendo
        setTimeout(() => {
            createFallingPrize();
        }, 500);

        // Cerrar puerta después de un tiempo
        setTimeout(() => {
            chuteDoor.classList.remove('open');
        }, 3000);
    } else {
        // fallback visual si no existe chuteDoor
        createFallingPrize();
    }
}

// Crear premio cayendo
function createFallingPrize() {
    if (!currentPrize) return;

    const fallingPrize = document.createElement('div');
    fallingPrize.style.position = 'absolute';
    fallingPrize.style.bottom = '200px';
    fallingPrize.style.left = '50%';
    fallingPrize.style.transform = 'translateX(-50%)';
    fallingPrize.style.fontSize = '40px';
    fallingPrize.style.zIndex = '1000';
    if (currentPrize.image) {
        const img = document.createElement('img');
        img.src = currentPrize.image;
        img.alt = currentPrize.name;
        img.style.width = '40px';
        img.style.height = '40px';
        img.style.objectFit = 'contain';
        fallingPrize.appendChild(img);
    } else {
        fallingPrize.textContent = currentPrize.emoji;
    }
    fallingPrize.style.animation = 'prizeWin 1.5s ease-in-out';
    // Permitir clic para duplicar tamaño temporalmente
    fallingPrize.style.cursor = 'pointer';
    fallingPrize.addEventListener('click', () => {
        const originalTransform = fallingPrize.style.transform || 'translateX(-50%)';
        fallingPrize.style.transition = 'transform 150ms ease, filter 150ms ease';
        fallingPrize.style.transform = originalTransform + ' scale(2)';
        fallingPrize.style.filter = 'drop-shadow(0 0 16px rgba(255, 215, 0, 1))';
        setTimeout(() => {
            fallingPrize.style.transform = originalTransform;
            fallingPrize.style.filter = 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))';
        }, 220);
    });
    fallingPrize.style.filter = 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))';

    gachaponMachine.appendChild(fallingPrize);

    // Animar la caída del premio
    setTimeout(() => {
        fallingPrize.style.transition = 'all 1s ease-in-out';
        fallingPrize.style.bottom = '50px';
        // Al salir de la máquina, mostrarlo al triple de tamaño
        fallingPrize.style.transform = 'translateX(-50%) scale(3)';
    }, 200);

    setTimeout(() => {
        fallingPrize.remove();
    }, 3000);
}

// Crear partículas de celebración
function createParticles() {
    if (!currentPrize) return;

    const particleCount = currentPrize.rarity === 'mythic' ? 50 :
        currentPrize.rarity === 'legendary' ? 30 : 20;

    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'particle';

            // Posición aleatoria alrededor del botón
            const angle = (Math.PI * 2 * i) / particleCount;
            const radius = 100 + Math.random() * 50;
            const x = window.innerWidth / 2 + Math.cos(angle) * radius;
            const y = window.innerHeight / 2 + Math.sin(angle) * radius;

            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.background = currentPrize.color;

            particlesContainer.appendChild(particle);

            // Remover partícula después de la animación
            setTimeout(() => {
                particle.remove();
            }, 2000);
        }, i * 50);
    }
}

// Resetear máquina
function resetMachine() {
    setTimeout(() => {
        isSpinning = false;

        // Restaurar botones
        if (crankHandle) {
            crankHandle.style.pointerEvents = 'auto';
            crankHandle.classList.remove('crank-spin-360');
        }
        if (spinButton) {
            spinButton.disabled = false;
            spinButton.classList.remove('spinning');
        }

        // Remover highlight del premio actual
        const currentHighlighted = document.querySelector('.prize-item.current-prize');
        if (currentHighlighted) {
            currentHighlighted.classList.remove('current-prize');
        }

        // Recrear bolas con nuevos premios
        createBalls();
        setupEventListeners();
    }, 7000);
}

// Efectos de sonido (simulados con vibración en dispositivos móviles)
function playSound(type) {
    if (navigator.vibrate) {
        switch(type) {
            case 'spin':
                navigator.vibrate([100, 50, 100]);
                break;
            case 'win':
                navigator.vibrate([200, 100, 200, 100, 200]);
                break;
            case 'rare':
                navigator.vibrate([300, 100, 300, 100, 300, 100, 300]);
                break;
        }
    }
}

// Reproducir sonido del crank
function playCrankSound() {
    const audio = new Audio('https://res.cloudinary.com/pcsolucion/video/upload/v1757218124/crank_01-87080_fgpjiq.mp3');
    audio.volume = 0.7;
    audio.play().catch(error => {
        console.log('No se pudo reproducir el sonido:', error);
        // Fallback a vibración si no se puede reproducir el audio
        playSound('spin');
    });
}

// Reproducir sonido al iluminar el premio
function playPrizeHighlightSound() {
    const audio = new Audio('https://res.cloudinary.com/pcsolucion/video/upload/v1757217728/coin-drops-and-spins-272429_pror3u.mp3');
    audio.volume = 0.8;
    audio.play().catch(error => {
        console.log('No se pudo reproducir el sonido de premio:', error);
        playSound('win');
    });
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', initGame);

// Efectos adicionales
function addGlowEffect(element, color) {
    element.style.boxShadow = `0 0 20px ${color}, 0 0 40px ${color}, 0 0 60px ${color}`;
    setTimeout(() => {
        element.style.boxShadow = '';
    }, 2000);
}

// Función para cambiar premios (para futuras actualizaciones)
function updatePrizes(newPrizes) {
    prizes.length = 0;
    prizes.push(...newPrizes);
    displayPrizesList();
    createBalls();
}

// Exportar funciones para uso externo
window.GachaponGame = {
    updatePrizes,
    getCurrentPrize: () => currentPrize,
    getPrizes: () => prizes,
    spin: spinGachapon
};