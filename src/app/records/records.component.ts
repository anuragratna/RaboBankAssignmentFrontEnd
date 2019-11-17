import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit,OnChanges {
  @Input() records;
  @Input() header;
  constructor() { }
  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.records){
      this.records = this.records;
      this.header = this.header;
    }

  }

}
