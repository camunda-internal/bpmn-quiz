'use strict';

// virtual-dom
var h                 = require('virtual-dom/h');

// lodash
var difference        = require('lodash/difference');

// bpmn-questionnaire
var BpmnQuestionnaire = require('bpmn-questionnaire');

var single = BpmnQuestionnaire.createType({
  renderQuestion: function() {
    var that = this;
    var buttons = [];
    this.options.answers.forEach(function(answer) {
      buttons.push(
        h('button', {
          className: 'btn btn-block' + (that.state.selected.indexOf(answer) !== -1 ? ' btn-success' : ''), 
          onclick: function() {
            that.update({
              selected: [answer]
            });
          },
          style: {
            marginTop:    '5px',
            marginBottom: '5px'
          }
        }, answer)
      );
    });

    var html = 
      h('div', [
        h('p', this.options.text),
        this.diagram ? this.diagram.render(this.state) : h('div'),
        h('div', {
          style: {
            marginTop: '20px'
          }
        }, buttons)
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
      html =
        h('div.panel.panel-danger', [
            h('div.panel-heading',
              h('h3.panel-title', negativeShoutOut[rand2])
            ),
            h('div.panel-body', 'You didn’t quite get it right! The correct answer is: ' + this.options.rightAnswer[0])
        ]);
    }

    return html;
  },
  checkIfValidAnswer: function() {
    return this.state.selected.length > 0;
  },
  checkIfRightAnswer: function() {
    return difference(this.options.rightAnswer, this.state.selected).length < 1;
  },
  addToState: {
    selected: []
  }
});

module.exports = single;