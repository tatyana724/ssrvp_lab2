import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Container from './components/Container'
import Button from './components/Button'
import Navigation from './components/Navigation';
import Header from './components/Header';
import Footer from './components/Footer';
import Menu from './components/Menu';
import Content from './components/Content';

const labs = [
  { title: 'lab1', content: 'Contents of Lab1.' },
  { title: 'lab2', content: 'Contents of Lab2.' },
  { title: 'lab3', content: 'Contents of Lab3.' },
];

function App() {
  const [selectedLab, setSelectedLab] = useState(labs[0]);

  return (
    <>
      <Navigation /> {}
      <h1>Hello World</h1>
      <Container style={{ backgroundColor: '#342e57', boxShadow: '0 10px 60px rgba(52, 46, 87)', marginBottom: '50px' }}> {}
        <div className="card">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <Button label={'BUTTON'} onClick={() => alert('приветик! тут еще ничего грандиозного нет')}/>
          <Button label={'BUTTON 2'} onClick={() => alert('тут тоже')}/></div>
        </div>
      </Container >
      
      <Header />
        <Container>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '200px', marginRight: '20px' }}>
              <Menu labs={labs} onSelectLab={setSelectedLab} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
              <Content lab={selectedLab} />
            </div>
          </div>
        </Container>
      <Footer />
      
    </>
  )
}

export default App
