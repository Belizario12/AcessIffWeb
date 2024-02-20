import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as qrcode from 'qrcode-generator';

@Component({
  selector: 'app-qrcode-modal',
  templateUrl: './qrcode-modal.component.html',
  styleUrls: ['./qrcode-modal.component.scss'],
})
export class QrcodeModalComponent {
  qrCodeImage: string | undefined;
  qrData: any = { id: 123, name: 'Objeto de Exemplo' };
  qrCodeSize = 12;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.generateQRCode();
  }

  generateQRCode() {
    const qr = qrcode(0, 'M');
    qr.addData(JSON.stringify(this.qrData));
    qr.make();
    this.qrCodeImage = qr.createDataURL(this.qrCodeSize, 0);
  }

  generatePDF() {
    const element = document.getElementById('content')!;

    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Carteirinha do aluno ${this.data.nome}.pdf`);
    });
  }

  back() {
    window.history.back();
  }
}
