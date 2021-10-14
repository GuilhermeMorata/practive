export interface IPropsKanban{
    title_kanban: string;
    title_equipe: string;
    requestCreatedCard : boolean;
    KanbanGrid :{
        titles_project : string
        grind: Array<ITableGrind> 
    }
    
}

export interface ITableGrind {
    title_table: string,
    cards: Array<ICardKanban>
}

export interface ICardKanban{
    legenda : string,
    text :  string,
    grupo: string
}


export interface IActions_kanban{
    created_kanban: string;
    exchange_title_Kanbam: string;
    addCard: string;
    deleteCard: string;

}

export interface IStore_kanban{
    type: string;
    payload: any;
}


