import React, { useState, useEffect } from 'react';
import '../Styles/SortingVisStyles.css';
import Button from '@mui/material/Button';
import FlashCard from './Flashcard'
interface Bar {
  height: number;
  color: string;
}

function SortingVisualization() {
  const [bars, setBars] = useState<Bar[]>([]);

  useEffect(() => {
    resetBars();
  }, []);

  const resetBars = () => {
    const newBars: Bar[] = Array.from({ length: 20 }, (_, index) => ({
      height: Math.random() * 100 + 1,
      color: `hsl(${index * (360 / 20)}, 100%, 50%)`,
    }));
    setBars(newBars);
  };

  const bubbleSort = async () => {
    let barsCopy = [...bars];
    for (let i = 0; i < barsCopy.length; i++) {
      for (let j = 0; j < barsCopy.length - i - 1; j++) {
        if (barsCopy[j].height > barsCopy[j + 1].height) {
          [barsCopy[j], barsCopy[j + 1]] = [barsCopy[j + 1], barsCopy[j]]; // Swap
          setBars([...barsCopy]);
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      }
    }
  };
  const selectionSort = async () => {
    let barsCopy = [...bars];
    let n = barsCopy.length;
    
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++)
        if (barsCopy[j].height < barsCopy[minIdx].height)
          minIdx = j;

      // Swapping the elements
      [barsCopy[i], barsCopy[minIdx]] = [barsCopy[minIdx], barsCopy[i]];
      setBars([...barsCopy]);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  };

  const quickSort = async (arr = [...bars], start = 0, end = arr.length - 1) => {
    if (start >= end) return;
    
    let index = await partition(arr, start, end);
    await quickSort(arr, start, index - 1);
    await quickSort(arr, index + 1, end);
    // No need to setBars here if partition already triggers visual updates
  };
  
  const partition = async (arr: Bar[], start: number, end: number) => {
    const pivotValue = arr[end].height;
    let pivotIndex = start;
    for (let i = start; i < end; i++) {
      if (arr[i].height < pivotValue) {
        [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
        pivotIndex++;
        setBars([...arr]); // Trigger visual update
        await new Promise(resolve => setTimeout(resolve, 100)); // Uniform delay
      }
    }
    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
    setBars([...arr]); // Trigger visual update for the final pivot placement
    await new Promise(resolve => setTimeout(resolve, 100)); // Uniform delay
    return pivotIndex;
  };
  

  const startQuickSort = async () => {
    await quickSort();
  };
  const insertionSort = async () => {
    let barsCopy = [...bars];
    for (let i = 1; i < barsCopy.length; i++) {
      let key = barsCopy[i];
      let j = i - 1;

      /* Move elements of barsCopy[0..i-1], that are greater than key,
      to one position ahead of their current position */
      while (j >= 0 && barsCopy[j].height > key.height) {
        barsCopy[j + 1] = barsCopy[j];
        j = j - 1;
        setBars([...barsCopy]); // Update state for visual effect
        await new Promise((resolve) => setTimeout(resolve, 100)); // Visual delay
      }
      barsCopy[j + 1] = key;
    }
    setBars([...barsCopy]); // Final update to the state
  };

  const mergeSort = async (arr: Bar[] = [...bars], startIdx: number = 0): Promise<Bar[]> => {
    if (arr.length < 2) {
      return arr;
    }
    const middle = Math.floor(arr.length / 2);
    const leftArr = arr.slice(0, middle);
    const rightArr = arr.slice(middle);

    const leftSorted = await mergeSort(leftArr, startIdx);
    const rightSorted = await mergeSort(rightArr, startIdx + middle);

    return await merge(leftSorted, rightSorted, startIdx);
  };

  const merge = async (leftArr: Bar[], rightArr: Bar[], startIdx: number): Promise<Bar[]> => {
    let result: Bar[] = [];
    let leftIdx = 0;
    let rightIdx = 0;

    while (leftIdx < leftArr.length && rightIdx < rightArr.length) {
      if (leftArr[leftIdx].height < rightArr[rightIdx].height) {
        result.push(leftArr[leftIdx++]);
      } else {
        result.push(rightArr[rightIdx++]);
      }
    }

    result = result.concat(leftArr.slice(leftIdx)).concat(rightArr.slice(rightIdx));

    const barsCopy = [...bars];
    for (let i = 0; i < result.length; i++) {
      barsCopy[startIdx + i] = result[i];
      setBars([...barsCopy]);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    return result;
  };
  const sortingAlgorithms = [
    { name: 'Bubble Sort', description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.' },
    { name: 'Insertion Sort', description: 'Builds the final sorted array one item at a time, with the advantage of being efficient for (nearly) sorted data.' },
    { name: 'Merge Sort', description: 'A divide and conquer algorithm that divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.' },
    { name: 'Quick Sort', description: 'An efficient sorting algorithm, serving as a systematic method for placing the elements of an array in order.' },
    { name: 'Selection Sort', description: 'Sorts an array by repeatedly finding the minimum element from unsorted part and putting it at the beginning.' }
  ];

  const startMergeSort = async () => {
    await mergeSort();
  };

  return (
    <div className="sortingVisualizationContainer">
      <div className="barsContainer">
        {bars.map((bar, index) => (
          <div
            key={index}
            className="bar"
            style={{ height: `${bar.height}%`, backgroundColor: bar.color }}
          ></div>
        ))}
      </div>
      <div className="buttonsContainer">
        <Button variant="contained" color="secondary" onClick={resetBars}>Reset Bars</Button>
        <Button variant="contained" onClick={() => bubbleSort()}>Start Bubble Sort</Button>
        <Button variant="contained" onClick={() => insertionSort()}>Start Insertion Sort</Button>
        <Button variant="contained" onClick={startMergeSort}>Start Merge Sort</Button>
        <Button variant="contained" onClick={startQuickSort}>Start Quick Sort</Button>
        <Button variant="contained" onClick={selectionSort}>Start Selection Sort</Button>
      </div>
      <div className="flashcardsContainer">
        {sortingAlgorithms.map((algo, index) => (
          <FlashCard key={index} title={algo.name} description={algo.description} />
        ))}
      </div>
    </div>
  );
}

export default SortingVisualization;
