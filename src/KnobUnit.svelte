<script>
    import Knob from "./Knob.svelte";
    import Unit from "./Unit.svelte";
    export let min, max, value, meterValue = null, color, label
    let meterHeight
    let knobSize = 40
    $: meterHeight = knobSize - knobSize * ((meterValue != null) ? meterValue : value - min) / (max - min)
</script>
<Unit label={label}>
  <div style="padding: 3px;">
    <Knob size={knobSize} bind:value={value} min={min} max={max} pixelRange={100} color={color}/>
  </div>
  <div style="width: 6px; height: {knobSize}px; margin: 2px; position:relative">
    <div style="width: 100%; height:100%; position:absolute; background-image: linear-gradient(red, yellow, green, green); "></div>
    <div style="width: 100%; height:{meterHeight}px; position:absolute; background-color:black; "></div>
  </div>  
</Unit>
