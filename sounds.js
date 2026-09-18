(function () {
  let audio = null;
  function getAudio() {
    if (!audio) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      audio = new AudioCtx();
    }
    if (audio.state === 'suspended') audio.resume();
    return audio;
  }

  function tone(context, start, duration, fromFrequency, toFrequency, gainValue, type) {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(fromFrequency, start);
    oscillator.frequency.exponentialRampToValueAtTime(toFrequency, start + duration);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(gainValue, start + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.01);
  }

  function noise(context, start, duration, gainValue) {
    const frameCount = Math.max(1, Math.floor(context.sampleRate * duration));
    const buffer = context.createBuffer(1, frameCount, context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let index = 0; index < frameCount; index += 1) {
      data[index] = (Math.random() * 2 - 1) * (1 - index / frameCount);
    }
    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(900, start);
    gain.gain.setValueAtTime(gainValue, start);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    source.buffer = buffer;
    source.connect(filter);
    filter.connect(gain);
    gain.connect(context.destination);
    source.start(start);
    source.stop(start + duration + 0.01);
  }

  window.SOUNDS = {
    flap: function () {
      try {
        const context = getAudio();
        if (!context) return;
        const start = context.currentTime;
        tone(context, start, 0.12, 760, 1550, 0.16, 'square');
        tone(context, start + 0.02, 0.1, 420, 700, 0.08, 'sawtooth');
      } catch (error) {}
    },
    score: function () {
      try {
        const context = getAudio();
        if (!context) return;
        const start = context.currentTime;
        tone(context, start, 0.18, 420, 150, 0.12, 'sine');
        tone(context, start, 0.16, 1100, 250, 0.09, 'triangle');
      } catch (error) {}
    },
    crash: function () {
      try {
        const context = getAudio();
        if (!context) return;
        const start = context.currentTime;
        noise(context, start, 0.28, 0.18);
        tone(context, start, 0.28, 180, 48, 0.16, 'sawtooth');
      } catch (error) {}
    }
  };
})();
