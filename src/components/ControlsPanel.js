import React, { useState, useRef, useEffect } from "react";

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
  showIcons,
  setShowIcons,
  manualCardTitleFontSize,
  setManualCardTitleFontSize,
  manualSectionTitleFontSize,
  setManualSectionTitleFontSize,
}) {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const controlsRef = useRef(null);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="controls-panel-wrapper">
      <button 
        className="mobile-menu-button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle controls menu"
      >
        <span className="menu-icon"></span>
        <span className="menu-text">Controls</span>
      </button>
      <div className={`controls-panel ${isMenuOpen ? 'menu-open' : ''}`} ref={controlsRef}>
        <button 
          className="mobile-close-button"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close controls menu"
        >
          Close
        </button>
        <div className="controls-panel-groups">
          <div className="control-group">
            <label>Card Spacing</label>
            <div className="control-content">
              <select value={cardSpacing} onChange={e => setCardSpacing(e.target.value)}>
                <option value="large">Large</option>
                <option value="medium">Medium</option>
                <option value="small">Small</option>
              </select>
              <label style={{ marginTop: 8 }}>
                Card Title Font Size (px):
                <input
                  type="number"
                  min="10"
                  max="64"
                  step="1"
                  value={manualCardTitleFontSize}
                  onChange={e => setManualCardTitleFontSize(e.target.value)}
                  placeholder="Auto"
                  style={{ width: 80, marginLeft: 8 }}
                />
              </label>
              <label style={{ marginTop: 8 }}>
                Section Title Font Size (px):
                <input
                  type="number"
                  min="10"
                  max="64"
                  step="1"
                  value={manualSectionTitleFontSize}
                  onChange={e => setManualSectionTitleFontSize(e.target.value)}
                  placeholder="Auto"
                  style={{ width: 80, marginLeft: 8 }}
                />
              </label>
            </div>
          </div>
          <div className="control-group">
            <label>Guides</label>
            <div className="control-content">
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
          </div>
          <div className="control-group">
            <label>Layout</label>
            <div className="control-content">
              <div>
                <label>
                  <input type="checkbox" checked={showImage} onChange={e => {
                    setShowImage(e.target.checked);
                    if (e.target.checked) {
                      setShowIcons(false);
                    }
                  }} />
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
              <div>
                <label>
                  <input type="checkbox" checked={showIcons} onChange={e => {
                    setShowIcons(e.target.checked);
                    if (e.target.checked) {
                      setShowImage(false);
                    }
                  }} />
                  Icons
                </label>
              </div>
            </div>
          </div>
          <div className="control-group">
            <label>Themes</label>
            <div className="control-content">
              <div>
                <label>
                  <input type="checkbox" checked={darkMode} onChange={e => setDarkMode(e.target.checked)} />
                  Dark Mode
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ControlsPanel; 