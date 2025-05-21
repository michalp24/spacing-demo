import React, { useState } from "react";
import "./style.css";

const CARD_DATA = [
  { id: 1, pretitle: "Pretitle", title: "Feature Title Style as Desktop Heading Smaller", desc: "Create immersive, real-time, physically accurate visualizations with photorealistic rendering. NVIDIA RTX let's design teams iterate quickly to explore ideas and bring amazing products to life precisely as envisioned.", tags: ["Tag1", "Tag2"], img: "https://via.placeholder.com/120x80" },
  { id: 2, pretitle: "Pretitle", title: "Feature Title Style as Desktop Heading Smaller", desc: "Create immersive, real-time, physically accurate visualizations with photorealistic rendering. NVIDIA RTX let's design teams iterate quickly to explore ideas and bring amazing products to life precisely as envisioned.", tags: ["Tag1", "Tag2"], img: "https://via.placeholder.com/120x80" },
  { id: 3, pretitle: "Pretitle", title: "Feature Title Style as Desktop Heading Smaller", desc: "Create immersive, real-time, physically accurate visualizations with photorealistic rendering. NVIDIA RTX let's design teams iterate quickly to explore ideas and bring amazing products to life precisely as envisioned.", tags: ["Tag1", "Tag2"], img: "https://via.placeholder.com/120x80" },
  { id: 4, pretitle: "Pretitle", title: "Feature Title Style as Desktop Heading Smaller", desc: "Create immersive, real-time, physically accurate visualizations with photorealistic rendering. NVIDIA RTX let's design teams iterate quickly to explore ideas and bring amazing products to life precisely as envisioned.", tags: ["Tag1", "Tag2"], img: "https://via.placeholder.com/120x80" },
  { id: 5, pretitle: "Pretitle", title: "Feature Title Style as Desktop Heading Smaller", desc: "Create immersive, real-time, physically accurate visualizations with photorealistic rendering. NVIDIA RTX let's design teams iterate quickly to explore ideas and bring amazing products to life precisely as envisioned.", tags: ["Tag1", "Tag2"], img: "https://via.placeholder.com/120x80" },
];

const spacingOptions = {
  large: "32px",
  medium: "20px",
  small: "8px",
};

function App() {
  const [cardSpacing, setCardSpacing] = useState("medium");
  const [showLayoutGap, setShowLayoutGap] = useState(true);
  const [showInnerPadding, setShowInnerPadding] = useState(true);
  const [showImage, setShowImage] = useState(true);
  const [showTags, setShowTags] = useState(true);
  const [showPretitle, setShowPretitle] = useState(true);

  return (
    <div className="container">
      <div className="main-layout">
        <div className="card-section">
          <h2 className="section-title">Three Features</h2>
          <div className="card-grid">
            {CARD_DATA.map((card, idx) => (
              <Card
                key={card.id}
                data={card}
                spacing={spacingOptions[cardSpacing]}
                showLayoutGap={showLayoutGap}
                showInnerPadding={showInnerPadding}
                showImage={showImage}
                showTags={showTags}
                showPretitle={showPretitle}
              />
            ))}
          </div>
        </div>
        <ControlsPanel
          cardSpacing={cardSpacing}
          setCardSpacing={setCardSpacing}
          showLayoutGap={showLayoutGap}
          setShowLayoutGap={setShowLayoutGap}
          showInnerPadding={showInnerPadding}
          setShowInnerPadding={setShowInnerPadding}
          showImage={showImage}
          setShowImage={setShowImage}
          showTags={showTags}
          setShowTags={setShowTags}
          showPretitle={showPretitle}
          setShowPretitle={setShowPretitle}
        />
      </div>
    </div>
  );
}

function Card({ data, spacing, showLayoutGap, showInnerPadding, showImage, showTags, showPretitle }) {
  return (
    <div className="card" style={{ padding: spacing, transition: "padding 0.3s" }}>
      {showInnerPadding && <div className="guide guide--pink" />}
      {showPretitle && <div className="card-pretitle">{data.pretitle}</div>}
      {showLayoutGap && <div className="guide guide--teal" style={{ top: 32 }} />}
      <div className="card-title">{data.title}</div>
      {showLayoutGap && <div className="guide guide--teal" style={{ top: 64 }} />}
      <div className="card-desc">{data.desc}</div>
      {showTags && <div className="card-tags">{data.tags.join(", ")}</div>}
      {showImage && <img className="card-img" src={data.img} alt="feature" />}
      <button className="card-cta">CTA Button</button>
    </div>
  );
}

function ControlsPanel({
  cardSpacing,
  setCardSpacing,
  showLayoutGap,
  setShowLayoutGap,
  showInnerPadding,
  setShowInnerPadding,
  showImage,
  setShowImage,
  showTags,
  setShowTags,
  showPretitle,
  setShowPretitle,
}) {
  return (
    <div className="controls-panel">
      <h3>Controls</h3>
      <div className="control-group">
        <label>Card Spacing</label>
        <select value={cardSpacing} onChange={e => setCardSpacing(e.target.value)}>
          <option value="large">Large</option>
          <option value="medium">Medium</option>
          <option value="small">Small</option>
        </select>
      </div>
      <div className="control-group">
        <label>Guides</label>
        <div>
          <label>
            <input type="checkbox" checked={showLayoutGap} onChange={e => setShowLayoutGap(e.target.checked)} />
            Layout Gap (Teal)
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" checked={showInnerPadding} onChange={e => setShowInnerPadding(e.target.checked)} />
            Inner Padding (Pink)
          </label>
        </div>
      </div>
      <div className="control-group">
        <label>Layout</label>
        <div>
          <label>
            <input type="checkbox" checked={showImage} onChange={e => setShowImage(e.target.checked)} />
            Image
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" checked={showTags} onChange={e => setShowTags(e.target.checked)} />
            Tags
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" checked={showPretitle} onChange={e => setShowPretitle(e.target.checked)} />
            Pretitle
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
