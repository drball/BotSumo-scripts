#pragma strict

//static var playerSelection : Hashtable; //--chosen characters

//--create array of the possible different player characters 
public var playerCharacters = new Array ("A", "B", "C", "SpinningArms", "Cog", "Solar","Razorback", "Pooper", "Flat");

public var p1GameObjects : GameObject[]; //--array of characters
public var p2GameObjects : GameObject[]; //--array of characters
public var P1Btn : GameObject;	//--ref to btn for disabling it
public var P2Btn : GameObject;	//--ref to btn for disabling it
public var LoadingPanel : GameObject;
public var P1WaitMsg : GameObject;
public var P2WaitMsg : GameObject;
public var UnlockP1Btn : GameObject;
public var UnlockP2Btn : GameObject;
public var UnlockModal : GameObject;
public var UnlockP1BtnScript : UnlockBotButton;
public var UnlockP2BtnScript : UnlockBotButton;

public var isCogUnlocked : int = 0;
public var isSolarUnlocked : int = 0;
public var isRazorbackUnlocked : int = 0;
public var isPooperUnlocked : int = 0;
public var isFlatUnlocked : int = 0;

private var numPlayers : int = 2;
private var p1VisibleChar = 0;
private var p2VisibleChar = 0;
private var LevelsController : LevelsController;
private var VersionController : VersionController;
public var UnlockingBot : String; //--used to remember which bot was unlocked while advert plays

//--the selected character - these used in the next scene
static var p1SelectedCharString; 
static var p2SelectedCharString;

function Start () {
	
	//--hide all the characters apart from the 1st
	showOnlyP1Character(p1VisibleChar);
	showOnlyP2Character(p2VisibleChar);
	
	p1SelectedCharString = "";
	p2SelectedCharString = "";
	
	LoadingPanel.SetActive(false);

	P1WaitMsg.SetActive(false);
	P2WaitMsg.SetActive(false);

	//--check whether cogbot has been unlocked 
	isCogUnlocked = PlayerPrefs.GetInt("UnlockedCog");
	isSolarUnlocked = PlayerPrefs.GetInt("UnlockedSolar");
	isRazorbackUnlocked = PlayerPrefs.GetInt("UnlockedRazorback");
	isPooperUnlocked = PlayerPrefs.GetInt("UnlockedPooper");
	isFlatUnlocked = PlayerPrefs.GetInt("UnlockedFlat");

	// Debug.Log("solar unlocked = "+isSolarUnlocked);

	if(GameObject.Find("LevelsController")){
		LevelsController = GameObject.Find("LevelsController").GetComponent.<LevelsController>(); //--loading in menu. Persistant
	}
	
	if(GameObject.Find("VersionController")){
		VersionController = GameObject.Find("VersionController").GetComponent.<VersionController>();
	}

	closeUnlockModal();
}

function selectCharacter(playerNum : int) {
	//--when the "select" button pressed, set the variable & disable the btn
	
	if(playerNum == 1) {
		Debug.Log("p1VisibleChar] = "+p1VisibleChar);
		Debug.Log("playerCharacters[p1VisibleChar] = "+playerCharacters[p1VisibleChar]);
		p1SelectedCharString = playerCharacters[p1VisibleChar];
		P1Btn.SetActive(false);
		P1WaitMsg.SetActive(true);
	}else {
		p2SelectedCharString = playerCharacters[p2VisibleChar];
		P2Btn.SetActive(false);
		P2WaitMsg.SetActive(true);
	}
	
	//--load next level if both selected
	
	if( p1SelectedCharString && p2SelectedCharString ){
		Debug.Log("both ready!");
		
		//--show loading panel because there's a delay
		LoadingPanel.SetActive(true);
		
		//--load the main level
		LevelsController.LoadSelectedLevel();
	}
}

function showOnlyP1Character (charToShow : int) {

//	Debug.Log("there are "+p1GameObjects.length+"p1 charaters");

	//--hide all characters
	for(var i : int = 0; i < p1GameObjects.length; i++){
		// Debug.Log("p1 setting "+i+" to inactive");
		p1GameObjects[i].SetActive(false);
	}
	
	//--show the selected char
	p1GameObjects[charToShow].SetActive(true);

	if((charToShow == 4) && (!isCogUnlocked) && (VersionController.paidVersion == false)){
		Debug.Log("p1 has selected cog");
		P1Btn.GetComponent.<Button>().interactable = false; //--this bots btn should be disabled
		//--show unlock button 
		UnlockP1Btn.SetActive(true);
		UnlockP1BtnScript.selectedBot = "Cog";

	} else if((charToShow == 5) && (!isSolarUnlocked) && (VersionController.paidVersion == false)){
		Debug.Log("p1 has selected solar");
		P1Btn.GetComponent.<Button>().interactable = false; //--this bots btn should be disabled
		//--show unlock button 
		UnlockP1Btn.SetActive(true);
		UnlockP1BtnScript.selectedBot = "Solar";

	} else if((charToShow == 6) && (!isRazorbackUnlocked) && (VersionController.paidVersion == false)){
		Debug.Log("p1 has selected razorback");
		P1Btn.GetComponent.<Button>().interactable = false; //--this bots btn should be disabled
		//--show unlock button 
		UnlockP1Btn.SetActive(true);
		UnlockP1BtnScript.selectedBot = "Razorback";

	} else if((charToShow == 7) && (!isPooperUnlocked) && (VersionController.paidVersion == false)){
		Debug.Log("p1 has selected pooper");
		P1Btn.GetComponent.<Button>().interactable = false; //--this bots btn should be disabled
		//--show unlock button 
		UnlockP1Btn.SetActive(true);
		UnlockP1BtnScript.selectedBot = "Pooper";

	// } else if((charToShow == 8) && (!isFlatUnlocked) && (VersionController.paidVersion == false)){
	// 	Debug.Log("p1 has selected pooper");
	// 	P1Btn.GetComponent.<Button>().interactable = false; //--this bots btn should be disabled
	// 	//--show unlock button 
	// 	UnlockP1Btn.SetActive(true);
	// 	UnlockP1BtnScript.selectedBot = "Flat";

	} else {
		UnlockP1Btn.SetActive(false);

	}

	// if(charToShow == 6){
	// 	P1Btn.GetComponent.<Button>().interactable = false; //--this bots btn should be disabled
	// }
}

function showOnlyP2Character (charToShow : int) {

//	Debug.Log("there are "+p2GameObjects.length+"p2 charaters");

	//--hide all characters
	for(var i : int = 0; i < p2GameObjects.length; i++){
		// Debug.Log("p2 setting "+i+" to inactive");
		p2GameObjects[i].SetActive(false);
	}
	
	//--show the selected char
	p2GameObjects[charToShow].SetActive(true);

	if((charToShow == 4) && (!isCogUnlocked) && (VersionController.paidVersion == false)){
		Debug.Log("p2 has selected cog");
		P2Btn.GetComponent.<Button>().interactable = false; //--this bots btn should be disabled
		//--show unlock button 
		UnlockP2Btn.SetActive(true);
		UnlockP2BtnScript.selectedBot = "Cog";

	} else if((charToShow == 5) && (!isSolarUnlocked) && (VersionController.paidVersion == false)){
		Debug.Log("p2 has selected solar");
		P2Btn.GetComponent.<Button>().interactable = false; //--this bots btn should be disabled
		//--show unlock button 
		UnlockP2Btn.SetActive(true);
		UnlockP2BtnScript.selectedBot = "Solar";

	} else if((charToShow == 6) && (!isRazorbackUnlocked) && (VersionController.paidVersion == false)){
		Debug.Log("p2 has selected razorback");
		P2Btn.GetComponent.<Button>().interactable = false; //--this bots btn should be disabled
		//--show unlock button 
		UnlockP2Btn.SetActive(true);
		UnlockP2BtnScript.selectedBot = "Razorback";

	} else if((charToShow == 7) && (!isPooperUnlocked) && (VersionController.paidVersion == false)){
		Debug.Log("p2 has selected pooper");
		P2Btn.GetComponent.<Button>().interactable = false; //--this bots btn should be disabled
		//--show unlock button 
		UnlockP2Btn.SetActive(true);
		UnlockP2BtnScript.selectedBot = "Pooper";

	// } else if((charToShow == 8) && (!isFlatUnlocked) && (VersionController.paidVersion == false)){
	// 	Debug.Log("p2 has selected flat");
	// 	P2Btn.GetComponent.<Button>().interactable = false; //--this bots btn should be disabled
	// 	//--show unlock button 
	// 	UnlockP2Btn.SetActive(true);
	// 	UnlockP2BtnScript.selectedBot = "Flat";

	} else {
		UnlockP2Btn.SetActive(false);
	}

	// if(charToShow == 6){
	// 	P2Btn.GetComponent.<Button>().interactable = false; //--this bots btn should be disabled
	// }
}

function NextCharacter (playerNum : int) {
	
	if (playerNum == 1) {
		p1VisibleChar++;

		P1Btn.GetComponent.<Button>().interactable = true; //--enable because "coming soon" bot might have disabled it
		
		//-- show only next  character (or reset)
		if(p1VisibleChar >= p1GameObjects.length) {
			p1VisibleChar = 0;
		}
		showOnlyP1Character(p1VisibleChar);

	} else {
		p2VisibleChar++;

		P2Btn.GetComponent.<Button>().interactable = true; //--enable because "coming soon" bot might have disabled it
		
		if(p2VisibleChar >= p2GameObjects.length) {
			p2VisibleChar = 0;
		}
		showOnlyP2Character(p2VisibleChar);

	}
	
}

function PrevCharacter (playerNum : int) {
	
	if (playerNum == 1) {
		p1VisibleChar--;

		P1Btn.GetComponent.<Button>().interactable = true; //--enable because "coming soon" bot might have disabled it
		
		if(p1VisibleChar < 0) {
			p1VisibleChar = p1GameObjects.length - 1;
		}
		showOnlyP1Character(p1VisibleChar);
	}else {
		p2VisibleChar--;

		P2Btn.GetComponent.<Button>().interactable = true; //--enable because "coming soon" bot might have disabled it
		
		if(p2VisibleChar < 0) {
			p2VisibleChar = p2GameObjects.length - 1;
		}
		showOnlyP2Character(p2VisibleChar);
	}
}

function showUnlockModal(selectedCharacterName : String){

	//--unlock the currently selected character
	Debug.Log("Showing modal for "+selectedCharacterName);
	UnlockingBot = selectedCharacterName;
	UnlockModal.SetActive(true);
}

function closeUnlockModal(){
	UnlockModal.SetActive(false);
}

function unlockSelectedBot(){
	//--called by a sendmessage from RewardedAd
	Debug.Log("unlocking "+UnlockingBot);
	PlayerPrefs.SetInt("Unlocked"+UnlockingBot, 1);
	// UnlockP1SolarBtn.SetActive(false);
	// UnlockP2SolarBtn.SetActive(false);
	P1Btn.GetComponent.<Button>().interactable = true;
	P2Btn.GetComponent.<Button>().interactable = true;

	//--set the variables
	if(UnlockingBot == "Cog"){
		isCogUnlocked = 1;
	} else if (UnlockingBot == "Solar"){
		isSolarUnlocked = 1;
	} else if (UnlockingBot == "Razorback"){
		isRazorbackUnlocked = 1;
	} else if (UnlockingBot == "Pooper"){
		isRazorbackUnlocked = 1;
	} else if (UnlockingBot == "Flat"){
		isRazorbackUnlocked = 1;
	}

	if (UnlockP1BtnScript.selectedBot == UnlockingBot){
		UnlockP1Btn.SetActive(false);
	};

	if (UnlockP2BtnScript.selectedBot == UnlockingBot){
		UnlockP2Btn.SetActive(false);
	};
}

function ToggleSinglePlayer(singlePlayerSelection : boolean){
	// Debug.Log("----------Toggle is "+singlePlayerSelection);
	LevelsController.singlePlayer = singlePlayerSelection;
}