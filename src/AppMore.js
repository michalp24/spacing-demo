import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { CARD_DATA } from './constants/cardData';
import { getCardTitleFontSize } from './utils/fontSizeUtils';

function AppMore() {
  const [visibleCards, setVisibleCards] = useState(6);
  const [sectionTitleFontSize, setSectionTitleFontSize] = useState(32);
  const [computedSectionTitleFontSize, setComputedSectionTitleFontSize] = useState(32);
  const [buttonStyle, setButtonStyle] = useState('option1');
  const sectionTitleRef = useRef(null);

  // Responsive section title font size
  useEffect(() => {
    const handleResize = () => setSectionTitleFontSize(32);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update computed font size after render
  useLayoutEffect(() => {
    if (sectionTitleRef.current) {
      const computed = window.getComputedStyle(sectionTitleRef.current);
      const fontSize = parseFloat(computed.fontSize);
      setComputedSectionTitleFontSize(fontSize);
    }
  }, [sectionTitleFontSize]);

  const handleLoadMore = () => {
    setVisibleCards(prev => Math.min(prev + 6, 20));
    
    // Scroll to bottom after a short delay to allow cards to render
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
    }, 100);
  };

  const displayedCards = CARD_DATA.slice(0, visibleCards);

  return (
    <div className="container">
      <div className="main-layout">
        <div className="controls-panel-wrapper">
          <div className="controls-panel">
            <div className="controls-panel-groups">
              <div className="control-group">
                <label>Load More Button Style:</label>
                <div className="control-content">
                  <select 
                    value={buttonStyle} 
                    onChange={(e) => setButtonStyle(e.target.value)}
                  >
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                    <option value="option4">Option 4</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card-section" data-spacing="medium">
          <div className="section-pretitle">Demo</div>
          <div
            className="section-layout-gap section-layout-gap-off"
            style={{ height: (computedSectionTitleFontSize * 1.25) / 4 }}
          />
          <h2 
            ref={sectionTitleRef}
            className="section-title"
            style={{ fontSize: `${sectionTitleFontSize}px` }}
          >
            More Cards
          </h2>
          <div
            className="section-layout-gap-bottom section-layout-gap-off"
            style={{ height: computedSectionTitleFontSize * 1.25 }}
          />
          <div className="card-grid">
            {displayedCards.map((card, idx) => (
              <div 
                key={`more-${card.id}`} 
                className={`card ${idx >= visibleCards - 6 ? 'card-reveal' : ''}`}
                style={{ 
                  animationDelay: `${(idx - (visibleCards - 6)) * 0.1}s`,
                  opacity: idx >= visibleCards - 6 ? 0 : 1,
                  animation: idx >= visibleCards - 6 ? 'fadeInUp 0.6s ease-out forwards' : 'none'
                }}
              >
                <div className="card-img-wrapper">
                  <img
                    className="card-img-top"
                    src={card.img}
                    alt="Card visual"
                  />
                </div>
                {/* Top inner padding */}
                <div className="guide-padding guide-padding-top guide-padding-off" style={{ height: getCardTitleFontSize('medium') * 1.25 }} />
                <div style={{ display: 'flex', flexDirection: 'row', flex: 1, minHeight: 0 }}>
                  <div className="guide-padding guide-padding-left guide-padding-off" style={{ width: getCardTitleFontSize('medium') * 1.25, height: '100%' }} />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, height: '100%' }}>
                    <div className="card-pretitle card-pretitle-medium">{card.pretitle}</div>
                    <div 
                      className="layout-gap layout-gap-off"
                      style={{ height: (getCardTitleFontSize('medium') * 1.25) / 3 }}
                    />
                    <span 
                      className="card-title"
                      style={{ 
                        fontSize: `${getCardTitleFontSize('medium')}px`,
                        lineHeight: '125%',
                        fontWeight: 'bold'
                      }}
                    >
                      {card.title}
                    </span>
                    <div 
                      className="layout-gap layout-gap-off"
                      style={{ height: (getCardTitleFontSize('medium') * 1.25) / 2 }}
                    />
                    <div className="card-desc card-desc-style">{card.desc}</div>
                    <div 
                      className="layout-gap layout-gap-off"
                      style={{ height: (getCardTitleFontSize('medium') * 1.25) / 2 }}
                    />
                    <button className="card-cta">
                      {card.cta}
                      <img
                        src="https://brand-assets.cne.ngc.nvidia.com/assets/icons/3.1.0/line/chevron-right.svg"
                        alt="Right Chevron"
                        className="cta-icon"
                      />
                    </button>
                  </div>
                  <div className="guide-padding guide-padding-right guide-padding-off" style={{ width: getCardTitleFontSize('medium') * 1.25, height: '100%' }} />
                </div>
                <div className="guide-padding guide-padding-bottom guide-padding-off" style={{ height: getCardTitleFontSize('medium') * 1.25, width: '100%' }} />
              </div>
            ))}
          </div>
          
          {visibleCards < 20 && (
            <div className={`load-more-container ${buttonStyle === 'option1' ? 'load-more-option1' : 'load-more-option2'}`}>
              {buttonStyle === 'option1' && (
                <>
                  <div className="load-more-divider"></div>
                  <button 
                    className="load-more-btn"
                    onClick={handleLoadMore}
                  >
                    <span className="load-more-text">Load More</span>
                    <img
                      src="https://brand-assets.cne.ngc.nvidia.com/assets/icons/3.1.0/line/arrow-down.svg"
                      alt="Arrow Down"
                      className="load-more-arrow"
                    />
                  </button>
                  <div className="load-more-divider"></div>
                </>
              )}
              {buttonStyle === 'option2' && (
                <button 
                  className="load-more-btn-option2"
                  onClick={handleLoadMore}
                >
                  <span className="load-more-text">Load More</span>
                  <img
                    src="https://brand-assets.cne.ngc.nvidia.com/assets/icons/3.1.0/line/arrow-down.svg"
                    alt="Arrow Down"
                    className="load-more-arrow"
                  />
                </button>
              )}
              {buttonStyle === 'option3' && (
                <>
                  <div className="load-more-divider"></div>
                  <button 
                    className="load-more-btn-option3"
                    onClick={handleLoadMore}
                  >
                    <span className="load-more-text">Load More</span>
                    <img
                      src="https://brand-assets.cne.ngc.nvidia.com/assets/icons/3.1.0/line/arrow-down.svg"
                      alt="Arrow Down"
                      className="load-more-arrow"
                    />
                  </button>
                  <div className="load-more-divider"></div>
                </>
              )}
              {buttonStyle === 'option4' && (
                <div className="option4-container">
                  <div className="peek-container">
                    <div className="peek-cards">
                      {CARD_DATA.slice(visibleCards, visibleCards + 6).map((card, idx) => (
                        <div key={`peek-${card.id}`} className="card peek-card">
                          <div className="card-img-wrapper">
                            <img
                              className="card-img-top"
                              src={card.img}
                              alt="Card visual"
                            />
                          </div>
                          <div className="guide-padding guide-padding-top guide-padding-off" style={{ height: getCardTitleFontSize('medium') * 1.25 }} />
                          <div style={{ display: 'flex', flexDirection: 'row', flex: 1, minHeight: 0 }}>
                            <div className="guide-padding guide-padding-left guide-padding-off" style={{ width: getCardTitleFontSize('medium') * 1.25, height: '100%' }} />
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, height: '100%' }}>
                              <div className="card-pretitle card-pretitle-medium">{card.pretitle}</div>
                              <div 
                                className="layout-gap layout-gap-off"
                                style={{ height: (getCardTitleFontSize('medium') * 1.25) / 3 }}
                              />
                              <span 
                                className="card-title"
                                style={{ 
                                  fontSize: `${getCardTitleFontSize('medium')}px`,
                                  lineHeight: '125%',
                                  fontWeight: 'bold'
                                }}
                              >
                                {card.title}
                              </span>
                              <div 
                                className="layout-gap layout-gap-off"
                                style={{ height: (getCardTitleFontSize('medium') * 1.25) / 2 }}
                              />
                              <div className="card-desc card-desc-style">{card.desc}</div>
                              <div 
                                className="layout-gap layout-gap-off"
                                style={{ height: (getCardTitleFontSize('medium') * 1.25) / 2 }}
                              />
                              <button className="card-cta">
                                {card.cta}
                                <img
                                  src="https://brand-assets.cne.ngc.nvidia.com/assets/icons/3.1.0/line/chevron-right.svg"
                                  alt="Right Chevron"
                                  className="cta-icon"
                                />
                              </button>
                            </div>
                            <div className="guide-padding guide-padding-right guide-padding-off" style={{ width: getCardTitleFontSize('medium') * 1.25, height: '100%' }} />
                          </div>
                          <div className="guide-padding guide-padding-bottom guide-padding-off" style={{ height: getCardTitleFontSize('medium') * 1.25, width: '100%' }} />
                        </div>
                      ))}
                    </div>
                    <div className="peek-gradient"></div>
                  </div>
                  <div className="load-more-container load-more-option1">
                    <div className="load-more-divider"></div>
                    <button 
                      className="load-more-btn"
                      onClick={handleLoadMore}
                    >
                      <span className="load-more-text">Load More</span>
                      <img
                        src="https://brand-assets.cne.ngc.nvidia.com/assets/icons/3.1.0/line/arrow-down.svg"
                        alt="Arrow Down"
                        className="load-more-arrow"
                      />
                    </button>
                    <div className="load-more-divider"></div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AppMore; 