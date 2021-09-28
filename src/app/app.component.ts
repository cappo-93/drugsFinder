import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { PostService } from 'src/post.service';

export type Drug = {
  id: string,
  diseases: [string],
  description: string,
  name: string,
  released: string,
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {

  myControl = new FormControl();
  options = [];
  filteredOptions: Observable<Drug[]>;
  valueable: string = '';

  constructor(private service: PostService) {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => {
        return this.filter(val || '')
      })
    )
  }

  filter(val: string): Observable<any> {
    return this.service.getData()
      .pipe(
        map((response: any) => response.filter((option: any) => {
          return option.name.toLowerCase().indexOf(val.toLowerCase()) === 0
        }))
      )
  }
}