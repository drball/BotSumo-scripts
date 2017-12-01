using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SolarAbilityScript : MonoBehaviour {

	public GameObject BulletEmitter;
	public GameObject Bullet;
	private float fireRateNormal = 0.75f;
	private float fireRate;
	public GameObject movingHead;
	public GameObject target;
	private GameObject[] targets;
	public bool abilityActive = false; //--ideally we should reference this in playerAbilityScript - but it's js

	// Use this for initialization
	void Start () {
		fireRate = fireRateNormal;
		Invoke("FindOpponent", 1);
		BulletEmitter = transform.Find("Solar/SolarHeadWrapper/BulletEmitter").gameObject;
	}
	
	// called by PlayerAbility using sendmessage
	void ActivateAbilityBroadcast(){
		Debug.Log("Activate yus!");
		InvokeRepeating("FireLaser", 0, fireRate / 2f);
		abilityActive = true;
	}

	void DisableAbilityBroadcast(){
		Debug.Log("Disable yus!");
		CancelInvoke("FireLaser");
		abilityActive = false;
	}

	void FindOpponent (){
		//--find the enemy target, so we know who Solar should shoot at
		targets = GameObject.FindGameObjectsWithTag("Player");

		for(int i = 0; i < targets.Length; i++)
	    {
	        // Debug.Log("loop. "+targets[i]);
	        // Debug.Log("found . "+transform.gameObject);
	        if(targets[i] != transform.gameObject){
	        	target = targets[i];
				break;
	        }
	    }
	}

	void Update(){


		if(target){

			Quaternion rotation = transform.rotation;

			if(abilityActive){
				rotation = Quaternion.LookRotation(new Vector3(target.transform.position.x, movingHead.transform.position.y, target.transform.position.z) - movingHead.transform.position);
			} 

 			movingHead.transform.rotation = Quaternion.Slerp(movingHead.transform.rotation, rotation, Time.deltaTime * 6f);

		}
	}

	void FireLaser(){
		Debug.Log("fire a laser");
		GameObject bulletInstance = Instantiate(Bullet,
				BulletEmitter.transform.position, 
				movingHead.transform.rotation
			);

		//--set the owner of this bullet
		// bulletInstance.GetComponent.<BulletScript>().Owner = gameObject;
	}

}
