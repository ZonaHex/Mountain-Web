import {Component, Input, OnInit} from '@angular/core';
import { Mountain} from "../mountains/mountain";
import {MountainsService} from "../mountains/mountains.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-endpage',
  templateUrl: './endpage.component.html',
  styleUrls: ['./endpage.component.css']
})
export class EndpageComponent implements OnInit {
  @Input() mountain: Mountain;
  constructor(
    private mountainsService: MountainsService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {this.getIP()
  }
  first=false;
  mountains;
  test():void{
    console.log(this.mountain)
  }

  accept():void{
    this.first=true;

    this.snackBar.open("Thank you!¡Gracias!",'ok',{duration:3000}
    )
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
    this.first=true;
    this.snackBar.open("Thank you!¡Gracias!",
    'ok',{duration:3000}
    );
    this.mountainsService.findMe(this.ip).subscribe((resp)=>{
      this.allGuess=resp.body.data;
      console.log(this.allGuess[this.allGuess.length-1].id);
      this.id=this.allGuess[this.allGuess.length-1].id;
      this.mountainsService.refuse(this.id).subscribe((resp)=>{
        console.log(resp)
      })
    });
  }
  ifEnd=false;
  end():void{
    this.ifEnd=true;
  }
}
