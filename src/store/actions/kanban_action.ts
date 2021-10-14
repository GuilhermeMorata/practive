import { IActions_kanban } from "../../model";

export const kanban_Key: IActions_kanban = {
    created_kanban : "created_kanban",
    exchange_title_Kanbam: "exchange_title_Kanbam",
    addCard : "addCard",
    deleteCard: "deleteCard",
    
}

export function kanban_action(){


}

export function exchangeTitle(valor: any){
    return {
        payload: valor,
        type: kanban_Key.created_kanban
    }
}

export function createdCard(){
        return{
            type: kanban_Key.created_kanban
        } 
}

export function addCard(valor:any) {
    return(
        {
            type: kanban_Key.addCard,
            payload: {...valor}
        }
    )
}

export function deleteCard(valor:any) {
    return(
        {
            type: kanban_Key.deleteCard,
            payload: {...valor}
             
        }
    )
}

