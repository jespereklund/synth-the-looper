import { calcPan } from "./Utils"

class SynthManager extends EventTarget  {
  NUM_OF_TONES = 88
  NUM_OF_OVERTONES = 9
  noteparams = []
  overtoneparams = []
  decayparam 
  speedparam 
  stereoparam
  counter = 0
  synthNode
  reverbNode
  dryGainNode
  wetGainNode
  masterGainNode
  analyzerNode
  audioContext
  currentReverb = ""

  //static clip

  constructor() {
    super()
  }

  async startSynth(irFile) {
    try { await this.audioContext.close() } catch(e) {}
    this.audioContext = await this.createAudioContext()
    // @ts-ignore
    reverbjs.extend(this.audioContext)
    this.synthNode = await this.createSynthNode(this.audioContext)
    this.initParameters(this.synthNode)
    this.dryGainNode = await this.audioContext.createGain()
    this.dryGainNode.gain.value = 1
    this.wetGainNode = await this.audioContext.createGain()
    this.masterGainNode = await this.audioContext.createGain()
    this.analyserNode = await this.audioContext.createAnalyser()
    try { this.reverbNode = await this.audioContext.createReverbFromUrl("./ir/" + irFile) } catch(e) {}

    this.synthNode
      .connect(this.dryGainNode)
      .connect(this.masterGainNode)
      
    this.synthNode
      .connect(this.wetGainNode)
      .connect(this.reverbNode)
      .connect(this.masterGainNode)
      .connect(this.analyserNode).connect(this.audioContext.destination)
  }

  startAnalyzer() {
    const pcmData = new Float32Array(this.analyserNode.fftSize)
    const onFrame = () => {
      this.analyserNode.getFloatTimeDomainData(pcmData)
      let volume = pcmData.reduce((a, b) => Math.max(a, b), -Infinity)
      this.dispatchEvent(new CustomEvent("data", {"detail": {"volume":volume}}))
      window.requestAnimationFrame(onFrame)
    }
    window.requestAnimationFrame(onFrame)
  }

  async createSynthNode(audioContext) {
      let processorNode
      try {
        await audioContext.audioWorklet.addModule("synth-processor.js")
        processorNode = new AudioWorkletNode(audioContext, "synth", { numberOfOutputs: 2, outputChannelCount: [2, 2] })
      } catch (e) {
        console.error(`** Error: Unable to create worklet node: ${e}`)
        return null;
      }
      await audioContext.resume()
      return processorNode
  }
  
  initParameters(node) {
    for(let i=0; i<this.NUM_OF_TONES; i++) {
      this.noteparams[i] = node.parameters.get('tone'+i)
    }
    for(let i=0; i<this.NUM_OF_OVERTONES; i++) {
      this.overtoneparams[i] = node.parameters.get('overtone'+i)
    }
    this.decayparam = node.parameters.get('decay')
    this.speedparam = node.parameters.get('speed')
  }

  createAudioContext() {
    try {
      let audioContext = new window.AudioContext({"sampleRate": 41100})
      return audioContext
    } catch (e) {
      console.error("** Error: Unable to create audio context")
      return null
    }
  }

  //------------------ public setters ----------------------

  restartNotes = () => {
    this.synthNode.port.postMessage("restartNotes")
  }

  async setAllParams(params) {
    await this.setReverb(params.reverb)
    this.setNotes(params.notes)
    this.setVolume(params.volume)
    this.setWetDry(params.wetdry)
    this.setDecay(params.decay)
    this.setSpeed(params.speed)
    this.setOvertones(params.overtones)
  }

  setNotes = (notes) => {
    for(let i=0; i<this.NUM_OF_TONES; i++) {
      try { this.noteparams[i].value = notes[i]; } catch(e) {}  
    }
  }

  setOvertones = (overtones) => {
    for(let i=0; i<this.NUM_OF_OVERTONES; i++) {
      try { this.overtoneparams[i].value = overtones[i].value } catch(e) {}  
    }
  }

  setDecay = (val) => {
    try { this.decayparam.value = val } catch(e) {}  
  }

  setSpeed = (val) => {
    try { this.speedparam.value = val } catch(e) {}  
  }

  setVolume = (vol) => {
    try { this.masterGainNode.gain.value = vol } catch(e) {}
  }

  setWetDry = (val) => {
    let pan = calcPan(val)
    try { this.dryGainNode.gain.value = pan[0] } catch(e) {}
    try { this.wetGainNode.gain.value = pan[1] } catch(e) {}
  }

  async setReverb(val) {
    if (val != this.currentReverb) {
      this.currentReverb = val
      await this.startSynth(val)      
    }
  }
}
export default SynthManager