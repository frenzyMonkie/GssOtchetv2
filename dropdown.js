var script = document.createElement('script');
script.src = 'jq.js'; // Check https://jquery.com/ for the current version
// script.src = 'https://code.jquery.com/jquery-3.1.1.min.js'; // Check https://jquery.com/ for the current version
document.getElementsByTagName('head')[0].appendChild(script);

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

function checking(){
  $('.list').click(function(){
    $('#choose').val($(this).html());
    turnUp();
  });
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