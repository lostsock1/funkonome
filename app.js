class Metronome {
    constructor() {
        this.audioContext = null;
        this.notesInQueue = [];         // The notes that have been put into the web audio and may or may not have played yet. {note, time}
        this.currentQuarterNote = 0;
        this.tempo = 120;
        this.lookahead = 25.0;          // How frequently to call scheduling function (in milliseconds)
        this.scheduleAheadTime = 0.1;   // How far ahead to schedule audio (sec)
        this.nextNoteTime = 0.0;        // when the next note is due.
        this.beatsPerMeasure = 4;
        this.isPlaying = false;
        this.timerID = null;

        // UI Elements
        this.playBtn = document.getElementById('play-pause');
        this.playIcon = this.playBtn.querySelector('.icon-play');
        this.pauseIcon = this.playBtn.querySelector('.icon-pause');
        this.bpmSlider = document.getElementById('bpm-slider');
        this.bpmValue = document.getElementById('bpm-value');
        this.measureValue = document.getElementById('measure-value');
        this.measureUp = document.getElementById('measure-up');
        this.measureDown = document.getElementById('measure-down');
        this.tapBtn = document.getElementById('tap-tempo');
        this.beatIndicator = document.getElementById('beat-indicator');
        this.subIndicators = document.getElementById('sub-indicators');

        this.tapTimes = [];
        
        this.init();
    }

    init() {
        this.playBtn.addEventListener('click', () => this.toggle());
        this.bpmSlider.addEventListener('input', (e) => this.updateTempo(e.target.value));
        this.measureUp.addEventListener('click', () => this.updateMeasure(1));
        this.measureDown.addEventListener('click', () => this.updateMeasure(-1));
        this.tapBtn.addEventListener('click', () => this.handleTap());

        window.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                this.toggle();
            } else if (e.code === 'ArrowUp') {
                this.updateTempo(this.tempo + 1);
            } else if (e.code === 'ArrowDown') {
                this.updateTempo(this.tempo - 1);
            }
        });

        this.renderDots();
    }

    renderDots() {
        this.subIndicators.innerHTML = '';
        for (let i = 0; i < this.beatsPerMeasure; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            this.subIndicators.appendChild(dot);
        }
    }

    updateTempo(value) {
        this.tempo = Math.min(Math.max(parseInt(value), 40), 240);
        this.bpmSlider.value = this.tempo;
        this.bpmValue.textContent = this.tempo;
    }

    updateMeasure(delta) {
        this.beatsPerMeasure = Math.min(Math.max(this.beatsPerMeasure + delta, 1), 12);
        this.measureValue.textContent = this.beatsPerMeasure;
        this.renderDots();
    }

    handleTap() {
        const now = performance.now();
        this.tapTimes.push(now);
        
        if (this.tapTimes.length > 5) {
            this.tapTimes.shift();
        }

        if (this.tapTimes.length > 1) {
            const intervals = [];
            for (let i = 1; i < this.tapTimes.length; i++) {
                intervals.push(this.tapTimes[i] - this.tapTimes[i-1]);
            }
            const avgInterval = intervals.reduce((a, b) => a + b) / intervals.length;
            const tappedBpm = Math.round(60000 / avgInterval);
            this.updateTempo(tappedBpm);
        }
    }

    nextNote() {
        const secondsPerBeat = 60.0 / this.tempo;
        this.nextNoteTime += secondsPerBeat; 

        this.currentQuarterNote++;
        if (this.currentQuarterNote === this.beatsPerMeasure) {
            this.currentQuarterNote = 0;
        }
    }

    scheduleNote(beatNumber, time) {
        this.notesInQueue.push({ note: beatNumber, time: time });

        const osc = this.audioContext.createOscillator();
        const envelope = this.audioContext.createGain();

        // Accent on the first beat
        osc.frequency.value = (beatNumber === 0) ? 880 : 440;
        
        envelope.gain.value = 1;
        envelope.gain.exponentialRampToValueAtTime(1, time + 0.001);
        envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

        osc.connect(envelope);
        envelope.connect(this.audioContext.destination);

        osc.start(time);
        osc.stop(time + 0.03);
    }

    scheduler() {
        while (this.nextNoteTime < this.audioContext.currentTime + this.scheduleAheadTime) {
            this.scheduleNote(this.currentQuarterNote, this.nextNoteTime);
            this.nextNote();
        }
    }

    start() {
        if (this.isPlaying) return;

        if (this.audioContext === null) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }

        this.isPlaying = true;
        this.currentQuarterNote = 0;
        this.nextNoteTime = this.audioContext.currentTime + 0.05;
        
        this.playIcon.classList.add('hidden');
        this.pauseIcon.classList.remove('hidden');

        this.timerID = setInterval(() => this.scheduler(), this.lookahead);
        this.draw();
    }

    stop() {
        this.isPlaying = false;
        clearInterval(this.timerID);
        
        this.playIcon.classList.remove('hidden');
        this.pauseIcon.classList.add('hidden');
        
        this.beatIndicator.className = 'beat-indicator';
        const dots = this.subIndicators.querySelectorAll('.dot');
        dots.forEach(d => d.classList.remove('active'));
        this.notesInQueue = [];
    }

    toggle() {
        if (this.isPlaying) {
            this.stop();
        } else {
            this.start();
        }
    }

    draw() {
        if (!this.isPlaying) return;

        const currentTime = this.audioContext.currentTime;

        while (this.notesInQueue.length && this.notesInQueue[0].time < currentTime) {
            const currentNote = this.notesInQueue[0].note;
            this.notesInQueue.shift();

            const dots = this.subIndicators.querySelectorAll('.dot');
            
            this.beatIndicator.classList.remove('pulse', 'pulse-secondary');
            void this.beatIndicator.offsetWidth; // Trigger reflow
            
            if (currentNote === 0) {
                this.beatIndicator.classList.add('pulse');
            } else {
                this.beatIndicator.classList.add('pulse-secondary');
            }

            dots.forEach((dot, index) => {
                if (index === currentNote) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        requestAnimationFrame(() => this.draw());
    }
}

const metronome = new Metronome();