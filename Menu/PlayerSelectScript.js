#pragma strict

//static var playerSelection : Hashtable; //--chosen characters

//--create array of the possible different player characters 
public var playerCharacters = new Array ("A", "B", "C", "SpinningArms", "Cog", "Solar");

public var p1GameObjects : GameObject[]; //--array of characters
public var p2GameObjects : GameObject[]; //--array of characters
public var P1Btn : GameObject;	//--ref to btn for disabling it
public var P2Btn : GameObject;	//--ref to btn for disabling it
public var LoadingPanel : GameObject;
public var P1WaitMsg : GameObject;
public var P2WaitMsg : GameObject;
public var UnlockP1CogBtn : GameObject;
public var UnlockP2CogBtn : GameObject;
public var UnlockModal : GameObject;


private var numPlayers : int = 2;
private var p1VisibleChar = 0;
private var p2VisibleChar = 0;
private var isCogUnlocked : int = 0;
private var LevelsController : LevelsController;
private var VersionController : VersionController;

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

	Debug.Log("cogbot unlocked = "+isCogUnlocked);

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
		p1GameObjects[i].SetActive(false);
	}
	
	//--show the selected char
	p1GameObjects[charToShow].SetActive(true);

	if((charToShow == 4) && (!isCogUnlocked) && (VersionController.paidVersion == false)){
		Debug.Log("p1 has selected cog");
		P1Btn.GetComponent.<Button>().interactable = false; //--this bots btn should be disabled
		//--show unlock button 
		UnlockP1CogBtn.SetActive(true);

	} else {
		UnlockP1CogBtn.SetActive(false);
	}

	if(charToShow == 5){
		P1Btn.GetComponent.<Button>().interactable = false; //--this bots btn should be disabled
	}
}

function showOnlyP2Character (charToShow : int) {

//	Debug.Log("there are "+p2GameObjects.length+"p2 charaters");

	//--hide all characters
	for(var i : int = 0; i < p2GameObjects.length; i++){
		p2GameObjects[i].SetActive(false);
	}
	
	//--show the selected char
	p2GameObjects[charToShow].SetActive(true);

	if((charToShow == 4) && (!isCogUnlocked) && (VersionController.paidVersion == false)){
		Debug.Log("p2 has selected cog");
		P2Btn.GetComponent.<Button>().interactable = false; //--this bots btn should be disabled
		//--show unlock button 
		UnlockP2CogBtn.SetActive(true);

	} else {
		UnlockP2CogBtn.SetActive(false);
	}

	if(charToShow == 5){
		P2Btn.GetComponent.<Button>().interactable = false; //--this bots btn should be disabled
	}
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

function showUnlockModal() {

	// Debug.Log("unlocking char="+character);
	UnlockModal.SetActive(true);
}

// function unlockCharacter (character : String) {
// 	//--unlock button has been pressed
// 	//--character is string from the button

// 	Debug.Log("unlocking char="+character);

// 	// PlayerPrefs.SetInt("UnlockedCog", 1);
// }

function closeUnlockModal(){
	UnlockModal.SetActive(false);
}

function unlockCog(){
	//--called by a sendmessage
	Debug.Log("unlocking cog by sendmessage");
	PlayerPrefs.SetInt("UnlockedCog", 1);
	isCogUnlocked = 1;
	UnlockP1CogBtn.SetActive(false);
	UnlockP2CogBtn.SetActive(false);
	P1Btn.GetComponent.<Button>().interactable = true;
	P2Btn.GetComponent.<Button>().interactable = true;
}

function ToggleSinglePlayer(singlePlayerSelection : boolean){
	// Debug.Log("----------Toggle is "+singlePlayerSelection);
	LevelsController.singlePlayer = singlePlayerSelection;
}