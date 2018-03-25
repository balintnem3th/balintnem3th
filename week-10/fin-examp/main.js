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