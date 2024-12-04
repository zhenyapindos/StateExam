// Перевірка підключення кнопки
document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start-button');
  
  if (!startButton) {
    console.error("Кнопка 'Розпочати навчання' не знайдена в документі!");
    return;
  }

  // Додаємо слухач подій для кнопки
  startButton.addEventListener('click', startGame);
});

// Головна функція для початку навчання
function startGame() {
  // Сховати інформаційну панель
  const infoPanel = document.getElementById('info-panel');
  if (infoPanel) {
    infoPanel.style.display = 'none';
  }

  // Побудова графіка y = x^2
  drawGraph(x => x * x, [-3, 3]);

  // Візуалізація області для інтегралу від -2 до 2
  drawIntegralArea(x => x * x, [-2, 2]);
}

// Побудова графіка функції
function createGraph(func, range, step = 0.1) {
  const points = [];
  for (let x = range[0]; x <= range[1]; x += step) {
    points.push(new THREE.Vector3(x, func(x), 0));
  }
  return points;
}

// Візуалізація графіка функції
function drawGraph(func, range) {
  const graphContainer = document.querySelector('#graph-container');
  if (!graphContainer) {
    console.error("Контейнер для графіка не знайдено!");
    return;
  }

  const points = createGraph(func, range);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
  const line = new THREE.Line(geometry, material);
  
  // Додати до сцени
  const graphEntity = document.createElement('a-entity');
  graphEntity.setObject3D('mesh', line);
  graphContainer.appendChild(graphEntity);
}

// Візуалізація області під кривою (інтеграл)
function drawIntegralArea(func, range) {
  const integralArea = document.querySelector('#integral-area');
  if (!integralArea) {
    console.error("Контейнер для області інтегралу не знайдено!");
    return;
  }

  const shape = new THREE.Shape();
  shape.moveTo(range[0], 0);
  for (let x = range[0]; x <= range[1]; x += 0.1) {
    shape.lineTo(x, func(x));
  }
  shape.lineTo(range[1], 0);
  shape.lineTo(range[0], 0);

  const geometry = new THREE.ShapeGeometry(shape);
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide, opacity: 0.5, transparent: true });
  const mesh = new THREE.Mesh(geometry, material);

  const areaEntity = document.createElement('a-entity');
  areaEntity.setObject3D('mesh', mesh);
  integralArea.appendChild(areaEntity);
}
