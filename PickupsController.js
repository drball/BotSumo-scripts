#pragma strict

/* ====================================================
Creates a collectable object
======================================================= */

private var yPos : float = 0.33;
private var appearAfter: float = 1;//10; //-- how many seconds pickup should show again


function Start () {
	SchedulePickup();
	Invoke("CreateShieldPickup",appearAfter);
}

function SchedulePickup(){
	Invoke("CreatePickup",appearAfter);
}

function CreatePickup() {
//	Debug.Log("new pickup");
	
	//--select placement location 
	var location : Vector3 = Vector3(
			Random.Range(-5.9, 5.9),
			yPos, 
			Random.Range(-5.9, 5.9)
		);
		
	var radius : float = .7; //--radius of the hit area

	var objectsInRange : Collider[] = Physics.OverlapSphere(location, radius);
        
    if(objectsInRange.Length > 0){
    	//--this would collide with an object, so try again with a different location
    	// CreatePickup();
    	Invoke("CreatePickup",0.5); 
    }else {

		//--there's nothing to collide with here, so create pickup
    	var pickupInstance : GameObject = Instantiate(Resources.Load("Pickup", GameObject),
			location, 
			transform.rotation
		);	
    }
}

function CreateShieldPickup() {
//	Debug.Log("new pickup");
	
	//--select placement location 
	var location : Vector3 = Vector3(
			Random.Range(-5.9, 5.9),
			yPos, 
			Random.Range(-5.9, 5.9)
		);
		
	var radius : float = .7; //--radius of the hit area

	var objectsInRange : Collider[] = Physics.OverlapSphere(location, radius);
        
    if(objectsInRange.Length > 0){
    	//--this would collide with an object, so try again with a different location
    	// CreatePickup();
    	Invoke("CreateShieldPickup",0.5); 
    } else {

		//--there's nothing to collide with here, so create pickup
    	var pickupInstance : GameObject = Instantiate(Resources.Load("ShieldPickup", GameObject),
			location, 
			transform.rotation
		);	
    }
}