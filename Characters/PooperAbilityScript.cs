using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PooperAbilityScript : MonoBehaviour {

	public GameObject BombEmitter;
	public GameObject Bomb;
	private float fireRateNormal = 2.5f;
	private float fireRate;
	private Vector3 emitterPos;
	public Animator anim;

	// Use this for initialization
	void Start () {
		fireRate = fireRateNormal;
	}
	
	// called by PlayerAbility using sendmessage
	void ActivateAbilityBroadcast(){
		Debug.Log("Activate yus!");
		InvokeRepeating("MakeSquat", 0, fireRate);
		// InvokeRepeating("CreateBomb", 0.2f + 0.15f, fireRate);
	}

	void DisableAbilityBroadcast(){
		Debug.Log("Disable yus!");
		CancelInvoke("MakeSquat");
	}

	void MakeSquat(){
		anim.SetTrigger("StartCountdown");
	}

	void CreateBomb() {

		//--called by trigger on squatanimation

		emitterPos = BombEmitter.transform.position;
		
		GameObject bombInstance = Instantiate(Bomb, emitterPos, transform.rotation);
		
		//--set the owner of this bullet
		// bulletInstance.GetComponent<BulletScript>().Owner = gameObject;

	}
}
