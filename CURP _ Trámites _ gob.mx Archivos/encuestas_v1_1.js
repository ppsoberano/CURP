var surveyTramiteGobMX = new stgmx_v1_1();

function stgmx_v1_1 () {

  var stGMX= this;
  var root ='';
  var questions;
  var questionsList=[];
  var localStg = "LOC_STG_ENC";
  var homoclave = "";
  var sending = false;

   stGMX.loadModal =function() {
    if(document.getElementsByName("homoclave") !== null && document.getElementsByName("homoclave").length >0){
      homoclave = document.getElementsByName("homoclave")[0].value;
    }

    //window.document.body.innerHTML += '<div class="modal fade" id="stGMX_modSurveyTramite" name="stGMX_modSurveyTramite"></div>';
    var elemDiv = document.createElement('div');
    elemDiv.setAttribute("id","stGMX_modSurveyTramite");
    elemDiv.setAttribute("class","modal fade");
    elemDiv.setAttribute("name","stGMX_modSurveyTramite");

    document.body.appendChild(elemDiv);
    
    $('#stGMX_modSurveyTramite').on('hidden.bs.modal', function() {
      stGMX.saveInformation();
    });
  }

  stGMX.getAnswer = function(answerView) {
    var selectedList = [];
    var nodeList = document.getElementsByName(answerView);
    for (var i = 0; i < nodeList.length; i++) {
      if(nodeList[i].type === 'radio' && nodeList[i].checked) {
        selectedList.push(nodeList[i].value);
      } else if(nodeList[i].type === 'checkbox' && nodeList[i].checked) {
        selectedList.push(nodeList[i].value);
      } else if(nodeList[i].type === 'input') {
        selectedList.push(nodeList[i].value);
      } else if(nodeList[i].type === 'submit') {
        for(var index = 0 ; index < nodeList[i].classList.length; index++) {
          if(nodeList[i].classList[index] === 'active') {
            selectedList.push(nodeList[i].value);
          }
        }
      }
    }
    return selectedList.length > 0 ? selectedList : null;
  }

  stGMX.goToView = function(questionView,answerView) {
    var answer;
    answer = stGMX.getAnswer(answerView);

    if(questionView === "Q_A") {
      if(answer.length >0 && answer[0] === '1') {
        stGMX.showQuestionView("Q_R");

        stGMX.hideQuestionView("Q_B");
        stGMX.removeListElement("Q_B");
        stGMX.clearSelection("A_B");

        stGMX.hideQuestionView("Q_C");
        stGMX.removeListElement("Q_C");
        stGMX.clearSelection("A_C");

        stGMX.hideQuestionView("Q_D");
        stGMX.removeListElement("Q_D");
        stGMX.clearSelection("A_D");

        stGMX.hideQuestionView("S_A");
      } else {
        stGMX.hideQuestionView("Q_R");
        stGMX.removeListElement("Q_R");
        stGMX.clearSelection("A_R");

        if(answer.length > 0 && answer[0] === '2') {
          stGMX.hideQuestionView("Q_B");
          stGMX.removeListElement("Q_B");
          stGMX.clearSelection("A_B");

          stGMX.hideQuestionView("Q_C");
          stGMX.removeListElement("Q_C");
          stGMX.clearSelection("A_C");

          stGMX.showQuestionView("Q_D");
          stGMX.showQuestionView("S_A");
        } else {
          stGMX.hideQuestionView("Q_B");
          stGMX.removeListElement("Q_B");
          stGMX.clearSelection("A_B");

          stGMX.hideQuestionView("Q_C");
          stGMX.removeListElement("Q_C");
          stGMX.clearSelection("A_C");
          
          stGMX.showQuestionView("Q_D");
          stGMX.showQuestionView("S_A");
        }
      }
    } else {
      if(questionView === "Q_R") {
        if(answer.length >0 && answer[0] === '1') {
          stGMX.showQuestionView("Q_B");
          stGMX.showQuestionView("Q_C");
        } else{
          stGMX.hideQuestionView("Q_B");
          stGMX.removeListElement("Q_B");
          stGMX.clearSelection("A_B");

          stGMX.hideQuestionView("Q_C");
          stGMX.removeListElement("Q_C");
          stGMX.clearSelection("A_C");
        }
      }
    }
    stGMX.addListElement(questionView,answer);
    stGMX.setLocalStorage(localStg, stGMX.parseToJSON(questionsList) );
  }

  stGMX.removeListElement= function(questionView) {
    for (var i = 0; i < questionsList.length; i++) {
      if(questionsList[i].question === questionView) {
        questionsList.splice(i,1);
      }
    }
  }

  stGMX.addListElement = function(questionView, answer) {
    var question = {};
    question.question = questionView;
    question.answer = answer;

    var exist = false;
    for (var i = 0; i < questionsList.length; i++) {
      if(questionsList[i].question === questionView) {
        questionsList[i] = question;
        exist = true;
      }
    }
    if(exist === false) {
      questionsList.push(question);
    }
  }

  stGMX.clearSelection = function(answerView){
    var elements = document.getElementsByName(answerView);
    for (var i = 0; i < elements.length; i++) {
      if(elements[i].type === 'radio' || elements[i].type === 'checkbox') {
        elements[i].checked = false;
      }
      if(elements[i].type === 'input') {
        elements[i].value = "";
      }
    }
  }

  stGMX.hideQuestionView = function(questionView) {
    document.getElementById(questionView).style.display = 'none';
  }

  stGMX.showQuestionView = function(questionView) {
    document.getElementById(questionView).style.display = 'block';
  }

  stGMX.selectRadio = function(radio) {
    document.getElementById(radio).checked = true;
  }

  stGMX.selectButton = function(button,group) {
    var buttons_group = document.getElementsByName(group);
    for(index = 0; index < buttons_group.length; index++) {
      if(document.getElementsByName(group)[index].id===button) {
        document.getElementsByName(group)[index].classList.add("active");
        var test = document.getElementsByName(group)[index];
        var replace = $(test).find('img').attr('src');
        reply = replace.split('.')[3].split('/')[3].split('-')[2];
        if(reply.toString() === 'good') {
          $(test).find('img').attr('src', 'https://framework-gb.cdn.gob.mx/assets/images/ico-satifation-good-2.svg');
        }else if(reply.toString() === 'regular') {
          $(test).find('img').attr('src', 'https://framework-gb.cdn.gob.mx/assets/images/ico-satifation-regular-2.svg');
        }else if(reply.toString() === 'bad') {
          $(test).find('img').attr('src', 'https://framework-gb.cdn.gob.mx/assets/images/ico-satifation-bad-2.svg');
        }
        //console.log('replace -> ' + replace.split('.')[3].split('/')[3].split('-')[2] )
      } else {
        for(var indexActive= 0 ; indexActive < document.getElementsByName(group)[index].classList.length;indexActive++){
          if(document.getElementsByName(group)[index].classList[indexActive]==='active') {
            document.getElementsByName(group)[index].classList.remove("active");
            var test = document.getElementsByName(group)[index];
            var replace = $(test).find('img').attr('src');
            reply = replace.split('.')[3].split('/')[3].split('-')[2];
            if(reply.toString() === 'good') {
              $(test).find('img').attr('src', 'https://framework-gb.cdn.gob.mx/assets/images/ico-satisfation-good.svg');
            } else if ( reply.toString() === 'regular' ) {
              $(test).find('img').attr('src', 'https://framework-gb.cdn.gob.mx/assets/images/ico-satisfation-regular.svg');
            } else if ( reply.toString() === 'bad' ) {
              $(test).find('img').attr('src', 'https://framework-gb.cdn.gob.mx/assets/images/ico-satisfation-bad.svg');
            }
          }
        }
      }
    }
  }

  stGMX.selectCheckbox = function(chk){
    if(document.getElementById(chk).checked === true) {
      document.getElementById(chk).checked = false;
    } else {
      document.getElementById(chk).checked = true;
    }
  }

  stGMX.loadQuestions = function(){
    var elements = [];

    $.ajaxSetup({
      async: false
    });

   // $.getJSON('https://framework-gb.cdn.gob.mx/data/encuesta_v1.0/encuesta.json', function(jd) {
    $.getJSON('https://framework-gb.cdn.gob.mx/data/encuesta_v1.0/encuesta_v1_1.json', function(jd) {
      elements=[].concat(jd);
    });
    
    $.ajaxSetup({
      async: true
    });

    stGMX.questions = elements;

    
    var container = "";
    for(index = 0; index < stGMX.questions.length; index++) {
      if(stGMX.questions[index].visible) {
        container+="<div class='row' id='"+stGMX.questions[index].idView+"' style='display:block; padding:10px;' align='left'>";
      } else {
        container+="<div class='row' id='"+stGMX.questions[index].idView+"' style='display:none; padding:10px;' align='left'>";
      }

      container+="<fieldset>";
      container+="<legend class='label form-control clearfix' style='color: black; border: 0 none; width: 100%; white-space: normal; background-color: transparent; font-size: 18px; margin-bottom: 30px; font-weight:normal; box-shadow: inset 0 0 0 rgba(0,0,0,0)'>"+stGMX.questions[index].description+"</legend>";

      if(stGMX.questions[index].wrap !== undefined && stGMX.questions[index].wrap !== "") {
        if(stGMX.questions[index].wrap.type!== undefined && stGMX.questions[index].wrap.type === "div") {
          var wrap_class = "class='"+stGMX.questions[index].wrap.class+"'";
          var wrap_align = "align = '"+stGMX.questions[index].wrap.align+"'";
          container+="<div "+wrap_class+" style='font-weight: normal; width: 100%; margin-top: 18px;'>";
        }
      }

      for (var indexInput = 0; indexInput < stGMX.questions[index].typeInput.length;indexInput++) {
        var action = "";
        var colSpan = stGMX.questions[index].typeInput[indexInput].span;
        var input_class = "";
        var img = "";
        var selected = "";

        if(stGMX.questions[index].typeInput[indexInput].class!=="") {
          input_class = " class = '"+stGMX.questions[index].typeInput[indexInput].class+"' ";
        }
        var align ="align = '"+stGMX.questions[index].typeInput[indexInput].align+"'";
        container+="<div class='col-sm-"+colSpan+"' style='padding:5px;' "+align+">";

        if(stGMX.questions[index].typeInput[indexInput].action) {
          action = " "+stGMX.questions[index].typeInput[indexInput].do+" ";
        }
        if( stGMX.questions[index].typeInput[indexInput].type === "input") {
          if(stGMX.questions[index].typeInput[indexInput].label !== "") {
            container+="<label id='q_l_"+index+""+indexInput+"' >"+stGMX.questions[index].typeInput[indexInput].label+"</label>";
          }
          container+="<input id='q_i_"+index+""+indexInput+"' name='"+stGMX.questions[index].typeInput[indexInput].name+ "'"+action+" ></input>";
        } else if(stGMX.questions[index].typeInput[indexInput].type === "radio") {
          if (stGMX.questions[index].typeInput[indexInput].selected) {
            selected = "checked= 'true'";
          }

          var radio = "<label style='margin-left: 8px; font-weight:normal;' for='"+stGMX.questions[index].typeInput[indexInput].name+"'> <input id='"+stGMX.questions[index].typeInput[indexInput].id+"' type='"+stGMX.questions[index].typeInput[indexInput].type+"' name='"+stGMX.questions[index].typeInput[indexInput].name+"' value='"+stGMX.questions[index].typeInput[indexInput].value+"' "+selected+action+ "> &nbsp;"+stGMX.questions[index].typeInput[indexInput].label+"</label>";
          if(stGMX.questions[index].typeInput[indexInput].img !== "") {
            img = "<img id='q_ri_"+index+""+indexInput+"'  src='"+root+stGMX.questions[index].typeInput[indexInput].img+"' />";
            container+= radio+img;
          } else {
            container+= radio;
          }
        } else if(stGMX.questions[index].typeInput[indexInput].type === "checkbox") {
          if (stGMX.questions[index].typeInput[indexInput].selected) {
            selected = "checked= 'true'";
          }

          var chk = "<label style='font-weight: normal;'></label><input id='"+stGMX.questions[index].typeInput[indexInput].id+"'  type='"+stGMX.questions[index].typeInput[indexInput].type+"' name='"+stGMX.questions[index].typeInput[indexInput].name+"' value='"+stGMX.questions[index].typeInput[indexInput].value+"' "+selected+action+ " > "+stGMX.questions[index].typeInput[indexInput].label;
          container += chk;
        } else if ( stGMX.questions[index].typeInput[indexInput].type === "href") {
          container += '<a href="'+stGMX.questions[index].typeInput[indexInput].value+'"  target="_blank" title="Abre en nueva ventana" >'+ stGMX.questions[index].typeInput[indexInput].label+'</a>';
        } else if ( stGMX.questions[index].typeInput[indexInput].type === "label") {
          container+="<label id='l_l_"+index+""+indexInput+"' "+action+" style='font-weight: normal;' >"+stGMX.questions[index].typeInput[indexInput].label+"</label>";
        } else if(stGMX.questions[index].typeInput[indexInput].type === "img" && stGMX.questions[index].typeInput[indexInput].img!=="") {
          img = "<img id='q_ri_"+index+""+indexInput+"' src='"+root+stGMX.questions[index].typeInput[indexInput].img+"'"+action+" />";
          container+= img;
        } else if( stGMX.questions[index].typeInput[indexInput].type === "button") {
          var button = "<button id='"+stGMX.questions[index].typeInput[indexInput].id+"' title='"+stGMX.questions[index].typeInput[indexInput].label+"' name='"+stGMX.questions[index].typeInput[indexInput].name+"'  value='"+stGMX.questions[index].typeInput[indexInput].value+"' "+action+input_class+ ">";
          if(stGMX.questions[index].typeInput[indexInput].img !== "") {
            img = "<img id='q_ri_"+index+""+indexInput+"'  src='"+root+stGMX.questions[index].typeInput[indexInput].img+"' />";
            container+= button+img;
          } else {
            container+= button;
          }
        }
        container+="</div>";
      }
      
      container+="</fieldset>";
      container+="</div>";
    }
    return  container;
  }

  stGMX.getEncuesta = function() {
    sending = false;

    if(window.document.getElementById("stGMX_modSurveyTramite") === null) {
      stGMX.loadModal();
    }

    window.document.getElementById("stGMX_modSurveyTramite").innerHTML = '<div class="modal-dialog" >'+
    '<div class="modal-content">'+
    '<div class="modal-header"> '+
    '<h1 class="modal-title" style="font-size: 24px;">Encuesta de satisfacci&oacute;n</h1>'+
    '</div>'+
    '<div class="modal-body"><form onsubmit="event.preventDefault();">'+stGMX.loadQuestions()+'</form>'+
    '<hr>'+
    '<div class="form-group">'+
   
    '<div class="col-md-12 respuesta"></div>'+
    
    '<div class="modal-footer">'+
    '<div class="row" style="padding:10px;" align="center">'+
    '<button type="button" class="btn btn-primary" onclick="surveyTramiteGobMX.saveInformation()" >Enviar encuesta</button>'+
    '</div>'+
    '<div class="row" style="padding:10px;" align="left">'+
    '<label id="msjEncuesta"></label>'+
    '</div>'+
    '</div>'+
    '</div>';

    var objectJson = {"homoclave": stGMX.homoclave, "fecha": new Date().toLocaleString(), "questions": [ ] };
    localStorage.setItem(localStg,JSON.stringify(objectJson));

    $('#stGMX_modSurveyTramite').modal("show");
  }

  stGMX.getEncuestaHC = function(homoclave) {
    stGMX.homoclave = homoclave;
    stGMX.getEncuesta();
  }

  stGMX.subscribeToGob = function() {
    var subEmail = $('#email').val();
    $.ajax({
      url: 'https://www.gob.mx/subscribe', 
      type: 'POST',
      async:false,
      headers: {'X-Client': window.location.href },
      dataType: 'json',
      data: {"email[address]": subEmail},
      success: function() {       
        $('#email').val(subEmail);        
        $('.respuesta').text('Â¡Gracias por suscribirte!');
      },
      error: function() {
        $('#email').val(subEmail);        
        $('.respuesta').text('Â¡Gracias por suscribirte!');
      }
    });  
  }

  stGMX.saveInformation = function() {
    if(sending === false) {
      console.log(localStorage.getItem(localStg));

      var ls = JSON.parse(localStorage.getItem(localStg));
      if(ls.questions !== undefined && ls.questions !== null && ls.questions.length> 0) {
        $.ajax({
          type: "POST",
          data: JSON.stringify(ls),
          url: "https://www.gob.mx/EncuestaSatisfaccion/saveForm",
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          async:false,
          headers: {
            'X-Client': window.location.href },
            success: function(data){
              document.getElementById('msjEncuesta').innerHTML = data.message;
              document.getElementById('msjEncuesta').setAttribute("class","alert alert-success");
              setTimeout(function() {
                $('#stGMX_modSurveyTramite').modal("hide");
              }, 2000);
            },
            error: function(data){
              document.getElementById('msjEncuesta').innerHTML = "El servicio no estÃ¡ disponible, favor de intentar mÃ¡s tarde.";
              document.getElementById('msjEncuesta').setAttribute("class","alert alert-danger");
              setTimeout(function() {
                $('#stGMX_modSurveyTramite').modal("hide");
              }, 2000);
            }
        });
      } else {
        setTimeout(function() {
          $('#stGMX_modSurveyTramite').modal("hide");
        }, 1000);
      }
      sending = true;
    }
  }

  stGMX.parseToJSON = function(list) {
    var objectJson = {"homoclave":stGMX.homoclave,"fecha":new Date().toLocaleString(), "questions": [ ]};
    for (var i = 0; i < list.length; i++) {
      objectJson.questions.push({question:list[i].question,answer:list[i].answer});
    }
    return objectJson;
  }

  stGMX.setLocalStorage = function(localStg,objectJson) {
    localStorage.setItem(localStg,JSON.stringify(objectJson));
  }

  stGMX.startEncuesta = function(time) {
    setTimeout(function() {
      stGMX.getEncuesta();
    }, time);
  }

  stGMX.startEncuestaHC = function(time,homoclave) {
    var hc = homoclave;
    setTimeout(function() {
      stGMX.getEncuestaHC(hc);
    }, time);
  }
}