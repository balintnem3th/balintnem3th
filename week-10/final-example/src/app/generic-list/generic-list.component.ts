import { Component, ViewChild, OnInit, ViewEncapsulation, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MatTableModule, MatTableDataSource,  MatSort , MatPaginator, MatPaginatorIntl,  MatDialogRef } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-generic-list',
  templateUrl: './generic-list.component.html',
  styleUrls: ['./generic-list.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class GenericListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() data: any[];
  @Input() headerList: any[];
  @Input() pageSize: number;
  @Input() pageSizeOptions: number[];
  @Input() displayedHeaders: any [];
  @Input() checkBox= false;
  @Input() saveIt: boolean;
  @Output() tableRow: EventEmitter<any> = new EventEmitter();

  private columns = [];
  private displayedColumns = [];
  private dataSource: MatTableDataSource<any>;
  private filteredHeaders: any[];
  private submitMessage: string;
  selection = new SelectionModel<any>(true, []);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue
      .toLocaleLowerCase()
      .trim();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  saveRow() {
    const rowSelected = this.selection.selected;
    const rowIdNameList = [] ;
    rowSelected.forEach((rowElement) => {
      rowIdNameList.push(
        {
          id: rowElement.id,
          name: rowElement.name
        });
    });
    if (rowSelected.length <= 0) {
      this.submitMessage = 'Nem választott ki senkit';
    } else {
      this.tableRow.emit(rowIdNameList);
    }
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.createTable();
    this.dataSource = new MatTableDataSource(this.data);
  }

  createTable() {
    this.headerList.forEach((element) => {
      if (this.displayedHeaders.includes(element.key)) {
        this.columns.push({
          columnDef: element.key,
          header: element.label,
          cell: row => `${row[element.key]}`
        });
      }
    });
    this.displayedColumns = this.columns.map(x => x.columnDef);
  }

}

export class MatPaginatorIntlHun extends MatPaginatorIntl {
  public itemsPerPageLabel = 'Találat oldalonként:';
  public nextPageLabel     = 'Következő oldal';
  public previousPageLabel = 'Előző oldal';

  getRangeLabel = function (page, pageSize, length): string {
    if (length <= 0) {
      return `0 találat`;
    }

    const startIndex = page * pageSize;

    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} / ${length} találatból`;
  };
}
