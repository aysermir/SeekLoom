import React, { useState } from 'react';
import '../Styles/SearchVisStyles.css';
import Button from '@mui/material/Button';

const gridSize = 20;

interface Cell {
  row: number;
  col: number;
  isStart: boolean;
  isEnd: boolean;
  isObstruction: boolean;
  isPath?: boolean;
  isVisited?: boolean;
}

interface NodeState {
  row: number;
  col: number;
  set: boolean;
}

const createInitialGrid = (): Cell[][] => {
  const grid = [];
  for (let row = 0; row < gridSize; row++) {
    const currentRow = [];
    for (let col = 0; col < gridSize; col++) {
      currentRow.push({ row, col, isStart: false, isEnd: false, isObstruction: false });
    }
    grid.push(currentRow);
  }
  return grid;
};

function SearchVisualization() {
  const [abortController, setAbortController] = useState(new AbortController());

  const [grid, setGrid] = useState<Cell[][]>(createInitialGrid());
  const [startNode, setStartNode] = useState<NodeState>({ row: 0, col: 0, set: false });
  const [endNode, setEndNode] = useState<NodeState>({ row: gridSize - 1, col: gridSize - 1, set: false });

  const handleCellClick = (row: number, col: number) => {
    const newGrid = [...grid];
    const cell = newGrid[row][col];
    if (!cell.isStart && !cell.isEnd && !startNode.set) {
      cell.isStart = true;
      setStartNode({ row, col, set: true });
    } else if (cell.isStart) {
      cell.isStart = false;
      setStartNode({ row: -1, col: -1, set: false });
    } else if (!cell.isStart && !cell.isEnd && startNode.set && !endNode.set) {
      cell.isEnd = true;
      setEndNode({ row, col, set: true });
    } else if (cell.isEnd) {
      cell.isEnd = false;
      setEndNode({ row: -1, col: -1, set: false });
    } else if (!cell.isStart && !cell.isEnd) {
      cell.isObstruction = !cell.isObstruction;
    }
    setGrid(newGrid);
  };

  const findPathBFS = (grid: Cell[][], start: NodeState, end: NodeState): Cell[] => {
    console.log("Start Node: ", startNode);
    console.log("End Node: ", endNode);
    let queue = [{ cell: grid[start.row][start.col], path: [grid[start.row][start.col]] }];
    let visited = Array(gridSize).fill(null).map(() => Array(gridSize).fill(false));
    visited[start.row][start.col] = true;

    while (queue.length > 0) {
      let { cell, path } = queue.shift()!;
      if (cell.row === end.row && cell.col === end.col) {
        return path;
      }
      const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
      for (let [dr, dc] of directions) {
        let newRow = cell.row + dr;
        let newCol = cell.col + dc;
        if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize && !visited[newRow][newCol] && !grid[newRow][newCol].isObstruction) {
          visited[newRow][newCol] = true;
          queue.push({ cell: grid[newRow][newCol], path: [...path, grid[newRow][newCol]] });
          console.log(queue)
        }
      }
    }
    return [];
  };
  const resetGrid = () => {
    abortController.abort(); // Signal to abort any ongoing search
    setGrid(createInitialGrid());
    setStartNode({ row: 0, col: 0, set: false });
    setEndNode({ row: gridSize - 1, col: gridSize - 1, set: false });
    // Reset the AbortController
    setAbortController(new AbortController());
    // Any other cleanup
  };

  
  const visualizePath = (path: Cell[]) => {
    const newGrid = grid.map(row => row.map(cell => ({ ...cell, isPath: false }))); // Reset isPath for all cells
    for (let cell of path) {
      if (!cell.isStart && !cell.isEnd) {
        newGrid[cell.row][cell.col].isPath = true; // Mark the path
      }
    }
    setGrid(newGrid);
  };
  const visualizeDFS = async (start: NodeState, end: NodeState,signal: AbortSignal) => {
    let visited = Array(gridSize).fill(null).map(() => Array(gridSize).fill(false));
    let found = false; // Flag to stop once end is found
  
    const dfs = async (row: number, col: number, path: Cell[] = []) => {
      if (signal.aborted) {
        console.log("Search aborted!");
        return;
      }
      if (row < 0 || col < 0 || row >= gridSize || col >= gridSize || visited[row][col] || grid[row][col].isObstruction || found) {
        return;
      }
  
      if (row === end.row && col === end.col) {
        found = true;
        visualizePath(path.concat(grid[row][col])); // Visualize the path once found
        return;
      }
  
      visited[row][col] = true;
      setGrid(currentGrid => {
        const newGrid = [...currentGrid];
        newGrid[row][col] = { ...newGrid[row][col], isVisited: true };
        return newGrid;
      });
  
      await new Promise(resolve => setTimeout(resolve, 100)); // Delay for visualization
  
      if (!found) {
        const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
        for (let [dr, dc] of directions) {
          await dfs(row + dr, col + dc, path.concat(grid[row][col]));
        }
      }
    };
  
    await dfs(start.row, start.col);
  };
  
// Pseudo-code for BFS visualization
const visualizeBFS = async (start: NodeState, end: NodeState, signal: AbortSignal) => {
  let queue = [{ cell: grid[start.row][start.col], path: [grid[start.row][start.col]] }];
  let visited = Array(gridSize).fill(null).map(() => Array(gridSize).fill(false));
  visited[start.row][start.col] = true;

  while (queue.length > 0) {
    if (signal.aborted) {
      console.log("Search aborted!");
      return;
    }

    let { cell, path } = queue.shift()!;

    // Visualize current cell as visited
    if (!cell.isStart && !cell.isEnd) {
      // Set cell as visited in the grid for visualization
      setGrid(currentGrid => {
        const newGrid = [...currentGrid];
        newGrid[cell.row][cell.col] = { ...newGrid[cell.row][cell.col], isVisited: true }; // Assuming isVisited is styled similarly to isPath
        return newGrid;
      });
      await new Promise(resolve => setTimeout(resolve, 100)); // Adjust delay for visualization speed
    }

    if (cell.row === end.row && cell.col === end.col) {
      visualizePath(path); // Call visualizePath here with the final path
      return; // End the search as the goal is reached
    }

    const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    for (let [dr, dc] of directions) {
      let newRow = cell.row + dr;
      let newCol = cell.col + dc;
      if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize && !visited[newRow][newCol] && !grid[newRow][newCol].isObstruction) {
        visited[newRow][newCol] = true;
        queue.push({ cell: grid[newRow][newCol], path: [...path, grid[newRow][newCol]] });
      }
    }
  }
};

  const handleFindPathClick = () => {
    const path = findPathBFS(grid, startNode, endNode);
    visualizePath(path);
  };

  return (
    <div className="App">


      <div className="grid">
      <div className="button-container">
  <Button variant="contained" color="primary" onClick={() => visualizeBFS(startNode, endNode,abortController.signal)}>
    Find Path BFS
  </Button>
  <Button variant="contained" color="secondary" onClick={() => visualizeDFS(startNode, endNode, abortController.signal)}>
    Visualize DFS
  </Button>
  <Button variant="contained" onClick={resetGrid}>
    Reset Board
  </Button>
</div>

        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, cellIndex) => (
              <div
                key={cellIndex}
                className={`cell ${cell.isStart ? 'start' : ''} ${cell.isEnd ? 'end' : ''} ${cell.isObstruction ? 'obstruction' : ''} ${cell.isVisited ? 'visited' : ''} ${cell.isPath ? 'path' : ''}`}
                onClick={() => handleCellClick(rowIndex, cellIndex)}
                style={{ width: '20px', height: '20px', border: '1px solid black', display: 'inline-block' }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchVisualization;
