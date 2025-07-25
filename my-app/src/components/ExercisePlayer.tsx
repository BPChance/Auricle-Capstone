"use client";

import React, { useState } from "react";
import * as Tone from "tone";

export default function ExercisePlayer() {
  const playChord = async () => {
    await Tone.start();
    const synth = new Tone.PolySynth().toDestination();
    const chord = ["C4", "E4", "G4"];
    synth.triggerAttackRelease(chord, "1n");
  };
  return (
    <div>
      <h2></h2>
      <button onClick={playChord}>Play chord</button>
    </div>
  );
}
