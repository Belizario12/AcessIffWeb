import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { UnitOfControllerService } from 'src/app/controllers/UnitOfController/unit-of-controller.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent {

  constructor(
    private controller: UnitOfControllerService,
  ) {

  }



  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    buttonText: {
      today: 'Hoje',
      month: 'Mês',
      week: 'Semana',
      day: 'Dia',
      list: 'Lista'
    },
    locale: 'pt-br',
    timeZone: 'America/Sao_Paulo',
    weekends: true,
    events: [
      { title: 'Meeting', start: new Date(), color: 'red', editable: true, button: true },
    ]
  };
}
