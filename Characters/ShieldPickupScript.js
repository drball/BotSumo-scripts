#pragma strict
/* ====================================================
For a collectable object which comes back later
======================================================= */

private var gameController : GameControllerScript;
private var pickupsController : PickupsController;
private var isCollectable : boolean = true;
private var collectionSfx : AudioSource;
public var theParticle : GameObject;
public var vfxObj : GameObject;



function Start () {
	//--find gameController so we can call functions
	gameController = GameObject.Find("GameController").GetComponent.<GameControllerScript>();
	
	pickupsController = GameObject.Find("GameController").GetComponent.<PickupsController>();
	
	collectionSfx = GetComponent.<AudioSource>();

	NewPickup ();

}

function NewPickup () {

	vfxObj.SetActive(true);
	
	//--come back and blink for a bit
	
	var blinkingAmt : int = 0;
	
	while(blinkingAmt < 8) {
        yield WaitForSeconds(0.04);
        vfxObj.GetComponent.<Renderer>().enabled = !vfxObj.GetComponent.<Renderer>().enabled;
        blinkingAmt++;
    }
    vfxObj.GetComponent.<Renderer>().enabled = true;
    isCollectable = true;
}


function OnTriggerEnter(other: Collider) 
{
	//--when player touches pickup
	if (other.tag == "Player" && isCollectable)
	{
		Debug.Log("shield touching player");
	    collectionSfx.Play();
	        
		var collidingPlayer : ShieldController = other.gameObject.GetComponent.<ShieldController>();
				
		if(collidingPlayer != null)
        {   
            collidingPlayer.ActivateShield();
        } else {

        	//--maybe we couldn't find the script because this player has a separate mesh collider
        	//--so look for script on its parent
        	collidingPlayer = other.transform.parent.gameObject.GetComponent.<ShieldController>();

        	if(collidingPlayer != null)
        	{
    			Debug.Log("getting playerscript of cogplayer");
        		collidingPlayer.ActivateShield();
        	}
        }
		
		//--destory pickup, but schedule a new one
	    vfxObj.SetActive(false);
	    isCollectable = false;
	    theParticle.GetComponent.<ParticleSystem>().emissionRate = 0;
	    
	    yield WaitForSeconds (3);
	    
	    Destroy(gameObject);
	    
	}

}


