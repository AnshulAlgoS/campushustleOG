import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import Doodle1 from '../assets/images/Welcome-2.json';
import Doodle2 from '../assets/images/Knowledge, Idea, Power, Books, Creativity, Learning Animation icon..json';
import Doodle3 from '../assets/images/Rocket startup Animation.json';
import Doodle4 from '../assets/images/Loading 40-Paperplane.json';
import Doodle5 from '../assets/images/Girl with books.json';
import Doodle6 from '../assets/images/Blob.json';
import Doodle7 from '../assets/images/Run cycle recreated in Lottie Creator.json';

const doodles = [
  Doodle1, Doodle2, Doodle3, Doodle4, Doodle5, Doodle7, Doodle6,
  Doodle1, Doodle3, Doodle5, Doodle2, Doodle7, Doodle6, Doodle4,
  Doodle2, Doodle4, Doodle1, Doodle3, Doodle6, Doodle5, Doodle7,
];

const FloatingDoodles = () => {
  return (
    <div className="floating-doodles">
      {doodles.map((src, index) => (
        <div key={index} className={`doodle doodle-${index}`}>
          <Player
            autoplay
            loop
            src={src}
            style={{ height: '60px', width: '60px' }}
          />
        </div>
      ))}
    </div>
  );
};

export default FloatingDoodles;
