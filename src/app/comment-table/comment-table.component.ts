import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommentsComponent } from '../comments/comments.component';

@Component({
  selector: 'app-comment-table',
  templateUrl: './comment-table.component.html',
  styleUrls: ['./comment-table.component.scss']
})

export class CommentTableComponent implements OnInit {
  displayedColumns: string[] = ['userId', 'id', 'title','body','actions'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  url:string='https://jsonplaceholder.typicode.com/posts';
  constructor(private http: HttpClient, private router:Router) { 
    this.http.get<any>(this.url).subscribe((data:any)=>{
      this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      console.log(this.dataSource);
    })
  }
  onclick(row): void {
    this.router.navigate(['comments',row]);
  }
  ngOnInit(): void {
    
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
