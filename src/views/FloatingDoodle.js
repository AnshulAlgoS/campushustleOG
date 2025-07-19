import React, { useMemo } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

import Doodle1 from '../assets/images/Welcome-2.json';
import Doodle2 from '../assets/images/Knowledge, Idea, Power, Books, Creativity, Learning Animation icon..json';
import Doodle3 from '../assets/images/Rocket startup Animation.json';
import Doodle4 from '../assets/images/Loading 40-Paperplane.json';
import Doodle5 from '../assets/images/Girl with books.json';
import Doodle6 from '../assets/images/Blob.json';
import Doodle7 from '../assets/images/Run cycle recreated in Lottie Creator.json';

const doodleAnimations = [Doodle1, Doodle2, Doodle3, Doodle4, Doodle5, Doodle6, Doodle7];

const FloatingDoodles = () => {
  const doodles = useMemo(() =>
    Array.from({ length: 10 }, () => {
      const src = doodleAnimations[Math.floor(Math.random() * doodleAnimations.length)];
      const top = 12 + Math.random() * 85; 
      const left = Math.random() * 100;
      const scale = Math.random() * 0.6 + 0.4;
      const rotate = Math.floor(Math.random() * 360);
      return { src, top, left, scale, rotate };
    }), []
  );

  return (
    <div className="floating-doodles">
      {doodles.map((dot, index) => (
        <div
          key={index}
          className="doodle"
          style={{
            top: `${dot.top}%`,
            left: `${dot.left}%`,
            transform: `translate(-50%, -50%) scale(${dot.scale}) rotate(${dot.rotate}deg)`
          }}
        >
          <Player
            autoplay
            loop
            src={dot.src}
            style={{ height: '60px', width: '60px' }}
          />
        </div>
      ))}
    </div>
  );
};

export default FloatingDoodles;
