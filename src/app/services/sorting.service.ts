import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortingService {

  constructor() { }

  // Merge sort given array and returns an array with animation info.
  mergeSort(array: number[]): any[] {
    const animations = [];
    if (array.length <= 1) return animations;
    // Create a copy of the original array as the auxiliar array.
    const auxiliaryArray = array.slice();
    this.mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }

  // Merge sort helper.
  private mergeSortHelper(mainArray: number[], startIndex: number, endIndex: number, auxiliaryArray: number[], animations: any[]): void {
    if (startIndex === endIndex) return;
    const middleIndex = Math.floor((startIndex + endIndex) / 2);
    // Pass in the auxiliary array as the main array.
    this.mergeSortHelper(auxiliaryArray, startIndex, middleIndex, mainArray, animations);
    this.mergeSortHelper(auxiliaryArray, middleIndex + 1, endIndex, mainArray, animations);
    this.doMerge(mainArray, startIndex, middleIndex, endIndex, auxiliaryArray, animations);
  }

  // Sort the main array based on the values from the auxiliary array.
  private doMerge(mainArray: number[], startIndex: number, middleIndex: number, endIndex: number, auxiliaryArray: number[], animations: any[]): void {
    let k = startIndex;
    let i = startIndex;
    let j = middleIndex + 1;
    while (i <= middleIndex && j <= endIndex) {

      // Here we're comparing values at index i and j;
      // Push them once for changing colors.
      animations.push([i, j]);
      // Push them for a second time to change the colors back.
      animations.push([i, j]);

      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // Here we're overwriting the value at index k in the original array
        // with the value at index i in the auxiliary array.
        // Push the values for changing the height of the corresponding number bar.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // Here we're overwriting the value at index k in the original array
        // with the value at index j in the auxiliary array.
        // Push the values for changing the height of the corresponding number bar.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIndex) {
      // Same reason as described above.
      animations.push([i, i]);
      animations.push([i, i]);
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIndex) {
      // Same reason as described above.
      animations.push([j, j]);
      animations.push([j, j]);
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }


  // Quick sort given array and returns an array with animation info.
  quickSort(array: number[]): any[] {
    const animations = [];
    this.quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
  }

  // Quick sort helper.
  private quickSortHelper(array: number[], startIndex: number, endIndex: number, animations: any[]): void {
    if (startIndex >= endIndex) return;
    const pivotIndex = startIndex;
    let leftIndex = startIndex + 1;
    let rightIndex = endIndex;

    while (leftIndex <= rightIndex) {
      if (array[leftIndex] > array[pivotIndex] && array[rightIndex] < array[pivotIndex]) {
        this.swap(array, leftIndex, rightIndex, animations);
      }
      if (array[leftIndex] <= array[pivotIndex]) leftIndex++;
      if (array[rightIndex] >= array[pivotIndex]) rightIndex--;
    }
    this.swap(array, pivotIndex, rightIndex, animations);
    this.quickSortHelper(array, startIndex, rightIndex - 1, animations);
    this.quickSortHelper(array, rightIndex + 1, endIndex, animations);

  }

  private swap(array: number[], i: number, j: number, animations: any[]): void {
    // We're about to swaping the values at index i and j.
    // Push once for changing colors.
    animations.push([i, j]);
    let temp = array[i];
    // Here we're swaping values at index i and j in the original array
    // Push these values for changing height.
    animations.push([i, array[j], j, array[i]]);
    array[i] = array[j];
    array[j] = temp;
    // Push i and j for a second time for changing the colors back.
    animations.push([i, j]);
  }



  // Insertion sort given array and returns an array with animation info.
  insertionSort(array: number[]): any[] {
    const animations = [];
    if (array.length <= 1) return animations;
    for (let i = 1; i < array.length; i++) {
      for (let j = i; j - 1 >= 0 && array[j - 1] > array[j]; j--) {
        this.swap(array, j - 1, j, animations);
      }
    }
    return animations;
  }

  // Selection sort given array and returns an array with animation info.
  selectionSort(array: number[]): any[] {
    const animations = [];
    if (array.length <= 1) return animations;
  }

  // Bubble sort given array and returns an array with animation info.
  bubbleSort(array: number[]): any[] {
    const animations = [];
    if (array.length <= 1) return animations;
    let isSwap = true;
    while (isSwap) {
      isSwap = false;
      for (let i = 0; i < array.length; i++) {
        let first = array[i];
        let second = array[i + 1];
        if (first > second) {
          this.swap(array, i, i + 1, animations);
          isSwap = true;
        }
      }
    }
    return animations;
  }

}
