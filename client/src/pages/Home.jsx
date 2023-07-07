import React from 'react'
import style from 'styled-components'

const Home = () => {
  return (
   <Container>
    <Header>
      <h1>Hellcome to the Ai multiverse</h1>
    <p>We provide your needs in productivity in sec</p>
    </Header>

    <Wraper>

    </Wraper>

   </Container>
  )
}

export default Home

const Container=style.div`
width:100vh;
height:100vw;
background-color:teal;
margin-top:0px;
align-items:center;
display:flex;
flex-direction:column;


`
const Wraper=style.div`


`
const Header=style.div`
align-items:center;
display:flex;
flex-direction:column;
position:sticky;
`