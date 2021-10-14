import React from "react";
import { render, screen } from "@testing-library/react";
import { Kanban } from "../components";
import kanban_reducer from "../store/reducers/kanban_reducer";
import { combineReducers, createStore } from "redux";
import rootReducer from "../store/reducers";
import { useSelector } from "react-redux";
import { createdCard } from "../store/actions/kanban_action";
import { IPropsKanban } from "../model";




function createTestStore() {
    const store = createStore(
      combineReducers({
        rootReducer
      })
    );
}
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
describe('Kanban redux',()=>{
    let store: any

    beforeEach(() => {
        store = createTestStore();
      });

    test('test return redux',async ()=>{
        let storeTest = kanban_reducer(initialState,{type:"",payload:{}})
        expect(storeTest === null || typeof storeTest === 'boolean').toBeTruthy
    })
})
