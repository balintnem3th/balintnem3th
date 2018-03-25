function welcome()
{
    document.getElementById('display').innerHTML = "Welcome to my world!";
}
function displayMessage()
{
    try 
    {
        wel_come();		
    }
    catch(error)
    {
        document.getElementById('display2').innerHTML =   error.message;	
    }
}

function assert(value, description) {
    var result = value ? "pass" : "fail";
    console.log(result + ' - ' +  description); 
};
assert (1===1, 'testing if 1=1');  
assert (1===2, 'testing if 1=1');