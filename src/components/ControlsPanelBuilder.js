import React, { useState, useEffect } from "react";

function ControlsPanelBuilder({
  showLayoutGap,
  setShowLayoutGap,
  showInnerPadding,
  setShowInnerPadding,
  showSectionPadding,
  setShowSectionPadding,
}) {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <div className={`controls-panel ${isMenuOpen ? 'menu-open' : ''}`}>
        <button 
          className="mobile-close-button"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close controls menu"
        >
          Close
        </button>
        <div className="controls-panel-groups">
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
              <div>
                <label>
                  <input type="checkbox" checked={showSectionPadding} onChange={e => setShowSectionPadding(e.target.checked)} />
                  Section Padding (Blue)
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

export default ControlsPanelBuilder; 