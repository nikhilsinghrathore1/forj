"use client"
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { button, useControls } from "leva";
import React, { useEffect, useRef, useState } from "react";
import { Group, SkinnedMesh, Material, Bone } from "three";

import * as THREE from "three";

// Type definitions
interface FacialExpression {
  [key: string]: number;
}

interface FacialExpressions {
  default: FacialExpression;
  smile: FacialExpression;
  funnyFace: FacialExpression;
  sad: FacialExpression;
  surprised: FacialExpression;
  angry: FacialExpression;
  crazy: FacialExpression;
}

interface VisemeMapping {
  [key: string]: string;
}

interface MorphTargetDictionary {
  [key: string]: number;
}

interface MorphTargetInfluences extends Array<number> {}

interface GLTFNode extends THREE.Object3D {
  morphTargetDictionary?: MorphTargetDictionary;
  morphTargetInfluences?: MorphTargetInfluences;
  skeleton?: THREE.Skeleton;
  geometry?: THREE.BufferGeometry;
  material?: Material | Material[];
  isSkinnedMesh?: boolean;
}

interface GLTFNodes {
  Hips: Bone;
  Wolf3D_Body: SkinnedMesh;
  Wolf3D_Outfit_Bottom: SkinnedMesh;
  Wolf3D_Outfit_Footwear: SkinnedMesh;
  Wolf3D_Outfit_Top: SkinnedMesh;
  Wolf3D_Hair: SkinnedMesh;
  EyeLeft: SkinnedMesh & {
    morphTargetDictionary: MorphTargetDictionary;
    morphTargetInfluences: MorphTargetInfluences;
  };
  EyeRight: SkinnedMesh & {
    morphTargetDictionary: MorphTargetDictionary;
    morphTargetInfluences: MorphTargetInfluences;
  };
  Wolf3D_Head: SkinnedMesh & {
    morphTargetDictionary: MorphTargetDictionary;
    morphTargetInfluences: MorphTargetInfluences;
  };
  Wolf3D_Teeth: SkinnedMesh & {
    morphTargetDictionary: MorphTargetDictionary;
    morphTargetInfluences: MorphTargetInfluences;
  };
}

interface GLTFMaterials {
  Wolf3D_Body: Material;
  Wolf3D_Outfit_Bottom: Material;
  Wolf3D_Outfit_Footwear: Material;
  Wolf3D_Outfit_Top: Material;
  Wolf3D_Hair: Material;
  Wolf3D_Eye: Material;
  Wolf3D_Skin: Material;
  Wolf3D_Teeth: Material;
}

interface GLTFResult {
  nodes: GLTFNodes;
  materials: GLTFMaterials;
  scene: THREE.Group;
}

interface MouthCue {
  start: number;
  end: number;
  value: string;
}

interface LipsyncData {
  mouthCues: MouthCue[];
}

interface ChatMessage {
  animation: string;
  facialExpression: keyof FacialExpressions;
  lipsync: LipsyncData;
  audio: string; // base64 encoded audio
}

interface AvatarProps {
  [key: string]: any;
}

const facialExpressions: FacialExpressions = {
  default: {},
  smile: {
    browInnerUp: 0.17,
    eyeSquintLeft: 0.4,
    eyeSquintRight: 0.44,
    noseSneerLeft: 0.1700000727403593,
    noseSneerRight: 0.14000002836874015,
    mouthPressLeft: 0.61,
    mouthPressRight: 0.41000000000000003,
  },
  funnyFace: {
    jawLeft: 0.63,
    mouthPucker: 0.53,
    noseSneerLeft: 1,
    noseSneerRight: 0.39,
    mouthLeft: 1,
    eyeLookUpLeft: 1,
    eyeLookUpRight: 1,
    cheekPuff: 0.9999924982764238,
    mouthDimpleLeft: 0.414743888682652,
    mouthRollLower: 0.32,
    mouthSmileLeft: 0.35499733688813034,
    mouthSmileRight: 0.35499733688813034,
  },
  sad: {
    mouthFrownLeft: 1,
    mouthFrownRight: 1,
    mouthShrugLower: 0.78341,
    browInnerUp: 0.452,
    eyeSquintLeft: 0.72,
    eyeSquintRight: 0.75,
    eyeLookDownLeft: 0.5,
    eyeLookDownRight: 0.5,
    jawForward: 1,
  },
  surprised: {
    eyeWideLeft: 0.5,
    eyeWideRight: 0.5,
    jawOpen: 0.351,
    mouthFunnel: 1,
    browInnerUp: 1,
  },
  angry: {
    browDownLeft: 1,
    browDownRight: 1,
    eyeSquintLeft: 1,
    eyeSquintRight: 1,
    jawForward: 1,
    jawLeft: 1,
    mouthShrugLower: 1,
    noseSneerLeft: 1,
    noseSneerRight: 0.42,
    eyeLookDownLeft: 0.16,
    eyeLookDownRight: 0.16,
    cheekSquintLeft: 1,
    cheekSquintRight: 1,
    mouthClose: 0.23,
    mouthFunnel: 0.63,
    mouthDimpleRight: 1,
  },
  crazy: {
    browInnerUp: 0.9,
    jawForward: 1,
    noseSneerLeft: 0.5700000000000001,
    noseSneerRight: 0.51,
    eyeLookDownLeft: 0.39435766259644545,
    eyeLookUpRight: 0.4039761421719682,
    eyeLookInLeft: 0.9618479575523053,
    eyeLookInRight: 0.9618479575523053,
    jawOpen: 0.9618479575523053,
    mouthDimpleLeft: 0.9618479575523053,
    mouthDimpleRight: 0.9618479575523053,
    mouthStretchLeft: 0.27893590769016857,
    mouthStretchRight: 0.2885543872656917,
    mouthSmileLeft: 0.5578718153803371,
    mouthSmileRight: 0.38473918302092225,
    tongueOut: 0.9618479575523053,
  },
};

const corresponding: VisemeMapping = {
  A: "viseme_PP",
  B: "viseme_kk",
  C: "viseme_I",
  D: "viseme_AA",
  E: "viseme_O",
  F: "viseme_U",
  G: "viseme_FF",
  H: "viseme_TH",
  X: "viseme_PP",
};

let setupMode: boolean = false;

export function Avatar(props: AvatarProps) {
  const { nodes, materials, scene } = useGLTF(
    "/models/64f1a714fe61576b46f27ca2.glb"
  ) as unknown as GLTFResult;

  const [lipsync, setLipsync] = useState<LipsyncData | undefined>();

  const group = useRef<Group>(null);

  // Add error boundary for WebGL context issues
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      console.warn('WebGL context lost, attempting recovery...');
      setHasError(true);
    };

    const handleContextRestored = () => {
      console.log('WebGL context restored');
      setHasError(false);
    };

    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.addEventListener('webglcontextlost', handleContextLost);
      canvas.addEventListener('webglcontextrestored', handleContextRestored);

      return () => {
        canvas.removeEventListener('webglcontextlost', handleContextLost);
        canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      };
    }
  }, []);

  if (hasError) {
    return (
      <group {...props}>
        <mesh>
          <boxGeometry args={[1, 2, 0.5]} />
          <meshBasicMaterial color="red" />
        </mesh>
      </group>
    );
  }

  const lerpMorphTarget = (target: string, value: number, speed: number = 0.1): void => {
    scene.traverse((child) => {
      const meshChild = child as GLTFNode;
      if (meshChild.isSkinnedMesh && meshChild.morphTargetDictionary) {
        const index = meshChild.morphTargetDictionary[target];
        if (
          index === undefined ||
          !meshChild.morphTargetInfluences ||
          meshChild.morphTargetInfluences[index] === undefined
        ) {
          return;
        }
        meshChild.morphTargetInfluences[index] = THREE.MathUtils.lerp(
          meshChild.morphTargetInfluences[index],
          value,
          speed
        );

        if (!setupMode) {
          try {
            set({
              [target]: value,
            });
          } catch (e) {
            // Ignore errors when setting controls
          }
        }
      }
    });
  };

  const [blink, setBlink] = useState<boolean>(false);
  const [winkLeft, setWinkLeft] = useState<boolean>(false);
  const [winkRight, setWinkRight] = useState<boolean>(false);
  const [facialExpression, setFacialExpression] = useState<keyof FacialExpressions>("default");
  const [audio, setAudio] = useState<HTMLAudioElement | undefined>();

  useFrame(() => {
    if (!setupMode && nodes.EyeLeft?.morphTargetDictionary) {
      Object.keys(nodes.EyeLeft.morphTargetDictionary).forEach((key) => {
        const mapping = facialExpressions[facialExpression];
        if (key === "eyeBlinkLeft" || key === "eyeBlinkRight") {
          return; // eyes wink/blink are handled separately
        }
        if (mapping && mapping[key]) {
          lerpMorphTarget(key, mapping[key], 0.1);
        } else {
          lerpMorphTarget(key, 0, 0.1);
        }
      });
    }

    lerpMorphTarget("eyeBlinkLeft", blink || winkLeft ? 1 : 0, 0.5);
    lerpMorphTarget("eyeBlinkRight", blink || winkRight ? 1 : 0, 0.5);

    // LIPSYNC
    if (setupMode) {
      return;
    }

    const appliedMorphTargets: string[] = [];
    if (lipsync && audio) {
      const currentAudioTime = audio.currentTime;
      for (let i = 0; i < lipsync.mouthCues.length; i++) {
        const mouthCue = lipsync.mouthCues[i];
        if (
          currentAudioTime >= mouthCue.start &&
          currentAudioTime <= mouthCue.end
        ) {
          appliedMorphTargets.push(corresponding[mouthCue.value]);
          lerpMorphTarget(corresponding[mouthCue.value], 1, 0.2);
          break;
        }
      }
    }

    Object.values(corresponding).forEach((value) => {
      if (appliedMorphTargets.includes(value)) {
        return;
      }
      lerpMorphTarget(value, 0, 0.1);
    });
  });

  useControls("FacialExpressions", {
    winkLeft: button(() => {
      setWinkLeft(true);
      setTimeout(() => setWinkLeft(false), 300);
    }),
    winkRight: button(() => {
      setWinkRight(true);
      setTimeout(() => setWinkRight(false), 300);
    }),
    facialExpression: {
      value: facialExpression,
      options: Object.keys(facialExpressions),
      onChange: (value: keyof FacialExpressions) => setFacialExpression(value),
    },
    enableSetupMode: button(() => {
      setupMode = true;
    }),
    disableSetupMode: button(() => {
      setupMode = false;
    }),
    logMorphTargetValues: button(() => {
      const emotionValues: FacialExpression = {};
      if (nodes.EyeLeft?.morphTargetDictionary && nodes.EyeLeft?.morphTargetInfluences) {
        Object.keys(nodes.EyeLeft.morphTargetDictionary).forEach((key) => {
          if (key === "eyeBlinkLeft" || key === "eyeBlinkRight") {
            return; // eyes wink/blink are handled separately
          }
          const index = nodes.EyeLeft.morphTargetDictionary[key];
          const value = nodes.EyeLeft.morphTargetInfluences[index];
          if (value > 0.01) {
            emotionValues[key] = value;
          }
        });
      }
      console.log(JSON.stringify(emotionValues, null, 2));
    }),
  });

  const [, set] = useControls("MorphTarget", () => {
    if (!nodes.EyeLeft?.morphTargetDictionary || !nodes.EyeLeft?.morphTargetInfluences) {
      return {};
    }
    
    return Object.assign(
      {},
      ...Object.keys(nodes.EyeLeft.morphTargetDictionary).map((key) => {
        const index = nodes.EyeLeft.morphTargetDictionary[key];
        return {
          [key]: {
            label: key,
            value: 0,
            min: nodes.EyeLeft.morphTargetInfluences[index] || 0,
            max: 1,
            onChange: (val: number) => {
              if (setupMode) {
                lerpMorphTarget(key, val, 1);
              }
            },
          },
        };
      })
    );
  });

  useEffect(() => {
    let blinkTimeout: NodeJS.Timeout;
    const nextBlink = (): void => {
      blinkTimeout = setTimeout(() => {
        setBlink(true);
        setTimeout(() => {
          setBlink(false);
          nextBlink();
        }, 200);
      }, THREE.MathUtils.randInt(1000, 5000));
    };
    nextBlink();
    return () => clearTimeout(blinkTimeout);
  }, []);

  return (
    <group {...props} dispose={null} ref={group}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        name="Wolf3D_Body"
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />
      <skinnedMesh
        name="Wolf3D_Outfit_Bottom"
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
        name="Wolf3D_Outfit_Footwear"
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
        name="Wolf3D_Outfit_Top"
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
      <skinnedMesh
        name="Wolf3D_Hair"
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
    </group>
  );
}

useGLTF.preload("/models/64f1a714fe61576b46f27ca2.glb");
          
