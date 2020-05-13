import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  errorCode: string;
  errorDetails: any = {};

  private ERROR_CODES = {
    '404': {
      name: '404',
      title: 'Whoops, resource not found',
      description: 'Try after some time, or going back and attempting the action again',
      help: 'Please email me if this problem persists.'
    },
    '500': {
      name: '500',
      title: 'Whoops, something went wrong on our end',
      description: 'Try after some time, or going back and attempting the action again',
      help: 'Please email me if this problem persists.'
    },
    'under-development': {
      name: '',
      title: 'Page under development',
      description: 'Try refreshing the page, or going back and try again after some time.',
      help: 'Please email me if this problem persists.'
    }
  }

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.errorCode = params.get("id");
      this.errorDetails = this.ERROR_CODES[this.errorCode] || this.ERROR_CODES['404'];
    });
  }

  get canShowEmail(): boolean {
    return !['404', 'under-development'].includes(this.errorCode);
  }

}
