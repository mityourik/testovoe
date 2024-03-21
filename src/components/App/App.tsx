import React from 'react';
import { useCanvas } from '../../hooks/useCanvas';
import ColorPickerModal from '../ColorPickerModal/ColorPickerModal';
import './App.css';

const App: React.FC = () => {
  const { canvasRef, contextMenu, changeBallColor } = useCanvas();

  return (
    <section className='app'>
      <canvas
        ref={canvasRef}
        width={800}
        height={630}
        className='canvas'
      />
      {contextMenu.visible && (
        <ColorPickerModal
          x={contextMenu.x}
          y={contextMenu.y}
          visible={contextMenu.visible}
          changeBallColor={changeBallColor}
        />
      )}
    </section>
  );
};

export default App;
