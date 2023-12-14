import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, finalize } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(
    private spinner: NgxSpinnerService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.show();

    return next.handle(request).pipe(
      finalize(() => setTimeout(() => {
        this.spinner.hide();
      }, 1000))
    )
  }
}
