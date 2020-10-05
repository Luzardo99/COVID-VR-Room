if (window.AFRAME == null) {
    console.error("aframe not found, please import it before this component.")
  }
  
  AFRAME.registerSystem("track-cursor", {
    init: function() {
      this.el.setAttribute("cursor", { rayOrigin: "mouse" });
    }
  });
  
  AFRAME.registerComponent("track-cursor", {
    init: function() {
      this.el.addEventListener("mousedown", e => {
        if (this.el.is("cursor-hovered")) {
          this.el.sceneEl.camera.el.setAttribute("look-controls", {
            enabled: false
          });
          this.el.addState("dragging");
        }
      })
      this.el.addEventListener("click", e => {
        if (this.el.is("dragging")) {
          this.el.sceneEl.camera.el.setAttribute("look-controls", {
            enabled: true
          });
          this.el.removeState("dragging");
        }
      })
    },
  });
  
  AFRAME.registerComponent("dragndrop", {
    dependencies: ["track-cursor"],
    init: function() {
      this.range = 0;
      this.dist = 0;
  
      this.el.addEventListener("stateadded", e => {
        if (e.detail == "dragging") {
          this.range = 0;
          this.dist = this.el.object3D.position
            .clone()
            .sub(this.el.sceneEl.camera.el.object3D.position)
            .length();
        }
      })
  
      this.direction = new AFRAME.THREE.Vector3();
      this.target = new AFRAME.THREE.Vector3();
      document.addEventListener("wheel", e => {
        if (e.deltaY < 0) {
          this.range += 0.1;
        } else {
          this.range -= 0.1;
        }
      });
    },
    updateDirection: function() {
      this.direction.copy(this.el.sceneEl.getAttribute("raycaster").direction);
    },
    updateTarget: function() {
      let camera = this.el.sceneEl.camera.el
      this.target.copy(
        camera.object3D.position
          .clone()
          .add(this.direction.clone().multiplyScalar(this.dist + this.range))
      );
    },
    tick: function() {
      if (this.el.is("dragging")) {
        this.updateDirection();
        this.updateTarget();
        this.el.object3D.position.copy(this.target);
      }
    }
  });

function playSound()
	{
		var object = document.querySelector("#juggernog");
		object.setAttribute('visible', 'true');
		var audio = document.querySelector("#jugSound");
		audio.play();
    }
function covidOn()
	{
        var object1 = document.querySelector("#trashbag1");
        var object2 = document.querySelector("#trashbag2");
        var object3 = document.querySelector("#trashbag3");

        if(object1.getAttribute('visible') == false){
            object1.setAttribute('visible', 'true');
            object2.setAttribute('visible', 'true');
			object3.setAttribute('visible', 'true');
        }else{
            object1.setAttribute('visible', 'false');
            object2.setAttribute('visible', 'false');
			object3.setAttribute('visible', 'false');
                }

    }
function dayNnight(){
        var skyobj = document.querySelector("#sky");

        if(skyobj.getAttribute('color') == "#53cbea"){
            skyobj.setAttribute('color', "#191970");
        }else{
            skyobj.setAttribute('color', "#53cbea");
        }

}