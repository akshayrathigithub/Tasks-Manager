import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConvertTimeService {
  // 20:59:59
  constructor() { }

  getSeconds(time: string){
    let hoursec: number
    let minsec: number
    let secsec: number

    if( time[0] === '0'){
      hoursec = parseInt(time[1],10)*3600
    }else{
      let t: any = time[0]+time[1]
      t = parseInt(t, 10)
      hoursec = t*3600
    }

    if( time[3] === '0'){
      minsec= parseInt(time[4], 10)*60
    }else{
      let t: any = time[3]+time[4]
      t = parseInt(t, 10)
      minsec = t*60
    }

    if( time[6] === '0'){
      secsec= parseInt(time[7],10)
    }else{
      let t: any = time[6]+time[7]
      t = parseInt(t, 10)
      secsec = t
    }

    return hoursec + minsec + secsec
  }
  getTime(Seconds: any){
    let Hours: any = Math.floor(Seconds / 3600);
    Seconds = Seconds - Hours * 3600;
    let Minutes: any = Math.floor(Seconds / 60);
    Seconds = Seconds - Minutes * 60;

    if(Hours <10){
      Hours = '0'+ Hours
    }
    if(Minutes <10){
      Minutes = '0'+ Minutes
    }
    if(Seconds <10){
      Seconds = '0'+ Seconds
    }
    return `${Hours}:${Minutes}:${Seconds}`
  }
}
