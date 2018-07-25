// TO - DO list



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


  return {
    addItem: function(type, des, val)
    {
      var newItem, ID;
      //Create new id
      if (data.allItems[type].length > 0)
      {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      }
      else
      {
        ID = 0;
      }

      //Create new item based on 'inc' or 'exp' type
      if (type === 'exp')
      {
        newItem = new Expense(ID, des, val);
      }
      else if (type === 'inc')
      {
        newItem = new Income(ID, des, val);
      }

      //push it into our data structure
      data.allItems[type].push(newItem);

      return newItem;
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
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expenseContainer: '.expense__list'
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

    addListItem: function(obj, type)
    {
      var html, newhtml, element;
      // Create HTML string with placeholder text
      if (type === 'inc')
      {
        element = DOMstrings.incomeContainer;
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      else if (type === 'exp')
      {
        element = DOMstrings.expenseContainer;
        html = '<div class="item clearfix" id="expense-%id%""><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">-%value%</div><div class="item__percentage">21%</div>  <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>  </div>  </div>  </div>';
      }
      //Replace the placeholder text with some actual data
      newhtml = html.replace('%id%', obj.id);
      newhtml = newhtml.replace('%description', obj.description);
      newhtml = newhtml.replace('%value%', obj.value);

      //Insert the HTML into DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newhtml);
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
    //1. Get the filed input data
    var input = UICtrl.getInput();

    //2. Add the item to the budget controller
    var newItem = budgetCtrl.addItem(input.type, input.description, input.value);

    //3. Add the item to the UI
    UICtrl.addListItem(newItem, input.type);

    //4. Calculate the budget

    //5. Display the budget on the UI

    //Getting field input data
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