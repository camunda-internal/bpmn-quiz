'use strict';

// virtual-dom
var h                 = require('virtual-dom/h');

// lodash
var difference        = require('lodash/difference');

// bpmn-questionnaire
var BpmnQuestionnaire = require('bpmn-questionnaire');

var interactive = BpmnQuestionnaire.createType({
  renderQuestion: function() {
    var html = 
      h('div', [
        h('p', this.options.text),
        this.diagram.render(this.state)
      ]);

    return html;
  },
  renderResult: function() {
    var html;

    // Array with different Shoutouts 
    
    var positiveShoutOut = ['Awesome!', 'Hooray!', 'On point!', 'Hodor!', 'You rock'];

    var rand = Math.floor(Math.random() * positiveShoutOut.length);
   
    var negativeShoutOut = ['Oh no!', 'Whoops!', 'Yikes!', 'I hate to say this...'];

    var rand2 = Math.floor(Math.random() * negativeShoutOut.length);

    if (this.state.rightAnswer) {
      html = 
        h('div.panel.panel-success', [
            h('div.panel-heading',
              h('h3.panel-title', positiveShoutOut[rand])

            ),
            h('div.panel-body', 'Your answer is correct!')
        ]);
    } else {
      html = [
        h('div.panel.panel-danger', [
            h('div.panel-heading',
              h('h3.panel-title', negativeShoutOut[rand2])
            ),
            h('div.panel-body', 'You didn’t quite get it right! The correct answer is:')
        ]),
        this.diagram.render(this.state)
      ]
    }

    return html;
  },
  checkIfValidAnswer: function() {
    return this.diagram.state.selected.length > 0;
  },
  checkIfRightAnswer: function() {
    return difference(this.options.diagram.rightAnswers, this.diagram.state.selected).length < 1;
  }
});

module.exports = interactive;