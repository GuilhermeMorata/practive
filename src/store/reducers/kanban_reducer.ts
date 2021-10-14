import { IPropsKanban, IStore_kanban } from "../../model";
import {kanban_Key} from "../actions/kanban_action";

//valores padroes do component
const initialState : IPropsKanban = {
    title_kanban : 'Kanban',
    title_equipe : 'MyEquip',
    requestCreatedCard : false,
    KanbanGrid : {
        titles_project: 'Project',
        grind: [
            {   
                title_table:'created',
                cards:[
                    {   grupo:'created',
                        legenda:'legenda1',
                        text:'texto1'
                    }
                ]
            },
            {
                title_table:'progress',
                cards:[]
            },
            {
                title_table:'conclusion',
                cards:[]
            }
        ]
    }
}

const kanban_reducer = (state=initialState, action:IStore_kanban)=>{
    switch(action.type){

        case kanban_Key.created_kanban : {
            return {...state,requestCreatedCard : !state.requestCreatedCard}
        }

        case kanban_Key.addCard : {
            let indexGrindAdd = state.KanbanGrid.grind?.findIndex(({ title_table}) => title_table === action.payload.grupoAdd)
            let result = state.KanbanGrid.grind[indexGrindAdd].cards

            result.push(action.payload.card) 

            return {
                ...state,
                ...state.KanbanGrid.grind[indexGrindAdd].cards = result 
            }
        
        }

        case kanban_Key.deleteCard : {
            console.log('action',)
            let indexGrindDelete = state.KanbanGrid.grind?.findIndex(({ title_table}) => title_table === action.payload.grupoDelete) 
            let list = state.KanbanGrid.grind[indexGrindDelete].cards
            let listFilter = list.filter((valor)=> valor.text !== action.payload.cardDelete.text)
        
            return {
                ...state,
                ...state.KanbanGrid.grind[indexGrindDelete].cards = listFilter 
            
            }
        }

        default:
            return state
    }
}

export default kanban_reducer;