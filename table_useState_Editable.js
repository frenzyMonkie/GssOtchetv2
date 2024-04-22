var script = document.createElement('script');
script.src = 'jq.js'; // Check https://jquery.com/ for the current version
// script.src = 'https://code.jquery.com/jquery-3.1.1.min.js'; // Check https://jquery.com/ for the current version


const TableHeader = () => { 
  return (
                  <div class="thead tabrow">
                      <div class="tabcol"><b>Наименование по МСГ</b></div>
                      <div class="tabcol"><b>Факт, усл.ед.</b></div>
                  </div> 
  );
}

const TableBody = props => { 
  const rows = props.characterData.map((row, index) => {
      return (
                  <div key={index} class="tbody tabrow">
                    <div class="delrow_p" onClick={() => props.removeCharacter(index)}>Удалить</div>
                    <div class="tabcol">{row.name}</div>
                    <div class="tabcol">{row.value}<b> м3</b></div>
                  </div>
      );
  });

  return rows;
}

const Table = (props) => {
  const { characterData, removeCharacter } = props;
      return (
                  <div class="tc">
                    <TableHeader />
                    <TableBody characterData={characterData} removeCharacter={removeCharacter} />
                  </div>
      );
}



class Form extends Component {
  constructor(props) {
      super(props);
      
      this.initialState = {
          name: '',
          value: ''
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

  modal = () => {
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0]; 
    var add = document.getElementsByClassName("addrow")[0]
    var cancel = document.getElementsByClassName("cancel")[0]
    var input = document.getElementById("value")
    add.onclick = () => {
      if (this.state.value.length > 0)  {
        modal.style.display = "none";
        input.value = "";
      } else {
        return false
      }
      
    }

    span.onclick = function() {
      modal.style.display = "none";
      $('#choose').val('');
    } // When the user clicks on <span> (x), close the modal

    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    } // When the user clicks anywhere outside of the modal, close it

    cancel.onclick = () => {
      input.value = "";
      $('#choose').val('');
      modal.style.display = "none";

    } // Имеем баг: если вводить значение с десятичной частью, то после добавления это значение остается введенным в поле.
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
          // console.log(this.state)
          this.state = state
          // console.log(this.state)
          // console.log(self.setState)
          thisform.setState(state)


          // Подготавливаем модальное окно к вводу данных
          var modal = document.getElementById("myModal");
          modal.style.display = "flex";
          var input = document.getElementById("value")
          input.value = ""; 

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
    this.modal()

  }


  render() {
      const { name, value } = this.state; 

      return (

                          <form onSubmit={this.onFormSubmit}>
                                <div id="myModal" class="modal">
                                  <div class="modal-content">
                                    <span class="close">&times;</span>
                                    <h3 class="popup_bold"> Добавление работ </h3>
                                    <p class="popup_regular">{this.state.name}</p>
                                    <h4 class="popup_bold"> Выполненный объем: </h4>
                                    <input 
                                      type="number"
                                      name="value"
                                      id="value"
                                      value={value} 
                                      onChange={this.handleChange} />
                                    <div class="controls">
                                      <button type="button" class="cancel">
                                          Отменить
                                      </button>
                                      <button type="submit" class="addrow">
                                          Добавить
                                      </button>
                                    </div>
                                    
                                </div>
                              </div>

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
                                {/* <input 
                                  type="number" 
                                  name="value" 
                                  id="value"
                                  value={value} 
                                  onChange={this.handleChange} />
                              
                                <button type="submit" class="oneline addrow add_controls">
                                    Добавить
                                </button> */}
                                </form>

      );
  }
}


class App extends Component {


  state = {
      characters: [{
        name: '123',
        value: '456'
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
    // console.log(character)
    this.setState({characters: [...this.state.characters, character]});
  }

  render() {
      const { characters } = this.state;
      
      return (
                              <div className="container">
                                  <Table
                                      characterData={characters}
                                      removeCharacter={this.removeCharacter}
                                  />
                                  <Form 
                                      characterData={characters}
                                      handleSubmit={this.handleSubmit} />
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





  ReactDOM.render(<App />, document.getElementById('root'))