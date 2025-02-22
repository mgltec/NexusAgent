import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  @ViewChild('content') content!: ElementRef;

  public sanitizedUrl: SafeResourceUrl = '';
  public isDesktop: boolean = false;

  constructor(
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
    private dataService: DataService
  ) {}

  @HostListener('window:resize')
  onWindowResize() {
    this.isDesktop = window.matchMedia('(min-width: 1024px)').matches;
  }

  ngOnInit(): void {
    this.isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    this.dataService.OpenInvoiceUrl.subscribe(invoiceUrl => {
      if (invoiceUrl) {
        this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(invoiceUrl);
        this.modalService.open(this.content, { centered: true, ariaLabelledBy: 'modal-basic-title', windowClass: 'modal-card' });
      }
    });
  }

  closePopupMenu(modal: any) {
    setTimeout(() => {
      this.close(modal);
    }, 300);
  }

  close(modal: any) {
    modal.close('Save click');
  }
}
