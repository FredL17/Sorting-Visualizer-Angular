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
    if(array.length <= 1) return animations;
  }



  // Insertion sort given array and returns an array with animation info.
  insertionSort(array: number[]): any[] {
    const animations = [];
    if(array.length <= 1) return animations;
  }

  // Selection sort given array and returns an array with animation info.
  selectionSort(array: number[]): any[] {
    const animations = [];
    if(array.length <= 1) return animations;
  }

  // Bubble sort given array and returns an array with animation info.
  bubbleSort(array: number[]): any[] {
    const animations = [];
    if(array.length <= 1) return animations;
  }

}
