var script = document.createElement('script');
script.src = 'jq.js'; // Check https://jquery.com/ for the current version
// script.src = 'https://code.jquery.com/jquery-3.1.1.min.js'; // Check https://jquery.com/ for the current version


const TableHeader = () => { 
  return (
      <thead>
          <tr>
              <th>Наименование по МСГ</th>
              <th>Факт, усл.ед. </th>
              <th>Временное удаление</th>
          </tr>
      </thead>
  );
}

const TableBody = props => { 
  const rows = props.characterData.map((row, index) => {
      return (
        <tr key={index}>
            <td class="delrow">
                <div class="c123"><p class="delrow_p">Удалить</p></div>
                <div class="oneline">
                    <p>{row.name}</p>
                </div>
            </td>
            <td>
                <div class="oneline">
                    <p>{row.job}</p>
                </div>
            </td>
            <td><button onClick={() => props.removeCharacter(index)}> Удалить </button></td>
        </tr>
        //   <tr key={index}>
        //       <td>{row.name}</td>
        //       <td>{row.job}</td>
        //       <td><button onClick={() => props.removeCharacter(index)}>Delete</button></td>
        //   </tr>
      );
  });

  return <tbody>{rows}</tbody>;
}

const Table = (props) => {
  const { characterData, removeCharacter } = props;
      return (
          <table>
              <TableHeader />
              <TableBody characterData={characterData} removeCharacter={removeCharacter} />
          </table>
      );
}


class Form extends Component {
  constructor(props) {
      super(props);
      
      this.initialState = {
          name: '',
          job: ''
      };

      this.state = this.initialState;
  }

  handleChange = event => {
    
      const { name, value } = event.target;      
      this.setState( {
          [name] : value
      });

  }

  onFormSubmit = event => {
      event.preventDefault();
      this.props.handleSubmit(this.state);
      this.setState(this.initialState);

  }
  updateState = state => {
    this.setState(state);
  }
  dropdown = () => {

      var a = [
        'Погрузо-разгрузочные работы, работа с манипулятором, поддержание порядка на стройплощадке, прогрев сводов ОМ3, ОМ5, стен ОМ6', 
        'Армирование свода ОМ2, в т.ч. монтаж опалубки (захватка №1-2)', 
        'Бетонирование свода Ом2 (захватка №1-2)', 
        'Армирование свода Ом1, в т.ч. монтаж опалубки (захватка №10-11)',
      ];
      var b = []; var c = [];
      var i = 0; // i для turn
      $('#list').hide(); // скрываем список
      
      $.each(a, function(i){	// формируем список в div
          var lwrList = a[i] // var lwrList = a[i].toLowerCase(); массив в нижний регистр
        b[i] = '<div class="list" id="'+lwrList+'">'+lwrList+'</div>';
        /* id делает уникальным каждый блок при клике
        и будет использоваться в поиске совпадений */
      });
      
      // document.querySelector('#list').innerHTML = b // помещаем весь массив в родительский div
      $('#list').html(b); // помещаем весь массив в родительский div
      // Все что дальше - не работает. Есть подозрение что все функции нужно будет закидывать в компоненты React чтобы они связывались с виртуальным dom и рендерились в реальный. Иначе походу перезаписываются реактом.
      $('#choose').focus(function(){
        // if($('#choose').val() != ''){
        //   $('#list').html('');
        //   checking(); 
        // } else {
        //   reset(); 
        //   checking();
        // };
          reset(); 
        checking();
      }); // очищаем input для новых значений при каждом клике
      var thisform = this;
      checking = () => {
        $('.list').click(function(){
          $('input[name="name"]').val($(this).html());
          turnUp();
          var state = {
            name : $(this).html()
          }
          console.log(this.state)
          this.state = state
          console.log(this.state)
          console.log(self.setState)
          thisform.setState(state)

        }).bind(this);
      }; checking(); 
      
      
      function reset(){
        $('#choose').val('');
        $('#list').html(b);
      };
      
      // сворачивание
      function turnUp(){
          $('.array').html('&#9660;');
        $('#list').slideUp(200);
        i = 0;
      };
      function turnDown(){
        $('.array').html('&#9650;');
        $('#list').slideDown(200);
        i = 1;
      };
      
      $('.array').click(function(){
          if(i==0){
              turnDown();
        } else {
            turnUp();
        };
      });
      
      // поиск совпадений
      function search(){
        
          turnDown();
          setTimeout(function(){
        // для регистра
        var lwrSrch = $('#choose').val() // var lwrSrch = $('#choose').val().toLowerCase();
          if($('[id*="'+lwrSrch+'"]')[0] != null){
            $('[id*="'+lwrSrch+'"]').each(function(i){
              c[i] = 	'<div class="list" id="'+$(this).attr('id')+
                    '">'+$(this).attr('id')+'</div>';
            i++;
          });
          $('#list').html(c);
          c = []; checking();
        } else {
            if($('#choose').val() != ''){
              $('#list').html('');
              checking(); 
          } else {
              reset(); 
            checking();
          };
        };
        }, 50); // ожидание во избежание ошибок
      };
      
      $('#choose').keyup(function(eventObject){
        if(eventObject.key == 'Shift' || 
            eventObject.key == 'Control') {
            return false
        } else {
            search();
            
        };
        // keypress не определяется смартфонами, потому keyup
      });
  }
  componentDidMount() {
    this.dropdown()
  }
  render() {
      const { name, job } = this.state; 
      
      return (

           <form onSubmit={this.onFormSubmit}>

               {/* <label for="name">Добавить</label> */}
               <div class="body">
                    <div class="autoselect">
                        <input 
                        class="choose" 
                        type="text"
                        name="name" 
                        id="choose"
                        value={name} 
                        placeholder="Добавить работу..."
                        onChange={this.handleChange} />
                        <div class="array ">&#9660;</div>
                    </div>
                    <div id="list" class=""></div>
                </div>
                <input 
                   type="number" 
                   name="job" 
                   id="job"
                   value={job} 
                   onChange={this.handleChange} />
               
                <button type="submit" class="oneline addrow add_controls">
                    Добавить
                </button>
                </form>


          
      );
  }
}
        //       <input 
        //           type="text" 
        //           name="name" 
        //           id="name"
        //           value={name} 
        //           onChange={this.handleChange} />
        //       <label for="job">Job</label>
        //       <input 
        //           type="text" 
        //           name="job" 
        //           id="job"
        //           value={job} 
        //           onChange={this.handleChange} />
        //       <button type="submit" class="oneline addrow add_controls">
        //       Добавить
        //       </button>

class App extends Component {


  state = {
      characters: [{
        name: '123',
        job: '456'
    }]
  };

  removeCharacter = index => {
      const { characters } = this.state;
  
      this.setState({
          characters: characters.filter((character, i) => { 
              return i !== index;
          })
      });
  }

  handleSubmit = character => {
    
    console.log(character)
      this.setState({characters: [...this.state.characters, character]});
       
  }

//   onSubmit(data) {
//     // display form data on submit
//     alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
//     return false;
// }


  render() {
      const { characters } = this.state;
      
      return (
        
          <div className="container">
              <Table
                  characterData={characters}
                  removeCharacter={this.removeCharacter}
              />
              <Form handleSubmit={this.handleSubmit} />
              
          </div>
      );
  }
}


// class App extends Component {
//   state = {
//       data: []
//   };
  
//   componentDidMount() {
//       const url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=Seona+Dancing&format=json&origin=*&limit=1";

//       fetch(url)
//           .then(result => result.json())
//           .then(result => {
//               this.setState({
//                   data: result
//               })
//           });
//   }

//   render() {
//       const { data } = this.state;

//       const result = data.map((entry, index) => {
//           console.log(entry);
//           return <li key={index}>{entry}</li>;
//       });

//       return <div className="container"><ul>{result}</ul></div>;
//   }
// }


// class App extends Component {
//   state = {
//     characters: [ ],
//   }
//   removeCharacter = (index) => {
//     const { characters } = this.state
  
//     this.setState({
//       characters: characters.filter((character, i) => {
//         return i !== index
//       }),
//     })
//   }



//     render() {
        
//       const { characters } = this.state

//       return (
//         <div className="container">
//           <Table characterData={characters} removeCharacter={this.removeCharacter} />
//           <Form handleSubmit={this.handleSubmit}/>
//         </div>
//       )
//     }
// }


  

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