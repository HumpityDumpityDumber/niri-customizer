'use strict';

let currentSvg = 'logo.svg';

async function loadSvg(filename) {
  const viewport = document.getElementById('svgViewport');

  const response = await fetch(`./assets/${filename}`);
  const svgText = await response.text();
  viewport.innerHTML = svgText;
}

function applyColor() {
  const viewport = document.getElementById('svgViewport');
  const colorInput = document.getElementById('colorInput');
  const color = colorInput.value;

  viewport.querySelector('g[data-name="body"]').setAttribute('fill', color);
}

function openSvgInNewTab() {
  const viewport = document.getElementById('svgViewport');
  const svgElement = viewport.querySelector('svg');
  
  const svgData = new XMLSerializer().serializeToString(svgElement);
  const blob = new Blob([svgData], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  
  window.open(url, '_blank');
}

document.addEventListener('DOMContentLoaded' , async () => {
  const buttons = document.querySelectorAll('.svg-button');
  const colorInput = document.getElementById('colorInput');
  const openTabButton = document.getElementById('open-svg');

  buttons.forEach(button => {
    button.addEventListener('click', async () => {
      const svgFile = button.dataset.svg;
      currentSvg = svgFile;

      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      await loadSvg(svgFile);
      applyColor();
    });
  });

  colorInput.addEventListener('input', applyColor);

  openTabButton.addEventListener('click', openSvgInNewTab);

  buttons[0]?.classList.add('active');
  await loadSvg(currentSvg);
  applyColor();
});