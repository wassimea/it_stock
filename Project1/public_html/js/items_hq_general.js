function send_specs() //sends items_hq search parameters to generate_items_table
{
start_loading();
  $(document).ready(function()
  {
    var x_timer;    
    var specs_input_elements = document.getElementsByClassName("specs_inputs_class"); //inputs_class is the class of all input text elements of added specs, specs_input_elements is array containing all input text elemets of added specs
    var specs_input_names = new Array();  //will contain ids of added specs input text elements(to parse the spec name for the id)
    var specs_input_values = new Array(); ////will contain values of added specs input text elements
    var input_id = document.getElementById('input_item_id').value;
    var select_type = document.getElementById('select_item_type_id').value;
    var select_brand = document.getElementById('select_item_brand_id').value;
    var select_location = document.getElementById('select_item_location_id').value;
    var select_condition = document.getElementById('select_item_condition_id').value;
    var input_label = document.getElementById('input_item_label').value;
    var input_sn = document.getElementById('input_item_sn').value;
    var input_model = document.getElementById('input_item_model').value;
    var input_keyword = document.getElementById('input_item_keyword').value;
    var bool_availability_available = 0;
    var bool_availability_out = 0;
    var bool_availability_not_returning = 0;
    if(document.getElementById('availability_option_available_id').checked)
    {
      bool_availability_available = 1;
    }
    else if(document.getElementById('availability_option_out_id').checked)
    {
      bool_availability_out = 1;
    }
    else if(document.getElementById('availability_option_not_retuning_id').checked)
    {
      bool_availability_not_returning = 1;
    }
    for(var i = 0; i<specs_input_elements.length; ++i)  //for every added spec input text, add it's id to specs_input_names and it's value(content) to specs_input_values
    {
      var name = specs_input_elements[i].id;
      var value = specs_input_elements[i].value;
      specs_input_names.push(name);
      specs_input_values.push(value);
    }
    clearTimeout(x_timer);		        
    x_timer = setTimeout(function()
    {
    send_to_servlet(input_id,specs_input_names,specs_input_values,select_type,select_brand,select_location,select_condition,input_label,input_sn,input_model, input_keyword, bool_availability_available,bool_availability_out,bool_availability_not_returning);}, 1000);
    
    function send_to_servlet(item_id,specs_names,specs_values,type,brand,location,condition,label,sn,model,keyword,availability_available,availability_out,availability_not_returning) //send to generate_items_table all search parameters
    {
      $.get('generate_items_table', {'item_id':item_id,'specs_names':specs_names, 'specs_values':specs_values, 'type':type, 'brand':brand, 'location':location,'condition':condition, 'label':label,'sn':sn,'model':model,'keyword':keyword,'availability_available':availability_available, 'availability_out':availability_out,'availability_not_returning':availability_not_returning}, function(data)
      {
        $("#results_region").html('');
        $("#results_region").html(data);
        stop_loading();
      });
    }
  });
}

function view_specs()
{
  window.open ('add_item.jsp',false)
}

function delete_item(item_id) //function to delete item
{
  var checkbox_id = "checkbox_" + item_id;
  var clicked_delete_button = document.getElementById(checkbox_id);
  if(clicked_delete_button.checked == true)
  {
    var checkboxes = document.getElementsByClassName("items_checkboxes_class"); //get all items checkboxed
    var selected_ids_array = [];  //will contain ids of selected items
    for(var i = 0 ; i < checkboxes.length; ++i) //loop through all checkboxed
    {
      if(checkboxes[i].checked == true) //if checkbox is checked
      {
        var current_checkbox_id = checkboxes[i].id; 
        var fields = current_checkbox_id.split('_');
        var item_id_check = fields[1];  //extract item id that is checked
        selected_ids_array.push(item_id_check); //add item id to array of selected items ids
      }
    }
    $(document).ready(function()
    {
        if(confirm('Are you sure you want to delete selected items?')) //confirmation alert
        {
          start_loading();
            var x_timer;    
              
                clearTimeout(x_timer);		        
                x_timer = setTimeout(function(){
                    deleteit();
                }, 1000);

            function deleteit()
            {
                for(var k = 0 ; k < selected_ids_array.length ; k++)
                {
                  $.get('delete_item', {'item_id':selected_ids_array[k] }, function(data)   //send to delete item servlet the item id to be deleted
                  {
                  });	 
                }
                stop_loading();
            }
            send_specs(); //update search results
        }
        else
        {
          stop_loading();
        }
    });
  }
  
  else
  {
    $(document).ready(function()
    {
          if(confirm('Are you sure you want to delete item of ID ' + item_id + ' ?')) //confirmation alert
          {
            start_loading();
              var x_timer;    
                
                  clearTimeout(x_timer);		        
                  x_timer = setTimeout(function(){
                      deleteit();
                  }, 1000);
  
              function deleteit()
              {
                  $.get('delete_item', {'item_id':item_id }, function(data)   //send to delete item servlet the item id to be deleted
                  {
                    stop_loading();
                  });	 
              }
              send_specs(); //update search results
          }
          else
          {
            stop_loading();
          }
    });
  }
}

function add_to_cart()  //function to add selected items to cart
{
  var checkboxes = document.getElementsByClassName("items_checkboxes_class"); //get all items checkboxed
  var selected_ids_array = [];  //will contain ids of selected items
  var ids_in_cart_array = []; //will contain ids of items already in cart
  
  for(var i = 0 ; i < checkboxes.length; ++i) //loop through all checkboxed
  {
    if(checkboxes[i].checked == true) //if checkbox is checked
    {
      var checkbox_id = checkboxes[i].id; 
      var fields = checkbox_id.split('_');
      var item_id = fields[1];  //extract item id that is checked
      selected_ids_array.push(item_id); //add item id to array of selected items ids
    }
  }
    $("#items_in_cart_table tr").each(function(){
        ids_in_cart_array.push($(this).find("td:first").text()); //get ids of items already in cart
    });
    for(var k = 0 ; k < selected_ids_array.length ; k++)  //loop through ids of items selected to be added in cart
    {
      if(ids_in_cart_array.indexOf(selected_ids_array[k]) == -1)  //if not already in cart, add it to the cart table 
      {
        var type_id = document.getElementById('item_'+ selected_ids_array[k] + '_type');
        var type = type_id.innerText;
        var table = document.getElementById("items_in_cart_table");
        var row = table.insertRow();
        row.id = "cart_row_" + selected_ids_array[k];
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = selected_ids_array[k];
        cell2.innerHTML = "<a class='showAlert' title='View' onclick = 'show_specs(" + selected_ids_array[k] + ")'>" + type + "</a>";
        cell3.innerHTML = "<button onclick='deleteRow(this)'>Remove</button>";
      }
    }

    }
function deleteRow(btn) { //function to delete row from table
  var row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
}



$(document).ready(function() {

  function exportTableToCSV($table, filename) {

    var $rows = $table.find('tr:has(td),tr:has(th)'),

      // Temporary delimiter characters unlikely to be typed by keyboard
      // This is to avoid accidentally splitting the actual contents
      tmpColDelim = String.fromCharCode(11), // vertical tab character
      tmpRowDelim = String.fromCharCode(0), // null character

      // actual delimiter characters for CSV format
      colDelim = '","',
      rowDelim = '"\r\n"',

      // Grab text from table into CSV formatted string
      csv = '"' + $rows.map(function(i, row) {
        var $row = $(row),
          $cols = $row.find('td,th');

        return $cols.map(function(j, col) {
          var $col = $(col),
            text = $col.text();
          return text.replace(/"/g, '""').replace(/View/g, '').replace(/Receipt/g, '').replace(/Details/g, '').replace(/Action/g, '').replace(/Select/g, '').replace(/-/g, ''); // escape double quotes

        }).get().join(tmpColDelim);

      }).get().join(tmpRowDelim)
      .split(tmpRowDelim).join(rowDelim)
      .split(tmpColDelim).join(colDelim) + '"';

    // Deliberate 'false', see comment below
    if (false && window.navigator.msSaveBlob) {

      var blob = new Blob([decodeURIComponent(csv)], {
        type: 'text/csv;charset=utf8'
      });

      // Crashes in IE 10, IE 11 and Microsoft Edge
      // See MS Edge Issue #10396033
      // Hence, the deliberate 'false'
      // This is here just for completeness
      // Remove the 'false' at your own risk
      window.navigator.msSaveBlob(blob, filename);

    } else if (window.Blob && window.URL) {
      // HTML5 Blob        
      var blob = new Blob([csv], {
        type: 'text/csv;charset=utf-8'
      });
      var csvUrl = URL.createObjectURL(blob);

      $(this)
        .attr({
          'download': filename,
          'href': csvUrl
        });
    } else {
      // Data URI
      var csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);

      $(this)
        .attr({
          'download': filename,
          'href': csvData,
          'target': '_blank'
        });
    }
  }

  // This must be a hyperlink
  $(".export").on('click', function(event) {
    // CSV
    var args = [$('#items_search_results_table'), 'export.csv'];

    exportTableToCSV.apply(this, args);

    // If CSV, don't do event.preventDefault() or return false
    // We actually need this to be a typical hyperlink
  });
});

function print_results_table()
{
   var title = prompt("Enter results title", "Search Results");
   var item_ids = document.getElementsByClassName("search_results_item_ids_class");
   var item_ids_array = new Array();
   for(var i = 0; i<item_ids.length; ++i)  //for every added spec input text, add it's id to specs_input_names and it's value(content) to specs_input_values
    {
      var id = item_ids[i].innerHTML;
      item_ids_array.push(id);
    }
     $.get('print_item_search_results', {'items_ids':item_ids_array,'title':title}, function(data)
     {
        myWindow = window.open(); //create new tab
        myWindow.document.body.innerHTML = data;  //generated html from create_receipt_form will make up the new tab
        myWindow.print(); //print the opened tab
     });
}

function reset_search_options() //function resets items_hq search elements to the default values
{
  var id = document.getElementById("input_item_id");
  id.value = '';
  var type = document.getElementById("select_item_type_id");
  for (var i = 0; i < type.options.length; i++) 
  {
    if (type.options[i].text === "Any") 
    {
        type.selectedIndex = i;
        break;
    }
  }
  var brand = document.getElementById("select_item_brand_id");
  for (var k = 0; k < brand.options.length; k++) 
  {
    if (brand.options[k].text === "Any") 
    {
        brand.selectedIndex = k;
        break;
    }
  }
  var location = document.getElementById("select_item_location_id");
  for (var m = 0; m < location.options.length; m++) 
  {
    if (location.options[m].text === "Any") 
    {
        location.selectedIndex = m;
        break;
    }
  }
  var condition = document.getElementById("select_item_condition_id");
  for (var n = 0; n < condition.options.length; n++) 
  {
    if (condition.options[n].text === "Any") 
    {
        condition.selectedIndex = n;
        break;
    }
  };
  var label = document.getElementById("input_item_label");
  label.value = '';
  var sn = document.getElementById("input_item_sn");
  sn.value = '';
  var model = document.getElementById("input_item_model");
  model.value = '';
  var keyword = document.getElementById("input_item_keyword");
  keyword.value = '';
  var radio_all = document.getElementById("availability_option_all_id");
  radio_all.checked = true;
  document.getElementById("specs_region").innerHTML = "";
  document.getElementById("specs_values_region").innerHTML = "";
}

function start_loading()
{
  document.getElementById("div_loading").style.display = "block";
}
function stop_loading()
{
  document.getElementById("div_loading").style.display = "none";
}

function sort_select_hq_type()  //function called on mousedown of select item type in items_hq, sorts select options
{
  var my_options = $("#select_item_type_id option");
  var selected = $("#select_item_type_id").val();
  
  my_options.sort(function(a,b) {
      if (a.text > b.text) return 1;
      if (a.text < b.text) return -1;
      return 0
  })
  
  $("#select_item_type_id").empty().append( my_options );
  $("#select_item_type_id").val(selected);
}

function sort_select_hq_brand() //function called on mousedown of select item brand in items_hq, sorts select options
{
  var my_options = $("#select_item_brand_id option");
  var selected = $("#select_item_brand_id").val();
  
  my_options.sort(function(a,b) {
      if (a.text > b.text) return 1;
      if (a.text < b.text) return -1;
      return 0
  })
  
  $("#select_item_brand_id").empty().append( my_options );
  $("#select_item_brand_id").val(selected);
}

function sort_select_hq_location()  //function called on mousedown of select item location in items_hq, sorts select options
{
  var my_options = $("#select_item_location_id option");
  var selected = $("#select_item_location_id").val();
  
  my_options.sort(function(a,b) {
      if (a.text > b.text) return 1;
      if (a.text < b.text) return -1;
      return 0
  })
  
  $("#select_item_location_id").empty().append( my_options );
  $("#select_item_location_id").val(selected);
}

function sort_select_hq_condition() //function called on mousedown of select item condition in items_hq, sorts select options
{
  var my_options = $("#select_item_condition_id option");
  var selected = $("#select_item_condition_id").val();
  
  my_options.sort(function(a,b) {
      if (a.text > b.text) return 1;
      if (a.text < b.text) return -1;
      return 0
  })
  
  $("#select_item_condition_id").empty().append( my_options );
  $("#select_item_condition_id").val(selected);
}