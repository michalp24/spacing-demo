import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import "./style.css";
import Card from "./components/Card";
import ControlsPanel from "./components/ControlsPanel";
import { CARD_DATA, SPACING_OPTIONS } from "./constants/cardData";
import { getSectionTitleFontSize } from "./utils/fontSizeUtils";

function App() {
  const [cardSpacing, setCardSpacing] = useState("medium");
  const [showLayoutGap, setShowLayoutGap] = useState(true);
  const [showInnerPadding, setShowInnerPadding] = useState(true);
  const [showImage, setShowImage] = useState(true);
  const [showTags, setShowTags] = useState(false);
  const [showPretitle, setShowPretitle] = useState(true);
  const [showIcons, setShowIcons] = useState(false);
  const [manualCardTitleFontSize, setManualCardTitleFontSize] = useState("");
  const [manualSectionTitleFontSize, setManualSectionTitleFontSize] = useState("");
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 1023);
  
  // Viewport size effect
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 1023);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Ref and state for computed section title font size
  const sectionTitleRef = useRef(null);
  const [computedSectionTitleFontSize, setComputedSectionTitleFontSize] = useState(getSectionTitleFontSize());

  // Dynamic card height logic
  const cardRefs = useRef([]);
  const [maxHeight, setMaxHeight] = useState(0);

  // Responsive section title font size
  const [sectionTitleFontSize, setSectionTitleFontSize] = useState(getSectionTitleFontSize());
  useEffect(() => {
    const handleResize = () => setSectionTitleFontSize(getSectionTitleFontSize());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update computed font size after render
  useLayoutEffect(() => {
    if (sectionTitleRef.current) {
      const computed = window.getComputedStyle(sectionTitleRef.current);
      const fontSize = parseFloat(computed.fontSize);
      setComputedSectionTitleFontSize(fontSize);
      // Set CSS variable for section title size
      document.documentElement.style.setProperty('--section-title-size', `${fontSize}px`);
    }
  }, [sectionTitleFontSize, manualSectionTitleFontSize]);

  useLayoutEffect(() => {
    if (cardRefs.current.length) {
      const heights = cardRefs.current.map(ref => ref ? ref.offsetHeight : 0);
      setMaxHeight(Math.max(...heights));
    }
  }, [cardSpacing, showLayoutGap, showInnerPadding, showImage, showTags, showPretitle, manualCardTitleFontSize]);

  // Use manual section title font size if set
  const effectiveSectionTitleFontSize = manualSectionTitleFontSize && !isNaN(Number(manualSectionTitleFontSize))
    ? Number(manualSectionTitleFontSize)
    : sectionTitleFontSize;

  return (
    <div className="container">
      <div className="main-layout">
        <div className="controls-panel-wrapper">
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
            showIcons={showIcons}
            setShowIcons={setShowIcons}
            manualCardTitleFontSize={manualCardTitleFontSize}
            setManualCardTitleFontSize={setManualCardTitleFontSize}
            manualSectionTitleFontSize={manualSectionTitleFontSize}
            setManualSectionTitleFontSize={setManualSectionTitleFontSize}
          />
        </div>
        <div className="card-section-centered">
          <div className="card-section" data-spacing={cardSpacing}>
            <div className="section-pretitle">Demo</div>
            {/* Section Title Layout Gap Above */}
            <div
              className={`section-layout-gap${!showLayoutGap ? ' section-layout-gap-off' : ''}`}
              style={{ height: (computedSectionTitleFontSize * 1.25) * (1.25 / 4) }}
            />
            <h2 
              ref={sectionTitleRef}
              className="section-title"
              style={{
                fontSize: manualSectionTitleFontSize && !isNaN(Number(manualSectionTitleFontSize))
                  ? `${manualSectionTitleFontSize}px`
                  : `${sectionTitleFontSize}px`
              }}
            >
              Media Teaser Title
            </h2>
            {/* Section Title Layout Gap Below */}
            <div
              className={`section-layout-gap${!showLayoutGap ? ' section-layout-gap-off' : ''}`}
              style={{ height: computedSectionTitleFontSize * 1.25 }}
            />
            <div className="card-grid">
              {CARD_DATA.map((card, idx) => (
                <Card
                  key={card.id}
                  ref={el => cardRefs.current[idx] = el}
                  data={card}
                  spacing={SPACING_OPTIONS[cardSpacing]}
                  showLayoutGap={showLayoutGap}
                  showInnerPadding={showInnerPadding}
                  showImage={showImage}
                  showTags={showTags}
                  showPretitle={showPretitle}
                  showIcons={showIcons}
                  cardSpacing={cardSpacing}
                  maxHeight={maxHeight}
                  manualCardTitleFontSize={manualCardTitleFontSize}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="card-section-centered">
          <div className="card-section-alt" data-spacing={cardSpacing}>
            <div className="section-pretitle">Demo</div>
            {/* Section Title Layout Gap Above */}
            <div
              className={`section-layout-gap${!showLayoutGap ? ' section-layout-gap-off' : ''}`}
              style={{ height: (computedSectionTitleFontSize * 1.25) / 4 }}
            />
            <h2 
              ref={sectionTitleRef}
              className="section-title"
              style={{
                fontSize: manualSectionTitleFontSize && !isNaN(Number(manualSectionTitleFontSize))
                  ? `${manualSectionTitleFontSize}px`
                  : `${sectionTitleFontSize}px`
              }}
            >
              Teaser Title
            </h2>
            {/* Section Title Layout Gap Below */}
            <div
              className={`section-layout-gap${!showLayoutGap ? ' section-layout-gap-off' : ''}`}
              style={{ height: computedSectionTitleFontSize * 1.25 }}
            />
            <div className="card-grid-alt">
              {CARD_DATA.map((card, idx) => (
                <React.Fragment key={`alt-${card.id}`}>
                  <Card
                    ref={el => cardRefs.current[idx] = el}
                    data={card}
                    spacing={SPACING_OPTIONS[cardSpacing]}
                    showLayoutGap={showLayoutGap}
                    showInnerPadding={showInnerPadding}
                    showImage={showImage}
                    showTags={showTags}
                    showPretitle={showPretitle}
                    showIcons={showIcons}
                    cardSpacing={cardSpacing}
                    maxHeight={maxHeight}
                    manualCardTitleFontSize={manualCardTitleFontSize}
                  />
                  {/* Add layout gap after each row on desktop, after each card on mobile/tablet */}
                  {((window.innerWidth <= 639 && idx < CARD_DATA.length - 1) ||
                    (!isMobileView && 
                     ((cardSpacing === 'small' && (idx + 1) % 4 === 0) ||
                      (cardSpacing === 'large' && (idx + 1) % 2 === 0) ||
                      (cardSpacing === 'medium' && (idx + 1) % 3 === 0)) && 
                     idx < CARD_DATA.length - 1) ||
                    (window.innerWidth > 639 && window.innerWidth <= 1023 && 
                     ((cardSpacing === 'small' && (idx + 1) % 2 === 0) ||
                      (cardSpacing === 'large' && (idx + 1) % 2 === 0) ||
                      (cardSpacing === 'medium' && (idx + 1) % 2 === 0)) &&
                     idx < CARD_DATA.length - 1)) && (
                    <div 
                      className={`layout-gap-alt${!showLayoutGap ? ' layout-gap-off' : ''}`}
                      style={{ 
                        height: `${computedSectionTitleFontSize * 1.25}px`,
                        width: '100%',
                        gridColumn: '1 / -1'
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="section-spacer"></div>

        <div className="text-section-centered">
          <div className="text-section">
            <div className="section-pretitle">Demo</div>
            {/* Section Title Layout Gap Above */}
            <div
              className={`section-layout-gap${!showLayoutGap ? ' section-layout-gap-off' : ''}`}
              style={{ height: (computedSectionTitleFontSize * 1.25) * (1.25 / 4) }}
            />
            <h2 
              ref={sectionTitleRef}
              className="section-title"
              style={{
                fontSize: manualSectionTitleFontSize && !isNaN(Number(manualSectionTitleFontSize))
                  ? `${manualSectionTitleFontSize}px`
                  : `${sectionTitleFontSize}px`
              }}
            >
              Section Title
            </h2>
            {/* Section Title Layout Gap Below */}
            <div
              className={`section-layout-gap-bottom${!showLayoutGap ? ' section-layout-gap-off' : ''}`}
              style={{ height: (computedSectionTitleFontSize * 1.25) / 2 }}
            />
            <div className="section-desc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
