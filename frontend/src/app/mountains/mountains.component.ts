import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Resps, Mountain } from "./mountain";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { MountainsService } from "./mountains.service";
import {MatTableDataSource} from "@angular/material";
import {coerceNumberProperty} from "@angular/cdk/coercion";
import {register} from "ts-node";

@Component({
  selector: 'app-mountains',
  templateUrl: './mountains.component.html',
  styleUrls: ['./mountains.component.css']
})
export class MountainsComponent implements OnInit {

  constructor(
    private mountainsService: MountainsService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.basicFormGroup = new FormGroup({
      first: new FormControl({value:0} ,Validators.required,),
      testName: new FormControl({value: 0},Validators.required )
    })
  }
  ngAfterViewChecked(){
    this.changeDetector.detectChanges()
  }
// <div [formGroup]="myGroup">
//   <input formControlName="firstName">
//   <input [(ngModel)]="showMoreControls" [ngModelOptions]="{standalone: true}">
//     </div>
  autoTicks = true;
  disabled = false;
  invert = false;
  max = 9000;
  min = 0;
  showTicks = true;
  step = 1;
  thumbLabel = true;
  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }
  private _tickInterval = 1;
  ip:string;
  ngOnInit() {
    this.getMountains();
    this.getIP();

  }
  getIP():void{
    this.mountainsService.getIP().subscribe((res:any)=>{
      this.ip=res.ip;
    });
  }
  mountains = new Mountain();
  isLinear: boolean=true ;
  no:number=0;
  basicFormGroup: FormGroup;
  guess;
  slider;
  ids=[];
  resps = new Resps();
  dataAll = new MatTableDataSource<any>();
  try1():void{
    console.log(this.mountains)
  }
  myKnowledge;
  saveKnowledge():void{
    this.myGuess2 = this.myGuess+';';
    for( let i=0;i<25;i++){
      if(this.dataAll.data[i].know!=null)
      {this.myGuess2 = this.myGuess2 + this.ids[i]+":"+this.dataAll.data[i].know + ',';
      console.log(this.myGuess2)}
    }
    this.mountainsService.findMe(this.ip).subscribe((resp)=>{
      this.allGuess=resp.body.data;
      this.id=this.allGuess[this.allGuess.length-1].id;
      this.mountainsService.guessAll(this.myGuess2,this.id).subscribe((resp)=>{
        console.log(resp)
      })
    })
  }

  getMountains():void{
    this.mountainsService.getMountains().subscribe((resp)=>{
      if(resp.success == true){
        this.resps = resp;
        this.mountains = resp.data;
        console.log(this.mountains);
        for( let i=0;i<resp.data.length;i++){
          this.mountains[i].no=i;
          this.ids[i]=resp.data[i].id
        }//存所有id
        this.dataAll.data = resp.data;
        for( let i=0;i<resp.data.length;i++) {

        }
      }
    })
  }
  next=true;
  finished=true;
  changeNext():void{
    this.next=false;
  }
  changeFinished():void{
    this.finished=false;
  }
  myGuess;
  myID;
  myIP;
  id;
  know;
  allGuess=[];
  checkOne=0;

  ifFinished():void{
    this.checkOne=0;
    for( let i=0;i<25;i++){
      if(this.mountains[i].guess>0){
        this.checkOne=this.checkOne+1;
      }
    }
    //console.log(this.checkOne)
    if(this.checkOne==25){
      this.guessAll();
      this.changeNext();
    }
    else{
      this.changeFinished();
    }
  }
  myGuess2;

  guessAll():void{
    this.myGuess=this.ids[0]+":"+this.mountains[0].guess;
    for( let i=1;i<25;i++){
      this.myGuess=this.myGuess+','+this.ids[i]+":"+this.mountains[i].guess;
    }
    for( let i=0;i<25;i++){
    this.dataAll.data[i].guess=this.mountains[i].guess;
    this.dataAll.data[i].difference=Math.abs(this.dataAll.data[i].guess-this.dataAll.data[i].altitude);
    if(Math.abs(this.dataAll.data[i].guess-this.dataAll.data[i].altitude)<=150){
      this.dataAll.data[i].color=0;
    }
    else{
      this.dataAll.data[i].color=1;
    }
    }
    this.mountainsService.findMe(this.ip).subscribe((resp)=>{
      this.allGuess=resp.body.data;
      this.id=this.allGuess[this.allGuess.length-1].id;
      this.mountainsService.guessAll(this.myGuess,this.id).subscribe((resp)=>{
        console.log(resp)
      })
    });

  }


}

