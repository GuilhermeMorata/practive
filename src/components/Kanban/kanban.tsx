import './kanban.css';
import {IoMdAdd } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { addCard, createdCard, deleteCard } from '../../store/actions/kanban_action'
import { useState } from 'react';
import { ICardKanban } from '../../model';


export function Kanban(){
    //status globais
    const store = useSelector((state: any) => state.kanban_reducer)
    const actions = useDispatch()
    
    //status locais
    const [cardDates , setcardDates ] = useState<ICardKanban>({
        grupo: !store.KanbanGrid.grind[0].title_table ? store.KanbanGrid.grind[0].title_table :store.KanbanGrid.grind[0].title_table ,
        legenda:'',
        text: ''
    })
    
    
    //created card
    function rendercreatedCard(){
        function addCardList(){
            try {
                if(cardDates.grupo && cardDates.legenda && cardDates.text !== null || ''){
                    return (actions(addCard({
                                 grupoAdd : cardDates.grupo,
                                 card : cardDates})
                                 ))
                }
                else{
                    return null
                }  
            } catch (error) {
                console.log('erro->',error)
            }
       
        }
        
        if(store.requestCreatedCard === true){
          
            return(
                <div className='createdCard-content'>
                    <div className='createdCard-painel'>
                        <div>
                            <span>Legenda:
                                <input onChange={(e)=>{setcardDates(
                                    {...cardDates,legenda : e.target.value}
                                )}}/>
                            </span>
                            <span>Texto:
                                <textarea onChange={(e)=>{setcardDates(
                                    {...cardDates,text : e.target.value}
                                )}}/>
                            </span>
                        </div>
                        <div>
                            <button onClick={()=>{addCardList()}}>Adicionar</button>
                            <button onClick={()=>{actions(createdCard())}}>Close</button>
                        </div> 
                    </div>
                </div>
            )
        }

    }

    //grids
    function renderGrindTable(){

        function dropOn(e:any) {
            try {
                e.preventDefault();
                let grupoDelete = e.dataTransfer.getData('delete');
                let grupoAdd  = e.target.id
                let card = e.dataTransfer.getData('card')
                        
                actions(addCard({
                    grupoAdd : grupoAdd,
                    card : {...JSON.parse(card)}
                }))
                actions(deleteCard({
                    grupoDelete : grupoDelete,
                    cardDelete : {...JSON.parse(card)}
                }))
            } catch (error) {
                console.log('o erro->',error)
            } 
          

        }

        function dropzone(e:any) { 
            e.preventDefault();
        }

        let listTables = store.KanbanGrid.grind.map((valor:any)=>{
            return (
                <div className='kanban-grid-table' key={valor.title_table} id={valor.title_table} onDrop={(e)=>{dropOn(e)}} onDragOver={(e)=>{dropzone(e)}}>
                    {valor.cards.map((card:any,index:any)=>{return <Card key={index} props={[card,valor.title_table]}/>})}
                </div> 
            )
        })
        return listTables
    
    }


    //card
    function Card(props:any){
        let card = props.props[0]
        let grupoDelete = props.props[1]
        let cardAdd = JSON.stringify(props.props[0])

        function draggableCard(e:any){
            e.dataTransfer.setData('delete',grupoDelete)
            e.dataTransfer.setData('card',cardAdd)

        }
        
        return(
            <div className='cardKanban' draggable='true' id={card.legenda} onDragStart={(e)=>{draggableCard(e)}}>
                 <span>{card.text}</span>
            </div>
           
        )
    } 

   

    return(
            <div className='kanban-conteiner'>
                <div className='kanban-header'>
                    <span>{store.title_kanban} - {store.title_equipe}</span>
                </div>
                <div className='kanban-controller-painel'>
                    <div className='kanban-controller-buttons'>
                        <button onClick={()=>{actions(createdCard())}}><IoMdAdd className='kanban-controller-buttons-icons'/></button>
                    </div> 
                    <div className='kanban-grids'>
                        {renderGrindTable()}
                        {rendercreatedCard()}
                    </div>
                </div>
            </div>
    )

}