# synth-the-looper
The Looper is an polyphonic audio synthesizer that loops notes as if they were a single sample, giving them all different loop length, depending on the note, the higher, the shorter.

It contains of a volume knob for each note on a standard piano. 

The timbre of the notes can be controlled with eight overtone knobs. 

There is 10 out-of-the-box presets to choose from.

You can set the overall looping speed and the note decay. 

Also, it has a variable reverberation. 

The UI is written in Svelte and uses SVG to draw the knobs.

Utilizing the web standard [Audio Worklet](https://webaudio.github.io/web-audio-api/#AudioWorklet)

You can try the synth [here](https://flettedehvaler.dk/the-looper)
