(function () {
  function drawBackground(ctx, width, height, time) {
    ctx.save();

    const sky = ctx.createLinearGradient(0, 0, 0, height * 0.72);
    sky.addColorStop(0, '#111b4f');
    sky.addColorStop(0.58, '#244f83');
    sky.addColorStop(1, '#4aa5ad');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    const sunY = height * 0.18;
    ctx.fillStyle = '#ffcb59';
    ctx.beginPath();
    ctx.arc(width * 0.27, sunY, Math.min(width, height) * 0.09, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ff8a55';
    ctx.beginPath();
    ctx.arc(width * 0.74, sunY * 0.82, Math.min(width, height) * 0.065, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(255, 239, 155, 0.28)';
    ctx.fillRect(0, height * 0.39, width, height * 0.025);
    ctx.fillStyle = '#143d69';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.54);
    ctx.quadraticCurveTo(width * 0.2, height * 0.47, width * 0.42, height * 0.54);
    ctx.quadraticCurveTo(width * 0.72, height * 0.64, width, height * 0.5);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#0d2e58';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.66);
    ctx.quadraticCurveTo(width * 0.28, height * 0.58, width * 0.53, height * 0.68);
    ctx.quadraticCurveTo(width * 0.78, height * 0.76, width, height * 0.64);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = 'rgba(119, 234, 222, 0.42)';
    ctx.lineWidth = 3;
    const waveShift = (time * 18) % 54;
    for (let row = 0; row < 3; row += 1) {
      const y = height * (0.58 + row * 0.1);
      for (let x = -60 + waveShift; x < width + 60; x += 74) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo(x + 18, y - 7, x + 36, y);
        ctx.stroke();
      }
    }

    ctx.restore();
  }

  function drawGround(ctx, width, height, groundHeight, offset) {
    ctx.save();

    const top = height - groundHeight;
    ctx.fillStyle = '#071936';
    ctx.fillRect(0, top, width, groundHeight);
    ctx.fillStyle = '#164a68';
    ctx.fillRect(0, top, width, 7);

    ctx.strokeStyle = '#39b9b4';
    ctx.lineWidth = 3;
    const shift = -(offset % 64);
    for (let x = shift - 64; x < width + 64; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x + 10, top + 22);
      ctx.lineTo(x + 22, top + 11);
      ctx.lineTo(x + 34, top + 22);
      ctx.lineTo(x + 46, top + 11);
      ctx.lineTo(x + 58, top + 22);
      ctx.stroke();
    }

    ctx.fillStyle = '#e66c58';
    for (let x = shift - 40; x < width + 40; x += 80) {
      ctx.beginPath();
      ctx.arc(x + 18, top + groundHeight * 0.64, 7, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  function drawBird(ctx, x, y, size, velocity) {
    ctx.save();
    ctx.translate(x, y);
    const tilt = Math.max(-0.28, Math.min(0.38, velocity / 900));
    ctx.rotate(tilt);

    const half = size * 0.5;
    const wing = size * 0.27;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#071329';
    ctx.lineWidth = Math.max(2, size * 0.075);

    ctx.fillStyle = '#c6d5e3';
    ctx.beginPath();
    ctx.moveTo(-size * 0.08, -size * 0.1);
    ctx.lineTo(-half + 2, -wing);
    ctx.lineTo(-half + 2, wing);
    ctx.lineTo(-size * 0.08, size * 0.1);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#aabed0';
    ctx.beginPath();
    ctx.moveTo(size * 0.08, -size * 0.1);
    ctx.lineTo(half - 2, -wing);
    ctx.lineTo(half - 2, wing);
    ctx.lineTo(size * 0.08, size * 0.1);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#dfeaf2';
    ctx.beginPath();
    ctx.moveTo(-size * 0.28, 0);
    ctx.lineTo(-size * 0.09, -size * 0.19);
    ctx.lineTo(size * 0.27, -size * 0.12);
    ctx.lineTo(size * 0.43, 0);
    ctx.lineTo(size * 0.27, size * 0.12);
    ctx.lineTo(-size * 0.09, size * 0.19);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#45d7d4';
    ctx.beginPath();
    ctx.arc(size * 0.16, 0, size * 0.075, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }

  function drawPipe(ctx, x, gapTop, gapBottom, pipeWidth, height) {
    ctx.save();
    const gate = '#ef5d61';
    const glow = '#ffcf66';
    const outline = '#10152e';

    ctx.fillStyle = gate;
    ctx.fillRect(x, 0, pipeWidth, gapTop);
    ctx.fillRect(x, gapBottom, pipeWidth, height - gapBottom);

    ctx.strokeStyle = outline;
    ctx.lineWidth = Math.max(2, Math.min(5, pipeWidth * 0.08));
    ctx.strokeRect(x + 2, 2, pipeWidth - 4, Math.max(0, gapTop - 4));
    ctx.strokeRect(x + 2, gapBottom + 2, pipeWidth - 4, Math.max(0, height - gapBottom - 4));

    ctx.fillStyle = glow;
    ctx.fillRect(x + pipeWidth * 0.22, 0, pipeWidth * 0.16, gapTop);
    ctx.fillRect(x + pipeWidth * 0.22, gapBottom, pipeWidth * 0.16, height - gapBottom);
    ctx.fillStyle = '#8e334f';
    ctx.fillRect(x + pipeWidth * 0.72, 0, pipeWidth * 0.1, gapTop);
    ctx.fillRect(x + pipeWidth * 0.72, gapBottom, pipeWidth * 0.1, height - gapBottom);

    ctx.strokeStyle = outline;
    ctx.lineWidth = Math.max(2, pipeWidth * 0.05);
    ctx.beginPath();
    ctx.moveTo(x + pipeWidth * 0.06, gapTop - 4);
    ctx.lineTo(x + pipeWidth * 0.94, gapTop - 4);
    ctx.moveTo(x + pipeWidth * 0.06, gapBottom + 4);
    ctx.lineTo(x + pipeWidth * 0.94, gapBottom + 4);
    ctx.stroke();

    ctx.restore();
  }

  window.SPRITES = {
    drawBackground,
    drawGround,
    drawBird,
    drawPipe
  };
})();
