import React, { useState } from 'react';

const MovableObject = () => {
  const [position, setPosition] = useState({ x: 200, y: 250 });
  const [isSquare, setIsSquare] = useState(true);
  const [items, setItems] = useState([]);
  
  const moveObject = (direction) => {
    const step = 10;
    switch (direction) {
      case 'up':
        setPosition(prev => ({ ...prev, y: Math.max(25, prev.y - step) }));
        break;
      case 'down':
        setPosition(prev => ({ ...prev, y: Math.min(475, prev.y + step) }));
        break;
      case 'left':
        setPosition(prev => ({ ...prev, x: Math.max(25, prev.x - step) }));
        break;
      case 'right':
        setPosition(prev => ({ ...prev, x: Math.min(375, prev.x + step) }));
        break;
      default:
        break;
    }
  };
  
  const toggleShape = () => {
    setIsSquare(!isSquare);
  };
  
  const addRandomItem = () => {
    const newItem = {
      id: Date.now(),
      x: Math.floor(Math.random() * 350) + 25,
      y: Math.floor(Math.random() * 450) + 25,
      isSquare: Math.random() > 0.5,
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`
    };
    setItems([...items, newItem]);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h2 className="text-2xl font-bold mb-4">Objeto Móvel no Canvas</h2>
      
      {/* Canvas com borda dupla e sombra */}
      <div 
        className="relative w-full max-w-md h-96 md:h-[500px]"
        style={{
          border: '6px double #333',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
          width: '400px',
          height: '500px',
          backgroundColor: '#f0f0f0'
        }}
      >
        {/* Itens adicionais aleatórios */}
        {items.map((item) => (
          <div
            key={item.id}
            className={`absolute ${item.isSquare ? '' : 'rounded-full'}`}
            style={{
              width: '30px',
              height: '30px',
              left: `${item.x - 15}px`,
              top: `${item.y - 15}px`,
              backgroundColor: item.color,
              transition: 'all 0.2s ease'
            }}
          />
        ))}
        
        {/* Objeto móvel principal (quadrado ou círculo) */}
        <div
          className={`absolute ${isSquare ? 'bg-blue-600' : 'bg-red-600 rounded-full'}`}
          style={{
            width: '50px',
            height: '50px',
            left: `${position.x - 25}px`,
            top: `${position.y - 25}px`,
            transition: 'all 0.2s ease',
            zIndex: 10
          }}
        />
      </div>
      
      {/* Botões de controle */}
      <div className="flex flex-col items-center gap-2 mt-4">
        <button 
          onClick={() => moveObject('up')}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded w-24"
        >
          ⬆️ Cima
        </button>
        
        <div className="flex gap-2">
          <button 
            onClick={() => moveObject('left')}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded w-24"
          >
            ⬅️ Esquerda
          </button>
          
          <button 
            onClick={() => moveObject('right')}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded w-24"
          >
            Direita ➡️
          </button>
        </div>
        
        <button 
          onClick={() => moveObject('down')}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded w-24"
        >
          ⬇️ Baixo
        </button>
        
        <button 
          onClick={toggleShape}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded mt-2"
        >
          Mudar Forma
        </button>
        
        <button 
          onClick={addRandomItem}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-2"
        >
          Adicionar Item
        </button>
      </div>
    </div>
  );
};

export default MovableObject;