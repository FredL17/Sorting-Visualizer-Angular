import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-number-bar',
  templateUrl: './number-bar.component.html',
  styleUrls: ['./number-bar.component.css']
})
export class NumberBarComponent implements OnInit {

  // Height and color are set from the VisualizerComponent.
  @Input() height: number;
  @Input() color: string;

  constructor() { }

  ngOnInit(): void {
  }

}
