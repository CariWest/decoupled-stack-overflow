var BASE_URL = "http://localhost:3000"

var getQuestion = function(pathname) {
  return $.ajax({
    url: BASE_URL + pathname,
    method: 'get',
  })
}

var addQuestionToPage = function(data) {
  var context: { question: data }
  var html = $('#question_template').html();
  var questionTemplate = Handlebars.compile(html);
  $('.header').append(questionTemplate(context));
}

$(document).ready(function() {
  pathname = this.location.pathname
  var questionData = getQuestion(pathname);

  questionData.done(function(response) {
    addQuestionToPage(response.question);
  });
});