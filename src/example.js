import $ from 'jquery';
import 'fullcalendar';

$(function() {


  $.getJSON('http://localhost:3000/jobs/machines', function(machines){
      var dataList = document.getElementById('machinelist');
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
        // E.g. one machine e.target.value = m1
        //now change the calendar view to that machine
        console.log(e.target.value)
        $('#calendar').fullCalendar('option', 'events', 'http://localhost:3000/jobs/machine='+e.target.value);
        $('#calendar').fullCalendar('render');
        $('#calendar').fullCalendar('rerendevents');
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
    events: 'http://localhost:3000/jobs/machine=m1'
  })
});
