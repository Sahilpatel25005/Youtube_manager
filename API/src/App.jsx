import { useEffect, useState } from "react"


function App() {
  
  const [name , setName] = useState("")

  useEffect(() => {
    fetch("http://127.0.0.1:8000/listdata")
    .then((res) => res.json())
    .then((res) => setName(res[1]["name"]))
    
  })

  return (
    <>
    <div className="flex justify-center items-center mt-9">
      <p>{name}</p>
    </div>
      
       
    </>
  )
}

export default App
