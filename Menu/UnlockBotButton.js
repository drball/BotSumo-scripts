#pragma strict

//--this stores the current selected string for this bot - used by playerSelectScript when pressed

public var selectedBot : String = "Cog";
public var playerNum : int = 1;
public var PlayerSelectScript : PlayerSelectScript;

function PressedUnlockButton() {
	PlayerSelectScript.showUnlockModal(selectedBot);
}

