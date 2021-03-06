import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
	moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent {

	@ViewChild('slider') slider: ElementRef;

	readonly InitSliderStyle: any = {
		opacity: 0,
		zIndex: -100,
		transform: `translate3d(0, 0, 0)`
	}
	private sliderStyle: any = this.InitSliderStyle;
	private tableWidth = 672;

	ngAfterViewInit(){
		if(this.slider && this.slider.nativeElement){
			let sliderEle:HTMLDivElement = this.slider.nativeElement;
			sliderEle.addEventListener('transitionend', (e)=>{
				console.log("transitionend");
				this.sliderStyle = this.InitSliderStyle;
			}, false);
		}
	}

	handlePan(e: any){
		// console.log(e);
		if(e.type === 'panstart'){
			this.sliderStyle = {}
		}else if(e.isFinal){
			if(Math.abs(e.deltaX) >= this.tableWidth / 2 || Math.abs(e.velocity) > 2){
				console.log("slide to lr");
				this.sliderStyle.transition = "transform 200ms ease-out";
				let direction = e.deltaX > 0 ? 'right' : 'left';
				if(direction === 'left'){
					this.sliderStyle.transform = `translate3d(${-this.tableWidth}px, 0, 0)`;
				}else{
					this.sliderStyle.transform = `translate3d(${this.tableWidth}px, 0, 0)`;
				}
			}else{
				console.log("slide back");
				this.sliderStyle.transition = "transform 100ms ease-out";
				this.sliderStyle.transform = `translate3d(0, 0, 0)`;
			}
		}else{
			this.sliderStyle.transform = `translate3d(${e.deltaX}px, 0, 0)`;
		}
	}

}
