// Grid.tsx

import React from 'react';

interface CellProps {
  isStart: boolean;
  isEnd: boolean;
  isObstruction: boolean;
  onClick: () => void;
}

const Cell: React.FC<CellProps> = ({ isStart, isEnd, isObstruction, onClick }) => {
  let className = 'cell';
  if (isStart) className += ' start';
  if (isEnd) className += ' end';
  if (isObstruction) className += ' obstruction';

  return <div className={className} onClick={onClick} />;
};

interface GridProps {
  grid: any[]; // Define a better type based on your state management
  onCellClick: (row: number, col: number) => void;
}

const Grid: React.FC<GridProps> = ({ grid, onCellClick }) => {
  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell: { isStart: boolean; isEnd: boolean; isObstruction: boolean; }, cellIndex: React.Key | null | undefined) => (
            <Cell
            key={cellIndex}
            isStart={cell.isStart}
            isEnd={cell.isEnd}
            isObstruction={cell.isObstruction}
            // Assert `cellIndex` as a number
            onClick={() => onCellClick(rowIndex, cellIndex as number)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
