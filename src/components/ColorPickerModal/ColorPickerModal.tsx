import { FC } from 'react';
import './ColorPickerModal.css';

interface ColorPickerModalProps {
  x: number;
  y: number;
  visible: boolean;
  changeBallColor: (color: string) => void;
}

const ColorPickerModal: FC<ColorPickerModalProps> = ({ x, y, visible, changeBallColor }) => {
    if (!visible) return null;

    return (
        <div
            className='color-picker-modal'
            style={{
                position: 'absolute',
                top: y + 'px',
                left: x + 'px',
            }}
        >
            <button
                type='button'
                className='color-picker-modal__button'
                onClick={() => changeBallColor('red')}
            >
        Красный
            </button>
            <button
                type='button'
                className='color-picker-modal__button'
                onClick={() => changeBallColor('blue')}
            >
        Синий
            </button>
            <button
                type='button'
                className='color-picker-modal__button'
                onClick={() => changeBallColor('green')}
            >
        Зелёный
            </button>
            <button
                type='button'
                className='color-picker-modal__button'
                onClick={() => changeBallColor('yellow')}
            >
        Жёлтый
            </button>
            <button
                type='button'
                className='color-picker-modal__button'
                onClick={() => changeBallColor('purple')}
            >
        Фиолетовый
            </button>
        </div>
    );
};

export default ColorPickerModal;
