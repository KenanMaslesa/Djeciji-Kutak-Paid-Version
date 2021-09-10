import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact-us/contact.service';

@Component({
  selector: 'app-contact-messages',
  templateUrl: './contact-messages.component.html',
  styleUrls: ['./contact-messages.component.scss']
})
export class ContactMessagesComponent implements OnInit {
  messages: any;
  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.getMessages();
  }

  getMessages(){
    this.contactService.getMessages().subscribe(response => {
      this.messages = response;
    })
  }

}
