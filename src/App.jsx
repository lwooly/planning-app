import React from "react"
import { Box, CssBaseline } from "@mui/material"
import TodoList from "./components/TodoList"
import NavBar from "./components/NavBar"
import Header from "./components/Header"
import Footer from "./components/Footer"

function App() {

  return (
    <>
      <CssBaseline />
      <header>
        <NavBar />
      </header>
      <main>
        <Box sx={{width:'67%', margin:'auto'}}>
          <h1>Todo list</h1>
          <Header />
          <TodoList />
          <Footer/>
        </Box>
      </main>
    </>
  )
}

export default App