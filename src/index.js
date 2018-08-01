import React from 'react'
import ReactDOM from 'react-dom'
import { Parallax } from 'react-spring'
import './styles.css'

const names = [
  'Andre',
  'Maike 🦄',
  'Lior',
  'Martin',
  'Kevin',
  'Byeongsoo',
  'Torben',
  'Markus',
]

let currentPage = 0;
const count = names.length
const pagecount = count + 1;
const getIndex = () => Math.floor(Math.random() * Math.floor(names.length))
const getName = () => names.splice(getIndex(), 1)[0] || '';

const getGradientIndex = () => Math.floor(Math.random() * Math.floor(4))
const getTitle = (i) => i === 0 
  ? 'Today we start with' 
  : i === count - 1 
    ? 'last but not least' 
    : 'Next up'

const Page = ({ offset, title, name = getName(), onClick, gradient = getGradientIndex() }) => (
  <React.Fragment>
    <Parallax.Layer offset={offset} speed={0.2} onClick={onClick}>
      <div className="slopeBegin" />
    </Parallax.Layer>

    <Parallax.Layer offset={offset} speed={-0.2} onClick={onClick}>
      <div className={`slopeEnd g${gradient}`} />
    </Parallax.Layer>

    <Parallax.Layer className="text header" offset={offset} speed={0.7}>
      <span>
        <p style={{ fontSize: 20 }}>{ title }</p>
        <div className={`stripe g${gradient}`} />
        <p>{name}</p>
      </span>
    </Parallax.Layer>
  </React.Fragment>
)

class App extends React.Component {
  scroll = to => this.refs.parallax.scrollTo(to)
  scrollTo = (to) => () => {
    currentPage = to;
    this.scroll(currentPage);
  }
  onKeyDown = (e) => {
    if (e.keyCode === 39) {
      currentPage += 1;
    } else if (e.keyCode === 37) {
      currentPage -= 1;
    }
    currentPage = (currentPage + pagecount) % pagecount;
    this.scroll(currentPage);
  }
  render() {
    return (
      <div tabIndex={'0'} onKeyDown={this.onKeyDown}>
        <Parallax className="container" ref="parallax" pages={count+2} horizontal scrolling={false}>
          <Page offset={0} title={'welcome'} name={''} onClick={this.scrollTo(1)} />
          { names.map((_,i) => (
            <Page offset={i + 1} title={getTitle(i)}  onClick={this.scrollTo(i + 2)} key={i}/>
          ))}
          <Page offset={count+1} title={'Have a nice day'} name={''} onClick={this.scrollTo(0)} />
        </Parallax>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));