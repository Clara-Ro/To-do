import './index.css'
import { useState } from 'react';

export default function Task() {
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
                    {list.map((item) => {
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
                        <button className='active'>All</button>
                        <button>Active</button>
                        <button>Completed</button>
                    </div>
                    <button>Clear Completed</button>
                </div>
            </div>
        </div>
    )
}