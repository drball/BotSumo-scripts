// #pragma strict
import UnityEngine.Advertisements; // Import the Unity Ads namespace.

#if !UNITY_ADS // If the Ads service is not enabled...
	public var gameId : String; // Set this value from the inspector.
	public var enableTestMode : boolean = true;
#endif

function Start(){

    #if !UNITY_ADS // If the Ads service is not enabled...
	    if (Advertisement.isSupported) { // If runtime platform is supported...
	        Advertisement.Initialize(gameId, enableTestMode); // ...initialize.
	    }
    #endif

}

function FixedUpdate () {

	//--show an ad if spacebar is pressed
	if(Input.GetKey("space") ) {
		ShowAdvert();
	}
}

function ShowAdvert(){
	//--show a normal ad - at the end of a round
	Debug.Log("show ad");
	if(Advertisement.isInitialized && Advertisement.IsReady()) {
		Advertisement.Show();
	}
}

function ShowRewardedAd(){
	// var options : ShowOptions = new ShowOptions();
 //        options.resultCallback = HandleShowResult;
}


