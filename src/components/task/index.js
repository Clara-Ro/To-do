import './index.css'
import { useState } from 'react';

export default function Task() {
    const [status, setStatus] = useState('all')
    const [text, setText] = useState()
    const [list, setList] = useState([
        {
            id: 0,
            text: 'Terminar esse projeto',
            completed: false
        },
        {
            id: 1,
            text: 'Ler',
            completed: true
        },
        {
            id: 2,
            text: 'Bullet Journal',
            completed: true
        },
        {
            id: 3,
            text: 'Jogar',
            completed: false
        }
    ]);

    function handleToggleToDo(id){
        const index = list.findIndex((item)=>{
            return( item.id === id)
        })
        list[index].completed = !list[index].completed
        setList([...list])
    }

    function handleCreateToDo(text){
        list.push({
            id:list.length,
            text,
            completed:false
        })
        setList([...list])
    }

    function sendToDo({key}){
        if(key==='Enter'){
            handleCreateToDo(text)
            setText('')
        }
    }

    function deleteToDo(id){
        const index = list.findIndex((item)=>{
            return( item.id === id)
        })
        const beforeList = list.slice(0, index)
        const afterList = list.slice(index+1)
        setList(beforeList.concat(afterList))
    }

    function clearCompleted(){
        const newList=list.filter((item)=> !item.completed)
        setList(newList)
    }
    let filteredList;
    switch(status){
        case 'all':
            filteredList = list
            break;
        
        case 'active':
            filteredList = list.filter((item)=>!item.completed)
            break;

        case 'completed':
            filteredList = list.filter((item)=>item.completed)
            break;
    }
    return (
        <div className='container'>
            <div className='text'>
                <h1>To Do</h1>
                <img src="/assets/icons/icon-sun.svg" alt="ligth-mode" />
            </div>
            
            <div className='create-to-do'>
                <input type='checkbox' className='checkbox-button' disabled/>
                <input className='create' placeholder='Create a new to do...'
                value={text} onChange={(event)=>{
                    setText(event.target.value)
                }}onKeyDown={sendToDo}/>
            </div>

            <div className='to-doList'>
                <ul>
                    {filteredList.map((item) => {
                        return (
                            <li className={item.completed ? 'active' : ''}>
                                <div className='check' onClick={()=>
                                        {handleToggleToDo(item.id)}
                                        }>
                                    <input type='checkbox' className='checkbox-button'/>
                                    {item.completed && <img src="/assets/icons/icon-check.svg" alt="check" />}
                                </div>
                                <span>{item.text}</span>
                                <img src="/assets/icons/icon-cross.svg" alt="delete" onClick={()=>{deleteToDo(item.id)}} />
                            </li>
                        )
                    })}
                </ul>
                <div className='actions'>
                    <span>{list.filter((item)=> !item.completed).length} itens left</span>
                    <div className='filters'>
                        <button className={status=== 'all'? 'active' : ''} onClick={()=> setStatus('all')}>All</button>
                        <button className={status=== 'active'? 'active' : ''} onClick={()=> setStatus('active')}>Active</button>
                        <button className={status=== 'completed'? 'active' : ''} onClick={()=> setStatus('completed')}>Completed</button>
                    </div>
                    <button onClick={clearCompleted}>Clear Completed</button>
                </div>
            </div>
        </div>
    )
}