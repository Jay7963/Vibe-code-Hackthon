import { useEffect, useRef } from 'react';
import './GradientBlinds.css';

const GradientBlinds = ({
  className = '',
  gradientColors = ['#FF9FFC', '#5227FF'],
  angle = 0,
  noise = 0.3,
  blindCount = 12,
  blindMinWidth = 50,
  spotlightRadius = 0.5,
  spotlightSoftness = 1,
  spotlightOpacity = 1,
  mouseDampening = 0.15,
  distortAmount = 0,
  shineDirection = 'left',
  mixBlendMode = 'lighten'
}) => {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 50, y: 50 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create gradient string from colors array
    const gradientString = `linear-gradient(${angle}deg, ${gradientColors.join(', ')})`;
    const gradientElement = container.querySelector('.gradient-blinds');
    
    if (gradientElement) {
      gradientElement.style.background = gradientString;
      gradientElement.style.backgroundSize = '400% 400%';
    }

    // Mouse tracking for spotlight effect
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      if (mouseDampening > 0) {
        // Smooth interpolation
        const factor = 1 - Math.exp(-0.016 / mouseDampening); // 60fps assumption
        mouseRef.current.x += (x - mouseRef.current.x) * factor;
        mouseRef.current.y += (y - mouseRef.current.y) * factor;
      } else {
        mouseRef.current.x = x;
        mouseRef.current.y = y;
      }
      
      gradientElement.style.setProperty('--mouse-x', mouseRef.current.x + '%');
      gradientElement.style.setProperty('--mouse-y', mouseRef.current.y + '%');
    };

    // Dynamic color shifting
    let hue = 0;
    const colorShiftInterval = setInterval(() => {
      hue = (hue + 0.5) % 360;
      
      // Create dynamic colors based on original gradient colors
      const colors = gradientColors.map((_, index) => {
        const offset = (index * 60) % 360;
        return `hsl(${(hue + offset) % 360}, 70%, 70%)`;
      });
      
      const dynamicGradient = `linear-gradient(${angle}deg, ${colors.join(', ')})`;
      if (gradientElement) {
        gradientElement.style.background = dynamicGradient;
      }
    }, 100);

    // Update blinds based on container size
    const updateBlinds = () => {
      const width = container.offsetWidth;
      const calculatedBlindCount = Math.max(8, Math.floor(width / blindMinWidth));
      container.style.setProperty('--calculated-blind-count', calculatedBlindCount);
      container.style.setProperty('--blind-width', blindMinWidth + 'px');
    };

    container.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', updateBlinds);
    updateBlinds();

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateBlinds);
      clearInterval(colorShiftInterval);
    };
  }, [gradientColors, angle, blindMinWidth, mouseDampening]);

  return (
    <div
      ref={containerRef}
      className={`gradient-blinds-container ${className}`}
      style={{
        mixBlendMode: mixBlendMode,
        '--spotlight-radius': spotlightRadius,
        '--spotlight-opacity': spotlightOpacity,
        '--noise-amount': noise,
        '--distort-amount': distortAmount,
        '--shine-direction': shineDirection === 'right' ? '1' : '0'
      }}
    >
      <div className="gradient-blinds"></div>
      <div className="gradient-noise"></div>
    </div>
  );
};

export default GradientBlinds;