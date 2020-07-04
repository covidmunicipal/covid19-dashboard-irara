import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { format, formatRelative, differenceInCalendarDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RtdbDataService {

  spreadsheet: Observable<any>;

  // Entradas do dia atual
  lastTotalDayEntry: any;
  lastByLocationDayEntries: any[];

  // Última atualização da planilha e último boletim
  humanReadableLastUpdate: string;
  humanReadableLastBulletin: string;

  totalCasesArray: any;
  byLocationArray: any;
  additionalData: any;

  // Indicadores
  percentageOfActiveCases: number;
  recoveryRate: number;
  mortalityRate: number;
  averageGrowthRate: string;
  averageGrowthRateBulletin: string;
  testsPerThousand: number;

  // Séries
  confirmedSeries: [number];
  activeSeries: [number];
  recoveredSeries: [number];
  deceasedSeries: [number];
  humanReadableDateSeries: [string];

  constructor(private db: AngularFireDatabase) {

    this.updateDataFromApi();

  }

  async updateDataFromApi() {
    this.spreadsheet = this.db.object(`${environment.spreadsheetId}`).valueChanges();

    this.spreadsheet.subscribe((spreadsheetData) => {

      this.totalCasesArray = spreadsheetData.casos_totais;
      this.byLocationArray = spreadsheetData.por_localidade;
      this.additionalData = spreadsheetData.dados_adicionais;

      for (const entry of this.totalCasesArray) {
        entry.data = new Date(entry.data);
      }

      // Carrega a entrada mais nova
      this.lastTotalDayEntry = this.totalCasesArray[this.totalCasesArray.length - 1];
      this.humanReadableLastBulletin = format(this.lastTotalDayEntry.data, 'dd/MM/yyyy', {locale: ptBR});
      const now = new Date();

      // Carrega as séries para gráficos
      this.confirmedSeries = this.totalCasesArray.map(entry => entry.casos_confirmados.total);
      this.activeSeries = this.totalCasesArray.map(entry => entry.casos_ativos.total);
      this.recoveredSeries = this.totalCasesArray.map(entry => entry.casos_recuperados);
      this.deceasedSeries = this.totalCasesArray.map(entry => entry.obitos);
      this.humanReadableDateSeries = this.totalCasesArray.map(entry => format(entry.data, 'dd/MM/yyyy', {locale: ptBR}));

      // Calcula os indicadores
      this.percentageOfActiveCases = Math.round(
        (this.lastTotalDayEntry.casos_ativos.total / this.lastTotalDayEntry.casos_confirmados.total) * 100);
      this.recoveryRate = Math.round((this.lastTotalDayEntry.casos_recuperados / this.lastTotalDayEntry.casos_confirmados.total) * 100);
      this.mortalityRate = Math.round((this.lastTotalDayEntry.obitos / this.lastTotalDayEntry.casos_confirmados.total) * 100);
      this.testsPerThousand = Math.round(
        (this.lastTotalDayEntry.testes_realizados.total / this.additionalData[environment.targetLocation].populacao.quantidade) * 1000);

      // Calcula a taxa média de crescimento
      const lastWeekBulletin = this.totalCasesArray[this.totalCasesArray.length - 8];
      const diffBetweenDates = differenceInCalendarDays(this.lastTotalDayEntry.data, lastWeekBulletin.data);
      this.averageGrowthRateBulletin = format(lastWeekBulletin.data, 'dd/MM/yyyy', {locale: ptBR});
      this.averageGrowthRate = ((((this.lastTotalDayEntry.casos_confirmados.total - lastWeekBulletin.casos_confirmados.total) /
        lastWeekBulletin.casos_confirmados.total) * 100) / diffBetweenDates).toFixed(2);

      // Calcula diferenças em relação ao dia anterior
      if (this.totalCasesArray.length > 1) {
        const penultimateTotalDayEntry = this.totalCasesArray[this.totalCasesArray.length - 2];

        this.lastTotalDayEntry.diff_ativos = this.lastTotalDayEntry.casos_ativos.total - penultimateTotalDayEntry.casos_ativos.total;
        this.lastTotalDayEntry.diff_confirmados =
          this.lastTotalDayEntry.casos_confirmados.total - penultimateTotalDayEntry.casos_confirmados.total;
        this.lastTotalDayEntry.diff_recuperados = this.lastTotalDayEntry.casos_recuperados - penultimateTotalDayEntry.casos_recuperados;
        this.lastTotalDayEntry.diff_obitos = this.lastTotalDayEntry.obitos - penultimateTotalDayEntry.obitos;

      } else {
        this.lastTotalDayEntry.diff_ativos = 0;
        this.lastTotalDayEntry.diff_confirmados = 0;
        this.lastTotalDayEntry.diff_recuperados = 0;
        this.lastTotalDayEntry.diff_obitos = 0;
      }

      // Ordena a lista por localidade
      const lastEntry = this.byLocationArray[this.byLocationArray.length - 1];
      this.lastByLocationDayEntries = this.byLocationArray
        .filter(entry => entry.data === lastEntry.data)
        .sort((a, b) => b.ativos.total - a.ativos.total);

      // Formata a data de última atualização em tempo relativo
      const date = new Date(spreadsheetData.ultima_atualizacao);
      this.humanReadableLastUpdate = formatRelative(date, now, {locale: ptBR});

    });
  }

}
