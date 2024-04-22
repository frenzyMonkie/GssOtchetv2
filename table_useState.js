
const TableBody = (props) => {
    const rows = props.characterData.map((row, index) => {
      return (
        <tr key={index}>
          <td>{row.name}</td>
          <td>{row.job}</td>
          <td>
          <button onClick={() => props.removeCharacter(index)}>Delete</button>
          </td>
        </tr>
      )
    })
    
    return <tbody>{rows}</tbody>
  }

const TableHeader = () => {


    return (
        <thead>
        <tr>
            <th>Name</th>
            <th>Job</th>
        </tr>
        </thead>
    )
}
class App extends Component {
  state = {
    characters: [
      {
        name: 'Charlie',
        job: 'Janitor',
      },
      {
          name: 'Mac',
          job: 'Bouncer',
      },
      {
          name: 'Dee',
          job: 'Aspring actress',
      },
      {
          name: 'Dennis',
          job: 'Bartender',
      },
    ],
  }
  removeCharacter = (index) => {
    const { characters } = this.state
  
    this.setState({
      characters: characters.filter((character, i) => {
        return i !== index
      }),
    })
  }
    render() {
        
      const { characters } = this.state

      return (
        <div className="container">
          <Table characterData={characters} removeCharacter={this.removeCharacter} />
        </div>
      )
    }
}

const Table = (props) => {
  const { characterData, removeCharacter } = props

  return (
    <table>
      <TableHeader />
      <TableBody characterData={characterData} removeCharacter={removeCharacter} />
    </table>
  )
}
  

//   class Table extends Component {
//     render() {
//       return (
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Job</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>Charlie</td>
//               <td>Janitor</td>
//             </tr>
//             <tr>
//               <td>Mac</td>
//               <td>Bouncer</td>
//             </tr>
//             <tr>
//               <td>Dee</td>
//               <td>Aspiring actress</td>
//             </tr>
//             <tr>
//               <td>Dennis</td>
//               <td>Bartender</td>
//             </tr>
//           </tbody>
//         </table>
//       )
//     }
//   }
//   class App extends React.Component {
//     render() {
//       return (
//         <div className="App">
//           <Table />
//         </div>
//       )
//     }
//   }
  ReactDOM.render(<App />, document.getElementById('root'))