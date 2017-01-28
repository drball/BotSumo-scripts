using UnityEngine;
using System.Collections;

public class SeekPlayer : MonoBehaviour {
    // Some variables 
    RaycastHit other;
    public float speed = 1.8f, moveSpeed = 0.01f;
    public float tickness = 1.0f;
    public static bool moveForward = false;
    bool rotateL = true;
    bool search = true;
    public float t = 1;
    public Vector3 target;
    GameObject enemy;
    

    void Update()
    {
        // Create a forward direction vector
        Vector3 fwd = transform.TransformDirection(Vector3.forward);
        //Debug.Log(rotateL);
        // if the raycaster its something...
        if (Physics.Raycast(transform.position, fwd, out other, 100))
        {
            // Check if the red button was pressed. If not pressed...
            if (!BtnScript_CS.pressed)
            {
                // ... if the bot sees the button or the player we want it to go straight
                if (other.transform.tag == "Button" || other.transform.tag == "Player")
                {
                    moveForward = true;
                }

            }// if the button is pressed we don't want the bot to keep going towards the button
            // but we still want it to look for the player's bot
            else
            {
                print("There is something in front of the object!");
                Debug.Log(other.transform.gameObject.tag);
                if (other.transform.tag == "Player")
                {

                    Debug.Log("Move");
                    moveForward = true;

                }
                else
                {
                    moveForward = false;
                }

            }
        }
        else
        {
            Debug.Log("No");
            moveForward = false;
        }

    }
}