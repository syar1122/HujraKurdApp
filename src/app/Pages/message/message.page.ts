import { Component, OnInit } from "@angular/core";
import { MessageDataService } from "src/app/Services/message-data.service";

@Component({
  selector: "app-message",
  templateUrl: "./message.page.html",
  styleUrls: ["./message.page.scss"],
})
export class MessagePage implements OnInit {
  public messages: any[] = [];

  constructor(private mdService: MessageDataService) {}

  ngOnInit() {
    this.mdService.getData().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let item: any = doc.data();
        item.id = doc.id;

        console.log(item);

        this.messages.push(item);
        console.log(`${doc.id} => ${doc.data().message}`);
      });
    });

    console.log("message", this.messages);
  }

  doRefresh(event) {
    this.messages = [];
    this.mdService.getData().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let item: any = doc.data();
        item.id = doc.id;

        this.messages.push(item);
      });

      event.target.complete();
    });
  }
}
