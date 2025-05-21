import React, { useState, useRef, useLayoutEffect, useEffect, forwardRef } from "react";
import { getCardTitleFontSize } from "../utils/fontSizeUtils";

const Card = forwardRef(function Card({ 
  data, 
  spacing, 
  showLayoutGap, 
  showInnerPadding, 
  showImage, 
  showTags, 
  showPretitle, 
  showIcons, 
  cardSpacing, 
  maxHeight, 
  manualCardTitleFontSize 
}, ref) {
  // Padding values for each spacing
  const padBg = showInnerPadding ? 'guide-padding-on' : 'guide-padding-off';
  const [isDarkMode, setIsDarkMode] = useState(document.body.classList.contains('dark'));

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

  // --- Dynamic headline font size logic ---
  const titleRef = useRef(null);
  const [headlineFontSize, setHeadlineFontSize] = useState(20); // default
  const [padSize, setPadSize] = useState(0);

  // Responsive card title font size
  const [cardTitleFontSize, setCardTitleFontSize] = useState(getCardTitleFontSize(cardSpacing));
  
  // Update card title font size on viewport change
  useEffect(() => {
    const handleResize = () => {
      if (!manualCardTitleFontSize || isNaN(Number(manualCardTitleFontSize))) {
        setCardTitleFontSize(getCardTitleFontSize(cardSpacing));
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [cardSpacing, manualCardTitleFontSize]);

  useEffect(() => {
    if (manualCardTitleFontSize && !isNaN(Number(manualCardTitleFontSize))) {
      setCardTitleFontSize(Number(manualCardTitleFontSize));
    } else {
      setCardTitleFontSize(getCardTitleFontSize(cardSpacing));
    }
  }, [cardSpacing, manualCardTitleFontSize]);

  // Update padding size when card title font size changes
  useEffect(() => {
    setPadSize(cardTitleFontSize * 1.25);
  }, [cardTitleFontSize]);

  useLayoutEffect(() => {
    if (titleRef.current) {
      const computed = window.getComputedStyle(titleRef.current);
      setHeadlineFontSize(parseFloat(computed.fontSize));
    }
  }, [cardSpacing, manualCardTitleFontSize]);

  // Helper for layout gap - now using cardTitleFontSize for calculations
  const LayoutGap = ({ type }) => {
    let height = 0;
    const base = (cardTitleFontSize * 1.25);
    let style = {};
    if (type === "below-desc") {
      // Special: flex spacer to push CTA to bottom
      style = { 
        flex: 1, 
        height: 0, 
        minHeight: (cardTitleFontSize * 1.25) * (1.25 / 2) 
      };
    } else {
      if (type === "tag") height = base / 2;
      else if (type === "above-title") height = base / 3;
      else if (type === "below-title") height = base / 2;
      else height = 0;
      style = { height };
    }
    let className = "layout-gap";
    if (!showLayoutGap) className += " layout-gap-off";
    return <div className={className} style={style} />;
  };

  return (
    <div
      ref={ref}
      className="card"
      style={{ padding: 0, transition: "padding 0.3s", position: 'relative', display: 'flex', flexDirection: 'column' }}
    >
      {showImage && (
        <div className="card-img-wrapper">
          <img
            className="card-img-top"
            src={data.img}
            alt="Card visual"
          />
        </div>
      )}
      {/* Top padding */}
      <div className={`guide-padding guide-padding-top ${padBg}`} style={{ height: padSize }} />
      {/* Card content flex wrapper start */}
      <div style={{ display: 'flex', flexDirection: 'row', flex: 1, minHeight: 0 }}>
        {/* Left padding */}
        <div className={`guide-padding guide-padding-left ${padBg}`} style={{ width: padSize, height: '100%' }} />
        {/* Content column flex wrapper */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, height: '100%' }}>
          {showIcons && (
            <>
              <img 
                src="https://brand-assets.cne.ngc.nvidia.com/assets/marketing-icons/2.1.0/configuration-sdk.svg"
                alt="Configuration SDK"
                style={{ 
                  width: '96px',
                  filter: isDarkMode ? 'invert(1)' : 'none'
                }}
              />
              <div 
                className={`layout-gap${!showLayoutGap ? ' layout-gap-off' : ''}`}
                style={{ height: (cardTitleFontSize * 1.25) / 3 }}
              />
            </>
          )}
          {showTags && (<><div className="card-tags">Featured</div><LayoutGap type="tag" /></>)}
          {showPretitle && (<><div className={`card-pretitle card-pretitle-${cardSpacing}`}>{data.pretitle}</div><LayoutGap type="above-title" /></>)}
          <span 
            ref={titleRef} 
            className="card-title"
            style={{ 
              fontSize: manualCardTitleFontSize && !isNaN(Number(manualCardTitleFontSize)) 
                ? `${manualCardTitleFontSize}px` 
                : `${getCardTitleFontSize(cardSpacing)}px`,
              lineHeight: '125%',
              fontWeight: 'bold'
            }}
          >
            {data.title}
          </span>
          <LayoutGap type="below-title" />
          <div className="card-desc card-desc-style">{data.desc}</div>
          <LayoutGap type="below-desc" />
          <button className="card-cta">
            {data.cta}
            <img
              src="https://brand-assets.cne.ngc.nvidia.com/assets/icons/3.1.0/line/chevron-right.svg"
              alt="Right Chevron"
              className="cta-icon"
            />
          </button>
        </div>
        {/* Right padding */}
        <div className={`guide-padding guide-padding-right ${padBg}`} style={{ width: padSize, height: '100%' }} />
      </div>
      {/* Card content flex wrapper end */}
      {/* Bottom padding */}
      <div className={`guide-padding guide-padding-bottom ${padBg}`} style={{ height: padSize }} />
    </div>
  );
});

export default Card; 