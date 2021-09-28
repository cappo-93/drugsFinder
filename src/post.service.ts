import { Drug } from './app/app.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class PostService {
    constructor(private http: HttpClient) { }
    opts = [];
    private sortFunction = function (a: Drug, b: Drug) {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
    };
    getData() {
        return this.opts.length ?
            of(this.opts) :
            this.http.get('http://localhost:3000/api').pipe(tap((data: any) => this.opts = data.sort(this.sortFunction)))
    }
}