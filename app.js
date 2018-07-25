// TO - DO list

//1. Get the filed input data

//2. Add the item to the budget controller

//3. Add the item to the UI

//4. Calculate the budget

//5. Display the budget on the UI


//BUDGET CONTROLLER
var budgetController = (function()
{
  var Expense = function(id, description, value)
  {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function(id, description, value)
  {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var allExpenses = [];
  var allIncomes = [];
  var totalExpenses = 0;

  var data = {
    allItems:
    {
      exp: [],
      inc: []
    },
    totals:
    {
      exp: 0,
      inc: 0
    }
  };


})();

//UI CONTROLLER
var UIController = (function()
{

  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn'
  };

  return {
    getInput: function()
    {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },

    getDOMstrings: function()
    {
      return DOMstrings;
    }
  };
})();

//VERY IMPORTANT, KEEPING OBJECTS INDEPENDENT, FOLLOWING A GOOD ARCHITECTURE
//STRUCTURE AND ARCHITECTURE ARE CRUCIAL

//Global APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl)
{
  var setupEventListner = function()
  {
    var DOM = UICtrl.getDOMstrings();

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event)
    {
      //which for older browsers that DONT have keycode
      if (event.keyCode === 13 || event.which === 13)
      {
        ctrlAddItem();
      }
    });
  };

  var ctrlAddItem = function()
  {
    //Getting field input data
    var input = UICtrl.getInput();
    console.log(input);
  };

  return {
    init: function()
    {
      console.log('Application has started.');
      setupEventListner();
    }
  };

})(budgetController, UIController);

controller.init();