import { Component, OnInit } from '@angular/core';
import { RtdbDataService } from '../../services/rtdb-data.service';

import tippy from 'tippy.js';
import * as c3 from 'c3';

import { environment } from '../../../environments/environment';
import { BrasilIoDataService } from '../../services/brasilio-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  targetLocation = environment.targetLocation;

  themeColors: {
    confirmed: string,
    active: string,
    recovered: string,
    deceased: string
  };

  constructor(public rtdbData: RtdbDataService, public brasilIoData: BrasilIoDataService) {}

  ngOnInit() {
    this.rtdbData.spreadsheet.subscribe(() => {
      this.updateThemeColors();
      this.updateTooltips();
      this.updateGlanceCharts();
      this.updateEvolutionCharts();
    });
  }

  ionViewDidEnter() {
    if (this.rtdbData.lastTotalDayEntry) {
      this.updateThemeColors();
      this.updateTooltips();
      this.updateGlanceCharts();
      this.updateEvolutionCharts();
    }
  }

  updateTooltips() {
    tippy('#confirmed-tooltip', {
      content: `Dos <strong>${this.rtdbData.lastTotalDayEntry.casos_confirmados.total}</strong> casos,
                <strong>${this.rtdbData.lastTotalDayEntry.casos_confirmados.lacen_ou_sorologia}</strong> foram confirmados
                pelo teste RT-PCR ou teste sorológico, e <strong>${this.rtdbData.lastTotalDayEntry.testes_realizados.rapidos.positivos}</strong>
                foram por meio de testes rápidos.`,
      allowHTML: true
    });

    tippy('#active-tooltip', {
      content: `Dos <strong>${this.rtdbData.lastTotalDayEntry.casos_ativos.total}</strong> casos ativos,
                <strong>${this.rtdbData.lastTotalDayEntry.casos_ativos.lacen_ou_sorologia}</strong> foram confirmados
                pelo teste RT-PCR ou teste sorológico, e <strong>${this.rtdbData.lastTotalDayEntry.casos_ativos.testes_rapidos}</strong>
                foram por meio de testes rápidos.`,
      allowHTML: true
    });

    tippy('#recovered-tooltip', {
      content: `Segundo a <a href="https://agenciabrasil.ebc.com.br/saude/noticia/2020-05/agencia-brasil-explica-quando-alguem-e-considerado-curado-da-covid-19">
                Agência Brasil</a>, um caso é considerado recuperado quando o paciente passa por um novo teste
                e o resultado é negativo, ou em casos mais leves, depois de 14 dias sem sintomas.`,
      allowHTML: true,
      interactive: true
    });

    tippy('#deceased-tooltip', {
      content: `Apenas são considerados óbitos pelo novo Coronavírus quando a pessoa tem resultado positivo atestado pelo teste RT-PCR ou teste sorológico.`,
      allowHTML: true
    });

    tippy('#notified-tooltip', {
      content: `É o número de casos confirmados em ${environment.targetLocation} segundo a Secretaria de Saúde do Estado da Bahia, e não engloba testes rápidos. Este dado é fornecido pelo Brasil.IO.`
    });

    tippy('#monitored-tooltip', {
      content: `Um caso é considerado monitorado quando o paciente está sendo acompanhado pela Secretaria de Saúde.`
    });

    tippy('#suspected-tooltip', {
      content: `Um caso é considerado suspeito quando o paciente apresenta Síndrome Gripal (SG) ou Síndrome Respiratória Aguda Grave (SRAG), segundo as <a href="https://coronavirus.saude.gov.br/definicao-de-caso-e-notificacao">características descritas pelo Ministério da Saúde</a>.`,
      allowHTML: true,
      interactive: true
    });

    tippy('#discarded-tooltip', {
      content: `Um caso é considerado descartado quando o paciente foi considerado suspeito, mas houve resultado negativo para o novo Coronavírus ou existe confirmação laboratorial para outro agente causador dos sintomas.`
    });

    tippy('#population-source-tooltip', {
      content: `Este dado é ${this.rtdbData.additionalData[this.targetLocation].populacao.fonte}.`
    });

    tippy('#insight-active-cases-tooltip', {
      content: `A fórmula utilizada é (totalDeCasosAtivos / totalDeCasosConfirmados) * 100.`
    });

    tippy('#insight-recovery-rate-tooltip', {
      content: `A fórmula utilizada é (totalDeCasosRecuperados / totalDeCasosConfirmados) * 100.`
    });

    tippy('#insight-mortality-rate-tooltip', {
      content: `A fórmula utilizada é (totalDeObitos / totalDeCasosConfirmados) * 100.`
    });

    tippy('#insight-growth-rate-tooltip', {
      content: `Compreende o período entre ${this.rtdbData.averageGrowthRateBulletin} e ${this.rtdbData.humanReadableLastBulletin}.
       A fórmula utilizada é (((totalDeCasosConfirmadosUltimoBoletim - totalDeCasosConfirmadosBoletimAnterior) / totalDeCasosConfirmadosBoletimAnterior) * 100) / diferençaDeDias.`
    });

    tippy('#insight-tests-thousand-tooltip', {
      content: `A fórmula utilizada é (totalDeTestesRápidosRealizados / populacaoDaCidade) * 1000.`
    });

  }

  updateThemeColors() {
    const styles = document.querySelector('style');
    this.themeColors = {
      confirmed: window.getComputedStyle(styles).getPropertyValue('--ion-color-danger'),
      active: window.getComputedStyle(styles).getPropertyValue('--ion-color-primary'),
      recovered: window.getComputedStyle(styles).getPropertyValue('--ion-color-success'),
      deceased: window.getComputedStyle(styles).getPropertyValue('--ion-color-medium')
    };
  }

  updateGlanceCharts() {

    const axis = {
      x: {
        show: false
      },
      y: {
        show: false
      }
    };
    const legend = {
      show: false
    };
    const interaction = {
      enabled: false
    };

    c3.generate({
      bindto: '#confirmed-glance-chart',
      data: {
          columns: [
              ['confirmed', ...this.rtdbData.confirmedSeries.slice(-7)]
          ],
          type: 'line'
      },
      color: {
        pattern: [this.themeColors.confirmed]
      },
      axis,
      legend,
      interaction
    });

    c3.generate({
      bindto: '#active-glance-chart',
      data: {
          columns: [
              ['active', ...this.rtdbData.activeSeries.slice(-7)]
          ],
          type: 'line'
      },
      color: {
        pattern: [this.themeColors.active]
      },
      axis,
      legend,
      interaction
    });

    c3.generate({
      bindto: '#recovered-glance-chart',
      data: {
          columns: [
              ['recovered', ...this.rtdbData.recoveredSeries.slice(-7)]
          ],
          type: 'line'
      },
      color: {
        pattern: [this.themeColors.recovered]
      },
      axis,
      legend,
      interaction
    });

    c3.generate({
      bindto: '#deceased-glance-chart',
      data: {
          columns: [
              ['deceased', ...this.rtdbData.deceasedSeries.slice(-7)]
          ],
          type: 'line'
      },
      color: {
        pattern: [this.themeColors.deceased]
      },
      axis,
      legend,
      interaction
    });

  }

  updateEvolutionCharts() {

    c3.generate({
      bindto: '#total-cases-chart',
      data: {
          x: 'x',
          xFormat: '%d/%m/%Y',
          columns: [
              ['x', ...this.rtdbData.humanReadableDateSeries],
              ['Confirmados', ...this.rtdbData.confirmedSeries],
              ['Ativos', ...this.rtdbData.activeSeries],
              ['Recuperados', ...this.rtdbData.recoveredSeries],
              ['Óbitos', ...this.rtdbData.deceasedSeries],
          ],
          type: 'line'
      },
      color: {
        pattern: [this.themeColors.confirmed, this.themeColors.active, this.themeColors.recovered, this.themeColors.deceased]
      },
      zoom: {
        enabled: true
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
              format: '%d/%m/%Y',
              values: [
                '26/03/2020',
                '26/04/2020',
                '26/05/2020',
                '26/06/2020',
                '26/07/2020',
                '26/08/2020',
                '26/09/2020',
                '26/10/2020',
                '26/11/2020',
                '26/12/2020'
              ]
          }
        },
        y: {
          min: 0,
          tick: {
            values: [
              0,
              10,
              20,
              30,
              40,
              50,
              60,
              70,
              80,
              90,
              100,
              110,
              120,
              130,
              140,
              150,
              160,
              170,
              180,
              190,
              200
            ],
          }
      }
    }
    });

  }

}
