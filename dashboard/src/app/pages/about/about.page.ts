import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  public faqEntries = [
    {
      question: 'Esta é uma fonte oficial?',
      answer: 'Não. Este projeto apenas agrega os dados publicados por outras fontes, como a Prefeitura de Irará.'
    },
    {
      question: 'Quais são as fontes utilizadas?',
      answer: 'TO-DO'
    },
    {
      question: 'Por que existem diferenças entre os valores do site com relação à de outras fontes?',
      answer: 'Podemos contabilizar os casos de forma diferente. [TO-DO: citar tooltip] Além disso, as fontes que usamos podem estar mais ou menos atualizadas que outras.'
    },
    {
      question: 'Quem são vocês?',
      answer: 'Este projeto é mantido por Erick Almeida, bacharelando em Ciência da Computação na Universidade Federal de Pernambuco (UFPE) e Diego Silva, bacharelando em Engenharia da Computação na Universidade Estadual de Feira de Santana, além de contribuidores que podem ser visualizados na nossa página do GitHub.'
    },
    {
      question: 'Por que vocês criaram este projeto já que não vão ganhar um centavo com ele?',
      answer: 'Porque o Coronavírus é um problema que afeta todos nós e a informação é algo essencial para combatê-lo. Hoje, são outras pessoas que está infectada. Amanhã, pode ser a gente. Documentar e armazenar esses dados pode ajudar as pessoas a tomarem decisões melhores.'
    }
  ];

  public buildData = {
    production: environment.production,
    buildVersion: environment.buildVersion
  };

  constructor() { }

  ngOnInit() {
  }

}
