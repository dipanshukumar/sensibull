import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import useFetch from '../../Custom/useFetch';

function Main() {
  const history = useNavigate();
  const [file] = useFetch('https://prototype.sbulltech.com/api/v2/instruments');
  function search(e){
    // console.log(e.target.value);
    let list = document.querySelector('#list')
    list.innerHTML = ""
    if(file && e.target.value.length > 1){
      file.map((a)=>{
        if(a[0].toLowerCase().includes(e.target.value.toLowerCase())){
          let item = document.createElement('li')
          let link = document.createElement('a')
          link.innerText = a[0];
          link.addEventListener('click',(e)=>{
            console.log(e.target.innerText);
            history("/stock", {state:{value: e.target.innerText}});
          })
          item.append(link);
          list.append(item);

        }
      })
    }
  }
  return (
    <div className='main-wrapper'>
      <input type="text" placeholder="Search for Name or Symbol..." onChange={(e) => search(e)}/>
      <ul id='list'>

      </ul>
        {
         file ? 
         <table>
            <thead>
              <tr>
                <td>{file[0][0]}</td>
                <td>{file[0][1]}</td>
                <td>{file[0][2]}</td>
                <td>{file[0][3]}</td>
              </tr>
            </thead>
            <tbody>
                { file.map((a, i)=>{
                  if(i>0)
                  return(
                    <tr key={i}>
                      <td>
                        <Link 
                          to={`/stock`}
                          state={{
                            value: a[0]
                          }}>{a[0]}</Link>
                      </td>
                      <td>{a[1]}</td>
                      <td>{a[2]}</td>
                      <td>{a[3]}</td>
                    </tr>
                  )
                })}
            </tbody>
         </table> 
         : "NO DATA FOUND"
        }
    </div>
  )
}

export default Main