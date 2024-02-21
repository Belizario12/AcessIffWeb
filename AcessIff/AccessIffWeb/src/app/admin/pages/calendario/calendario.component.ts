import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { UnitOfControllerService } from 'src/app/controllers/UnitOfController/unit-of-controller.service';
import { CalendarioModalComponent } from '../../components/calendario-modal/calendario-modal.component';
import { Eventos, Tipo } from 'src/app/interfaces/evento';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent {
  eventos: any[] = [];


  constructor(
    private controller: UnitOfControllerService,
    private dialog: MatDialog
  ) {
    this.controller.eventosController.getEventos().subscribe({
      next: (response) => {

        response.metadata.data.forEach((evento: any) => {
          this.eventos.push({
            title: evento.nome,
            start: new Date(evento.dataInicio),
            end: new Date(evento.dataFim),
            color: evento.tipo,
            editable: true,
            button: true,
          })
        });
        this.calendarOptions.events = this.eventos;
      }
    })

  }

  handleEventClick(event: EventClickArg) {

    const evento = {
      nome: event.event.title,
      dataInicio: event.event.start?.toDateString(),
      dataFim: event.event.end?.toDateString(),
      tipo: 0,
    }

    this.eventos.forEach((element) => {
      if(evento.dataInicio !== undefined && evento.dataFim !== undefined) {
        if (element.title === evento.nome && element.start.toDateString() === evento.dataInicio && element.end.toDateString() === evento.dataFim) {
          evento.tipo = element.color
          this.openModal('Edit', element)
        }
      }

    })
  }

  openModal(type: string, element: any) {
    this.dialog.open(CalendarioModalComponent, {
      width: '500px',
      data: {
        type: type,
        element: element,
      }
    })
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
    events: [],
    eventClick: this.handleEventClick.bind(this),
  };
}

