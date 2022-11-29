import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

export interface PopularityInfo {
  isMouseOver: boolean;
  exerciseName: string;
  value: number;
}

@Component({
  selector: 'app-popularity',
  templateUrl: './popularity.component.html',
  styleUrls: ['./popularity.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopularityComponent implements OnInit, AfterViewInit {
  @Input() value!: number;
  @Input() exerciseName!: string;
  @Output() mouseOver: EventEmitter<PopularityInfo> = new EventEmitter<PopularityInfo>();
  percentageValue!: string;
  @ViewChild('valueDiv') valueDiv: ElementRef;
  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.percentageValue = Math.ceil((this.value / 5) * 100) + '%';
    this.valueDiv.nativeElement.style.width = this.percentageValue;
    this.changeDetectorRef.detectChanges();
  }

  @HostListener('mouseenter')
  mouseenter() {
    const info: PopularityInfo = {
      isMouseOver: true,
      exerciseName: this.exerciseName,
      value: this.value
    }
    this.mouseOver.emit(info);
  }

  
  @HostListener('mouseleave')
  mouseleave() {
    const info: PopularityInfo = {
      isMouseOver: false,
      exerciseName: this.exerciseName,
      value: this.value
    }
    this.mouseOver.emit(info);
  }
}
