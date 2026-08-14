# 💌 Interactive Digital Birthday Scrapbook & Greeting Card

A premium, tactile, interactive digital birthday card and scrapbook built for a female best friend. Designed with a soft, warm aesthetic—featuring torn-paper notes, Polaroid photographs, pressed flowers, pink ribbons, and handwritten typography.

---

## ✨ Features & Narrative Experience Flow

1. **💌 Opening Experience — Handmade Envelope**:
   - Centered cream paper envelope with pink tulips peeking out and a heart seal.
   - Smooth flap-open animation, card rise, and floating floral petals.

2. **🎀 Main Birthday Card Cover**:
   - Handmade textured card header *"happy ♡ Birthday to my favorite human"*.
   - Pressed baby's breath flowers stem, pink bow, and taped Polaroid preview thumbnail.

3. **📸 Scrapbook Photo Gallery**:
   - Scattered Polaroid photos with random rotations (`-4°`, `+3°`, `-2°`, `+5°`), washi tape strips, and handwritten notes.
   - Hover tilt & scale physics with custom paper drop shadows.
   - Full-screen Polaroid Lightbox modal on click.

4. **📖 Interactive Memory Timeline**:
   - *"little moments, big memories ♡"* storybook chapters (*The Beginning*, *The Chaos*, *The Memories*, *Today*).
   - Interactive chapter nodes unfolding story notes, quotes, and memories.

5. **✉️ "Reasons You're Special" Mini-Envelopes**:
   - Interactive mini envelopes (*"open me ♡"*, *"another one..."*, *"okay last one..."*).
   - Click flap to unfold sliding notes with heart animations.

6. **📝 Intimate Handcrafted Letter**:
   - Large torn-paper parchment letter titled *"something I wanted to tell you..."*.
   - Teaser with handwriting reveal animation for an intimate, warm best-friend birthday letter.

7. **🎂 Final Envelope & Birthday Candle Wish**:
   - Final envelope opening into a banner and bouquet illustration.
   - Interactive birthday cake with candle flame: tap to blow out candle, dim screen, trigger floral petal & gold confetti burst, and reveal *"Wish granted. ♡"*.

8. **♫ Ambient Music Toggle**:
   - Floating corner music button with audio playback toggle and visual ring animation.

---

## 🛠️ Built With

- **React 19**
- **Vite 6**
- **Tailwind CSS v4**
- **Framer Motion**
- **Lucide React Icons**
- **Canvas Confetti**

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18+) installed.

### Installation & Setup

1. **Clone or navigate to the repository:**
   ```bash
   cd Greetings-Card
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and visit `http://localhost:5173`.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## ⚙️ How to Customize Content

All text, recipient details, memories, photos, and messages are centralized in **`src/data/cardData.js`**.

- **Change Recipient Name**: Update `recipient.name` and `recipient.nickname`.
- **Change Photos**: Update the `url` fields in `gallery` and `memories` arrays.
- **Change Memory Timeline**: Modify titles, quotes, dates, and details in `memories`.
- **Change Letter Content**: Edit the `letter.body` array.
- **Change Music**: Replace `music.audioUrl` with your favorite audio file.

---

## 📄 License

Made with infinite love & care for best friends everywhere. ♡
