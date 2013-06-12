/*!
 * Javascript MarsRover  
 * Author: Amarnath Krishnan
 * Date: 2013-06-11
 * 
 */
var maxX=30;
var maxY=14;
var gridX=0;
var gridY=0;
var x=0;
var y=0;
var str='';
var direction='';
var degree=0;
var target=0;
var index=0;
function initializeMatrix()
{
	var $table = $('<table/>');
	for(var i=1;i<=gridY;i++)
	{
		var $tr=$('<tr/>');
		for(var j=1;j<=gridX;j++)
		{	
			var $wrap = $('<div/>');
			$wrap.attr('id',i.toString()+j.toString());
			$wrap.attr('class',"empty");
			var $td=$('<td/>');
			$td.append($wrap);
			$tr.append($td);
		}
		$table.prepend($tr);
	}
	$('#content').append($table);
}

function checkInput()
{
    var temp=$('#direction').val().toUpperCase();
	
	if(temp.length==1)
    {
        if(temp=='N'||temp=='S'||temp=='E'||temp=='W')
        {
			str='';
            str=$('#command').val().toUpperCase();
            var bool=true;
            for(var i=0;i<str.length;i++)
            {
                    if(str[i]!='L' && str[i]!='R' && str[i]!='M')
                    bool=false;
            }
            return bool;           
        }
        else return false;        
    }
    else return false;
}

function detectLeftdirection()
{
	switch(direction)
	{
		case 'N': direction='W'; break;
		case 'W': direction='S'; break;
		case 'S': direction='E'; break;
		case 'E': direction='N'; break;
	}
	$('#curdir').val(direction);
}
function detectRightdirection()
{
	switch(direction)
	{
		case 'N': direction='E'; break;
		case 'E': direction='S'; break;
		case 'S': direction='W'; break;
		case 'W': direction='N'; break;
	}
	$('#curdir').val(direction);
}

function moveForward()
{
var flag=true;
	$('#'+y.toString()+x.toString()).attr('class','G');
	$('#'+y.toString()+x.toString()).html('');
	switch(direction)
	{
		case 'N': y++; y>gridY?flag=false:flag; break;
		case 'S': y--; y<=0?flag=false:flag; break;
		case 'E': x++; x>gridX?flag=false:flag;break;
		case 'W': x--; x<=0?flag=false:flag;break;
	}
	if(flag)
	{
		showError("Moving Forward");
		$('#'+y.toString()+x.toString()).html('<img src="img/arrow-min.png" id="img"/>');		
		$('#img').css({
		'-webkit-transform': 'rotate('+degree+'deg)',
		'-moz-transform': 'rotate('+degree+'deg)',
		'-ms-transform': 'rotate('+degree+'deg)',
		'-o-transform': 'rotate('+degree+'deg)',
		'transform': 'rotate('+degree+'deg)'
				});
		
		}
	else
	    showError("Cannot move out of Grid");
return flag;  
}   
function startMovement()
{
    var success=true;
	var len=str.length;
	index=0;
	moved=function()
	{
		switch(str[index])
	   {
	        case 'L':
				target-=90;
				showError("Moving Left");
				moveLeft();
				detectLeftdirection();
				setTimeout(function(){index++;check();},2000);
			 	break;
			case 'R':
				target+=90;
				showError("Moving Right");
				moveRight();
				detectRightdirection();
				setTimeout(function(){index++;check();},2000);
			 	break;
			case 'M':
				if(!moveForward())
				{
					index=len;
					success=false;
				}
				setTimeout(function(){index++;check();},1500);
			 	break;
		}
		function check()
		{
		    index<len?moved():(success==true?showError("Completed"):$('.notify').append("<b> -- Terminated </b>"));
		}
		
	};
	moved();
}		


function initiatePosition()
{
    showError("Initiate Position");
	direction='';
	direction=$('#direction').val().toUpperCase();
	$('#'+y.toString()+x.toString()).html('<img src="img/arrow-min.png" id="img"/>');
	switch(direction)
	{
		case 'N': 
		     degree=0;
			 startMovement();
			 break;
		case 'E':
		     degree=0;
			 target=degree+90;
			 moveRight();
			 setTimeout(function(){startMovement();},1800);
			 break;
	    	case 'W':
		     degree=0;
			 target=degree-90;
			 moveLeft();
			 setTimeout(function(){startMovement();},1800);
			 break;
		 case 'S':
		     degree=0;
			 target=degree-180;
			 moveLeft();
			 setTimeout(function(){startMovement();},4000);
			 break;	 
	}
	
}
function moveRight()
{
    if(degree==360) {degree=0;
    target=degree+90;
}
    move=function(){
                  degree+=5;
    $('#img').css({
		'-webkit-transform': 'rotate('+degree+'deg)',
		'-moz-transform': 'rotate('+degree+'deg)',
		'-ms-transform': 'rotate('+degree+'deg)',
		'-o-transform': 'rotate('+degree+'deg)',
		'transform': 'rotate('+degree+'deg)'
				});
    $('#degree').val(degree);
    $('#target').val(target);
    if(degree<target) setTimeout(move,100);
	    
		};
move();
}

function moveLeft()
{
    if(degree==-360) 
    {		
	degree=0;
    	target=degree-90;
    }
    move=function()
	{
        degree-=5;
    	$('#img').css({
			'-webkit-transform': 'rotate('+degree+'deg)',
			'-moz-transform': 'rotate('+degree+'deg)',
			'-ms-transform': 'rotate('+degree+'deg)',
			'-o-transform': 'rotate('+degree+'deg)',
			'transform': 'rotate('+degree+'deg)'
		});
              
	$('#degree').val(degree);
    	$('#target').val(target);
    	if(degree>target) setTimeout(move,100);
		
    };
move();

}

function clearInput()
{
  $('#x').val('');
  $('#y').val('');
  $('#command').val('');
  $('#direction').val('');
  $('#x').prop('disabled', false); 
  $('#y').prop('disabled', false); 
  $('#command').prop('disabled', false);
  $('#direction').prop('disabled', false); 
  $('#start').prop('disabled', false);
  $('.notify').hide();
  $('.notify').html("");
  $('#content').html("");
  str='';
  
}


function showError(msg)
{
	$('.notify').show();
	$('.notify').html("<b>"+msg+"</b>");
}
$(function()
{
$('#construct').click(function()
{
    if($.isNumeric($('#gridX').val()) && $.isNumeric($('#gridY').val()))
    {
		gridX=0;
        gridY=0;
        gridX=parseInt($('#gridX').val());
        gridY=parseInt($('#gridY').val());
        if((gridX<0 ||gridX>maxX)||(gridY<0 || gridY>maxY)) showError("Input Out of Bound. ");
        else
        {
			$('#gridX').prop('disabled', true); 
            $('#gridY').prop('disabled', true);
            $('#construct').prop('disabled', true);
	    $('#input').show();
	    initializeMatrix();
	    $('.notify').hide();
	    $('.notify').html("");
	    }
    }
    else showError("Non-Numeric Input Not Allowed. ");

 });
 
 $('#gridReset').click(function()
 {
    $('#gridX').val('');
    $('#gridY').val('');
    $('#gridX').prop('disabled', false); 
    $('#gridY').prop('disabled', false); 
    $('#construct').prop('disabled', false);
    $('#input').hide();
    $('.notify').hide();
    $('.notify').html("");
    $('#content').html("");
    clearInput();                     
  });
				   
$('#start').click(function()
{
    if($.isNumeric($('#x').val()) && $.isNumeric($('#y').val()) && checkInput())
    {
		x=0;
        y=0;
        x=parseInt($('#x').val());
        y=parseInt($('#y').val());
		if((x<0 ||x>gridX)||(y<0 || y>gridY)) showError("Input Out of Bound.");
        else
        {
            $('#x').prop('disabled', true); 
            $('#y').prop('disabled', true);
	    	$('#start').prop('disabled', true);
            $('#direction').prop('disabled', true); 
            $('#command').prop('disabled', true);
            initiatePosition();
        }
    }
    else showError("Invalid Input ");                       
});

$('#reset').click(function(){clearInput();initializeMatrix();});
});

