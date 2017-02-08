function send_specs() //sends items_hq search parameters to generate_items_table
{
  $(document).ready(function()
  {
    var x_timer;    
    var specs_input_elements = document.getElementsByClassName("specs_inputs_class"); //inputs_class is the class of all input text elements of added specs, specs_input_elements is array containing all input text elemets of added specs
    var specs_input_names = new Array();  //will contain ids of added specs input text elements(to parse the spec name for the id)
    var specs_input_values = new Array(); ////will contain values of added specs input text elements
    var select_type = document.getElementById('select_item_type_id').value;
    var select_brand = document.getElementById('select_item_brand_id').value;
    var select_location = document.getElementById('select_item_location_id').value;
    var select_condition = document.getElementById('select_item_condition_id').value;
    var input_label = document.getElementById('input_item_label').value;
    var input_sn = document.getElementById('input_item_sn').value;
    var bool_availability_available = 0;
    var bool_availability_out = 0;
    if(document.getElementById('availability_option_available_id').checked)
    {
      bool_availability_available = 1;
    }
    else if(document.getElementById('availability_option_out_id').checked)
    {
      bool_availability_out = 1;
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
    send_to_servlet(specs_input_names,specs_input_values,select_type,select_brand,select_location,select_condition,input_label,input_sn,bool_availability_available,bool_availability_out);}, 1000);
    
    function send_to_servlet(specs_names,specs_values,type,brand,location,condition,label,sn,availability_available,availability_out) //send to generate_items_table all search parameters
    {
      $.get('generate_items_table', {'specs_names':specs_names, 'specs_values':specs_values, 'type':type, 'brand':brand, 'location':location,'condition':condition, 'label':label,'sn':sn,'availability_available':availability_available, 'availability_out':availability_out}, function(data)
      {
        $("#results_region").html('');
        $("#results_region").html(data);
      });
    }
  });
}

function view_specs()
{
  window.open ('add_item.jsp',false)
}

function delete_item(item_id)
{
  $(document).ready(function() {
        if(confirm('Are you sure you want to delete item of ID ' + item_id + ' ?'))
        {
            var x_timer;    
              
                clearTimeout(x_timer);		        
                x_timer = setTimeout(function(){
                    deleteit();
                }, 1000);

            function deleteit()
            {
                $.get('delete_item', {'item_id':item_id }, function(data) 
                {
                });	 
            }
          }
	  });
          send_specs();
}

function add_to_cart()
{
  var checkboxes = document.getElementsByClassName("items_checkboxes_class");
  for(var i = 0 ; i < checkboxes.length; ++i)
  {
    if(checkboxes[i].checked == true)
    {
      var checkbox_id = checkboxes[i].id;
      var fields = checkbox_id.split('_');
      var item_id = fields[1];
      var type_id = document.getElementById('item_'+ item_id + '_type');
      var type = type_id.innerText;
      var table = document.getElementById("items_in_cart_table");
      var row = table.insertRow();
      row.id = "cart_row_" + item_id;
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      cell1.innerHTML = item_id;
      cell2.innerHTML = "<a class='showAlert' title='View' onclick = 'show_specs(" + item_id + ")'>" + type + "</a>";
      cell3.innerHTML = "<input type='button' value='Remove' onclick='deleteRow(this)'/>";
    }
  }
}

function deleteRow(btn) {
  var row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
}
