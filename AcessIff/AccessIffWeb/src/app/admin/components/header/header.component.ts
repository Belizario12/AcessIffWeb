import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UnitOfControllerService } from 'src/app/controllers/UnitOfController/unit-of-controller.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private controller: UnitOfControllerService,
    private router: Router,
  ) {}

  exit() {
    this.controller.cookieController.deleteCookie();
    this.router.navigate(['/login']);
  }
}
