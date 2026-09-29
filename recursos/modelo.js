class Comedor {
 constructor(){this.reset('aprobado')}
 reset(mode){this.mode=mode;this.screen='C-P01';this.menu='Vegetariano';this.wallet=null;this.ticket=mode==='existente';this.pending=false;this.used=false;this.attempts=0;this.message='';}
 go(s){this.screen=s;return s}
 act(action){let [event,value]=action.split(':');this.message='';
 if(event==='home')return this.go('C-P01');
 if(event==='enter')return this.go(this.ticket?'C-P11':this.pending?'C-P10':'C-P02');
 if(event==='catalogue')return this.go('C-P02');
 if(event==='detail'){this.menu=value;return this.go('C-P03')}
 if(event==='select'||event==='choose'){if(value)this.menu=value;if(this.ticket)return this.go('C-P11');if(this.mode==='agotado'&&!this.used){this.used=true;this.soldMenu=this.menu;return this.go('C-P08')}return this.go('C-P04')}
 if(event==='wallet'){this.wallet=value;return this.go('C-P04')}
 if(event==='summary')return this.go('C-P04');
  if(event==='pay'){if(this.ticket)return this.go('C-P11');if(this.pending)return this.go('C-P10');if(!this.wallet)return this.go('C-P04');return this.go('C-P05')}
 if(event==='authorize'){if(this.pending||this.ticket)return this.screen;this.attempts++;this.pending=true;return this.go('C-P06')}
 if(event==='result'){if(!this.pending)return this.screen;if(this.mode==='rechazado'&&!this.used){this.used=true;this.pending=false;return this.go('C-P09')}if(this.mode==='pendiente'&&!this.used){this.used=true;return this.go('C-P10')}if(this.mode==='sinconexion'&&!this.used){this.used=true;return this.go('C-P12')}this.pending=false;this.ticket=true;return this.go('C-P07')}
 if(event==='retry')return this.go('C-P04');
 if(event==='check'||event==='reconnect'){this.pending=true;this.used=true;return this.go('C-P06')}
 if(event==='ticket')return this.go('C-P07');
 return this.screen;
 }
}

if(typeof module!=="undefined")module.exports=Comedor;
