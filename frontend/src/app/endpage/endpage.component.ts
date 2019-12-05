import {Component, Input, OnInit} from '@angular/core';
import { Mountain} from "../mountains/mountain";
import {MountainsService} from "../mountains/mountains.service";

@Component({
  selector: 'app-endpage',
  templateUrl: './endpage.component.html',
  styleUrls: ['./endpage.component.css']
})
export class EndpageComponent implements OnInit {
  @Input() mountain: Mountain;
  constructor(
    private mountainsService: MountainsService
  ) { }

  ngOnInit() {this.getIP()
  }
  mountains;
  test():void{
    console.log(this.mountain)
  }
  accept():void{
    alert("Thank you a lot for your time!")
  }
  allGuess=[];
  ip:string;

  getIP():void{
    this.mountainsService.getIP().subscribe((res:any)=>{
      this.ip=res.ip;
    });
  }
  id;
  refuse():void{
    alert("We are sorry to hear that, thank you!");

    this.mountainsService.findMe(this.ip).subscribe((resp)=>{
      this.allGuess=resp.body.data;
      console.log(this.allGuess[this.allGuess.length-1].id);
      this.id=this.allGuess[this.allGuess.length-1].id;
      this.mountainsService.refuse(this.id).subscribe((resp)=>{
        console.log(resp)
      })
    });
  }
}
