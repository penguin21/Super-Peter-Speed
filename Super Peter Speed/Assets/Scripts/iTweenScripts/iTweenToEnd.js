var xS : float;
var yS : float;
var zS : float;
var xE : float;
var yE : float;
var zE : float;
var Speed : float = 5;

function Start ()
{
    iTween.moveTo( gameObject, { "x" : xS , "y" : yS , "z" : zE , "time" : Speed });
    iTween.moveTo( gameObject, { "x" : xE , "y" : yE , "z" : zE , "time" : Speed });
}