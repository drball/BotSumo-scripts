#pragma strict

//-- for the bit of the pit that drops down

private var rend: Renderer;
var highlightColor : Color;
private var initialColor : Color;
private var initialPosition : Vector3;
private var falling : boolean = false;
private var ascending : boolean = false;
private var fallSpeed : float = 6;

function Start() {
	rend = GetComponent.<Renderer>();

	initialColor = rend.material.color;

	initialPosition = transform.localPosition;
}

function Update(){
	if(falling == true && transform.localPosition.z > 0){
		Debug.Log("falling - y = "+transform.localPosition.z);
		transform.localPosition.z -= fallSpeed;
	} else if (ascending == true && transform.localPosition.z < initialPosition.z){
		transform.localPosition.z += fallSpeed;
	}
}


function DropPit(){

	Debug.Log("start blinking");
	//--make pit blink for a bit
	var blinkingAmt : int = 0;
	
	while(blinkingAmt < 10) {
        yield WaitForSeconds(0.1);

        if(rend.material.color == initialColor){
        	rend.material.color = highlightColor;
    	} else {
    		rend.material.color = initialColor;
    	}
        
        blinkingAmt++;
    }
    
    rend.material.color = initialColor;

    Debug.Log("drop the pit");

    //--drop the pit

    falling = true;
    ascending = false;

    Invoke("StartAscending", 12);
}

function StartAscending(){

	Debug.Log("start ascending");

	ResetPit();

	ascending = true;
	
	Invoke("ResetPit", 6);
}


function ResetPit(){
	falling = false;
	ascending = false;
}