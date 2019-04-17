import { Component, OnInit } from '@angular/core';
var particles=require('particles.js/particles.js');
var particlesFunction=require('../../js/app.js');

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    particlesFunction.generateParticles();
  }

}
