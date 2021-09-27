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
    getData() {
        return this.opts.length ?
            of(this.opts) :
            this.http.get('http://localhost:3000/drugs').pipe(tap((data: any) => this.opts = data))
    }
}