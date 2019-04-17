/**
 * Created by Narcis2007 on 29.04.2017.
 */


export class AlertMessageHandler{
    message:string;

    clearErrorAlert(){
        this.message='';
    }

    hideAlert(event){
        event.target.parentNode.style.display="none";
    }
}