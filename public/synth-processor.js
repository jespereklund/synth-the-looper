
class SynthProcessor extends AudioWorkletProcessor {
  FS = 44100
  A0 = 27.5 // A0
  NUM_OF_TONES = 88
  F0xPI2_DIV_F_SAMPLE = this.A0 * Math.PI * 2 / this.FS

  counter = 0
  oldNoteSpeed = 0
  w = [] 
  vol = []
  dw = [] 
  sampleLength = []
  currentSample = []
  pan = []

  // params
  notes = []
  decay = 0.9999
  overtones = [1,0,0,0,0,0,0,0,0.1]
  noteSpeed = 0.75

  constructor() {
    super()
    this.port.onmessage = (e) => {
      this.resetArrays()
    }    
    this.resetArrays()
  }

  getNextVal() {
    let sum = [0,0]
    for (let n=0; n<this.NUM_OF_TONES; n++) {
      if(this.notes[n] > 0) {
        for (let o=0; o<this.overtones.length; o++) {
          if (this.overtones[o] > 0.0) {
            sum[0] += Math.sin(this.w[n] * (o + 1)) * this.overtones[o] * this.notes[n] * this.vol[n] * this.pan[n][0]
            sum[1] += Math.sin(this.w[n] * (o + 1)) * this.overtones[o] * this.notes[n] * this.vol[n] * this.pan[n][1]
          }
        }
      }
      this.w[n] += this.dw[n]
      this.vol[n] *= this.decay
      if (this.currentSample[n] >= this.sampleLength[n] ) {
        this.restartNote(n)
      } else {
        this.currentSample[n]++
      }
    }
    return sum
  }

  restartNote(n) {
    this.currentSample[n] = 0
    this.w[n] = 0
    this.vol[n] = 1
    this.pan[n] = this.getNewPan()
  }

  resetArrays() {
    this.w = []
    this.dw = []
    this.vol = []
    this.notes = []
    this.currentSample = []
    for (let n=0; n<this.NUM_OF_TONES; n++) {
      this.w.push(0)
      this.notes.push(false)
      this.vol.push(1)
      this.dw.push(this.calcDw(n))
      this.currentSample.push(0)
      this.pan.push(this.getNewPan())
    }
    this.calcNoteLengths()
  }

  getNewPan() {
    let ran = Math.random() * 2
    let l = (ran < 1) ? 1 : ran - 1
    let r = (ran > 1) ? 1 : ran - 1
    return [l, r]
  }

  calcNoteLengths() {
    this.sampleLength = []
    let len = (100 + (1 - this.noteSpeed) * 29900)
    for (let n=0; n<this.NUM_OF_TONES; n++) {
      let sl = Math.round(len / this.calcDw(n))
      this.sampleLength.push(sl)
    }
  }

  calcDw(n) {
    return Math.pow(2, (n/12)) * this.F0xPI2_DIV_F_SAMPLE
  }

  static get parameterDescriptors() {
    let arr = []
    for(let i=0; i<88; i++) {
      arr.push({"name": "tone"+i})
    }
    for(let i=0; i<9; i++) {
      arr.push({"name": "overtone"+i})
    }
    arr.push({"name": "decay"})
    arr.push({"name": "speed"})
    return arr
  }
    
  process(inputs, outputs, parameters) {

    //--- notes ---
    let bin = ""
    for (let n=0; n<this.NUM_OF_TONES; n++) {
      this.notes[n] = parameters["tone" + n][0]
      bin += parameters["tone" + n][0]
    }

    //--- overtones ---
    for (let i=0; i<this.overtones.length; i++) {
      this.overtones[i] = parameters["overtone" + i][0]
    }

    //--- params ---
    this.decay = parameters.decay[0]
    this.noteSpeed = parameters.speed[0]

    if (this.oldNoteSpeed != this.noteSpeed ) {
      this.oldNoteSpeed = this.noteSpeed
      this.calcNoteLengths()
    }

    //throttle console output
    if (this.counter % 100 == 0) {
      //console.log(this.notes)
      //console.log(outputList.length, outputList[0].length, outputList[0][0].length)
      //console.log(inputList.length, inputList[0].length, inputList[0][0].length)
    }
    this.counter++

    let output = outputs[0]
    let sampleCount = output[0].length
    for (let i=0; i<sampleCount; i++) {
      let sample = this.getNextVal()
      output[0][i] = sample[0]
      output[1][i] = sample[1]
    }
    return true
  }
}
  
registerProcessor("synth", SynthProcessor);