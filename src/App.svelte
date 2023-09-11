<script>
  import Modal from './Modal.svelte'
  import SynthManager from './SynthManager';
  import KnobUnit from './KnobUnit.svelte';
  import { hslToHex } from './Utils'
  import FlexBox from './FlexBox.svelte';
  import GridBox12 from './GridBox12.svelte';
  import Unit from './Unit.svelte';

  const NUM_OF_TONES = 88
  const OCTAVE = 12
  let showModal = true
  const keysOctave = ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#']
  let reverbFiles = [
    {"name":"S", "file":"white_noise_short.m4a"},
    {"name":"M", "file":"white_noise_medium.m4a"},
    {"name":"L", "file":"white_noise_long.m4a"},
    {"name":"X", "file":"white_noise_x_long.m4a"}    
  ]  
  let presets = [{"volume":0.5,"wetdry":0.5,"reverb":"white_noise_medium.m4a","decay":0.9994799520000001,"speed":0.8700000000000001,"notes":[1,0,0,0,0,0.72,0,0,0,0,0,0,0.51,0,0,0,0,0.5900000000000001,0,0,0,0,0,0,0.26,0,0,0,0,0.52,0,0,0,0,0,0,0.26,0,0,0,0,0.37,0,0,0,0,0,0,0,0,0,0,0,0.29000000000000004,0,0,0,0,0,0,0,0,0,0,0,0.24,0,0,0,0,0,0,0,0,0,0,0,0.25,0,0,0,0,0,0,0,0,0,0],"overtones":[{"number":"G","value":0.9},{"number":"1","value":0.38},{"number":"2","value":0.44000000000000017},{"number":"3","value":0.2},{"number":"4","value":0.14999999999999997},{"number":"5","value":0.12999999999999998},{"number":"6","value":0.25999999999999995},{"number":"7","value":0.33},{"number":"8","value":0.22999999999999998}]},{"volume":0.73,"wetdry":0.31000000000000005,"reverb":"white_noise_x_long.m4a","decay":0.999789921,"speed":1,"notes":[0,0,0,0,0,0,0,0,0,0,0,0,0.19999999999999998,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.11,0,0,0,0,0.11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"overtones":[{"number":"G","value":0.9},{"number":"1","value":0.14},{"number":"2","value":0.46000000000000013},{"number":"3","value":0.14},{"number":"4","value":0.16999999999999996},{"number":"5","value":0.09999999999999998},{"number":"6","value":0.2},{"number":"7","value":0.15999999999999998},{"number":"8","value":0.39}]},{"volume":0.5099999999999999,"wetdry":1,"reverb":"white_noise_x_long.m4a","decay":0.9999999,"speed":1,"notes":[0,0,0,0.29000000000000004,0,0,0,0.22000000000000003,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.11,0,0,0,0,0.16,0,0,0,0.1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"overtones":[{"number":"G","value":0.9},{"number":"1","value":0.46},{"number":"2","value":0.42000000000000015},{"number":"3","value":0.64},{"number":"4","value":0.59},{"number":"5","value":0.59},{"number":"6","value":0.54},{"number":"7","value":0.59},{"number":"8","value":0.79}]},{"volume":0.33999999999999997,"wetdry":0.2400000000000001,"reverb":"white_noise_long.m4a","decay":0.999709929,"speed":0.8900000000000001,"notes":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.48,0,0,0,0,0,0,0,0,0,0,0,0.44,0,0,0,0.25,0,0,0.22,0,0,0,0,0.21,0,0,0,0.18,0,0,0.2,0,0.22,0,0.19,0.2,0,0.19,0,0.2,0.12,0,0.12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"overtones":[{"number":"G","value":0.9},{"number":"1","value":0.83},{"number":"2","value":0.86},{"number":"3","value":0.18000000000000002},{"number":"4","value":0.14999999999999997},{"number":"5","value":0.05999999999999997},{"number":"6","value":0.17999999999999994},{"number":"7","value":0.15000000000000002},{"number":"8","value":0.44000000000000006}]},{"volume":0.62,"wetdry":0.8300000000000001,"reverb":"white_noise_short.m4a","decay":0.999,"speed":0.9000000000000001,"notes":[0,0,0,0.24,0,0,0,0.23,0,0,0.16,0,0,0,0.2,0,0,0,0.19,0,0,0.2,0,0,0,0.23,0,0,0,0.22,0,0,0.18,0,0,0.29,0.25,0,0,0,0.18,0,0,0.23,0,0,0.18,0,0,0,0,0.22,0,0,0.21,0,0,0.19,0,0,0,0,0.26,0,0,0.23,0,0,0.23,0,0,0.19,0,0.19,0,0,0.3,0,0,0.18,0,0,0.17,0,0,0,0,0],"overtones":[{"number":"G","value":0.9},{"number":"1","value":0},{"number":"2","value":0.36},{"number":"3","value":0},{"number":"4","value":0},{"number":"5","value":0},{"number":"6","value":0},{"number":"7","value":0},{"number":"8","value":0}]},{"volume":0.44,"wetdry":0.31,"reverb":"white_noise_short.m4a","decay":0.999,"speed":0.9299999999999999,"notes":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.17,0.22,0.22,0.19,0.19,0.22,0.19,0.16,0.25,0.22,0.19,0.27,0.25,0.19,0.2,0.2,0.21,0.19,0.22,0.23,0.19,0.19,0.19,0.26,0.2,0.19,0.21,0.21,0.19,0.17,0.28,0.21,0.19,0.24,0.2,0.2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"overtones":[{"number":"G","value":1},{"number":"1","value":0},{"number":"2","value":0},{"number":"3","value":0.34},{"number":"4","value":0},{"number":"5","value":0},{"number":"6","value":0},{"number":"7","value":0},{"number":"8","value":0.29000000000000004}]},{"volume":0.5,"wetdry":0.29,"reverb":"white_noise_long.m4a","decay":0.999209979,"speed":0.7800000000000001,"notes":[0,0,0.2,0,0,0,0,0.23,0,0,0,0.23,0,0,0.21,0,0,0,0,0.25,0,0,0,0.2,0,0,0.17,0,0,0,0,0.21,0,0,0,0.21,0,0,0.17,0,0,0,0,0.18,0,0,0,0.22,0,0,0.21,0,0,0,0,0.19,0,0,0,0.21,0,0,0.22,0,0,0,0,0.2,0,0,0,0.19,0,0,0.24,0,0,0,0,0.22,0,0,0,0.23,0,0,0.16999999999999998,0],"overtones":[{"number":"G","value":1},{"number":"1","value":0},{"number":"2","value":0},{"number":"3","value":0},{"number":"4","value":0},{"number":"5","value":0},{"number":"6","value":0.42},{"number":"7","value":0},{"number":"8","value":0}]},{"volume":0.35,"wetdry":0.5,"reverb":"white_noise_short.m4a","decay":0.999,"speed":1,"notes":[0.52,0.52,0.53,0.48,0.52,0.5,0.49,0.53,0.56,0.53,0.56,0.56,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"overtones":[{"number":"G","value":1},{"number":"1","value":0.64},{"number":"2","value":0.7200000000000001},{"number":"3","value":0.54},{"number":"4","value":0.38},{"number":"5","value":0},{"number":"6","value":0},{"number":"7","value":0},{"number":"8","value":0.73}]},{"volume":0.79,"wetdry":0.5,"reverb":"white_noise_medium.m4a","decay":0.9998699129999999,"speed":0.97,"notes":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.22,0,0,0.21,0,0,0.17,0,0,0.18,0,0,0.21,0,0,0.18,0,0,0.23,0,0,0.2,0,0,0.26,0,0,0.27,0,0,0.24,0,0,0.25,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"overtones":[{"number":"G","value":0.9},{"number":"1","value":0.46},{"number":"2","value":0},{"number":"3","value":0},{"number":"4","value":0},{"number":"5","value":0},{"number":"6","value":0.009999999999999953},{"number":"7","value":0},{"number":"8","value":0}]},{"volume":0.75,"wetdry":0.29999999999999993,"reverb":"white_noise_x_long.m4a","decay":0.9998999100000001,"speed":0.5800000000000001,"notes":[0,0,0,0,0,0,0.16,0,0,0,0.19,0,0,0,0.25,0,0,0.2,0,0,0,0.14,0,0,0,0.17,0.19,0,0.22,0.17,0,0.19,0,0,0.22,0.07,0,0,0,0.2,0.19,0,0,0,0,0.2,0,0.12,0.2,0.16,0,0,0.19,0,0,0,0.19,0,0,0,0,0,0,0.21,0,0.17,0,0.16,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"overtones":[{"number":"G","value":0.9},{"number":"1","value":0},{"number":"2","value":0},{"number":"3","value":0},{"number":"4","value":0},{"number":"5","value":0},{"number":"6","value":0},{"number":"7","value":0.22000000000000003},{"number":"8","value":0}]}]

  let params = {
    volume: 0.5,
    wetdry: 0.5,
    reverb: "white_noise_medium.m4a",
    decay: 0.999,
    speed: 0.75,
    notes: new Array(NUM_OF_TONES).fill( 0 ),
    overtones: [
      {"number": "G", "value": 0.9},
      {"number": "1", "value": 0.1},
      {"number": "2", "value": 0.8},
      {"number": "3", "value": 0.2},
      {"number": "4", "value": 0.7},
      {"number": "5", "value": 0.3},
      {"number": "6", "value": 0.6},
      {"number": "7", "value": 0.4},
      {"number": "8", "value": 0.5}
    ]
  }
  
  let volume = 0.0
  let clipping = false
  
  let synthManager = new SynthManager()

  synthManager.addEventListener("data", analyzerDataEventHandler)

  $: synthManager.setAllParams(params)
  //$: copyPresets(presets, params) //navigator.clipboard.writeText(JSON.stringify(presets))

  function copyPresets(presets, params) {
    navigator.clipboard.writeText(JSON.stringify(presets))
  }

  function analyzerDataEventHandler(e) {
    volume = (e.detail.volume < 1) ? e.detail.volume : 1
    clipping = (e.detail.volume > 1) ? true : false
  }

  async function startSynth() {
    showModal = false
    await synthManager.startSynth("white_noise_medium.m4a")
    synthManager.startAnalyzer()
    synthManager.setAllParams(params)
    setPreset(0)
  }

  function muteAll() {
    params.notes = new Array(NUM_OF_TONES).fill(0)
  }

  function setPreset(index) {
    params = JSON.parse(JSON.stringify(presets[index]))
    //params = presets[index]
    synthManager.restartNotes()
  }

  function handlePresetButtonClick(e) {
    let index = e.target.value
    setPreset(index)
  }
</script>

<main>
  {#if showModal}
    <Modal on:close={startSynth} />
  {:else}
    <div style="width: 100%; text-align:center;">
      <div style="display: inline-block; text-align:left; padding:10px; background-color: #1F2024; border: solid 6px #000000; ">
        <h1 style="font-family:Verdana, Geneva, Tahoma, sans-serif;">The Looper</h1>

        <div style="display: flex; gap: 6px; flex-flow: row wrap;">

          <!-- Notes -->
          <GridBox12 title="NOTES">
            {#each params.notes as note, index}
              <KnobUnit min={0} max={1} 
                bind:value={note} 
                color={hslToHex(index*(360/OCTAVE),100,25)} 
                label={keysOctave[index % OCTAVE]+Math.floor(index/12)}
              />
            {/each}
          </GridBox12>

          <div>  
            <!-- Overtones -->
            <FlexBox title="OVERTONES">
              {#each params.overtones as overtone, index}
                <KnobUnit min={0} max={1} 
                  bind:value={overtone.value} 
                  color={hslToHex(index*(360/params.overtones.length),100,25)} 
                  label={overtone.number}
                />
              {/each}
            </FlexBox>

            <!-- Presets -->
            <FlexBox title="PRESETS">
              {#each presets as preset, index}
                <button style="background-color: {hslToHex(index*(360/presets.length),100,25)};" 
                  class="presetButton" on:click={handlePresetButtonClick} value={index}>{1+index}</button>
              {/each}
            </FlexBox>

            <!-- Control -->
            <FlexBox title="CONTROL">

              <!-- Volume -->
              <KnobUnit min={0} max={1} 
                bind:value={params.volume} 
                meterValue={volume}
                color="#990000" 
                label="Volume"
              />

              <!-- Clip indicator -->
              <Unit label="Clip">
                <div style="height: 46px; width: 40px; text-align: center;">
                  <div class="clip" style="margin-left: 13px; margin-top: 16px; background-color:{clipping == true ? '#F00' : '#000'}">              </div>    
                </div>
              </Unit>

              <!-- Decay -->
              <KnobUnit min={0.999} max={0.9999999} 
                bind:value={params.decay} 
                color="#009900"
                label="Decay"
              />

              <!-- Speed -->
              <KnobUnit min={0} max={1} 
                bind:value={params.speed} 
                color="#000099"
                label="Speed"
              />

              <!-- Restart Notes -->
              <div>
                <button class="settingsButton" on:click={synthManager.restartNotes}>Restart notes</button><br>
                <button class="settingsButton" on:click={muteAll}>Mute all</button>
              </div>
            </FlexBox>

            <!-- Reverb -->
            <FlexBox title="REVERB">
              <div>
                <!-- Size -->
                {#each reverbFiles as item, index}
                  <button style="border-width: {params.reverb == item.file ? 3 : 1}px; margin-right: 4px; background-color: {hslToHex(index*(360/reverbFiles.length),100,25)};" 
                  class="presetButton" on:click={e => params.reverb = item.file} value={index}>{item.name}</button>          
                {/each}

                <!-- link to reverb js -->
                <div class="link">Reverb provided by <a href="http://reverbjs.org/" target="_blank" rel="noreferrer">Reverb.js</a></div>
              </div>

              <!-- Wet/Dry -->
              <KnobUnit min={0} max={1} 
                bind:value={params.wetdry} 
                color="#999900" 
                label="Dry/Wet"
              />
            </FlexBox>
          </div>
        </div>
      </div>
    </div>
  {/if}
</main>
<style>
  a {
    color: #9999ff;
  }
  .link {
    color: #ffffff;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 10px;
    margin-top: 6px;
    margin-left: 6px;
  }
  .clip {
    border: solid 1px #999999; 
    width: 12px;
    height: 12px;
  }

  .presetButton {
    width: 40px; 
    height: 40px; 
    border: solid 1px #999999; 
    border-radius: 6px; 
    color:white; 
    cursor: pointer;
    padding: 0;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 16px;
  }
  .settingsButton {
    width: 120px;
    height: 30px;
    border: solid 1px #999999; 
    border-radius: 6px; 
    color: #ffffff;
    background-color: #222222;
    cursor: pointer;
    padding: 0px;
    margin: 1px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 14px;
  }
</style>