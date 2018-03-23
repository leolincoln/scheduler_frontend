import $ from 'jquery';
import 'fullcalendar';
var machine_names;

$(function() {

  $.getJSON('http://localhost:3000/jobs/machines', function(machines){
      var dataList = document.getElementById('machinelist');
      window.machine_names = machines;
      machines.forEach(function(item) {
        var option = document.createElement('option');

        option.value = item;

        dataList.appendChild(option);
      });
    });

    $('#machinesearch').on('propertychange input', function (e) {
    var valueChanged = false;

    if (e.type=='propertychange') {
        valueChanged = e.originalEvent.propertyName=='value';
    } else {
        valueChanged = true;
    }
    if (valueChanged) {
      console.log("value changed");
      window.machine_names.forEach(function(machine) {
        console.log(machine);
        if(machine==e.target.value){
          console.log(e.target.value)

          $('#calendar').fullCalendar ('removeEvents');
          $('#calendar').fullCalendar( 'addEventSource', "http://localhost:3000/jobs/machine="+e.target.value )
          $('#calendar').fullCalendar('refetchEvents');
        }
      });
    }
});



  var containerEl = $('#calendar');

  containerEl.fullCalendar({
        customButtons: {
      chooseMachine: {
        text: 'ChooseMachine',
        click: function() {
          alert('Choose machine name');
        }
      }
    },
    header: {
      left: 'prev,next today chooseMachine',
      center: 'title',
      right: 'month,agendaWeek,agendaDay,listWeek'
    },
    themeSystem: 'standard',
    defaultDate: '2018-01-12',
    navLinks: true, // can click day/week names to navigate views
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    events: ''
  })
});
