import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import * as data from '../../../emptyproject-flow/flow/designer.json';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  	selector: 'app-root',
  	templateUrl: './app.component.html',
  	styleUrls: ['./app.component.css']
})

export class AppComponent {
	title = 'workflowbuilder-comms';
	nodes:  any  = (data  as  any).default;
	url: string = 'http://127.0.0.1:5000/pipeline';
	resultLink = "";

	constructor(private http: HttpClient) {}

	// ngOnInit() {
	// 	// Listen to an event from the socket.io server
	// 	this.webSocketService.listen('welcomeMessage').subscribe((data) => {
	// 		console.log(data);
	// 	})
	// }

	runPipeline() {
		console.log("Running pipeline with JSON: ",this.nodes)
		// const headers = { 'content-type': 'application/json'} 
		const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');


		this.http.post(this.url,this.nodes,{ headers, responseType: 'text'}).subscribe(
			(res) => {
			  console.log("Run successful:\nResponce: ",res);
			  this.resultLink = res;
			},
			(err) => {
				console.log("Error Occured: ",err);
			}
		);

		// this.webSocketService.emit('transferJSON',this.nodes);
		console.log("emitting JSON")
	}
}
