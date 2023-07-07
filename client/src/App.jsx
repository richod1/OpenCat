import Recipe from "./components/Recipe"
import Translate from "./components/Translate"
import Home from "./pages/Home"
import {Route,Routes} from 'react-router-dom'
import Maths from "./components/Maths"
import QuestionAnswer from "./components/QuestionAnswer"
import Summerizer from "./components/Summerizer"
import BlogGen from "./components/BlogGen"
function App() { 

  return (
    <div className="app">
      {/* <Recipe/> */}
      {/* <Translate/> */}

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/translate" element={<Translate/>}/>
        <Route path="/recipe" element={<Recipe/>}/>
        <Route path="/math" element={<Maths/>}/>
        <Route path="/qa" element={<QuestionAnswer/>}/>
        <Route path="/sum" element={<Summerizer/>}/>
        <Route path="/blog" element={<BlogGen/>}/>
      </Routes>

    </div>
  )
}

export default App
