# Funkonome - Modern Web Metronome 🎵

![Funkonome Screenshot](https://img.shields.io/badge/Funkonome-Metronome-ff4dce?style=for-the-badge&logo=javascript&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Version](https://img.shields.io/badge/Version-1.0.0-brightgreen)

A sophisticated, visually stunning metronome built with modern web technologies. Perfect for musicians, producers, and anyone who needs precise timing with style.

## ✨ Features

### 🎨 Visual Design
- **Modern UI**: Clean, dark-themed interface with animated background blobs
- **Real-time Visual Feedback**: Pulsing beat indicator with accent colors
- **Beat Visualization**: Dot indicators for each beat in the measure
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### 🎵 Audio Features
- **Web Audio API**: High-precision timing using browser's audio capabilities
- **Accent Beats**: First beat of each measure has a higher pitch (880Hz vs 440Hz)
- **Adjustable BPM**: Range from 40 to 240 beats per minute
- **Configurable Time Signatures**: 1-12 beats per measure

### 🎛️ Controls
- **Play/Pause Button**: Large, accessible control with visual feedback
- **BPM Slider**: Smooth slider for tempo adjustment
- **Tap Tempo**: Tap along to set the tempo automatically
- **Keyboard Shortcuts**: Spacebar to play/pause, arrow keys for BPM adjustment
- **Measure Control**: Increment/decrement beats per measure

## 🚀 Quick Start

### Live Demo
Open `index.html` in any modern web browser - no installation required!

### Local Development
```bash
# Clone the repository
git clone https://github.com/lostsock1/funkonome.git

# Navigate to the project
cd funkonome

# Open in browser
open index.html  # macOS
# or
start index.html # Windows
# or
xdg-open index.html # Linux
```

## 🎮 Usage

### Basic Controls
1. **Play/Pause**: Click the play button or press Spacebar
2. **Adjust Tempo**: Use the slider or arrow keys (↑/↓)
3. **Change Time Signature**: Use +/- buttons next to "Beats per measure"
4. **Tap Tempo**: Click "TAP TEMPO" button in rhythm

### Keyboard Shortcuts
- **Space**: Play/Pause
- **↑ Arrow**: Increase BPM by 1
- **↓ Arrow**: Decrease BPM by 1

### Visual Indicators
- **Large Circle**: Pulsing beat indicator
  - **Pink Pulse**: First beat of measure (accent)
  - **Blue Pulse**: Subsequent beats
- **Small Dots**: Show current position in measure
- **BPM Display**: Large, readable tempo display

## 🔧 Technical Details

### Architecture
- **Vanilla JavaScript**: No frameworks or dependencies
- **Web Audio API**: For precise timing and audio generation
- **CSS3 Animations**: Smooth transitions and visual effects
- **Modern CSS**: CSS Grid, Flexbox, and custom properties

### Audio Implementation
The metronome uses the Web Audio API to generate precise timing:
- **Oscillator**: Generates sine wave tones
- **Gain Node**: Creates envelope for natural sound decay
- **Scheduler**: Manages timing with lookahead for accuracy
- **Queue System**: Tracks scheduled notes for visual sync

### Code Structure
```
funkonome/
├── index.html          # Main HTML structure
├── app.js             # Metronome logic and audio
├── style.css          # Styling and animations
└── README.md          # This file
```

## 🌐 Browser Support

- **Chrome** 60+ ✅
- **Firefox** 60+ ✅
- **Safari** 14+ ✅
- **Edge** 79+ ✅

*Note: Requires Web Audio API support*

## 🛠️ Development

### Project Structure
- **Metronome Class**: Encapsulates all metronome functionality
- **Event-Driven**: Clean separation of UI and audio logic
- **Modular Design**: Easy to extend or modify

### Extending the Project
Want to add features? Here are some ideas:

1. **Preset Tempos**: Add common tempo presets (Adagio, Andante, Allegro)
2. **Sound Options**: Different click sounds or instrument samples
3. **Subdivisions**: Support for eighth notes, triplets, etc.
4. **Visual Themes**: Light/dark mode or custom color schemes
5. **MIDI Support**: Connect to external MIDI devices
6. **Metronome Patterns**: Custom accent patterns
7. **Practice Tools**: Practice tempo ramps or gradual tempo changes

### Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Web Audio API**: For making browser-based audio possible
- **Google Fonts**: Space Grotesk & Syne for beautiful typography
- **Modern CSS**: For enabling these visual effects
- **All Musicians**: For the inspiration to build better practice tools

## 📞 Support

Found a bug or have a feature request?
- [Open an Issue](https://github.com/lostsock1/funkonome/issues)
- Fork and submit a Pull Request

---

Made with ❤️ for musicians everywhere. Keep practicing! 🎶