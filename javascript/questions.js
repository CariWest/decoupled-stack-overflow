var BASE_URL = "http://localhost:3000"

var getAll = function(type) {
  return $.ajax({
    url: '/questions',
    method: 'get',
  });
}

var addQuoteToPage = function(quote) {
  $('#quote').text(quote)
}

var addQuestionsToPage = function(data) {
  var context = { questions: data };
  var html = $('#question_template').html();
  var questionTemplate = Handlebars.compile(html);
  $('#all_questions').append(questionTemplate(context));
}

$(document).ready(function(){

  var questionData = getAll('questions');

  questionData.done(function(response) {
    addQuoteToPage(response.quote);
    addQuestionsToPage(response.questions);
  });

 $(".new_question").on('submit', function(event){
  event.preventDefault();

  var formData = $(this).serialize();
  var myUrl = BASE_URL + $(this).attr('action')
  var myMethod = $(this).attr('method')

  var questionRequest = $.ajax({
    url: myUrl,
    method: myMethod,
    data: formData
  });

  questionRequest.done(function(response){
    var html = $('#question_template').html();
    var questionTemplate = Handlebars.compile(html);
    $('#all_questions').append(questionTemplate(response))
  });

  questionRequest.fail(function(response){
    console.log("question request fails");
  });

 });
});