using UnityEngine;
using System.Collections;

public class BtnScript_CS : MonoBehaviour
{

    Vector3 startPos;
    Vector3 pushedPos;
    public Color initialColor;
    Renderer rend;
    public Color highlightColor;
    // I added a public gameobject named PitRaycaster. Simply drag and 
    // drop the object. 
    // If at one point you need to create the PitRaycaster from scratch 
    // (i.e. you want to create a new level or you delete it by mistake)
    // do as follows:
    // - Create a box as large as the hole and as tall as the bots, name it PitRaycaster
    // - Place it just on the top of thehole, like as if it's resting on the
    //   ground 
    // - Disable its boxcollider and the mesh renderer to make it invisible
    // - MAKE SURE TO SET ITS BOX COLLIDER AS TRIGGER
    // - Check if you have a tag "Pit", if not, create one and assign it to 
    //   the PitRaycaster
    // - Drag and drop the object into this script
    // - Check if you have a tag "Button", if not, create it and assign it
    //   to the button
    public GameObject PitObj, PitRaycaster;

    // We want to make it static so that we can access it from the SeekPlayer script
    [SerializeField]
    public static bool pressed = false;

    // Use this for initialization
    void Start()
    {
        // I want to detect the original position of the button
        startPos = this.gameObject.transform.position;
        // Set the position of the button when pressed
        pushedPos = new Vector3(-0.09f,0.9f,3.05f);
        rend = GetComponent<Renderer>();
        // Get initial color
        initialColor = rend.material.color;
    }

    // Check for collisions with the button
    void OnCollisionEnter(Collision collision)
    {
        ContactPoint contact = collision.contacts[0];

        GameObject other = contact.otherCollider.gameObject;

        // Debug.Log("a collision has happened between "+contact.thisCollider.name +" and "+other.name+" impulse was "+collision.impulse.magnitude);
        // I added the collision detection with the boxes, as it could happen that a box is placed in between of the 
        // player and the button...So if the bot now pushed the box towards the button, the button is pressed.
        // You can remove this feature if you wish of course.
        if (other.tag == "Player" || other.tag == "Box" && collision.impulse.magnitude > 10 && pressed == false)
        {
            Debug.Log("a collision has happened between " + contact.thisCollider.name + " and " + other.name);

            pressed = true;

            PitRaycaster.GetComponent<BoxCollider>().enabled = true;

            //--depress the button
            this.gameObject.transform.localPosition = pushedPos;
            rend.material.color = highlightColor;

            //--restore button after 15 seconds
            Invoke("MyWaitingFunction", 15);
        }


    }
    void MyWaitingFunction()
    {
        // reset button to initial position
        this.gameObject.transform.position = startPos;
        pressed = false;
        PitRaycaster.GetComponent<BoxCollider>().enabled = false;
        rend.material.color = initialColor;
    }
}