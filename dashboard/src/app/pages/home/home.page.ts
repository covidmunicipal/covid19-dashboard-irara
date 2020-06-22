import { Component, OnInit } from '@angular/core';
import { RtdbDataService } from '../../services/rtdb-data.service';

import tippy from 'tippy.js';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  targetLocation = environment.targetLocation;

  constructor(public rtdbData: RtdbDataService) {

  }

  ngOnInit() {
    this.rtdbData.spreadsheet.subscribe(() => {

      tippy('#confirmed-tooltip', {
        content: `Dos <strong>${this.rtdbData.lastTotalDayEntry.casos_confirmados.total}</strong> casos,
                  <strong>${this.rtdbData.lastTotalDayEntry.casos_confirmados.lacen_ou_sorologia}</strong> foram confirmados
                  pelo LACEN ou sorologia, e <strong>${this.rtdbData.lastTotalDayEntry.testes_realizados.rapidos.positivos}</strong>
                  foram por meio de testes rápidos.`,
        allowHTML: true
      });

      tippy('#active-tooltip', {
        content: `Dos <strong>${this.rtdbData.lastTotalDayEntry.casos_ativos.total}</strong> casos ativos,
                  <strong>${this.rtdbData.lastTotalDayEntry.casos_ativos.lacen_ou_sorologia}</strong> foram confirmados
                  pelo LACEN ou sorologia, e <strong>${this.rtdbData.lastTotalDayEntry.casos_ativos.testes_rapidos}</strong>
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
        content: `Apenas são considerados óbitos pelo novo Coronavírus quando a pessoa tem resultado positivo atestado pelo LACEN ou teste sorológico.`,
        allowHTML: true
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
         A fórmula utilizada é (((totalDeCasosConfirmadosUltimoBoletim - totalDeCasosConfirmadosBoletimAnterior) / totalDeCasosConfirmadosBoletimAnterior) * 100) / 7.`
      });

      tippy('#insight-tests-thousand-tooltip', {
        content: `A fórmula utilizada é (totalDeTestesRápidosRealizados / populacaoDaCidade) * 1000.`
      });

    });
  }

}
