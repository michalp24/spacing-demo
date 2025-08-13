import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import "./style.css";
import Card from "./components/Card";
import ControlsPanelBuilder from "./components/ControlsPanelBuilder";
import { CARD_DATA, SPACING_OPTIONS } from "./constants/cardData";
import { getSectionTitleFontSize, getCardTitleFontSize } from "./utils/fontSizeUtils";

function AppBuilder() {
  const [isDarkMode, setIsDarkMode] = useState(document.body.classList.contains('dark'));
  const [showLayoutGap, setShowLayoutGap] = useState(true);
  const [showInnerPadding, setShowInnerPadding] = useState(true);
  const [showSectionPadding, setShowSectionPadding] = useState(true);
  const [showImage] = useState(true);
  const [showTags] = useState(false);
  const [showPretitle] = useState(true);
  const [showIcons] = useState(false);
  const [manualCardTitleFontSize] = useState("");
  const [manualSectionTitleFontSize] = useState("");

  
  // Listen for dark mode changes
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(document.body.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.body, { attributes: true });
    return () => observer.disconnect();
  }, []);
  
  // Section builder state
  const [sections, setSections] = useState([]);
  const [showSectionBuilder, setShowSectionBuilder] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [newSection, setNewSection] = useState({
    id: null,
    cardSpacing: 'medium',
    contentLayout: 'text-center',
    showImage: true,
    showTags: false,
    showPretitle: true,
    showIcons: false,
    sectionTitle: '',
    sectionDescription: '',
    teaserType: 'none', // 'media', 'teaser', 'none'
    backgroundColor: 'white', // 'white', 'gray'
    cards: []
  });

  // Auto-fill suggestions for titles and descriptions
  const getSuggestedTitle = (contentLayout, teaserType) => {
    if (teaserType === 'none') return 'Welcome Section';
    if (teaserType === 'media') return 'Media Gallery';
    if (teaserType === 'features') return 'Key Features';
    return 'Section Title';
  };

  const getSuggestedDescription = (contentLayout, teaserType) => {
    if (teaserType === 'none') return 'This is a centered text section with compelling content and clear messaging.';
    if (teaserType === 'media') return 'Explore our collection of high-quality media content and visual assets.';
    if (teaserType === 'features') return 'Discover our latest features and updates with these curated highlights.';
    return 'Section description goes here.';
  };

  // Update suggestions when teaser type changes
  const updateSuggestions = (teaserType) => {
    setNewSection(prev => ({
      ...prev,
      teaserType,
      contentLayout: teaserType === 'none' ? 'text-center' : 'media',
      sectionTitle: prev.sectionTitle || getSuggestedTitle(teaserType === 'none' ? 'text-center' : 'media', teaserType),
      sectionDescription: prev.sectionDescription || getSuggestedDescription(teaserType === 'none' ? 'text-center' : 'media', teaserType)
    }));
  };



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
  }, [showLayoutGap, showInnerPadding, showImage, showTags, showPretitle, manualCardTitleFontSize]);

  // Use manual section title font size if set
  const effectiveSectionTitleFontSize = manualSectionTitleFontSize && !isNaN(Number(manualSectionTitleFontSize))
    ? Number(manualSectionTitleFontSize)
    : sectionTitleFontSize;

  // Section builder functions
  const handleAddSection = () => {
    setShowSectionBuilder(true);
    setEditingSection(null);
    setNewSection({
      id: null,
      cardSpacing: 'medium',
      contentLayout: 'text-center',
      showImage: true,
      showTags: false,
      showPretitle: true,
      showIcons: false,
      sectionTitle: '',
      sectionDescription: '',
      teaserType: 'none',
      backgroundColor: 'white',
      showSectionPaddingTop: true,
      showSectionPaddingBottom: true,
      cards: []
    });
  };

  const handleCreateSection = () => {
    const sectionId = Date.now();
    const sectionData = {
      ...newSection,
      id: sectionId,
      contentLayout: newSection.teaserType === 'none' ? 'text-center' : 'media',
      showSectionPaddingTop: true, // Always default to true
      showSectionPaddingBottom: true, // Always default to true
      cards: newSection.teaserType === 'media' ? CARD_DATA.slice(0, 4) : 
             newSection.teaserType === 'features' ? CARD_DATA.slice(0, 3) : []
    };
    
    console.log('Creating section with:', {
      teaserType: newSection.teaserType,
      cards: sectionData.cards,
      contentLayout: sectionData.contentLayout,
      showSectionPaddingTop: sectionData.showSectionPaddingTop,
      showSectionPaddingBottom: sectionData.showSectionPaddingBottom
    });
    
    setSections([...sections, sectionData]);
    setShowSectionBuilder(false);
    setNewSection({
      id: null,
      cardSpacing: 'medium',
      contentLayout: 'text-center',
      showImage: true,
      showTags: false,
      showPretitle: true,
      showIcons: false,
      sectionTitle: '',
      sectionDescription: '',
      teaserType: 'none',
      backgroundColor: 'white',
      cards: []
    });
  };

  const handleRemoveSection = (sectionId) => {
    setSections(sections.filter(section => section.id !== sectionId));
  };

  const handleEditSection = (section) => {
    setEditingSection(section);
    setNewSection({
      id: section.id,
      cardSpacing: section.cardSpacing,
      contentLayout: section.contentLayout,
      showImage: section.showImage !== undefined ? section.showImage : true,
      showTags: section.showTags !== undefined ? section.showTags : false,
      showPretitle: section.showPretitle !== undefined ? section.showPretitle : true,
      showIcons: section.showIcons !== undefined ? section.showIcons : false,
      sectionTitle: section.sectionTitle || '',
      sectionDescription: section.sectionDescription || '',
      teaserType: section.teaserType || 'none',
      backgroundColor: section.backgroundColor || 'white',
      showSectionPaddingTop: section.showSectionPaddingTop !== undefined ? section.showSectionPaddingTop : true,
      showSectionPaddingBottom: section.showSectionPaddingBottom !== undefined ? section.showSectionPaddingBottom : true,
      cards: section.cards || []
    });
    setShowSectionBuilder(true);
  };

  const handleUpdateSection = () => {
    const updatedSections = sections.map(section => 
      section.id === editingSection.id 
        ? {
            ...newSection,
            id: section.id,
            showSectionPaddingTop: newSection.showSectionPaddingTop !== undefined ? newSection.showSectionPaddingTop : section.showSectionPaddingTop !== undefined ? section.showSectionPaddingTop : true,
            showSectionPaddingBottom: newSection.showSectionPaddingBottom !== undefined ? newSection.showSectionPaddingBottom : section.showSectionPaddingBottom !== undefined ? section.showSectionPaddingBottom : true,
            cards: newSection.teaserType === 'media' ? CARD_DATA.slice(0, 4) : 
                   newSection.teaserType === 'features' ? CARD_DATA.slice(0, 3) : []
          }
        : section
    );
    
    setSections(updatedSections);
    setShowSectionBuilder(false);
    setEditingSection(null);
    setNewSection({
      id: null,
      cardSpacing: 'medium',
      contentLayout: 'text-center',
      showImage: true,
      showTags: false,
      showPretitle: true,
      showIcons: false,
      sectionTitle: '',
      sectionDescription: '',
      teaserType: 'none',
      backgroundColor: 'white',
      cards: []
    });
  };

  const renderSection = (section) => {
    // Determine section type based on contentLayout and teaserType
    const isFeatures = section.teaserType === 'features';
    const isTextCenter = section.contentLayout === 'text-center';
    const isMedia = section.contentLayout === 'media' && !isFeatures;
    
    const sectionStyle = section.backgroundColor === 'gray' ? { 
      backgroundColor: isDarkMode ? '#1A1A1A' : '#f2f2f2' 
    } : {};

    return (
      <div key={section.id} className={`section-container ${section.backgroundColor === 'gray' ? 'section-full-width' : ''}`} style={sectionStyle}>
        <div className="section-header">
          <button 
            className="edit-section-btn"
            onClick={() => handleEditSection(section)}
            title="Edit section"
          >
            ✎
          </button>
          <button 
            className="remove-section-btn"
            onClick={() => handleRemoveSection(section.id)}
            title="Remove section"
          >
            ×
          </button>
        </div>
        
        {isTextCenter ? (
          <div className="text-section-wrapper">
            {/* Section Padding Top */}
            <div 
              className={`section-padding-top${!(section.showSectionPaddingTop !== undefined ? section.showSectionPaddingTop : showSectionPadding) ? ' section-padding-hidden' : ''}${!showSectionPadding ? ' section-padding-off' : ''}`}
              style={{ height: `${effectiveSectionTitleFontSize * 1.25 * 2}px` }}
            />
            <div className="text-section-centered">
              <div className="text-section">
                <div className="section-pretitle">Demo</div>
                <div
                  className={`section-layout-gap${!showLayoutGap ? ' section-layout-gap-off' : ''}`}
                  style={{ height: (computedSectionTitleFontSize * 1.25) * (1.25 / 4) }}
                />
                <h2 
                  className="section-title"
                  style={{
                    fontSize: manualSectionTitleFontSize && !isNaN(Number(manualSectionTitleFontSize))
                      ? `${manualSectionTitleFontSize}px`
                      : `${sectionTitleFontSize}px`
                  }}
                >
                  {section.sectionTitle || 'Section Title'}
                </h2>
                <div
                  className={`section-layout-gap-bottom${!showLayoutGap ? ' section-layout-gap-off' : ''}`}
                  style={{ height: (computedSectionTitleFontSize * 1.25) / 2 }}
                />
                <div className="section-desc">
                  {section.sectionDescription || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
                </div>
              </div>
            </div>
            {/* Section Padding Bottom */}
            <div 
              className={`section-padding-bottom${!(section.showSectionPaddingBottom !== undefined ? section.showSectionPaddingBottom : showSectionPadding) ? ' section-padding-hidden' : ''}${!showSectionPadding ? ' section-padding-off' : ''}`}
              style={{ height: `${effectiveSectionTitleFontSize * 1.25 * 2}px` }}
            />
          </div>
        ) : isMedia ? (
          <div className="media-section-wrapper">
            {/* Section Padding Top */}
            <div 
              className={`section-padding-top${!(section.showSectionPaddingTop !== undefined ? section.showSectionPaddingTop : showSectionPadding) ? ' section-padding-hidden' : ''}${!showSectionPadding ? ' section-padding-off' : ''}`}
              style={{ height: `${effectiveSectionTitleFontSize * 1.25 * 2}px` }}
            />
            <div className="card-section" data-spacing={section.cardSpacing}>
              <div className="section-pretitle">Demo</div>
              <div
                className={`section-layout-gap${!showLayoutGap ? ' section-layout-gap-off' : ''}`}
                style={{ height: (computedSectionTitleFontSize * 1.25) * (1.25 / 4) }}
              />
              <h2 
                className="section-title"
                style={{
                  fontSize: manualSectionTitleFontSize && !isNaN(Number(manualSectionTitleFontSize))
                    ? `${manualSectionTitleFontSize}px`
                    : `${sectionTitleFontSize}px`
                }}
              >
                {section.sectionTitle || 'Media Section Title'}
              </h2>
              <div
                className={`section-layout-gap-bottom${!showLayoutGap ? ' section-layout-gap-off' : ''}`}
                style={{ height: (computedSectionTitleFontSize * 1.25) / 2 }}
              />
              <div className="section-desc">
                {section.sectionDescription || 'Create immersive, real-time, physically accurate visualizations with photorealistic rendering.'}
              </div>
              <div
                className={`section-layout-gap-bottom${!showLayoutGap ? ' section-layout-gap-off' : ''}`}
                style={{ height: (computedSectionTitleFontSize * 1.25) }}
              />
              <div className="card-grid">
                {section.cards.map((card, idx) => (
                  <Card
                    key={`section-${section.id}-${card.id}`}
                    ref={el => cardRefs.current[idx] = el}
                    data={card}
                    spacing={SPACING_OPTIONS[section.cardSpacing]}
                    showLayoutGap={showLayoutGap}
                    showInnerPadding={showInnerPadding}
                    showImage={section.showImage !== undefined ? section.showImage : showImage}
                    showTags={section.showTags !== undefined ? section.showTags : showTags}
                    showPretitle={section.showPretitle !== undefined ? section.showPretitle : showPretitle}
                    showIcons={section.showIcons !== undefined ? section.showIcons : showIcons}
                    cardSpacing={section.cardSpacing}
                    maxHeight={maxHeight}
                    manualCardTitleFontSize={manualCardTitleFontSize}
                  />
                ))}
              </div>
            </div>
            {/* Section Padding Bottom */}
            <div 
              className={`section-padding-bottom${!(section.showSectionPaddingBottom !== undefined ? section.showSectionPaddingBottom : showSectionPadding) ? ' section-padding-hidden' : ''}${!showSectionPadding ? ' section-padding-off' : ''}`}
              style={{ height: `${effectiveSectionTitleFontSize * 1.25 * 2}px` }}
            />
          </div>
                ) : (
          <div className="card-section-features">
            {/* Section Padding Top */}
            <div 
              className={`section-padding-top${!(section.showSectionPaddingTop !== undefined ? section.showSectionPaddingTop : showSectionPadding) ? ' section-padding-hidden' : ''}${!showSectionPadding ? ' section-padding-off' : ''}`}
              style={{ height: `${effectiveSectionTitleFontSize * 1.25 * 2}px` }}
            />
            <div className="section-pretitle">Demo</div>
            <div
              className={`section-layout-gap${!showLayoutGap ? ' section-layout-gap-off' : ''}`}
              style={{ height: (computedSectionTitleFontSize * 1.25) / 4 }}
            />
            <h2 
              className="section-title"
              style={{
                fontSize: manualSectionTitleFontSize && !isNaN(Number(manualSectionTitleFontSize))
                  ? `${manualSectionTitleFontSize}px`
                  : `${sectionTitleFontSize}px`
              }}
            >
              {section.sectionTitle || 'Section Title'}
            </h2>
            <div
              className={`section-layout-gap${!showLayoutGap ? ' section-layout-gap-off' : ''}`}
              style={{ height: computedSectionTitleFontSize * 1.25 }}
            />
            <div className="card-grid-features">
              {section.cards && section.cards.length > 0 ? section.cards.map((card, idx) => (
                <div key={`features-${section.id}-${card.id}`} className="card-features">
                  {(section.showImage !== undefined ? section.showImage : showImage) && (
                    <div className="card-img-wrapper">
                      <img
                        className="card-img-top"
                        src={card.img}
                        alt="Card visual"
                      />
                    </div>
                  )}
                  {/* Top padding */}
                  <div 
                    className={`guide-padding guide-padding-top ${showInnerPadding ? 'guide-padding-on' : 'guide-padding-off'}`}
                    style={{ height: getCardTitleFontSize(section.cardSpacing) * 1.25 }}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', padding: '0' }}>
                    {section.showPretitle !== undefined ? section.showPretitle : showPretitle && (
                      <div className={`card-pretitle card-pretitle-${section.cardSpacing}`}>{card.pretitle}</div>
                    )}
                    <div 
                      className={`layout-gap${!showLayoutGap ? ' layout-gap-off' : ''}`}
                      style={{ height: (getCardTitleFontSize(section.cardSpacing) * 1.25) / 3 }}
                    />
                    <span 
                      className="card-title"
                      style={{ 
                        fontSize: manualCardTitleFontSize && !isNaN(Number(manualCardTitleFontSize)) 
                          ? `${manualCardTitleFontSize}px` 
                          : `${getCardTitleFontSize(section.cardSpacing)}px`,
                        lineHeight: '125%',
                        fontWeight: 'bold'
                      }}
                    >
                      {card.title}
                    </span>
                    <div 
                      className={`layout-gap${!showLayoutGap ? ' layout-gap-off' : ''}`}
                      style={{ height: (getCardTitleFontSize(section.cardSpacing) * 1.25) / 2 }}
                    />
                    <div className="card-desc card-desc-style">{card.desc}</div>
                    <div 
                      className={`layout-gap${!showLayoutGap ? ' layout-gap-off' : ''}`}
                      style={{ height: (getCardTitleFontSize(section.cardSpacing) * 1.25) / 2 }}
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
                  {/* Bottom padding */}
                  <div 
                    className={`guide-padding guide-padding-bottom ${showInnerPadding ? 'guide-padding-on' : 'guide-padding-off'}`}
                    style={{ height: getCardTitleFontSize(section.cardSpacing) * 1.25 }}
                  />
                </div>
              )) : (
                <div>No cards available</div>
              )}
            </div>
            {/* Section Padding Bottom */}
            <div 
              className={`section-padding-bottom${!(section.showSectionPaddingBottom !== undefined ? section.showSectionPaddingBottom : showSectionPadding) ? ' section-padding-hidden' : ''}${!showSectionPadding ? ' section-padding-off' : ''}`}
              style={{ height: `${effectiveSectionTitleFontSize * 1.25 * 2}px` }}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container">
      <div className="main-layout">
        <div className="controls-panel-wrapper">
          <ControlsPanelBuilder
            showLayoutGap={showLayoutGap}
            setShowLayoutGap={setShowLayoutGap}
            showInnerPadding={showInnerPadding}
            setShowInnerPadding={setShowInnerPadding}
            showSectionPadding={showSectionPadding}
            setShowSectionPadding={setShowSectionPadding}
          />
        </div>
        
        <div className="section-canvas">
          {sections.length === 0 ? (
            <div className="empty-canvas">
              <button className="add-section-btn" onClick={handleAddSection}>
                <span className="add-icon">+</span>
                <span className="add-text">Add Section</span>
              </button>
            </div>
          ) : (
            <div className="sections-container">
              {sections.map(renderSection)}
              <div className="add-section-container">
                <button className="add-section-btn" onClick={handleAddSection}>
                  <span className="add-icon">+</span>
                  <span className="add-text">Add Another Section</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {showSectionBuilder && (
          <div className="section-builder-modal">
            <div className="section-builder-content">
              <h3>{editingSection ? 'Edit Section' : 'Create New Section'}</h3>
              
              <div className="builder-form">
                <div className="form-group">
                  <label>Card Spacing:</label>
                  <select 
                    value={newSection.cardSpacing} 
                    onChange={(e) => setNewSection({...newSection, cardSpacing: e.target.value})}
                  >
                    <option value="large">Large</option>
                    <option value="medium">Medium</option>
                    <option value="small">Small</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Layout:</label>
                  <div className="layout-options">
                    <div className="layout-option">
                      <label>
                        <input 
                          type="checkbox" 
                          checked={newSection.showImage}
                          onChange={(e) => setNewSection({...newSection, showImage: e.target.checked})}
                        />
                        Image
                      </label>
                    </div>
                    <div className="layout-option">
                      <label>
                        <input 
                          type="checkbox" 
                          checked={newSection.showTags}
                          onChange={(e) => setNewSection({...newSection, showTags: e.target.checked})}
                        />
                        Tags
                      </label>
                    </div>
                    <div className="layout-option">
                      <label>
                        <input 
                          type="checkbox" 
                          checked={newSection.showPretitle}
                          onChange={(e) => setNewSection({...newSection, showPretitle: e.target.checked})}
                        />
                        Pretitle
                      </label>
                    </div>
                    <div className="layout-option">
                      <label>
                        <input 
                          type="checkbox" 
                          checked={newSection.showIcons}
                          onChange={(e) => setNewSection({...newSection, showIcons: e.target.checked})}
                        />
                        Icons
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Section Title:</label>
                  <input 
                    type="text" 
                    value={newSection.sectionTitle}
                    onChange={(e) => setNewSection({...newSection, sectionTitle: e.target.value})}
                    placeholder="Enter section title"
                  />
                </div>

                <div className="form-group">
                  <label>Section Description:</label>
                  <textarea 
                    value={newSection.sectionDescription}
                    onChange={(e) => setNewSection({...newSection, sectionDescription: e.target.value})}
                    placeholder="Enter section description"
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label>Teaser Type:</label>
                  <select 
                    value={newSection.teaserType} 
                    onChange={(e) => updateSuggestions(e.target.value)}
                  >
                    <option value="none">None</option>
                    <option value="media">Media Teasers</option>
                    <option value="features">Features</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Background:</label>
                  <select 
                    value={newSection.backgroundColor} 
                    onChange={(e) => setNewSection({...newSection, backgroundColor: e.target.value})}
                  >
                    <option value="white">White</option>
                    <option value="gray">Gray</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Section Padding:</label>
                  <div className="layout-options">
                    <div className="layout-option">
                      <label>
                        <input 
                          type="checkbox" 
                          checked={newSection.showSectionPaddingTop !== undefined ? newSection.showSectionPaddingTop : true}
                          onChange={(e) => setNewSection({...newSection, showSectionPaddingTop: e.target.checked})}
                        />
                        Top Padding
                      </label>
                    </div>
                    <div className="layout-option">
                      <label>
                        <input 
                          type="checkbox" 
                          checked={newSection.showSectionPaddingBottom !== undefined ? newSection.showSectionPaddingBottom : true}
                          onChange={(e) => setNewSection({...newSection, showSectionPaddingBottom: e.target.checked})}
                        />
                        Bottom Padding
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="builder-actions">
                <button className="btn-cancel" onClick={() => {
                  setShowSectionBuilder(false);
                  setEditingSection(null);
                  setNewSection({
                    id: null,
                    cardSpacing: 'medium',
                    contentLayout: 'text-center',
                    showImage: true,
                    showTags: false,
                    showPretitle: true,
                    showIcons: false,
                    sectionTitle: '',
                    sectionDescription: '',
                    teaserType: 'none',
                    backgroundColor: 'white',
                    cards: []
                  });
                }}>
                  Cancel
                </button>
                <button className="btn-create" onClick={editingSection ? handleUpdateSection : handleCreateSection}>
                  {editingSection ? 'Update Section' : 'Create Section'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AppBuilder; 