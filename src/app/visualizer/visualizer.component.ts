import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { SortingService } from '../services/sorting.service';
import { NumberBarComponent } from './number-bar/number-bar.component';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css']
})
export class VisualizerComponent implements OnInit {

  // Get the NumberBarComponents from the DOM.
  @ViewChildren(NumberBarComponent) numberBars: QueryList<NumberBarComponent>;

  arrayToSort: number[] = [];
  animations: any[];
  selected: string = "mergeSort";
  primaryColor: string = "#a8df65";
  secondColor: string = "#e84a5f";
  delay: number = 1;
  isFinished: boolean = true;

  constructor(private sortingService: SortingService) { }

  // Create an array with length 100.
  // Values in the array are ranged between 1 and 100.
  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.arrayToSort.push(this.randomIntFromInterval(1, 100));
    }
  }

  // Generate a random integer between min and max (endpoints included).
  randomIntFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // Reset the array with new values.
  resetArray(): void {
    this.arrayToSort = [];
    for (let i = 0; i < 100; i++) {
      this.arrayToSort.push(this.randomIntFromInterval(1, 100));
    }
  }

  onChangeDelay(event: any): void {
    this.delay = event.value;
  }

  onStart(): void {
    // Disable the reset and start buttons when sorting is not finished.
    this.isFinished = false;
    const numBars = this.numberBars.toArray();
    const array = [];
    for (let i = 0; i < numBars.length; i++) {
      array.push(numBars[i].height);
    }
    this.animations = [];
    // Call selected sorting algorithm.
    switch (this.selected) {
      case 'mergeSort': {
        this.onMergeSort(array);
        break;
      }
      case 'quickSort': {
        this.onQuickSort(array);
        break;
      }
      case 'insertionSort': {
        this.onInsertionSort(array);
        break;
      }
      case 'bubbleSort': {
        this.onBubbleSort(array);
        break;
      }
      default: {
        break;
      }
    }
  }

  // Perform merge sort animation.
  onMergeSort(array: number[]): void {
    this.animations = this.sortingService.mergeSort(array);
    for (let i = 0; i < this.animations.length; i++) {
      // Obtain the number bars in the DOM as an array.
      const numBars = this.numberBars.toArray();
      const isColorChange = i % 3 !== 2;
      // Perform color change animation.
      if (isColorChange) {
        const [barOneIndex, barTwoIndex] = this.animations[i];
        const color = i % 3 === 0 ? this.secondColor : this.primaryColor;
        setTimeout(() => {
          numBars[barOneIndex].color = color;
          numBars[barTwoIndex].color = color;
        }, i * this.delay);
      } else {
        // Change the height of the targeted number bar.
        setTimeout(() => {
          const [barOneIndex, newHeight] = this.animations[i];
          numBars[barOneIndex].height = newHeight;
          // Enable the reset and start buttons when finished.
          if (i === this.animations.length - 1) {
            this.isFinished = true;
          }
        }, i * this.delay);
      }
    }
  }

  // Perform quick sort animation.
  onQuickSort(array: number[]): void {
    this.animations = this.sortingService.quickSort(array);
    this.swapAnimation();
  }



  // Perform insertion sort animation.
  onInsertionSort(array: number[]): void {
    this.animations = this.sortingService.insertionSort(array);
    this.swapAnimation();
  }

  // Perform bubble sort animation.
  onBubbleSort(array: number[]): void {
    this.animations = this.sortingService.bubbleSort(array);
    this.swapAnimation();
  }

  // Perform swap animation.
  swapAnimation(): void {
    for (let i = 0; i < this.animations.length; i++) {
      // Obtain the number bars in the DOM as an array.
      const numBars = this.numberBars.toArray();
      const isColorChange = i % 3 !== 1;
      // Perform color change animation.
      if (isColorChange) {
        const [barOneIndex, barTwoIndex] = this.animations[i];
        const color = i % 3 === 0 ? this.secondColor : this.primaryColor;
        setTimeout(() => {
          numBars[barOneIndex].color = color;
          numBars[barTwoIndex].color = color;
          // Enable the reset and start buttons when finished.
          if (i === this.animations.length - 1) {
            this.isFinished = true;
          }
        }, i * this.delay);
      } else {
        // Swaping two number bars.
        setTimeout(() => {
          const [barOneIndex, newHeightOne, barTwoIndex, newHeightTwo] = this.animations[i];
          numBars[barOneIndex].height = newHeightOne;
          numBars[barTwoIndex].height = newHeightTwo;
        }, i * this.delay);
      }
    }
    this.isFinished = true;
  }

}
